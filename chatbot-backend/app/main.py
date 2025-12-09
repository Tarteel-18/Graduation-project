"""FastAPI server for chatbot backend."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging
from pathlib import Path

from app.config import settings
from app.rag_pipeline import RAGPipeline
from app.document_processor import DocumentProcessor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Chatbot Backend API",
    description="RAG-based chatbot for الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG pipeline (lazy loading)
rag_pipeline: Optional[RAGPipeline] = None
document_processor = DocumentProcessor(
    chunk_size=settings.CHUNK_SIZE,
    chunk_overlap=settings.CHUNK_OVERLAP
)


# Request/Response models
class ChatRequest(BaseModel):
    """Chat request model."""
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat response model."""
    response: str
    sources: Optional[List[str]] = None
    num_sources: Optional[int] = None


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    message: str


def initialize_rag_pipeline():
    """Initialize RAG pipeline and load documents if needed."""
    global rag_pipeline
    
    if rag_pipeline is None:
        logger.info("Initializing RAG pipeline...")
        rag_pipeline = RAGPipeline()
        
        # Check if collection is empty and load documents if needed
        try:
            collection = rag_pipeline.collection
            count = collection.count()
            
            if count == 0 and settings.FAQ_DOCUMENT_PATH:
                faq_path = Path(settings.FAQ_DOCUMENT_PATH)
                if faq_path.exists():
                    logger.info(f"Loading FAQ document: {faq_path}")
                    text = document_processor.read_document(str(faq_path))
                    # Use FAQ-specific chunking (Q&A pairs)
                    chunks, metadatas = document_processor.chunk_faq_document(text)
                    rag_pipeline.add_documents(chunks, metadatas=metadatas)
                    logger.info(f"FAQ document loaded and indexed: {len(chunks)} Q&A pairs")
                else:
                    logger.warning(f"FAQ document not found: {faq_path}")
            else:
                logger.info(f"Vector DB already has {count} documents")
        except Exception as e:
            logger.error(f"Error initializing RAG pipeline: {e}")
            raise


@app.on_event("startup")
async def startup_event():
    """Initialize on startup."""
    logger.info("Starting up chatbot backend...")
    initialize_rag_pipeline()
    logger.info("Backend ready!")


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint."""
    return HealthResponse(
        status="ok",
        message="Chatbot Backend API is running"
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    try:
        # Check if RAG pipeline is initialized
        if rag_pipeline is None:
            return HealthResponse(
                status="initializing",
                message="RAG pipeline is initializing"
            )
        
        # Check OpenAI connection
        openai_status = "not configured"
        if settings.OPENAI_API_KEY:
            try:
                from openai import OpenAI
                client = OpenAI(api_key=settings.OPENAI_API_KEY)
                # Simple test - just check if client is initialized
                openai_status = "configured"
            except Exception as e:
                openai_status = f"error: {str(e)[:50]}"
        
        return HealthResponse(
            status="ok",
            message=f"Backend is healthy. OpenAI: {openai_status}"
        )
    except Exception as e:
        logger.error(f"Health check error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint - main RAG query endpoint.
    
    Args:
        request: Chat request with message
        
    Returns:
        Chat response with answer and sources
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        # Ensure RAG pipeline is initialized
        if rag_pipeline is None:
            initialize_rag_pipeline()
        
        # Process query through RAG pipeline
        result = rag_pipeline.query(request.message)
        
        return ChatResponse(
            response=result["response"],
            sources=result.get("sources", []),
            num_sources=result.get("num_sources", 0)
        )
        
    except Exception as e:
        logger.error(f"Error processing chat request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )


@app.post("/api/reload-documents")
async def reload_documents():
    """
    Reload documents from FAQ document path.
    Useful for updating the knowledge base.
    """
    global rag_pipeline
    
    try:
        if not settings.FAQ_DOCUMENT_PATH:
            raise HTTPException(
                status_code=400,
                detail="FAQ_DOCUMENT_PATH not configured"
            )
        
        faq_path = Path(settings.FAQ_DOCUMENT_PATH)
        if not faq_path.exists():
            raise HTTPException(
                status_code=404,
                detail=f"FAQ document not found: {faq_path}"
            )
        
        # Reinitialize pipeline
        initialize_rag_pipeline()
        
        # Clear existing collection
        rag_pipeline.collection.delete()
        
        # Create new collection
        from chromadb.config import Settings as ChromaSettings
        import chromadb
        rag_pipeline.collection = rag_pipeline.chroma_client.create_collection(
            name=settings.VECTOR_DB_COLLECTION_NAME,
            metadata={"description": "FAQ documents for RAG"}
        )
        
        # Load and index documents
        logger.info(f"Reloading documents from: {faq_path}")
        text = document_processor.read_document(str(faq_path))
        # Use FAQ-specific chunking (Q&A pairs)
        chunks, metadatas = document_processor.chunk_faq_document(text)
        rag_pipeline.add_documents(chunks, metadatas=metadatas)
        
        return {"status": "success", "message": f"Loaded {len(chunks)} chunks"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error reloading documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

