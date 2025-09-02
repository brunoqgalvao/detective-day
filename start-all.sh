#!/bin/bash

echo "🕵️ Starting Detective Day - Full Stack"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

# Check if API key is configured
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

# Start PostgreSQL database
echo -e "${BLUE}🐘 Starting PostgreSQL database...${NC}"
docker-compose up -d postgres

# Wait for database to be ready
echo -e "${BLUE}⏳ Waiting for database to be ready...${NC}"
for i in {1..30}; do
    if docker-compose exec -T postgres pg_isready -U detective_user -d detective_day > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Database is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Database failed to start${NC}"
        exit 1
    fi
    sleep 1
done

# Start backend
echo -e "${BLUE}🚀 Starting backend server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}🎮 Starting frontend...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Detective Day is running!${NC}"
echo ""
echo "📊 PostgreSQL Database: localhost:5434"
echo "🔗 Frontend: http://localhost:5435"
echo "🔗 Backend API: http://localhost:3010"
echo ""
echo -e "${YELLOW}Database Management:${NC}"
echo "  ./db.sh shell  - Connect to PostgreSQL"
echo "  ./db.sh logs   - View database logs"
echo "  ./db.sh status - Check database status"
echo ""
echo "Press Ctrl+C to stop all services"

# Handle shutdown
trap "echo ''; echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; docker-compose stop postgres; exit" INT

# Keep script running
wait