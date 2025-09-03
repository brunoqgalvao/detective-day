# GitHub Actions Setup Guide

This guide will help you set up GitHub Actions for automatic deployment to Google Cloud Run.

## Prerequisites
- GitHub repository created ✅
- Google Cloud project with billing enabled ✅
- Neon database configured ✅

## Step 1: Create Google Cloud Service Account

Run these commands to create a service account for GitHub Actions:

```bash
# Set your project ID
export PROJECT_ID="arnaldo-381317"

# Create service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Deploy" \
  --project $PROJECT_ID

# Get the service account email
export SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/cloudbuild.builds.builder"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser"

# Create and download key
gcloud iam service-accounts keys create ~/github-actions-key.json \
  --iam-account=${SA_EMAIL}

# Display the key (you'll need to copy this)
cat ~/github-actions-key.json
```

## Step 2: Set GitHub Secrets

Go to your GitHub repository settings and add these secrets:

1. **Navigate to GitHub Secrets:**
   - Go to: https://github.com/brunoqgalvao/detective-day/settings/secrets/actions
   - Click "New repository secret"

2. **Add the following secrets:**

### GCP_SA_KEY (Required)
- Name: `GCP_SA_KEY`
- Value: Copy the entire contents of `~/github-actions-key.json`

### DATABASE_URL (Required)
- Name: `DATABASE_URL`
- Value: Your Neon database connection string
- Example: `postgresql://neondb_owner:npg_2CHlSV1dhRrv@ep-calm-moon-adphnz61.c-2.us-east-1.aws.neon.tech/detective_day?sslmode=require`

### ANTHROPIC_API_KEY (Required)
- Name: `ANTHROPIC_API_KEY`
- Value: Your Anthropic API key
- Example: `sk-ant-api03-...`

## Step 3: Update Workflow Configuration (if needed)

If your project uses different names or regions, update `.github/workflows/deploy.yml`:

```yaml
env:
  PROJECT_ID: your-project-id  # Change this
  REGION: us-central1          # Change if different
  BACKEND_SERVICE: detective-day-backend
  FRONTEND_SERVICE: detective-day-frontend
  REPOSITORY: detective-day
```

## Step 4: Test the Deployment

### Option 1: Push to main branch
```bash
git add .
git commit -m "Add GitHub Actions CI/CD"
git push origin main
```

### Option 2: Manual trigger
1. Go to: https://github.com/brunoqgalvao/detective-day/actions
2. Click on "Deploy to Google Cloud Run"
3. Click "Run workflow"
4. Select branch: main
5. Click "Run workflow"

## Step 5: Monitor the Deployment

1. **Check GitHub Actions:**
   - Go to: https://github.com/brunoqgalvao/detective-day/actions
   - Click on the running workflow to see logs

2. **Check Google Cloud Console:**
   - Cloud Run: https://console.cloud.google.com/run
   - Cloud Build: https://console.cloud.google.com/cloud-build/builds

## Troubleshooting

### Error: Permission Denied
If you get permission errors, ensure the service account has all required roles:
```bash
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com"
```

### Error: API not enabled
Enable any missing APIs:
```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com
```

### Error: Secret not found
Verify secrets are set in GitHub:
```bash
gh secret list
```

## Security Notes

1. **Never commit the service account key to Git!**
2. **Rotate service account keys regularly**
3. **Use least-privilege permissions**
4. **Consider using Workload Identity Federation for production**

## Clean Up Service Account Key

After setting up GitHub secrets, delete the local key file:
```bash
rm ~/github-actions-key.json
```

## Workflow Features

The GitHub Actions workflow will:
1. ✅ Trigger on every push to main
2. ✅ Build and push Docker images
3. ✅ Deploy backend with environment variables
4. ✅ Update nginx config with backend URL
5. ✅ Deploy frontend
6. ✅ Update backend CORS settings
7. ✅ Show deployment URLs in logs

## Manual Deployment

If you need to deploy manually without GitHub Actions:
```bash
export ANTHROPIC_API_KEY="your-key"
./scripts/deploy-gcp.sh all
```

## Next Steps

1. **Add tests** to `pr-check.yml` workflow
2. **Set up staging environment** with separate branch
3. **Add rollback capability** in case of failed deployments
4. **Configure alerts** for deployment failures
5. **Add deployment approvals** for production