import express from 'express';

const app = express();
// coalburn passes a free port through PORT when it runs with --port
const PORT = process.env.PORT || 3000;

app.use(express.json());

// shortcut: notes live in memory and vanish on restart; swap in a file or DB if they must persist
const notes = [];
let nextId = 1;

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!text) return res.status(400).json({ error: 'text is required' });
  if (text.length > 500) return res.status(400).json({ error: 'text must be 500 characters or fewer' });
  const note = { id: nextId++, text };
  notes.push(note);
  res.status(201).json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'note not found' });
  notes.splice(index, 1);
  res.status(204).end();
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
