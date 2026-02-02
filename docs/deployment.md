# Deployment

## Local

```bash
npm install
npm start
```

App runs at `http://localhost:3000` with static assets served from `/public`.

## Docker

```bash
docker build -t ganesha-site .
docker run -p 3000:3000 ganesha-site
```

## Fly.io/Render

1. Provision a new app.
2. Set the start command to `node server.js`.
3. Attach a persistent volume to `/workspace/ganesha/data` (or update `DB_PATH` in `server.js`).

