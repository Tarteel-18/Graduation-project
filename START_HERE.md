# How to Start the Application

## Quick Start Guide

Follow these steps to start both backend and frontend servers.

## Step 1: Start Backend Server

Open **Terminal 1** and run:

```bash
# Navigate to backend directory
cd ~/test/Graduation-project/chatbot-backend

# Activate virtual environment
source venv/bin/activate

# Start the server
python -m app.main
```

**Wait for this message:**
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8001
```

**Keep this terminal open!** The backend must stay running.

## Step 2: Start Frontend Server

Open **Terminal 2** (new terminal window) and run:

```bash
# Navigate to project root
cd ~/test/Graduation-project

# Start frontend development server
npm run dev
```

**Wait for this message:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

**Keep this terminal open too!**

## Step 3: Open in Browser

1. Open your web browser
2. Go to: **http://localhost:5173**
3. Look for the chat widget icon (usually bottom-right)
4. Click it to open the chatbot
5. Start chatting!

## Troubleshooting

### Port Already in Use

**If backend says "port 8001 already in use":**
```bash
# Kill the process using port 8001
lsof -ti:8001 | xargs kill -9

# Then restart backend
cd ~/test/Graduation-project/chatbot-backend
source venv/bin/activate
python -m app.main
```

**If frontend port 5173 is in use:**
- Vite will automatically use the next available port
- Check the terminal output for the new port number

### Backend Not Starting

**Check if virtual environment is activated:**
```bash
# You should see (venv) in your prompt
which python  # Should show: .../venv/bin/python
```

**If not activated:**
```bash
cd ~/test/Graduation-project/chatbot-backend
source venv/bin/activate
```

**Check if dependencies are installed:**
```bash
pip list | grep fastapi  # Should show fastapi
# If not, run: pip install -r requirements.txt
```

### Frontend Not Starting

**Check if node_modules exists:**
```bash
ls node_modules  # Should show many folders
# If not, run: npm install
```

**Check Node.js version:**
```bash
node --version  # Should be 18 or higher
```

## Verification

### Check Backend
```bash
curl http://localhost:8001/health
```
Should return: `{"status":"ok","message":"Backend is healthy. OpenAI: configured"}`

### Check Frontend
```bash
curl http://localhost:5173/
```
Should return HTML content.

### Test Chat API
```bash
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "مرحبا"}'
```

## Summary

**Two terminals needed:**
1. **Terminal 1**: Backend (`python -m app.main`)
2. **Terminal 2**: Frontend (`npm run dev`)

**Two URLs:**
- Backend: http://localhost:8001
- Frontend: http://localhost:5173 (open this in browser)

**Both must be running simultaneously!**

