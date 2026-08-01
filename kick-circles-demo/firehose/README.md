# Firehose — The Pit

Teammate live-chat experiment: Kick chat as rising/merging bubbles + hype meter.

Lives under `kick-circles-demo/firehose/` (not wired into Circles Overworld yet).

## Static preview (demo mode)

From the demo folder:

```bash
cd kick-circles-demo
python3 -m http.server 8080
# → http://localhost:8080/firehose/public/
```

Without the Worker proxy, Join falls back to simulated chat.

## Live Kick chat (Worker)

Needs Cloudflare Wrangler for `/api/chatroom` + `/api/live` (CORS proxy):

```bash
cd kick-circles-demo/firehose
npx wrangler dev
```

Then open the URL Wrangler prints (usually `http://localhost:8787`).
