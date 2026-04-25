# Deploy Backend + DB on Render

## 1) Push project to GitHub

From project root:

```bash
git init
git add .
git commit -m "Prepare Render blueprint deployment"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## 2) Create services in one shot (Blueprint)

1. Open Render dashboard.
2. Choose **New +** -> **Blueprint**.
3. Connect your GitHub repo.
4. Render will detect `render.yaml` and create:
   - `indraprastha-backend` (Node web service)
   - `indraprastha-db` (PostgreSQL database)

## 3) Set required env vars in Render

In `indraprastha-backend` service, set these:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `CORS_ORIGINS` (e.g. Flutter web origin)
- `GDRIVE_CLIENT_EMAIL`
- `GDRIVE_PRIVATE_KEY`
- `GDRIVE_FOLDER_ID`

`DATABASE_URL` and DB host/user/pass are auto-wired from blueprint.

## 4) First boot behavior

- On startup, backend runs schema initializer automatically.
- Tables + seed rows are created (`courses`, `batches`, admin user, etc.).
- Health endpoint: `/health`

## 5) Flutter app base URL

After deploy, update Flutter API base URL to:

`https://<your-render-backend>.onrender.com/api`
