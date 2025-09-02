#!/bin/bash

echo "🕵️ Starting Detective Day (Simple - No Database)"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if API key is set
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ Backend .env file not found!${NC}"
    echo "Please copy backend/.env.example to backend/.env and add your Anthropic API key"
    exit 1
fi

if grep -q "your_anthropic_api_key_here" backend/.env; then
    echo -e "${YELLOW}⚠️  Warning: Anthropic API key not configured in backend/.env${NC}"
    echo "The game will not work without a valid API key!"
    echo ""
fi

# Start backend
echo -e "${GREEN}🚀 Starting backend server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${GREEN}🎮 Starting frontend...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Detective Day is running!${NC}"
echo ""
echo "🔗 Frontend: http://localhost:5435"
echo "🔗 Backend API: http://localhost:3010"
echo ""
echo -e "${YELLOW}Note: Running without database - logs will be in memory only${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle shutdown
trap "echo ''; echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Keep script running
wait