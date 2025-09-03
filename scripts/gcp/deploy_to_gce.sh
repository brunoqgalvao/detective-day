#!/usr/bin/env bash
set -euo pipefail

# Deploy frontend+backend to a new/existing GCE VM, DB on Neon.
# Prereqs: gcloud CLI authenticated, project set; Docker will be installed on the VM.
#
# Usage example:
#   PROJECT=my-proj ZONE=us-central1-a VM_NAME=detective-day \
#   ANTHROPIC_API_KEY=sk-... DATABASE_URL='postgres://...' DATABASE_SSL=true \
#   bash scripts/gcp/deploy_to_gce.sh

PROJECT=${PROJECT:-}
ZONE=${ZONE:-us-central1-a}
VM_NAME=${VM_NAME:-detective-day}
MACHINE_TYPE=${MACHINE_TYPE:-e2-small}
DISK_SIZE=${DISK_SIZE:-20GB}
IMAGE_FAMILY=${IMAGE_FAMILY:-debian-12}
IMAGE_PROJECT=${IMAGE_PROJECT:-debian-cloud}

if [[ -z "$PROJECT" ]]; then
  echo "Error: PROJECT env var is required" >&2
  exit 1
fi

echo "==> Using project: $PROJECT"
gcloud config set project "$PROJECT" >/dev/null

echo "==> Creating VM (or ensuring it exists): $VM_NAME"
gcloud compute instances create "$VM_NAME" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --boot-disk-size="$DISK_SIZE" \
  --image-family="$IMAGE_FAMILY" \
  --image-project="$IMAGE_PROJECT" \
  --tags=http-server \
  --metadata=startup-script='#!/bin/bash
set -e
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker $SUDO_USER || true
fi
' \
  --quiet || true

echo "==> Opening firewall for HTTP (80)"
gcloud compute firewall-rules create allow-http-80 \
  --allow=tcp:80 --target-tags=http-server --quiet || true

echo "==> Fetching external IP"
EXTERNAL_IP=$(gcloud compute instances describe "$VM_NAME" --zone "$ZONE" --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
echo "VM IP: $EXTERNAL_IP"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "==> Copying project to VM"
gcloud compute scp --recurse --zone="$ZONE" \
  --quiet \
  "$ROOT_DIR" "${VM_NAME}:/opt/detective-day"

echo "==> Running deploy on VM"
GCLOUD_ENV_PREFIX=""
[[ -n "${ANTHROPIC_API_KEY:-}" ]] && GCLOUD_ENV_PREFIX+="ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY} "
[[ -n "${DATABASE_URL:-}" ]] && GCLOUD_ENV_PREFIX+="DATABASE_URL='${DATABASE_URL}' "
[[ -n "${DATABASE_SSL:-}" ]] && GCLOUD_ENV_PREFIX+="DATABASE_SSL=${DATABASE_SSL} "

gcloud compute ssh "$VM_NAME" --zone="$ZONE" --command "cd /opt/detective-day && $GCLOUD_ENV_PREFIX bash scripts/deploy-prod.sh"

echo "✅ Deployed. Visit: http://$EXTERNAL_IP/"

