"""Embedding generation for Arabic and multilingual text."""
from sentence_transformers import SentenceTransformer
from typing import List
import logging

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generates embeddings for text using sentence-transformers."""
    
    def __init__(self, model_name: str = "paraphrase-multilingual-MiniLM-L12-v2", device: str = "cpu"):
        """
        Initialize the embedding generator.
        
        Args:
            model_name: Name of the sentence-transformers model
            device: Device to run on ('cpu' or 'cuda')
        """
        logger.info(f"Loading embedding model: {model_name} on {device}")
        self.model = SentenceTransformer(model_name, device=device)
        logger.info("Embedding model loaded successfully")
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding for a single text.
        
        Args:
            text: Input text to embed
            
        Returns:
            List of floats representing the embedding vector
        """
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    
    def generate_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts (more efficient).
        
        Args:
            texts: List of input texts
            
        Returns:
            List of embedding vectors
        """
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return embeddings.tolist()

