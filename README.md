# Trusty-Friend

Trusty-Friend is a simple real-time chat web application built with **Flask**, **Socket.IO**, **HTML/CSS**, **Bootstrap**, and **SQLite**.

## Features

- Real-time messaging in a single shared room.
- Persistent chat history backed by SQLite.
- Clean glassmorphism-inspired UI.
- REST endpoint to fetch existing messages.
- GitHub Pages static demo via `docs/`.

## Stack

- Backend: Flask + Flask-SocketIO + Flask-SQLAlchemy
- Frontend: HTML, CSS, Bootstrap 5, vanilla JavaScript
- Database: SQLite (`trusty_friend.db`)

## Run locally (full app)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

## GitHub Pages hosting

This repository now includes a GitHub Pages deployment workflow and a static build under `docs/`.

### What gets deployed

- `docs/index.html`
- `docs/style.css`
- `docs/app.js`

### Important limitation

GitHub Pages cannot run Flask/Socket.IO or SQLite. The Pages version is **client-only** and stores messages in browser `localStorage`.

### Enable Pages in GitHub

1. Push this branch to GitHub.
2. In your repository settings, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Source: GitHub Actions**.
4. Push to `main` (or run the workflow manually from Actions).
5. After deployment completes, your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

If you want the real multi-user chat online, deploy `app.py` to a backend host (Render, Railway, Fly.io, etc.) and keep Pages only for a frontend demo.
