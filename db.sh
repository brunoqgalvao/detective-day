#!/bin/bash

# Database management script for Detective Day

case "$1" in
  start)
    echo "🚀 Starting PostgreSQL database container..."
    docker-compose up -d postgres
    echo "✅ Database started on port 5433"
    echo "📊 Connection string: postgresql://detective_user:detective_pass_2024@localhost:5433/detective_day"
    ;;
  stop)
    echo "🛑 Stopping PostgreSQL database container..."
    docker-compose stop postgres
    echo "✅ Database stopped"
    ;;
  restart)
    echo "🔄 Restarting PostgreSQL database container..."
    docker-compose restart postgres
    echo "✅ Database restarted"
    ;;
  logs)
    echo "📋 Showing database logs..."
    docker-compose logs -f postgres
    ;;
  shell)
    echo "🖥️  Connecting to PostgreSQL shell..."
    docker-compose exec postgres psql -U detective_user -d detective_day
    ;;
  reset)
    echo "⚠️  This will delete all data. Are you sure? (y/N)"
    read -r response
    if [[ "$response" == "y" ]]; then
      echo "🗑️  Resetting database..."
      docker-compose down -v
      docker-compose up -d postgres
      echo "✅ Database reset complete"
    else
      echo "❌ Reset cancelled"
    fi
    ;;
  status)
    echo "📊 Database status:"
    docker-compose ps postgres
    ;;
  *)
    echo "Usage: ./db.sh {start|stop|restart|logs|shell|reset|status}"
    echo ""
    echo "Commands:"
    echo "  start   - Start the PostgreSQL container"
    echo "  stop    - Stop the PostgreSQL container"
    echo "  restart - Restart the PostgreSQL container"
    echo "  logs    - Show database logs"
    echo "  shell   - Connect to PostgreSQL shell"
    echo "  reset   - Reset database (deletes all data)"
    echo "  status  - Show database status"
    exit 1
    ;;
esac