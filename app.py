from datetime import datetime

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SECRET_KEY"] = "trusty-friend-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///trusty_friend.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
socketio = SocketIO(app)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


@app.route("/")
def index():
    return render_template("index.html", app_name="Trusty-Friend")


@app.route("/api/messages", methods=["GET"])
def get_messages():
    messages = Message.query.order_by(Message.created_at.asc()).all()
    return jsonify(
        [
            {
                "id": m.id,
                "username": m.username,
                "content": m.content,
                "created_at": m.created_at.isoformat(),
            }
            for m in messages
        ]
    )


@socketio.on("send_message")
def handle_send_message(data):
    username = (data.get("username") or "Guest").strip()[:40]
    content = (data.get("content") or "").strip()[:500]

    if not content:
        emit("error_message", {"error": "Message cannot be empty."})
        return

    message = Message(username=username or "Guest", content=content)
    db.session.add(message)
    db.session.commit()

    emit(
        "new_message",
        {
            "id": message.id,
            "username": message.username,
            "content": message.content,
            "created_at": message.created_at.isoformat(),
        },
        broadcast=True,
    )


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True)
