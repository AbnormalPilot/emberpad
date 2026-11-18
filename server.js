import express from 'express';

const app = express();
// coalburn passes a free port through PORT when it runs with --port
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
