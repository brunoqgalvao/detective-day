#!/usr/bin/env bash
set -euo pipefail

# Simple one-command deploy using Docker Compose
# Usage:
#   scripts/deploy.sh                 # dev: exposes backend:3010 and postgres:5434
#   scripts/deploy.sh --prod          # prod: only exposes frontend:80
#   ANTHROPIC_API_KEY=... scripts/deploy.sh [--prod]

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd "$ROOT_DIR"

MODE="dev"
if [[ ${1:-} == "--prod" ]]; then
  MODE="prod"
fi

echo "==> Detective Day: Compose deploy (${MODE})"

# Ensure backend/.env exists (for non-secret defaults)
if [[ ! -f backend/.env ]]; then
  echo "backend/.env not found. Creating from example..."
  cp backend/.env.example backend/.env
  echo "Reminder: set ANTHROPIC_API_KEY in backend/.env or export it in your shell."
fi

# Prefer ANTHROPIC_API_KEY from env if set; otherwise rely on backend/.env via env_file
if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  export ANTHROPIC_API_KEY
fi

COMPOSE_FILES=(-f docker-compose.yml)
PROFILE_ARGS=()
if [[ "$MODE" == "prod" ]]; then
  COMPOSE_FILES+=(-f docker-compose.prod.yml)
else
  PROFILE_ARGS+=(--profile local-db)
fi

echo "Building images..."
docker compose "${COMPOSE_FILES[@]}" "${PROFILE_ARGS[@]}" build

echo "Starting stack..."
docker compose "${COMPOSE_FILES[@]}" "${PROFILE_ARGS[@]}" up -d

echo "✅ Deploy complete"
if [[ "$MODE" == "prod" ]]; then
  echo "- Frontend: http://<server-ip>"
  echo "- Health:   http://<server-ip>/api/health"
else
  echo "- Frontend: http://localhost"
  echo "- Backend:  http://localhost:3010"
  echo "- DB:       postgresql://detective_user:detective_pass_2024@localhost:5434/detective_day"
fi
