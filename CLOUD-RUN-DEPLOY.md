# Cloud Run Deployment Guide

Complete guide for deploying a full-stack application (Frontend + Backend + Neon DB) to Google Cloud Run.

## Architecture Overview

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Browser   │────▶│ Frontend (Nginx)│────▶│   Backend    │
│             │     │   Cloud Run     │     │  Cloud Run   │
└─────────────┘     └─────────────────┘     └──────────────┘
                            │                        │
                            │                        ▼
                            │                 ┌──────────────┐
                            └────────────────▶│   Neon DB    │
                         Static Assets        │  PostgreSQL  │
                                              └──────────────┘
```

## Prerequisites

1. **Install Required Tools:**
   ```bash
   # Google Cloud CLI
   curl https://sdk.cloud.google.com | bash
   
   # Neon CLI
   npm install -g neonctl
   
   # Authenticate
   gcloud auth login
   neon auth
   ```

2. **Required Accounts:**
   - Google Cloud account with billing enabled
   - Neon account (free tier works)
   - Anthropic API key (for AI features)

## Part 1: Initial Setup (First Deployment)

### Step 1: Database Setup (Neon)

```bash
# 1. Create Neon project
neon projects create --name detective-day --region-id aws-us-east-1

# Save the project ID from output (e.g., square-bread-87923714)
export NEON_PROJECT_ID="your-project-id"

# 2. Create database
neon databases create --project-id $NEON_PROJECT_ID --name detective_day

# 3. Get connection string
neon connection-string --project-id $NEON_PROJECT_ID --database-name detective_day

# Save this connection string!
export DATABASE_URL="postgresql://user:pass@host.neon.tech/detective_day?sslmode=require"

# 4. Initialize schema (if you have schema.sql)
psql "$DATABASE_URL" -f backend/src/db/schema.sql
```

### Step 2: Google Cloud Setup

```bash
# 1. Set up project (use existing or create new)
gcloud projects list
gcloud config set project YOUR-PROJECT-ID

# 2. Enable required APIs
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com

# 3. Create Artifact Registry repository
gcloud artifacts repositories create detective-day \
  --repository-format=docker \
  --location=us-central1 \
  --description="Detective Day Docker images"

# 4. Configure Docker auth
gcloud auth configure-docker us-central1-docker.pkg.dev
```

### Step 3: Prepare Docker Configurations

**Backend Dockerfile (`backend/Dockerfile`):**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# Copy static files (case data, etc.)
COPY --from=build /app/src/cases ./dist/cases
EXPOSE 3010
CMD ["node", "dist/app.js"]
```

**Frontend Dockerfile (`frontend/Dockerfile`):**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:alpine AS runner
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Important: Frontend Nginx Config (`frontend/nginx/default.conf`):**
```nginx
server {
    listen 8080;  # Cloud Run expects 8080
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # This will be updated with actual backend URL
    location /api/ {
        proxy_pass https://BACKEND-URL-HERE/api/;
        proxy_http_version 1.1;
        proxy_set_header Host BACKEND-HOST-HERE;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_connect_timeout 60s;
        proxy_read_timeout 600s;
    }
}
```

### Step 4: Deploy Backend

```bash
# Set environment variables
export PROJECT_ID="your-gcp-project"
export REGION="us-central1"
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# 1. Build and push backend image
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/$PROJECT_ID/detective-day/backend:latest \
  backend/

# 2. Deploy backend to Cloud Run
gcloud run deploy detective-day-backend \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/detective-day/backend:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=$DATABASE_URL" \
  --set-env-vars "NODE_ENV=production" \
  --set-env-vars "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" \
  --set-env-vars "ANTHROPIC_MODEL=claude-3-5-haiku-20241022" \
  --set-env-vars "FRONTEND_URL=*" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10

# 3. Get backend URL
BACKEND_URL=$(gcloud run services describe detective-day-backend \
  --region $REGION --format="value(status.url)")
echo "Backend deployed at: $BACKEND_URL"
```

### Step 5: Deploy Frontend

