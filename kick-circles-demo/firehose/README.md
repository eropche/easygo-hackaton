# Firehose — The Pit + live client

Teammate Kick-chat experiment, compartmentalised under `kick-circles-demo/firehose/`.

| Piece | Role |
|---|---|
| `live-client.js` | Shared Kick→Pusher client (no DOM). Used by Overworld Top 5 + The Pit |
| `public/` | Standalone “The Pit” bubble UI |
| `src/worker.js` | Cloudflare Worker proxy (optional deploy) |
| `../serve.py` | **Local** static server + `/api/chatroom` / `/api/live` proxy |

## Run locally

```bash
cd kick-circles-demo
python3 serve.py          # preferred
# or: python3 -m http.server 8080
```

Live firehose resolves Kick chatrooms **in the browser** (`kick.com/api/v2/channels/…`),
then subscribes to Pusher. A server proxy is optional fallback only.

## Top 5 halls (Overworld)

Enter a Top 5 hall. The **Firehose bubbles** toggle switches display mode:

| Toggle | Display | Data |
|---|---|---|
| **OFF** (default) | Plain linear chat per lane | Mock feed |
| **ON** | Pit-style rising clouds; identical lines **merge** into ×N | Live Kick chat (mock clouds if quiet / failed) |

The Pit (`public/`) is the reference for merge / rise behaviour.
