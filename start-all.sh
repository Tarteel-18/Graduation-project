#!/bin/bash
# Start both servers - kills existing processes first

echo "🧹 Cleaning up existing processes..."
lsof -ti:8001 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
pkill -f "python -m app.main" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

echo "🚀 Starting backend..."
cd ~/test/Graduation-project/chatbot-backend
source venv/bin/activate
python -m app.main &
BACKEND_PID=$!
sleep 8

echo "🚀 Starting frontend..."
cd ~/test/Graduation-project
npm run dev &
FRONTEND_PID=$!
sleep 5

echo ""
echo "✅ Both servers should be running!"
echo "📋 Backend: http://localhost:8001"
echo "📋 Frontend: http://localhost:5173"
echo ""
echo "To stop: kill $BACKEND_PID $FRONTEND_PID"

