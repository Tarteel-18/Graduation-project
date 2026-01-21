# Chatbot Backend - RAG-based FAQ Assistant

A FastAPI-based backend for a RAG (Retrieval Augmented Generation) chatbot that answers questions about the الهيئة العامة لتنمية المشاريع الصغيرة والأصغر (General Authority for Small and Micro Enterprise Development).

## Features

- **RAG Pipeline**: Uses semantic search with embeddings + LLM for accurate answers
- **Vector Database**: ChromaDB for efficient document retrieval
- **Cross-Encoder Reranking**: Improves relevance for semantically similar questions
- **OpenAI Integration**: Uses GPT-4o-mini for fast, accurate responses
- **Arabic Support**: Optimized for Arabic FAQ documents
- **Fast Response Times**: ~1.5s average response time

## Prerequisites

- Python 3.8+
- pip
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup

1. **Navigate to the backend directory:**
   ```bash
   cd chatbot-backend
   ```

2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   nano .env  # or use your preferred editor
   ```

5. **Initialize the vector database:**
   ```bash
   python -m app.main --init-db
   ```
   Or the database will be initialized automatically on first run.

## Running the Server

```bash
# Activate virtual environment (if not already active)
source venv/bin/activate

# Run the server
python -m app.main
```

The server will start on `http://localhost:8001` by default.

### API Endpoints

- **Health Check**: `GET http://localhost:8001/health`
- **Chat**: `POST http://localhost:8001/api/chat`
  ```json
  {
    "message": "ماذا تفعل هذه الهيئة بالضبط؟"
  }
  ```

## Project Structure

```
chatbot-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── rag_pipeline.py      # RAG pipeline with reranking
│   ├── embeddings.py         # Embedding generation
│   └── document_processor.py # Document chunking
├── data/
│   └── faq.txt              # FAQ document
├── vector_db/               # ChromaDB storage (auto-created)
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Configuration

Edit `app/config.py` or set environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: Model to use (default: `gpt-4o-mini`)
- `TOP_K_RESULTS`: Number of chunks to retrieve (default: 5)
- `USE_RERANKING`: Enable cross-encoder reranking (default: true)
- `RERANK_TOP_K`: Number of candidates for reranking (default: 10)

## Testing

Run the comprehensive test suite:

```bash
python test_chatbot.py
```

This will test 31 questions and generate a detailed report.

## Troubleshooting

### Server won't start
- Check that port 8001 is not in use
- Verify your OpenAI API key is set correctly
- Check Python version: `python --version` (should be 3.8+)

### "Module not found" errors
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Vector database issues
- Delete `vector_db/` folder and restart (will rebuild automatically)
- Check that `data/faq.txt` exists

## License

Part of the Graduation Project repository.
