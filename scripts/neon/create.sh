#!/usr/bin/env bash
set -euo pipefail

# Create a Neon project + database and print a ready-to-use DATABASE_URL.
# Requires: neon CLI (or neonctl) authenticated, and jq installed.
#
# Usage:
#   PROJECT_NAME=detective-day DB_NAME=detective_day REGION=aws-us-east-1 \
#   bash scripts/neon/create.sh

PROJECT_NAME=${PROJECT_NAME:-detective-day}
DB_NAME=${DB_NAME:-detective_day}
REGION=${REGION:-aws-us-east-1}
BRANCH_NAME=${BRANCH_NAME:-main}
OUTPUT_ENV=${OUTPUT_ENV:-}

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required. Please install jq (e.g., brew install jq)" >&2
  exit 1
fi

# Detect Neon CLI binary
NEON_BIN=""
if command -v neon >/dev/null 2>&1; then
  NEON_BIN="neon"
elif command -v neonctl >/dev/null 2>&1; then
  NEON_BIN="neonctl"
else
  echo "Error: neon CLI not found. Install and authenticate first." >&2
  exit 1
fi

echo "==> Using Neon CLI: $NEON_BIN"

create_project() {
  local out
  set +e
  out=$($NEON_BIN projects create --name "$PROJECT_NAME" --region "$REGION" -o json 2>/dev/null)
  status=$?
  set -e
  if [[ $status -ne 0 || -z "$out" ]]; then
    echo "Trying without -o json (older CLI)..."
    out=$($NEON_BIN projects create --name "$PROJECT_NAME" --region "$REGION" 2>/dev/null || true)
    # Try to fetch the project JSON by listing and matching by name
    local projects_json
    projects_json=$($NEON_BIN projects list -o json)
    echo "$projects_json" | jq -e --arg name "$PROJECT_NAME" '.projects[] | select(.name==$name)'
    echo "$projects_json"
  else
    echo "$out"
  fi
}

echo "==> Creating Neon project: $PROJECT_NAME in $REGION"
PROJECT_JSON=$(create_project)

# Extract project_id and default branch name/id if present
PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r '.. | .id? // empty' | head -n1)
if [[ -z "$PROJECT_ID" ]]; then
  # Fallback: list and match by name
  PROJECTS=$($NEON_BIN projects list -o json)
  PROJECT_ID=$(echo "$PROJECTS" | jq -r --arg name "$PROJECT_NAME" '.projects[] | select(.name==$name) | .id' | head -n1)
fi

if [[ -z "$PROJECT_ID" ]]; then
  echo "Error: could not determine project id for $PROJECT_NAME" >&2
  exit 1
fi

echo "Project ID: $PROJECT_ID"

# Ensure database exists on target branch (default main)
echo "==> Creating database $DB_NAME on branch $BRANCH_NAME"
set +e
$NEON_BIN databases create --project-id "$PROJECT_ID" --branch "$BRANCH_NAME" --name "$DB_NAME" >/dev/null 2>&1
set -e

# Obtain connection string
echo "==> Fetching connection string"
CONN_JSON=""
set +e
CONN_JSON=$($NEON_BIN connection-string --project-id "$PROJECT_ID" --branch "$BRANCH_NAME" --database "$DB_NAME" -o json 2>/dev/null)
if [[ -z "$CONN_JSON" ]]; then
  # Some CLIs use --format json
  CONN_JSON=$($NEON_BIN connection-string --project-id "$PROJECT_ID" --branch "$BRANCH_NAME" --database "$DB_NAME" --format json 2>/dev/null)
fi
set -e

DATABASE_URL=""
if [[ -n "$CONN_JSON" ]]; then
  DATABASE_URL=$(echo "$CONN_JSON" | jq -r '.. | .connection_string? // empty' | head -n1)
fi

if [[ -z "$DATABASE_URL" ]]; then
  echo "Could not automatically retrieve connection string." >&2
  echo "You can get it with:"
  echo "  $NEON_BIN connection-string --project-id $PROJECT_ID --branch $BRANCH_NAME --database $DB_NAME"
  exit 1
fi

echo "DATABASE_URL: $DATABASE_URL"
echo
if [[ -n "$OUTPUT_ENV" ]]; then
  echo "==> Writing env to $OUTPUT_ENV"
  {
    echo "DATABASE_URL='$DATABASE_URL'"
    echo "DATABASE_SSL=true"
  } > "$OUTPUT_ENV"
fi

echo "==> Applying schema to Neon using scripts/init-db.sh"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"
DATABASE_URL="$DATABASE_URL" bash "$ROOT_DIR/scripts/init-db.sh"

echo
echo "✅ Neon ready. Export these for deployment (or use $OUTPUT_ENV):"
echo "  export DATABASE_URL='$DATABASE_URL'"
echo "  export DATABASE_SSL=true"
