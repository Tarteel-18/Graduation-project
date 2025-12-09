"""RAG (Retrieval Augmented Generation) pipeline."""
import logging
import httpx
from typing import List, Dict, Optional
from chromadb import ClientAPI, Collection
import chromadb
from chromadb.config import Settings as ChromaSettings
from openai import OpenAI
from sentence_transformers import CrossEncoder

from app.embeddings import EmbeddingGenerator
from app.config import settings

logger = logging.getLogger(__name__)


class RAGPipeline:
    """RAG pipeline for question answering with FAQ documents."""
    
    def __init__(self):
        """Initialize the RAG pipeline."""
        logger.info("Initializing RAG pipeline...")
        
        # Initialize embedding generator
        self.embedding_generator = EmbeddingGenerator(
            model_name=settings.EMBEDDING_MODEL,
            device=settings.EMBEDDING_DEVICE
        )
        
        # Initialize ChromaDB
        self.chroma_client = chromadb.PersistentClient(
            path=settings.VECTOR_DB_PATH,
            settings=ChromaSettings(anonymized_telemetry=False)
        )
        
        # Get or create collection
        try:
            self.collection = self.chroma_client.get_collection(
                name=settings.VECTOR_DB_COLLECTION_NAME
            )
            logger.info(f"Loaded existing collection: {settings.VECTOR_DB_COLLECTION_NAME}")
        except Exception:
            self.collection = self.chroma_client.create_collection(
                name=settings.VECTOR_DB_COLLECTION_NAME,
                metadata={"description": "FAQ documents for RAG"}
            )
            logger.info(f"Created new collection: {settings.VECTOR_DB_COLLECTION_NAME}")
        
        # Initialize OpenAI client
        if settings.OPENAI_API_KEY:
            self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
            logger.info("OpenAI client initialized")
        else:
            self.openai_client = None
            logger.warning("OpenAI API key not found, will use Ollama fallback")
        
        # Initialize cross-encoder reranker if enabled
        if settings.USE_RERANKING:
            try:
                logger.info(f"Loading reranker model: {settings.RERANKER_MODEL}")
                self.reranker = CrossEncoder(settings.RERANKER_MODEL, max_length=512)
                logger.info("Reranker initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize reranker: {e}")
                logger.warning("Continuing without reranking")
                self.reranker = None
        else:
            self.reranker = None
            logger.info("Reranking disabled")
        
        logger.info("RAG pipeline initialized")
    
    def add_documents(self, documents: List[str], metadatas: Optional[List[Dict]] = None):
        """
        Add documents to the vector database.
        
        Args:
            documents: List of document texts
            metadatas: Optional list of metadata dictionaries
        """
        if not documents:
            logger.warning("No documents to add")
            return
        
        logger.info(f"Adding {len(documents)} documents to vector DB...")
        
        # Generate embeddings
        embeddings = self.embedding_generator.generate_embeddings_batch(documents)
        
        # Prepare IDs
        ids = [f"doc_{i}" for i in range(len(documents))]
        
        # Prepare metadatas if not provided
        if metadatas is None:
            metadatas = [{}] * len(documents)
        
        # Add to ChromaDB
        self.collection.add(
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        
        logger.info(f"Successfully added {len(documents)} documents")
    
    def _expand_query(self, query: str) -> str:
        """
        Expand query with synonyms to improve retrieval.
        
        Args:
            query: Original query
            
        Returns:
            Expanded query with synonyms
        """
        # Common Arabic synonyms mapping - more comprehensive
        synonyms = {
            "أصغر": ["أدنى", "أقل", "الحد الأدنى", "الحد الأقل", "الحد الأدنى للتمويل"],
            "قرض": ["تمويل", "قروض", "التمويل", "القروض"],
            "متاح": ["متوفر", "موجود", "متاحة"],
            "مجاني": ["بدون مقابل", "مجاناً", "مجانية"],
            "تدريب": ["دورات", "برامج تدريبية", "التدريب"],
            "استشارة": ["استشارات", "نصيحة", "الاستشارات"],
            "ماذا تفعل": ["ما هي", "ما مهمة", "ما دور", "ما وظيفة"],
            "الهيئة": ["المؤسسة", "الجهة", "المنظمة"],
            "فوائد": ["فائدة", "فوائد على القروض", "بفوائد"],
            "تفرضون": ["تفرض", "يوجد", "هناك"]
        }
        
        expanded = query
        for word, syns in synonyms.items():
            if word in query:
                # Add synonyms to query
                expanded += " " + " ".join(syns)
        
        # Also add common question patterns - more aggressive for synonyms
        if "أصغر" in query or "أدنى" in query or "أقل" in query or "الحد الأدنى" in query:
            expanded += " الحد الأدنى للتمويل الحد الأقل الحد الأدنى للقرض الحد الأدنى للتمويل يبدأ من 50 ألف"
        if "قرض" in query or "قروض" in query:
            expanded += " تمويل قروض التمويل"
        # Special case: if asking about smallest/minimum loan
        if ("أصغر" in query or "أدنى" in query) and ("قرض" in query or "تمويل" in query):
            expanded += " ما الحد الأدنى للتمويل الحد الأدنى للتمويل يبدأ من 50 ألف ريال"
        # Special case: if asking about interest/fees
        if "فوائد" in query or "فائدة" in query:
            expanded += " هل القروض بفوائد فوائد على القروض"
        
        # Special handling for general "about" questions
        general_about_keywords = ["ماذا تفعل", "ما هي", "ما مهمة", "ما دور", "ما وظيفة", "ما عمل", "تعريف", "ما هي الهيئة"]
        if any(keyword in query for keyword in general_about_keywords):
            expanded += " الهيئة العامة لتنمية المشاريع الصغيرة والأصغر تعريف دعم تمكين أهداف خدمات"
        
        return expanded
    
    def _rerank_chunks(self, query: str, chunks: List[Dict], preserve_top_n: int = 2) -> List[Dict]:
        """
        Rerank chunks using cross-encoder for better relevance.
        Uses hybrid approach: preserves top N from embedding model, reranks the rest.
        
        Args:
            query: User's question
            chunks: List of chunks to rerank
            preserve_top_n: Number of top chunks to preserve from embedding model
            
        Returns:
            Reranked list of chunks
        """
        if not self.reranker or len(chunks) <= 1:
            return chunks
        
        logger.info(f"Reranking {len(chunks)} chunks (preserving top {preserve_top_n} from embedding model)...")
        
        try:
            # Hybrid approach: preserve top N from embedding model, rerank the rest
            if len(chunks) <= preserve_top_n:
                return chunks  # Not enough chunks to rerank
            
            # Split into preserved (top N) and to-rerank (rest)
            preserved = chunks[:preserve_top_n]
            to_rerank = chunks[preserve_top_n:]
            
            # Rerank only the remaining chunks
            pairs = [(query, chunk["text"]) for chunk in to_rerank]
            scores = self.reranker.predict(pairs)
            
            # Add rerank scores
            for i, chunk in enumerate(to_rerank):
                chunk["rerank_score"] = float(scores[i])
            
            # Sort the to-rerank chunks by rerank score
            to_rerank.sort(key=lambda x: x.get("rerank_score", 0), reverse=True)
            
            # Combine: preserved (top N from embedding) + reranked rest
            reranked_chunks = preserved + to_rerank
            
            logger.info(f"Reranking complete. Preserved {len(preserved)}, reranked {len(to_rerank)}")
            if to_rerank:
                logger.info(f"Top reranked score: {to_rerank[0].get('rerank_score', 0):.4f}")
            
            return reranked_chunks
            
        except Exception as e:
            logger.error(f"Error during reranking: {e}")
            return chunks  # Return original order if reranking fails
    
    def search_relevant_chunks(self, query: str, top_k: int = None) -> List[Dict]:
        """
        Search for relevant document chunks based on query.
        
        Args:
            query: User's question
            top_k: Number of results to return
            
        Returns:
            List of relevant chunks with metadata
        """
        if top_k is None:
            top_k = settings.TOP_K_RESULTS
        
        logger.info(f"Searching for relevant chunks for query: {query[:50]}...")
        
        # Expand query with synonyms for better retrieval
        expanded_query = self._expand_query(query)
        logger.debug(f"Expanded query: {expanded_query}")
        
        # Generate query embedding from expanded query
        query_embedding = self.embedding_generator.generate_embedding(expanded_query)
        
        # Determine how many candidates to retrieve
        # If reranking is enabled, retrieve more candidates for better reranking
        if settings.USE_RERANKING and self.reranker:
            retrieve_k = min(settings.RERANK_TOP_K, 15)  # Retrieve more for reranking
        else:
            retrieve_k = min(top_k + 2, 10)  # Just a few more without reranking
        
        # Search in ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=retrieve_k
        )
        
        # Format results
        chunks = []
        if results['documents'] and len(results['documents'][0]) > 0:
            for i, doc in enumerate(results['documents'][0]):
                chunk = {
                    "text": doc,
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else None
                }
                chunks.append(chunk)
        
        # Rerank if enabled - use hybrid approach to preserve embedding model's top results
        if settings.USE_RERANKING and self.reranker and len(chunks) > 2:
            chunks = self._rerank_chunks(query, chunks, preserve_top_n=2)
        
        # Return top_k after reranking
        chunks = chunks[:top_k]
        
        logger.info(f"Found {len(chunks)} relevant chunks (after reranking: {settings.USE_RERANKING and self.reranker is not None})")
        return chunks
    
    def generate_response(
        self,
        query: str,
        context_chunks: List[Dict],
        conversation_history: Optional[List[Dict]] = None
    ) -> str:
        """
        Generate response using LLM (Ollama) with retrieved context.
        
        Args:
            query: User's question
            context_chunks: Retrieved relevant document chunks
            conversation_history: Optional conversation history
            
        Returns:
            Generated response from LLM
        """
        logger.info("Generating response with LLM...")
        
        # Build context from chunks - include full Q&A pairs for better understanding
        context_parts = []
        for i, chunk in enumerate(context_chunks, 1):
            text = chunk["text"]
            # Keep full Q&A format so GPT understands the relationship
            if "س:" in text and "ج:" in text:
                # Format as numbered Q&A pair
                context_parts.append(f"{i}. {text.strip()}")
            elif "ج:" in text:
                # If only answer, add it
                context_parts.append(f"{i}. {text.strip()}")
            else:
                context_parts.append(f"{i}. {text.strip()}")
        
        context = "\n\n".join(context_parts)
        
        # Build prompt for OpenAI - more explicit and less conservative
        system_prompt = """أنت مساعد ذكي للهيئة العامة لتنمية المشاريع الصغيرة والأصغر.
مهمتك هي الإجابة على أسئلة المستخدمين بناءً على المعلومات المتوفرة في السياق.

قواعد مهمة:
1. أجب بالعربية فقط بشكل واضح ومهذب ومفيد
2. استخدم المعلومات من السياق المقدم - حتى لو كانت الصياغة مختلفة قليلاً
3. إذا كان السؤال مشابهاً لسؤال في السياق، استخدم الإجابة المقابلة له
4. إذا كانت المعلومات موجودة في السياق (حتى بصيغة مختلفة أو ضمنية)، أجب بناءً عليها
5. فقط إذا كانت المعلومات غير موجودة تماماً في السياق، قل: "عذراً، لم أجد هذه المعلومات في قاعدة المعرفة"
6. لا تخترع معلومات غير موجودة في السياق

أمثلة:
- إذا سأل المستخدم "هل يمكن التقديم من تعز؟" والسياق يحتوي "هل تغطي الهيئة محافظة تعز؟ نعم، عبر برامج خاصة" → أجب: "نعم، يمكن التقديم من محافظة تعز عبر برامج خاصة"
- إذا سأل المستخدم "هل الاستشارات مجانية؟" والسياق يحتوي "هل الاستشارات مجانية؟ نعم مجانية ضمن برامج الدعم" → أجب: "نعم، الاستشارات مجانية ضمن برامج الدعم"
- إذا سأل المستخدم "ما أصغر قرض؟" والسياق يحتوي "ما الحد الأدنى للتمويل؟ يبدأ من 50 ألف ريال يمني" → أجب: "الحد الأدنى للتمويل يبدأ من 50 ألف ريال يمني حسب نوع المشروع"
"""
        
        user_prompt = f"""المعلومات المتوفرة من قاعدة المعرفة:

{context}

---
السؤال من المستخدم: {query}

أجب على السؤال بناءً على المعلومات أعلاه. إذا كانت المعلومات موجودة (حتى بصيغة مختلفة)، استخدمها للإجابة."""
        
        # Try OpenAI first
        if self.openai_client and settings.OPENAI_API_KEY:
            try:
                logger.info("Calling OpenAI API...")
                response = self.openai_client.chat.completions.create(
                    model=settings.OPENAI_MODEL,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=0.5,  # Increased slightly to be less conservative
                    max_tokens=250  # Slightly increased for more complete answers
                )
                generated_text = response.choices[0].message.content.strip()
                logger.info("OpenAI response generated successfully")
                return generated_text
                
            except Exception as e:
                logger.error(f"Error calling OpenAI API: {e}")
                # Fallback to Ollama if configured
                if settings.USE_OLLAMA_FALLBACK:
                    logger.info("Falling back to Ollama...")
                    return self._call_ollama(system_prompt, user_prompt)
                else:
                    return "عذراً، حدث خطأ في الاتصال بخادم الذكاء الاصطناعي. يرجى المحاولة لاحقاً."
        
        # Fallback to Ollama if OpenAI not configured
        elif settings.USE_OLLAMA_FALLBACK:
            logger.info("Using Ollama (OpenAI not configured)...")
            return self._call_ollama(system_prompt, user_prompt)
        else:
            logger.error("Neither OpenAI nor Ollama is properly configured")
            return "عذراً، لم يتم تكوين خادم الذكاء الاصطناعي. يرجى التحقق من الإعدادات."
    
    def _call_ollama(self, system_prompt: str, user_prompt: str) -> str:
        """Fallback method to call Ollama API."""
        try:
            response = httpx.post(
                f"{settings.OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": settings.OLLAMA_MODEL,
                    "prompt": f"{system_prompt}\n\n{user_prompt}",
                    "stream": False,
                    "options": {
                        "temperature": 0.3,
                        "top_p": 0.9,
                        "num_predict": 150,
                    }
                },
                timeout=90.0
            )
            response.raise_for_status()
            result = response.json()
            return result.get("response", "عذراً، لم أتمكن من توليد إجابة.").strip()
        except Exception as e:
            logger.error(f"Error calling Ollama API: {e}")
            return "عذراً، حدث خطأ في الاتصال بخادم الذكاء الاصطناعي. يرجى المحاولة لاحقاً."
    
    def query(self, question: str, conversation_history: Optional[List[Dict]] = None) -> Dict:
        """
        Complete RAG pipeline: retrieve relevant chunks and generate response.
        
        Args:
            question: User's question
            conversation_history: Optional conversation history
            
        Returns:
            Dictionary with response and metadata
        """
        # Step 1: Retrieve relevant chunks
        relevant_chunks = self.search_relevant_chunks(question)
        
        # Step 2: Generate response
        if not relevant_chunks:
            response = "عذراً، لم أجد معلومات ذات صلة في قاعدة المعرفة للإجابة على سؤالك."
        else:
            # Always use LLM for better quality responses (GPT-4o-mini is fast enough)
            # The fast path was causing issues with answer extraction
            response = self.generate_response(question, relevant_chunks, conversation_history)
        
        return {
            "response": response,
            "sources": [chunk["text"][:100] + "..." for chunk in relevant_chunks[:3]],  # Preview of sources
            "num_sources": len(relevant_chunks)
        }

