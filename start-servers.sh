#!/bin/bash

echo "🚀 Starting Detective Day Application"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start backend
echo -e "${YELLOW}Starting backend server on port 3010...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}Backend started with PID: $BACKEND_PID${NC}"
echo ""

# Wait a moment for backend to start
sleep 2

# Start frontend
echo -e "${YELLOW}Starting frontend server on port 5435...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started with PID: $FRONTEND_PID${NC}"
echo ""

echo "======================================"
echo -e "${GREEN}✅ Both servers are starting!${NC}"
echo ""
echo "Backend: http://localhost:3010"
echo "Frontend: http://localhost:5435"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait