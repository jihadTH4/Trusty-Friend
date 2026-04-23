# Trusty-Friend

Trusty-Friend is a simple real-time chat web application built with **Flask**, **Socket.IO**, **HTML/CSS**, **Bootstrap**, and **SQLite**.

## Features

- Real-time messaging in a single shared room.
- Persistent chat history backed by SQLite.
- Clean glassmorphism-inspired UI.
- REST endpoint to fetch existing messages.

## Stack

- Backend: Flask + Flask-SocketIO + Flask-SQLAlchemy
- Frontend: HTML, CSS, Bootstrap 5, vanilla JavaScript
- Database: SQLite (`trusty_friend.db`)

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.
