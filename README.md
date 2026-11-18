# emberpad

A tiny notes app built with Node.js and Express. It uses [coalburn](https://www.npmjs.com/package/coalburn) to restart the server and reload the browser while you work.

## Run it

Needs Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit any file and the server restarts and the page reloads by itself.

To run without coalburn:

```bash
npm start
```

## How coalburn is used

`npm run dev` runs `coalburn --port 3000 server.js`. coalburn serves the app on port 3000, gives the app a free port through `process.env.PORT`, and reloads open pages after each restart. That's why `server.js` reads its port like this:

```js
const PORT = process.env.PORT || 3000;
```

## API

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/api/notes` | | All notes |
| `POST` | `/api/notes` | `{ "text": "..." }` (1 to 500 characters) | The new note, `201` |
| `DELETE` | `/api/notes/:id` | | `204`, or `404` if the note doesn't exist |
| `GET` | `/health` | | `{ "ok": true }` |

Notes are kept in memory, so they're gone when the server restarts.

## Files

```
server.js          Express server and notes API
public/index.html  the page
public/style.css   styles, light and dark
public/app.js      loads, adds and deletes notes
```

## License

MIT