```bash
# 1. Update nginx config with backend URL
# Edit frontend/nginx/default.conf and replace:
# - BACKEND-URL-HERE with your backend URL (e.g., detective-day-backend-421768392012.us-central1.run.app)
# - BACKEND-HOST-HERE with the backend hostname

# 2. Build and push frontend
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/$PROJECT_ID/detective-day/frontend:latest \
  frontend/

# 3. Deploy frontend to Cloud Run
gcloud run deploy detective-day-frontend \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/detective-day/frontend:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10

# 4. Get frontend URL
FRONTEND_URL=$(gcloud run services describe detective-day-frontend \
  --region $REGION --format="value(status.url)")
echo "Frontend deployed at: $FRONTEND_URL"

# 5. Update backend CORS settings
gcloud run services update detective-day-backend \
  --update-env-vars "FRONTEND_URL=$FRONTEND_URL" \
  --region $REGION
```

## Part 2: Redeployment (Updates)

### Quick Redeploy Script

Create `scripts/deploy-gcp.sh`:

```bash
#!/bin/bash
set -e

# Configuration
PROJECT_ID="your-project-id"  # UPDATE THIS
REGION="us-central1"
REGISTRY_URL="us-central1-docker.pkg.dev/${PROJECT_ID}/detective-day"

# Database (Neon)
DATABASE_URL="postgresql://user:pass@host.neon.tech/detective_day?sslmode=require"  # UPDATE THIS

# Check for API key
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "Error: ANTHROPIC_API_KEY not set"
    echo "Usage: ANTHROPIC_API_KEY=sk-ant-... ./scripts/deploy-gcp.sh"
    exit 1
fi

echo "🚀 Deploying to Google Cloud Run..."

# Deploy what?
DEPLOY_TARGET="${1:-all}"

if [ "$DEPLOY_TARGET" = "backend" ] || [ "$DEPLOY_TARGET" = "all" ]; then
    echo "📦 Building backend..."
    gcloud builds submit \
        --tag ${REGISTRY_URL}/backend:latest \
        --project ${PROJECT_ID} \
        backend/
    
    echo "☁️ Deploying backend..."
    gcloud run deploy detective-day-backend \
        --image ${REGISTRY_URL}/backend:latest \
        --region ${REGION} \
        --project ${PROJECT_ID} \
        --update-env-vars "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}"
    
    echo "✅ Backend deployed"
fi

if [ "$DEPLOY_TARGET" = "frontend" ] || [ "$DEPLOY_TARGET" = "all" ]; then
    echo "📦 Building frontend..."
    gcloud builds submit \
        --tag ${REGISTRY_URL}/frontend:latest \
        --project ${PROJECT_ID} \
        frontend/
    
    echo "☁️ Deploying frontend..."
    gcloud run deploy detective-day-frontend \
        --image ${REGISTRY_URL}/frontend:latest \
        --region ${REGION} \
        --project ${PROJECT_ID}
    
    echo "✅ Frontend deployed"
fi

# Show URLs
echo ""
echo "🎉 Deployment complete!"
echo "Frontend: $(gcloud run services describe detective-day-frontend --region ${REGION} --format='value(status.url)')"
echo "Backend:  $(gcloud run services describe detective-day-backend --region ${REGION} --format='value(status.url)')"
```

### Common Redeployment Commands

```bash
# Deploy everything
ANTHROPIC_API_KEY=sk-ant-... ./scripts/deploy-gcp.sh all

# Deploy only backend
./scripts/deploy-gcp.sh backend

# Deploy only frontend
./scripts/deploy-gcp.sh frontend

# Update environment variables
gcloud run services update detective-day-backend \
  --update-env-vars "KEY=value" \
  --region us-central1

# View logs
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=detective-day-backend" \
  --limit 50 --format "value(textPayload)"

# Stream logs in real-time
gcloud alpha run services logs tail detective-day-backend --region us-central1
```

## Troubleshooting Guide

### Issue 1: Port Configuration
**Problem:** Container fails to start with "PORT=8080" error
**Solution:** 
- Frontend: Nginx must listen on 8080 (not 80)
- Backend: Use `process.env.PORT || 3010` in your app

