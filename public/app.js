const form = document.getElementById('note-form');
const input = document.getElementById('note-text');
const list = document.getElementById('notes');
const empty = document.getElementById('empty');
const error = document.getElementById('error');

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

function render(notes) {
  list.replaceChildren(...notes.map((note) => {
    const item = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = note.text;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete note: ${note.text}`);
    remove.addEventListener('click', () => run(() => request(`/api/notes/${note.id}`, { method: 'DELETE' })));
    item.append(text, remove);
    return item;
  }));
  empty.hidden = notes.length > 0;
}

async function run(action) {
  error.textContent = '';
  try {
    await action();
    render(await request('/api/notes'));
  } catch (err) {
    error.textContent = err.message;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  run(async () => {
    await request('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input.value }),
    });
    input.value = '';
  });
});

run(async () => {});
