#!/usr/bin/env bash
set -euo pipefail

# One-command production deploy (no public DB/Backend ports)
# Usage: ANTHROPIC_API_KEY=... bash scripts/deploy-prod.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd "$ROOT_DIR"

echo "==> Detective Day: Production deploy"

if [[ ! -f backend/.env ]]; then
  echo "backend/.env not found. Creating from example..."
  cp backend/.env.example backend/.env
fi

[[ -n "${ANTHROPIC_API_KEY:-}" ]] && export ANTHROPIC_API_KEY
[[ -n "${DATABASE_URL:-}" ]] && export DATABASE_URL
[[ -n "${DATABASE_SSL:-}" ]] && export DATABASE_SSL

echo "Building images..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml build

echo "Starting stack (prod)..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "✅ Production deploy complete"
echo "- Frontend: http://localhost"
echo "- Backend direct port not exposed (use /api via frontend)"
echo "- DB port not exposed"
