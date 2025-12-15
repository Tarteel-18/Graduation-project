"""Configuration settings for the chatbot backend."""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings."""
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8001  # Changed from 8000 to avoid conflicts
    DEBUG: bool = False
    
    # CORS settings
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative frontend port
        "http://127.0.0.1:5173",
    ]
    
    # LLM settings (OpenAI)
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o"  # GPT-4o (better quality, excellent Arabic support)
    
    # Fallback to Ollama (optional)
    USE_OLLAMA_FALLBACK: bool = False
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "phi3:mini"
    
    # Embeddings settings
    # Use cloud embeddings (OpenAI API) - recommended for beginners, no model downloads needed
    USE_CLOUD_EMBEDDINGS: bool = True  # Set to False to use local models
    EMBEDDING_MODEL: str = "aubmindlab/bert-base-arabertv2"  # Only used if USE_CLOUD_EMBEDDINGS=False
    EMBEDDING_DEVICE: str = "cpu"  # Only used if USE_CLOUD_EMBEDDINGS=False
    
    # Cloud embedding settings (OpenAI)
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"  # Options: text-embedding-3-small, text-embedding-3-large, text-embedding-ada-002
    
    # Reranking settings (optional - disabled by default for simplest setup)
    USE_RERANKING: bool = False  # Enable cross-encoder reranking (requires sentence-transformers)
    RERANKER_MODEL: str = "cross-encoder/ms-marco-MiniLM-L-12-v2"  # Only used if USE_RERANKING=True
    RERANK_TOP_K: int = 10  # Retrieve more candidates, then rerank (but preserve top 2 from embedding)
    
    # Vector Database settings
    VECTOR_DB_PATH: str = "./vector_db"
    VECTOR_DB_COLLECTION_NAME: str = "faq_documents"
    
    # RAG settings
    CHUNK_SIZE: int = 500  # Characters per chunk
    CHUNK_OVERLAP: int = 50  # Overlap between chunks
    TOP_K_RESULTS: int = 8  # Increased to 8 for better coverage (handles typos/synonyms better)
    RETRIEVE_K: int = 15  # Retrieve more candidates initially, then filter to top_k
    
    # FAQ document path
    FAQ_DOCUMENT_PATH: Optional[str] = "./data/faq.txt"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

