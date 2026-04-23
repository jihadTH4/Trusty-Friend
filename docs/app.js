const STORAGE_KEY = 'trusty-friend-pages-messages';

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

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function loadHistory() {
  const history = loadMessages();
  history.forEach(renderMessage);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim() || 'Guest';
  const content = contentInput.value.trim();
  if (!content) return;

  const message = {
    id: crypto.randomUUID(),
    username,
    content,
    created_at: new Date().toISOString(),
  };

  const history = loadMessages();
  history.push(message);
  saveMessages(history.slice(-200));

  renderMessage(message);
  contentInput.value = '';
  contentInput.focus();
});

loadHistory();
