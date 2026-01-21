#!/bin/bash
# Kill all chatbot processes - use this if ports are stuck

echo "Killing all chatbot processes..."
lsof -ti:8001 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:5174 | xargs kill -9 2>/dev/null
pkill -f "python -m app.main" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
sleep 2
echo "✅ All processes killed. Ports are now free."
