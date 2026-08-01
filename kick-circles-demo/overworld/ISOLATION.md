# Overworld isolation contract

The walkable Animal-Crossing-style world lives in `overworld/` and is loaded
only inside `#overworldFrame`. Treat that folder as a **separate app**.

## Rules

1. **Do not** import overworld JS into `../app.js`, or host styles into `overworld/index.html`.
2. **Do not** reach into `iframe.contentDocument` from the host (or the reverse).
3. The **only** integration surface is `window.postMessage`, mediated by:
   - `overworld/bridge.js` (guest)
   - `OverworldBridge` in `../app.js` (host)
4. Host “My Circles” product logic (score, privacy, invites, detection) stays in
   the host dock (`#circlesDock`). The overworld can crash, reload, or be
   replaced without breaking Stream / Mood / Quests.
5. Lazy-load: the iframe `src` stays `about:blank` until the Overworld tab opens.

## Message types

| Direction | `type` | Purpose |
|---|---|---|
| guest → host | `ready` | iframe booted |
| guest → host | `heartbeat` / `state` | zone / player mirror for dock hint |
| guest → host | `error` | soft-fail report |
| host → guest | `focus` / `blur` | tab visibility |
| host → guest | `focusStreamer` | jump to a creator pavilion |
| host → guest | `getState` | pull debug snapshot |

Payload envelope:

```js
{ source: 'kick-overworld', type, payload }  // guest → host
{ target: 'kick-overworld', type, payload }  // host → guest
```
