# Graduation Project - RAG Chatbot Integration

A Vue.js frontend with a Python FastAPI backend implementing a RAG-based chatbot for answering questions about the الهيئة العامة لتنمية المشاريع الصغيرة والأصغر.

## Project Structure

```
Graduation-project/
├── chatbot-backend/     # Python FastAPI backend
├── src/                 # Vue.js frontend
├── package.json         # Frontend dependencies
└── README.md           # This file
```

## Quick Start

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.8+ (for backend)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### 1. Backend Setup

```bash
# Navigate to backend
cd chatbot-backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here

# Run the backend server
python -m app.main
```

Backend will run on `http://localhost:8001`

### 2. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to project root
cd ~/test/Graduation-project  # or your project path

# Install dependencies (first time only)
npm install

# Run development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:5173
- Click the chat widget icon to open the chatbot

## Development Workflow

### Running Both Servers

You need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd chatbot-backend
source venv/bin/activate
python -m app.main
```

**Terminal 2 - Frontend:**
```bash
cd ~/test/Graduation-project  # project root
npm run dev
```

### Testing

**Backend Tests:**
```bash
cd chatbot-backend
source venv/bin/activate
python test_chatbot.py
```

**Frontend:**
- Just open http://localhost:5173 and interact with the chat widget

## Configuration

### Backend Configuration

Edit `chatbot-backend/app/config.py` or set environment variables in `chatbot-backend/.env`:

- `OPENAI_API_KEY`: Required - Your OpenAI API key
- `PORT`: Backend port (default: 8001)
- `TOP_K_RESULTS`: Number of chunks to retrieve (default: 5)
- `USE_RERANKING`: Enable reranking (default: true)

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8001` by default. To change this, edit:
- `src/components/ChatWidget.vue` → `API_BASE_URL`

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in chatbot-backend/app/config.py or .env
PORT=8002
```

**OpenAI API errors:**
- Verify your API key in `.env`
- Check your OpenAI account has credits
- Ensure API key starts with `sk-`

**Vector database issues:**
```bash
# Delete and rebuild
rm -rf chatbot-backend/vector_db/
# Restart server (will rebuild automatically)
```

### Frontend Issues

**Port 5173 in use:**
```bash
# Vite will automatically use next available port
# Or specify: npm run dev -- --port 3000
```

**Can't connect to backend:**
- Ensure backend is running on port 8001
- Check CORS settings in `chatbot-backend/app/main.py`
- Verify `API_BASE_URL` in `ChatWidget.vue`

**npm install fails:**
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm install
```

## API Documentation

### Chat Endpoint

**POST** `/api/chat`

Request:
```json
{
  "message": "ماذا تفعل هذه الهيئة بالضبط؟"
}
```

Response:
```json
{
  "response": "الهيئة العامة لتنمية المشاريع الصغيرة والأصغر هي هيئة حكومية...",
  "sources": ["س: ما هي الهيئة...", ...],
  "num_sources": 5
}
```

### Health Check

**GET** `/health`

Returns server status and configuration.

## Technologies Used

### Frontend
- Vue 3
- Vite
- Tailwind CSS
- Vue Router

### Backend
- FastAPI
- OpenAI GPT-4o-mini
- ChromaDB (vector database)
- Sentence Transformers (embeddings)
- Cross-Encoder (reranking)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/your-feature`

## License

Part of the Graduation Project.
