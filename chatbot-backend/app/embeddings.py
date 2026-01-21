"""Embedding generation for Arabic and multilingual text."""
from typing import List, Optional
import logging
from openai import OpenAI

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generates embeddings using either cloud (OpenAI) or local (sentence-transformers) models."""
    
    def __init__(
        self,
        use_cloud: bool = True,
        openai_client: Optional[OpenAI] = None,
        openai_model: str = "text-embedding-3-small",
        model_name: str = "paraphrase-multilingual-MiniLM-L12-v2",
        device: str = "cpu"
    ):
        """
        Initialize the embedding generator.
        
        Args:
            use_cloud: If True, use OpenAI API. If False, use local sentence-transformers model
            openai_client: OpenAI client instance (required if use_cloud=True)
            openai_model: OpenAI embedding model name (only used if use_cloud=True)
            model_name: Local sentence-transformers model name (only used if use_cloud=False)
            device: Device to run local model on ('cpu' or 'cuda')
        """
        self.use_cloud = use_cloud
        self.openai_model = openai_model
        
        if use_cloud:
            if openai_client is None:
                raise ValueError("OpenAI client is required when using cloud embeddings")
            self.openai_client = openai_client
            logger.info(f"Using cloud embeddings: OpenAI {openai_model}")
        else:
            # Lazy import - only load sentence-transformers if using local models
            try:
                from sentence_transformers import SentenceTransformer
                logger.info(f"Loading local embedding model: {model_name} on {device}")
                self.model = SentenceTransformer(model_name, device=device)
                logger.info("Local embedding model loaded successfully")
            except ImportError:
                raise ImportError(
                    "sentence-transformers is required for local embeddings. "
                    "Install it with: pip install sentence-transformers"
                )
            self.openai_client = None
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding for a single text.
        
        Args:
            text: Input text to embed
            
        Returns:
            List of floats representing the embedding vector
        """
        if self.use_cloud:
            return self._generate_cloud_embedding(text)
        else:
            return self._generate_local_embedding(text)
    
    def generate_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts (more efficient).
        
        Args:
            texts: List of input texts
            
        Returns:
            List of embedding vectors
        """
        if self.use_cloud:
            return self._generate_cloud_embeddings_batch(texts)
        else:
            return self._generate_local_embeddings_batch(texts)
    
    def _generate_cloud_embedding(self, text: str) -> List[float]:
        """Generate embedding using OpenAI API."""
        try:
            response = self.openai_client.embeddings.create(
                model=self.openai_model,
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating cloud embedding: {e}")
            raise
    
    def _generate_cloud_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts using OpenAI API."""
        try:
            # OpenAI API supports batch processing efficiently
            response = self.openai_client.embeddings.create(
                model=self.openai_model,
                input=texts
            )
            # Sort by index to maintain order
            embeddings_dict = {item.index: item.embedding for item in response.data}
            return [embeddings_dict[i] for i in range(len(texts))]
        except Exception as e:
            logger.error(f"Error generating cloud embeddings batch: {e}")
            raise
    
    def _generate_local_embedding(self, text: str) -> List[float]:
        """Generate embedding using local sentence-transformers model."""
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    
    def _generate_local_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts using local model."""
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return embeddings.tolist()
    
    def get_embedding_dimension(self) -> int:
        """
        Get the dimension of embeddings produced by this generator.
        
        Returns:
            Dimension of embedding vectors
        """
        if self.use_cloud:
            # OpenAI embedding dimensions
            dimensions = {
                "text-embedding-3-small": 1536,
                "text-embedding-3-large": 3072,
                "text-embedding-ada-002": 1536
            }
            return dimensions.get(self.openai_model, 1536)
        else:
            return self.model.get_sentence_embedding_dimension()
