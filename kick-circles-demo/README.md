# KICK Circles — Team 1 prototype

A clickable prototype for **Easygo Mini Hackathon · Challenge 2 (Chat Insights / Chat Engagement)**,
built as our answer to the KICK Circles brief.

> Everyone can detect a Circle. We built the reason to come back to it.

Three pillars: **Belong** (detection, invites, score) · **Play** (quests, live events, reactions) · **Prove** (roles, ranks, pass, shelf).

---

## Run it

No build step, no dependencies. Either:

```bash
# option 1 — just open it
open index.html

# option 2 — local server (recommended for the live demo)
python3 -m http.server 8080
# → http://localhost:8080
```

## Sharing it with the team

`PREP-HACKDAY.md` is a written brief — it does not run. Share the **whole folder**
(`index.html` + `styles.css` + `app.js` are all required):

```bash
cd .. && zip -r kick-circles-demo.zip kick-circles-demo
```

Progress is stored per-browser in `localStorage` (`kickCircles.v4`). A fresh browser starts
at the intended demo state: 240 XP, Level 1, Newcomer. The **↺ button** in the header resets
to that state — use it right before presenting.

---

## What's in it

**Stream** — mock of the Kick stream page. Circle Strip under the player, Circle chat tab with
per-message reactions, live event panel (Poll · Prediction · Emote Storm · Quiz · **Pulse**),
and trending clips ranked by Circle reactions rather than views.

**Overworld** — walkable Animal-Crossing-style Circles world (WASD / click / E / M), loaded
from `overworld/` inside an **iframe compartment** so its code cannot break Stream/Mood and
vice versa. The best of **My Circles** lives in a host-side dock over the world: selectable
Circle cards, affinity map, detection thresholds, Circle Score, weekly mission, collective
unlock, privacy toggles, and “Find in overworld” travel. See `overworld/ISOLATION.md`.

**Quests** — 9 daily quests and 1 weekly co-op mission, streak multiplier, and a visible
daily score cap that actually stops the score accruing.

**Circle Pass** — free 7-tier seasonal track. Nothing purchasable with Kicks.

**Chat identity** — the 🎨 Style button in the chat toolbar. Name colour, name effect
(glow / fade / chaos), chat flair (Regular · Asker · Reactor · Clipper · First Nighter) and
message style, with a live preview. Every option is unlocked by *chat behaviour* — messages
sent, questions asked, reactions given, clips submitted — so the same signals that drive the
insights also drive identity. Nothing is purchasable.

**Profile** — MySpace-style card: avatar, frame, title and chat colour, all gated behind XP.
Collectibles shelf, achievements, weekly recap.

**Ranks** — permanent role path vs. resetting seasonal ranks, and an opt-in leaderboard that
respects the privacy toggle.

**Notification centre** — bell with unread count, plus live toasts for XP, tier unlocks and
role promotions.

---

## 2-minute demo path

1. **↺ reset.** The invitation modal opens on its own — *"You've found your people."* with the
   numbered reasons you qualified. Point out it's private, and that leaving is one tap away.
2. **My Circles.** Click between all three Circles — the map, detection thresholds, score and
   mission all change. Note Late Night Watchers sitting near the activity floor.
3. **Stream.** Show the Circle Strip and the Circle chat tab. React 🔥 to a message.
4. **Pulse tab.** Your reaction shows up in the aggregate histogram — this is the Chat Insights
   half of the challenge, and what the streamer sees.
5. **Vote in the poll, stake XP on the prediction.** A quest completes, XP lands.
6. **Circle Pass tier unlocks**, a collectible appears on the profile shelf, rank moves.
7. **Quests tab.** Point at the daily cap filling up: farming is capped by design.

---

## Notes for judges

- Dummy data by design — the brief permits it and we chose demo reliability over a live API.
- The Circle Score formula, detection thresholds and activity floor are all shown in-product,
  not hidden in a slide.
- Nothing is purchasable. Every cosmetic, role and collectible is earned through participation.
- Missions are co-op. The only competition is against a shared goal.
