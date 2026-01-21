# Setup Instructions for Developers

## Quick Start Guide

Follow these steps to get the chatbot running locally.

## Prerequisites

- **Node.js 18+** (for frontend)
- **Python 3.8+** (for backend)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Graduation-project
git checkout feature/chatbot-backend
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd chatbot-backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Edit .env file and add your OpenAI API key
# OPENAI_API_KEY=sk-your-actual-api-key-here
nano .env  # or use your preferred editor (vim, code, etc.)
```

### 3. Start Backend Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Run the server
python -m app.main
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8001
```

**Keep this terminal open!** The backend must stay running.

### 4. Frontend Setup (New Terminal)

Open a **new terminal window** (keep backend running):

```bash
# Navigate to project root
cd ~/path/to/Graduation-project  # or your project path

# Install Node.js dependencies (first time only)
npm install

# Start frontend development server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 5. Test the Application

1. Open your browser: http://localhost:5173
2. Look for the chat widget icon (usually bottom-right corner)
3. Click it to open the chatbot
4. Try asking: "ماذا تفعل هذه الهيئة بالضبط؟"

## Running Both Servers

You need **TWO terminal windows** running simultaneously:

**Terminal 1 - Backend:**
```bash
cd chatbot-backend
source venv/bin/activate
python -m app.main
```

**Terminal 2 - Frontend:**
```bash
cd ~/path/to/Graduation-project
npm run dev
```

## Verification

### Check Backend Health

```bash
curl http://localhost:8001/health
```

Should return:
```json
{"status":"ok","message":"Backend is healthy. OpenAI: configured"}
```

### Test Chat API

```bash
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "مرحبا"}'
```

### Test Frontend

- Open http://localhost:5173
- Click chat widget
- Send a message

## Common Issues

### Backend Issues

**"Module not found" errors:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**"Port 8001 already in use":**
```bash
# Option 1: Kill the process using port 8001
lsof -ti:8001 | xargs kill -9  # Linux/Mac
# Option 2: Change port in chatbot-backend/app/config.py
```

**"OpenAI API key error":**
- Check `.env` file exists in `chatbot-backend/`
- Verify API key starts with `sk-`
- Ensure you have credits in your OpenAI account

**Vector database issues:**
```bash
# Delete and rebuild
rm -rf chatbot-backend/vector_db/
# Restart server (will rebuild automatically)
```

### Frontend Issues

**"npm install" fails:**
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm install
```

**"Port 5173 in use":**
- Vite will automatically use next available port
- Or specify: `npm run dev -- --port 3000`

**"Can't connect to backend":**
- Ensure backend is running on port 8001
- Check browser console for CORS errors
- Verify `API_BASE_URL` in `src/components/ChatWidget.vue`

## Testing

### Run Backend Tests

```bash
cd chatbot-backend
source venv/bin/activate
python test_chatbot.py
```

This runs 31 test questions and generates a report.

### Manual Testing

1. Backend: Test API endpoints with `curl` or Postman
2. Frontend: Open browser and interact with chat widget
3. Integration: Test full flow from frontend to backend

## Configuration

### Backend Configuration

Edit `chatbot-backend/app/config.py` or `chatbot-backend/.env`:

```python
OPENAI_API_KEY=sk-your-key-here
PORT=8001
TOP_K_RESULTS=5
USE_RERANKING=true
```

### Frontend Configuration

Edit `src/components/ChatWidget.vue`:

```javascript
const API_BASE_URL = 'http://localhost:8001/api/chat'
```

## Project Structure

```
Graduation-project/
├── chatbot-backend/          # Python FastAPI backend
│   ├── app/                  # Application code
│   ├── data/                 # FAQ documents
│   ├── vector_db/            # ChromaDB storage (auto-created)
│   ├── .env                  # Your API keys (NOT in git)
│   ├── .env.example          # Template for .env
│   └── requirements.txt      # Python dependencies
├── src/                      # Vue.js frontend
│   └── components/
│       └── ChatWidget.vue    # Chat widget component
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
```

## Next Steps

1. ✅ Backend running on port 8001
2. ✅ Frontend running on port 5173
3. ✅ Test chat widget in browser
4. ✅ Verify API responses
5. 🚀 Start developing!

## Need Help?

- Check `chatbot-backend/README.md` for backend details
- Check main `README.md` for project overview
- Review test results in `chatbot-backend/test_results_*.json`

