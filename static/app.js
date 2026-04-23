const socket = io();
const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const usernameInput = document.getElementById('username');
const contentInput = document.getElementById('content');

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderMessage(message) {
  const wrapper = document.createElement('div');
  wrapper.className = 'message';
  wrapper.innerHTML = `
    <div class="meta"><strong>${message.username}</strong> • ${formatTime(message.created_at)}</div>
    <div class="content">${message.content}</div>
  `;
  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function loadHistory() {
  const res = await fetch('/api/messages');
  const history = await res.json();
  history.forEach(renderMessage);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim() || 'Guest';
  const content = contentInput.value.trim();

  if (!content) return;

  socket.emit('send_message', { username, content });
  contentInput.value = '';
  contentInput.focus();
});

socket.on('new_message', (message) => {
  renderMessage(message);
});

socket.on('error_message', (payload) => {
  alert(payload.error || 'Unable to send message.');
});

loadHistory();