### Issue 2: API Requests Not Working
**Problem:** Frontend can't reach backend API
**Solution:**
1. Check nginx proxy configuration has correct backend URL
2. Verify backend is running: `curl https://backend-url/api/health`
3. Check CORS settings on backend

### Issue 3: Database Connection Fails
**Problem:** Backend can't connect to Neon
**Solution:**
1. Verify connection string includes `?sslmode=require`
2. Check database exists: `neon databases list --project-id PROJECT_ID`
3. Ensure tables are created (run schema.sql)

### Issue 4: Missing Static Files
**Problem:** Backend can't find JSON/static files
**Solution:**
- Add COPY command in Dockerfile: `COPY --from=build /app/src/cases ./dist/cases`

### Issue 5: Build Fails
**Problem:** Cloud Build fails
**Solution:**
1. Check build logs: `gcloud builds list --limit 5`
2. Verify Dockerfile syntax
3. Ensure all files are not in .gcloudignore

## Cost Optimization

1. **Development Environment:**
   ```bash
   # Set minimum instances to 0
   gcloud run services update detective-day-backend \
     --min-instances 0 --region us-central1
   ```

2. **Production Environment:**
   - Keep min-instances=1 for better response times
   - Set appropriate max-instances based on load

3. **Database:**
   - Neon free tier: 3GB storage, 1 compute hour/month
   - Perfect for development and small projects

4. **Monitoring Costs:**
   ```bash
   # Check Cloud Run metrics
   gcloud monitoring metrics list --filter="metric.type:run.googleapis.com"
   ```

## Security Best Practices

1. **Secrets Management:**
   ```bash
   # Use Secret Manager for production
   echo -n "your-api-key" | gcloud secrets create anthropic-api-key --data-file=-
   
   # Grant access to Cloud Run
   gcloud secrets add-iam-policy-binding anthropic-api-key \
     --member=serviceAccount:PROJECT-NUMBER-compute@developer.gserviceaccount.com \
     --role=roles/secretmanager.secretAccessor
   ```

2. **Restrict Access:**
   ```bash
   # Remove public access if not needed
   gcloud run services remove-iam-policy-binding detective-day-backend \
     --member="allUsers" \
     --role="roles/run.invoker"
   ```

3. **Use VPC Connector for database** (production)

## Monitoring & Maintenance

```bash
# View service details
gcloud run services describe detective-day-backend --region us-central1

# Check recent revisions
gcloud run revisions list --service detective-day-backend --region us-central1

# Rollback to previous revision
gcloud run services update-traffic detective-day-backend \
  --to-revisions=REVISION-NAME=100 --region us-central1

# Clean up old images
gcloud artifacts docker images list \
  us-central1-docker.pkg.dev/PROJECT/detective-day \
  --include-tags --limit=10

# Delete old images
gcloud artifacts docker images delete \
  us-central1-docker.pkg.dev/PROJECT/detective-day/IMAGE@sha256:HASH
```

## Quick Reference

| Task | Command |
|------|---------|
| Deploy backend | `gcloud run deploy detective-day-backend --image IMAGE_URL` |
| Deploy frontend | `gcloud run deploy detective-day-frontend --image IMAGE_URL` |
| View logs | `gcloud logging read "resource.labels.service_name=SERVICE"` |
| Update env vars | `gcloud run services update SERVICE --update-env-vars KEY=value` |
| Get service URL | `gcloud run services describe SERVICE --format='value(status.url)'` |
| List services | `gcloud run services list --region us-central1` |
| Delete service | `gcloud run services delete SERVICE --region us-central1` |

## Next Steps

1. **Custom Domain:**
   ```bash
   gcloud run domain-mappings create --service detective-day-frontend \
     --domain your-domain.com --region us-central1
   ```

2. **CI/CD Pipeline:** Set up Cloud Build triggers with GitHub

3. **Monitoring:** Configure Cloud Monitoring alerts

4. **Backup Strategy:** Set up automated Neon backups

5. **Load Testing:** Use Cloud Run load testing tools