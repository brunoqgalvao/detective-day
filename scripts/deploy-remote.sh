#!/usr/bin/env bash
set -euo pipefail

# Push code to a remote VM and run docker compose
# Requirements on remote: docker + docker compose plugin, rsync, bash
#
# Usage:
#   HOST=your.server USER=ubuntu APP_DIR=/opt/detective-day \
#   ANTHROPIC_API_KEY=sk-... bash scripts/deploy-remote.sh

HOST=${HOST:-}
USER=${USER:-$LOGNAME}
APP_DIR=${APP_DIR:-/opt/detective-day}
USE_PROD=${USE_PROD:-1} # 1 uses docker-compose.prod.yml

if [[ -z "$HOST" ]]; then
  echo "Error: HOST is required (e.g., HOST=1.2.3.4)" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"

echo "==> Syncing project to $USER@$HOST:$APP_DIR"
ssh "$USER@$HOST" "mkdir -p '$APP_DIR'"

# Exclude heavy/unnecessary files
rsync -az --delete \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude 'old' \
  --exclude '.claude' \
  --exclude '.DS_Store' \
  "$ROOT_DIR/" "$USER@$HOST:$APP_DIR/"

echo "==> Ensuring backend/.env exists on remote"
ssh "$USER@$HOST" "cd '$APP_DIR' && [[ -f backend/.env ]] || cp backend/.env.example backend/.env"

REMOTE_ENV_PREFIX=""
if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "==> Injecting ANTHROPIC_API_KEY into remote environment for this deploy"
  REMOTE_ENV_PREFIX+="ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY "
fi
if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "==> Injecting DATABASE_URL into remote environment for this deploy"
  REMOTE_ENV_PREFIX+="DATABASE_URL='$DATABASE_URL' "
fi
if [[ -n "${DATABASE_SSL:-}" ]]; then
  echo "==> Injecting DATABASE_SSL into remote environment for this deploy"
  REMOTE_ENV_PREFIX+="DATABASE_SSL=$DATABASE_SSL "
fi

echo "==> Building and starting on remote"
if [[ "$USE_PROD" == "1" ]]; then
  ssh "$USER@$HOST" "cd '$APP_DIR' && $REMOTE_ENV_PREFIX docker compose -f docker-compose.yml -f docker-compose.prod.yml build && $REMOTE_ENV_PREFIX docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
else
  ssh "$USER@$HOST" "cd '$APP_DIR' && $REMOTE_ENV_PREFIX docker compose build && $REMOTE_ENV_PREFIX docker compose up -d"
fi

echo "✅ Remote deploy complete"
echo "- Visit: http://$HOST/"
