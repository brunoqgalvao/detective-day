#!/bin/bash

# Detective Day GCP Deployment Script
# This script deploys the backend and frontend to Google Cloud Run

set -e

# Configuration
PROJECT_ID="arnaldo-381317"
REGION="us-central1"
REGISTRY_URL="us-central1-docker.pkg.dev/${PROJECT_ID}/detective-day"

# Database Configuration (Neon)
DATABASE_URL="postgresql://neondb_owner:npg_2CHlSV1dhRrv@ep-calm-moon-adphnz61.c-2.us-east-1.aws.neon.tech/detective_day?sslmode=require"

# You need to set this environment variable before running the script
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "❌ Error: ANTHROPIC_API_KEY environment variable not set"
    echo "Please set it with: export ANTHROPIC_API_KEY=your_key_here"
    exit 1
fi

echo "🚀 Starting deployment to Google Cloud Run..."
echo "Project: ${PROJECT_ID}"
echo "Region: ${REGION}"

# Build and push backend
echo "📦 Building and pushing backend Docker image..."
gcloud builds submit \
    --tag ${REGISTRY_URL}/backend:latest \
    --project ${PROJECT_ID} \
    backend/

# Deploy backend to Cloud Run
echo "☁️ Deploying backend to Cloud Run..."
BACKEND_URL=$(gcloud run deploy detective-day-backend \
    --image ${REGISTRY_URL}/backend:latest \
    --platform managed \
    --region ${REGION} \
    --project ${PROJECT_ID} \
    --allow-unauthenticated \
    --set-env-vars "DATABASE_URL=${DATABASE_URL}" \
    --set-env-vars "NODE_ENV=production" \
    --set-env-vars "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}" \
    --set-env-vars "ANTHROPIC_MODEL=claude-3-5-haiku-20241022" \
    --set-env-vars "FRONTEND_URL=https://detective-day-frontend-*.run.app" \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 1 \
    --max-instances 10 \
    --format="value(status.url)")

echo "✅ Backend deployed at: ${BACKEND_URL}"

# Build and push frontend with backend URL
echo "📦 Building and pushing frontend Docker image..."
# Note: Frontend nginx config has backend URL hardcoded for simplicity
gcloud builds submit \
    --tag ${REGISTRY_URL}/frontend:latest \
    --project ${PROJECT_ID} \
    frontend/

# Deploy frontend to Cloud Run
echo "☁️ Deploying frontend to Cloud Run..."
FRONTEND_URL=$(gcloud run deploy detective-day-frontend \
    --image ${REGISTRY_URL}/frontend:latest \
    --platform managed \
    --region ${REGION} \
    --project ${PROJECT_ID} \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --min-instances 1 \
    --max-instances 10 \
    --format="value(status.url)")

echo "✅ Frontend deployed at: ${FRONTEND_URL}"

# Update backend with correct frontend URL
echo "🔄 Updating backend with frontend URL..."
gcloud run services update detective-day-backend \
    --update-env-vars "FRONTEND_URL=${FRONTEND_URL}" \
    --region ${REGION} \
    --project ${PROJECT_ID}

echo "🎉 Deployment complete!"
echo ""
echo "📌 Access your application at:"
echo "   Frontend: ${FRONTEND_URL}"
echo "   Backend API: ${BACKEND_URL}"
echo ""
echo "📊 Neon Database:"
echo "   Project: detective-day (square-bread-87923714)"
echo "   Database: detective_day"
echo ""
echo "💡 To view logs:"
echo "   gcloud logging read \"resource.type=cloud_run_revision\" --project ${PROJECT_ID} --limit 50"