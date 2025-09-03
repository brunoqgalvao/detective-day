# Local/Docker Deployment Guide

**Overview**
- Purpose: Local development and testing with Docker Compose
- Components: Frontend (Nginx), Backend (Node.js), Postgres database
- Use Case: Development, testing, or single-VM deployment

**For production deployment to Google Cloud Run, see [CLOUD-RUN-DEPLOY.md](./CLOUD-RUN-DEPLOY.md)**

**Prerequisites**
- Docker and Docker Compose installed on the target machine.
- Anthropic API key with access to your chosen Claude model.
- (For managed DB) Neon Postgres connection string.

**Quick Deploy (Local or VM)**
- Copy env: `cp backend/.env.example backend/.env` and set `ANTHROPIC_API_KEY`.
- Local with Dockerized DB: `bash scripts/deploy.sh` (starts `postgres` with profile `local-db`).
- Using Neon DB: export `DATABASE_URL` and `DATABASE_SSL=true`, then `bash scripts/deploy-prod.sh` (does not publish backend/DB ports).

**Services**
- frontend: Nginx serving Svelte build on port `80`.
- backend: Node/Express on `3010`, proxied via Nginx at `/api`.
- postgres: Postgres 16 with volume `detective_day_postgres_data` (only when profile `local-db` is active).

**Environment**
- `backend/.env` holds app settings. Compose passes `ANTHROPIC_API_KEY` (from env or file) and overrides `DATABASE_URL` to point at the `postgres` service.
- Frontend build uses `VITE_API_URL=/api` so the browser talks same‑origin and avoids CORS.

**Access**
- Frontend: `http://<server-ip>/`.
- Backend (direct): `http://<server-ip>:3010/` (optional for debugging).
- Health: `http://<server-ip>/api/health`.
- Postgres (local dev only): `postgresql://detective_user:detective_pass_2024@<server-ip>:5434/detective_day`.

**Remote Server Deployment (one VM)**
- SSH into the server and clone the repo, or `rsync` it up.
- Ensure Docker is installed (Ubuntu):
  - `curl -fsSL https://get.docker.com | sh`
  - `sudo usermod -aG docker $USER && newgrp docker`
- Set your key: `echo "ANTHROPIC_API_KEY=sk-..." >> backend/.env` (or export before running).
- Start:
  - Local DB: `docker compose --profile local-db up -d --build`
  - Neon DB: `export DATABASE_URL='postgres://...' DATABASE_SSL=true && bash scripts/deploy-prod.sh`

**Neon Postgres (managed)**
- Auto-provision via CLI: `PROJECT_NAME=detective-day DB_NAME=detective_day REGION=aws-us-east-1 bash scripts/neon/create.sh`
  - Outputs a `DATABASE_URL` and writes `backend/.env.neon` if `OUTPUT_ENV` is set.
  - Applies schema automatically using `scripts/init-db.sh`.
- Manual alternative: Create Neon project in console, copy connection string, then `DATABASE_URL='postgres://...' bash scripts/init-db.sh`.
- Use in Compose: export `DATABASE_URL` and `DATABASE_SSL=true` before running `deploy-prod.sh` or `deploy-remote.sh`.

**Google Cloud (GCE VM)**
- Create a small VM (e.g., e2-small), allow HTTP (port 80).
- SSH, install Docker (see above), then run `deploy-remote.sh` from your machine:
  - `HOST=<vm-ip> ANTHROPIC_API_KEY=sk-... DATABASE_URL='postgres://...' DATABASE_SSL=true bash scripts/deploy-remote.sh`
  - Visit `http://<vm-ip>/`.

**End-to-End (Neon + GCE)**
- Single command after setting required envs:
  - `PROJECT=<gcp-project> VM_NAME=detective-day ANTHROPIC_API_KEY=sk-... bash scripts/provision-and-deploy.sh`
  - Optional: `ZONE=us-central1-a`, `PROJECT_NAME`, `DB_NAME`, `REGION`.
  - Creates Neon DB, applies schema, then creates/uses a GCE VM and deploys.

**TLS (Optional)**
- Keep it simple at first (HTTP on port 80). For HTTPS later, place a reverse proxy (e.g., Caddy or Traefik) in front and route to `frontend:80`.

**Stop / Update**
- Stop: `docker compose down` (keeps DB volume).
- Update code and rebuild: `docker compose build && docker compose up -d`.

**Notes**
- Logs: `docker compose logs -f backend` (API), `docker compose logs -f postgres`.
- Health: `curl http://<server-ip>/api/../health` via proxy is available at `/api/health`.
