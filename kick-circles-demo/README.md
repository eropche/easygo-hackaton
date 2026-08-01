# KICK Circles — Team 1 prototype

A clickable prototype for **Easygo Mini Hackathon · Challenge 2 (Chat Insights / Chat Engagement)**,
built as our answer to the KICK Circles brief.

> Everyone can detect a Circle. We built the reason to come back to it.

Three pillars: **Belong** (detection, invites, score) · **Play** (quests, live events, reactions) · **Prove** (roles, ranks, pass, shelf).

---

## Run it

No build step, no dependencies. Either:

```bash
# recommended — static files + Kick firehose API proxy
python3 serve.py
# → http://localhost:8080

# fallback (no live Kick chat proxy)
python3 -m http.server 8080
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

**Stream (audience)** — Kick viewer page. Living-room chat rail, per-message reactions, shared mood
wash, Room Studio. Story scenes play through as the audience would see them. No creator Pulse here.

**Creator (streamer dashboard)** — Kick-style studio mock (sidebar, session stats, preview, chat
monitor, channel actions). Hosts **Mood Pulse**, stream beat controls, gap alert
(“room warmer than the streamer feels”), **Play story**, and activity feed.

| Audience sees | Creator sees |
|---|---|
| Chat + reactions | Chat monitor + streamer reply |
| Room wash / Studio | Mood Pulse + beat + gap |
| Story as live look | Play / Replay story + session stats |

**My Circles / Overworld** — walkable Circles world in an iframe compartment; host-side dock
holds Circle cards, score, mission, privacy. See `overworld/ISOLATION.md`.

**Firehose** — `firehose/live-client.js` powers **Live firehose** inside Top 5 halls
(per-lane Kick chat). Standalone Pit UI at `/firehose/public/`. Needs `python3 serve.py`
so `/api/chatroom` can resolve Kick channels. See `firehose/README.md`.

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

1. **Creator** tab → **Play story**. Watch Mood Pulse: fail (tense) → encourage (**gap**) → loved it.
2. **Stream** tab → same story/chat as the audience: room wash + reactions, no Pulse chrome.
3. **Room** (Studio) on audience chat to dress the living room.
4. ↺ reset before the next run.

---

## Notes for judges

- Dummy data by design — the brief permits it and we chose demo reliability over a live API.
- The Circle Score formula, detection thresholds and activity floor are all shown in-product,
  not hidden in a slide.
- Nothing is purchasable. Every cosmetic, role and collectible is earned through participation.
- Missions are co-op. The only competition is against a shared goal.
