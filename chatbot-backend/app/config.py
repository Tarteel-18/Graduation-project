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
    OPENAI_MODEL: str = "gpt-4o-mini"  # GPT-4o-mini (fast, cheap, good quality)
    
    # Fallback to Ollama (optional)
    USE_OLLAMA_FALLBACK: bool = False
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "phi3:mini"
    
    # Embeddings settings
    EMBEDDING_MODEL: str = "paraphrase-multilingual-MiniLM-L12-v2"
    EMBEDDING_DEVICE: str = "cpu"  # Use CPU (no GPU required)
    
    # Reranking settings
    USE_RERANKING: bool = True  # Enable cross-encoder reranking
    RERANKER_MODEL: str = "cross-encoder/ms-marco-MiniLM-L-12-v2"  # Fast, multilingual reranker
    RERANK_TOP_K: int = 10  # Retrieve more candidates, then rerank (but preserve top 2 from embedding)
    
    # Vector Database settings
    VECTOR_DB_PATH: str = "./vector_db"
    VECTOR_DB_COLLECTION_NAME: str = "faq_documents"
    
    # RAG settings
    CHUNK_SIZE: int = 500  # Characters per chunk
    CHUNK_OVERLAP: int = 50  # Overlap between chunks
    TOP_K_RESULTS: int = 5  # Increased to 5 for better coverage and context
    
    # FAQ document path
    FAQ_DOCUMENT_PATH: Optional[str] = "./data/faq.txt"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

