#!/usr/bin/env bash
set -euo pipefail

# Initialize a managed Postgres instance with our schema using psql in a container.
# Usage:
#   DATABASE_URL='postgres://user:pass@host:5432/db' bash scripts/init-db.sh

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Error: DATABASE_URL env var is required" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"

echo "==> Applying schema to: $DATABASE_URL"
docker run --rm -i \
  -e DATABASE_URL="$DATABASE_URL" \
  -v "$ROOT_DIR/backend/src/db/schema.sql":/schema.sql \
  postgres:16-alpine \
  sh -c 'psql "$DATABASE_URL" -f /schema.sql'

echo "✅ Schema applied"

