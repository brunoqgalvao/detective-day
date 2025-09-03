#!/usr/bin/env bash
set -euo pipefail

# Orchestrate: create Neon project+DB, apply schema, then deploy app to GCE VM.
# Requires: neon CLI (auth), gcloud CLI (auth), jq, Docker on the VM.
#
# Usage example:
#   PROJECT=my-proj ZONE=us-central1-a VM_NAME=detective-day \
#   PROJECT_NAME=detective-day DB_NAME=detective_day REGION=aws-us-east-1 \
#   ANTHROPIC_API_KEY=sk-... bash scripts/provision-and-deploy.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"

TMP_ENV="$ROOT_DIR/backend/.env.neon"
rm -f "$TMP_ENV"

echo "==> Step 1: Provision Neon (project + database)"
OUTPUT_ENV="$TMP_ENV" bash "$ROOT_DIR/scripts/neon/create.sh"

if [[ ! -f "$TMP_ENV" ]]; then
  echo "Error: Neon provisioning didn't produce $TMP_ENV" >&2
  exit 1
fi

source "$TMP_ENV"
export DATABASE_URL DATABASE_SSL

echo "==> Step 2: Deploy to GCE (frontend+backend only)"
if [[ -z "${PROJECT:-}" || -z "${VM_NAME:-}" ]]; then
  echo "Hint: set PROJECT=<gcp-project> VM_NAME=<vm-name> [ZONE=...] before running this script." >&2
fi

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "Warning: ANTHROPIC_API_KEY is not set; backend will fail to call LLM API." >&2
fi

PROJECT=${PROJECT:-}
ZONE=${ZONE:-us-central1-a}
VM_NAME=${VM_NAME:-detective-day}

PROJECT="$PROJECT" ZONE="$ZONE" VM_NAME="$VM_NAME" \
  ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-}" \
  DATABASE_URL="$DATABASE_URL" DATABASE_SSL="$DATABASE_SSL" \
  bash "$ROOT_DIR/scripts/gcp/deploy_to_gce.sh"

echo "✅ All done. App should be reachable on the VM's IP."

