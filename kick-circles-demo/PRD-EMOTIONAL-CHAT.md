# PRD — Living Room Chat

**Product:** KICK Circles · Chat Insights / Engagement  
**Challenge:** Easygo Mini Hackathon · Challenge 2  
**Date:** 1 August 2026  
**Status:** Active hack-day focus  
**Owner:** Chat Insights module (standalone stream-page demo today; plugs into Circle Chat later)

---

## 1. One-liner

> Chat becomes a **living room**: you dress the space, the room reads how people feel *and* what the stream feels like right now, and it gently hints how to shift the lighting so everyone shares the moment.

---

## 2. Problem

| Who | Pain |
|---|---|
| **Streamer** | Chat scrolls too fast. They guess the room from volume, not emotion — and have no glanceable read of *this moment*. |
| **Active chatter** | Typing is the only way to matter. Chat looks the same whether the stream is hyped or quiet. |
| **Lurker / background viewer** | They belong in the room but can't type, can't customize, and get no ambient sense that the room knows the vibe. |

Most Challenge 2 teams will ship a poll or a word cloud — a dashboard *next to* chat. We make chat feel like a **room that lives with the stream**.

---

## 3. Solution — Living Room Chat

Two mood signals, one living space. Everything answers: *how does a lurker feel seen?*

### Moment model (current now)

```
roomMood   = dominant reactions in last 60 seconds   // how PEOPLE feel
streamMood = current stream beat (chapter / energy)  // how the SHOW feels
sharedWash = roomMood → ambient glow on the chat rail
hints      = streamMood → suggested room palette (1 tap)
Follow mode (default ON for demo) keeps lighting in sync automatically
```

**Demo note:** No live video/audio ML today. `streamMood` comes from a **stream-beat simulator** (timeline chapters + manual beat buttons). In production: clip chapters, audio energy, or creator markers.

| # | Feature | Viewer value | Streamer value | Friction |
|---|---|---|---|---|
| 1 | **Per-message reactions** | Stamp emotion into the room | Clean people-sentiment | 1 click |
| 2 | **Room mood engine** | Shared wash follows the crowd | Live people temperature | 0 clicks |
| 3 | **Room Studio** | Set wallpaper tint, accent, glow | Personalized hangout | setup once |
| 4 | **Dynamic mood hints** | “Warm the room?” when stream peaks | Room tracks the show | 1 tap |
| 5 | **Mood Pulse card** | Proof the room is listening | People + stream beat at a glance | Glance |

**Feedback loop (must be demo-able end-to-end):**  
Stream beat shifts → hint (or Follow) changes room color → viewers react → roomMood wash + Pulse update → streamer acts → beat shifts again.

**P1 (if time):** Voice-to-chat for background listeners.

---

## 4. What already exists (evolve, don't rebuild)

Baseline lives in `kick-circles-demo/` (`index.html`, `styles.css`, `app.js`). Keep the Kick stream-page shell.

| Already shipped | Keep / evolve |
|---|---|
| Stream layout + chat rail (Stream / Circle / Mood tabs) | Keep; Circles scaffolding is ambient context, not the pitch |
| Per-message reactions `😂🔥💀👀❓👏` + picker + `localStorage` | **Heart of roomMood** — tighten, animate, feed 60s window |
| Live Event **Pulse** tab | Evolve into **Mood Pulse** card (people + stream beat) |
| Mood Map (agent sim + canvas) | Keep as depth; do **not** steal P0 from Studio / hints / wash |
| 🎨 Chat Style (`S.look`) | **Un-park** — extend into **Room Studio** (roomTheme: tint, accent, glow) |
| Quests, Circles, Pass, ranks | Park as pitch work — leave code intact |

**Storage key:** `kickCircles.v4` — bump only on breaking schema; preserve ↺ reset for demo.

---

## 5. Requirements

### P0 — Must ship today

#### 5.1 Per-message reactions
- Every non-system message shows reaction pills + `+` picker.
- Core set: `🔥 😂 👀 💀` (keep `❓ 👏` if wired).
- Click toggles; count animates; persists in session.
- Each react appends to `reactionLog` and fires `onReactionChange()`.

**Acceptance:** Click 🔥 → count up → roomMood / Pulse refresh in one cycle.

#### 5.2 Room mood engine + shared wash
- Sliding window: reactions in the **last 60 seconds**.
- Dominant ratio → `roomMood`: `neutral` / `hype` / `laugh` / `cool`.
- Shared wash: CSS class on `.chat-rail` (and light optional player tint).

| Dominant signal | roomMood | Shared wash |
|---|---|---|
| Neutral / mixed | `neutral` | Default Kick border |
| 🔥 spike | `hype` | Warm orange glow |
| 😂 spike | `laugh` | Playful yellow pulse |
| 💀 / ❓ spike | `cool` | Cool blue, quieter chrome |

- Lurkers get the wash with **zero action**.
- One source of truth: `reactionWindow()` feeds wash + Pulse.

**Acceptance:** Burst of 🔥 → rail warms in ~1s → idle → drifts toward neutral.

#### 5.3 Room Studio (look & feel)
- Evolve Style into a **Room Studio** panel: wallpaper tint, accent color, glow intensity (name cosmetics can remain secondary).
- Personal base look persists (`S.look` / `roomTheme`).
- Shared wash layers *on top* of personal base — additive atmosphere, not a full re-theme.
- **Follow room mood** toggle — **default ON** for demo; when ON, accepting stream hints / roomMood can update accent automatically. When OFF, hints never hard-override Studio without a tap.

**Acceptance:** Change accent/glow in Studio → rail reflects it immediately; Follow ON still allows shared wash.

#### 5.4 Dynamic mood hints (stream → room)
- `streamMood` from beat simulator: e.g. `hype` / `chill` / `tense` / `cozy` with suggested palettes.
- Controls: auto timeline chapters **and** manual “Set beat” buttons on Pulse (demo reliability).
- When `streamMood` changes, show a non-blocking hint chip: e.g. *“Stream is peaking — warm the room?”* → **Accept** applies suggested tokens; **Dismiss** ignores.
- Hint ≠ force unless Follow mode is ON (then auto-apply with a quiet toast).

**Acceptance:** Set beat → Hype → hint appears → Accept → room palette shifts; Pulse shows new stream beat.

#### 5.5 Streamer Mood Pulse card
- Visible on Stream view without hunting event tabs.
- Shows: **roomMood** label + bar, **streamMood** beat, top 3 reactions (windowed), simulated lurker count.
- Same aggregates as wash — no duplicate fake datasets.
- Event Pulse tab may mirror the same data.

**Acceptance:** After reactions + beat change, Pulse matches wash + hint story without reload.

### P1 — If time

- Voice-to-chat (mic → `[voice]` badge; sim-first).
- Demo burst / reset mood controls.
- Reaction micro-animations polish.
- Listening-mode (voice-ready) indicator on Pulse.

### Out of scope today

- Live Kick API / real auth  
- Real CV / audio emotion ML on the stream  
- Rebuilding Circles detection, Pass, quests, ranks as the pitch  
- NLP on message text (reactions are the people signal)  
- Paid cosmetics / Kicks purchases  
- Cross-Circle competition  

---

## 6. Design principles

1. **Lurker-first** — wash and hints work at 0–1 taps; Studio is optional depth.
2. **Chat is the living room** — atmosphere in the rail, not a second dashboard; Pulse is the one streamer glance surface; Studio is a small setup panel.
3. **People + show** — roomMood and streamMood are both first-class; never collapse them into one fake number without labels.
4. **Hint ≠ hijack** — personal look is respected unless Follow is on.
5. **Emotion over volume** — reaction mix and stream beat beat raw message rate.
6. **Demo reliability** — simulated beats + dummy data over fragile live deps.
7. **Native Kick feel** — dark surfaces, Kick green brand; room hues are additive glows.

---

## 7. Success for hack day

| Bar | Definition |
|---|---|
| **Demo pass** | ↺ → react → wash → Studio tweak → stream beat hint → Accept → Pulse shows people + show → streamer verbal beat. |
| **Judge signal** | Not a poll/word cloud — a living room that tracks *this moment*. |
| **Non-throwaway** | Reactions, roomMood, Studio, hints, Pulse drop into Circle Chat later. |

### Metrics we claim (product, not measured live)

- Reactions per lurker session  
- Hint accept rate (when Follow off)  
- % sessions with Studio customization  
- Streamer actions after Pulse glance (qualitative in demo)  

---

## 8. Hack-day timeline (1 Aug)

| Time | Focus | Done when |
|---|---|---|
| 9:00–9:30 | Align Living Room Chat + locked decisions | This PRD |
| 9:30–11:00 | Reactions + `onReactionChange` hook | Hero reacts feel good |
| 11:00–12:30 | roomMood window + shared wash | Border glow live |
| 12:30–13:30 | Lunch | |
| 13:30–15:00 | Room Studio + mood hints + stream beat | Hint → color change works |
| 15:00–16:30 | Mood Pulse + loop polish (+ voice if ahead) | Full loop rehearsable |
| 16:30–17:30 | Rehearse + backup recording | 2-min narrative solid |
| 17:30–18:00 | Buffer / submit | |

---

## 9. Demo script (2 minutes)

| Time | Beat |
|---|---|
| 0:00–0:20 | **Problem** — Chat is a wall of text. Rooms don't feel. Streamers guess. Lurkers are invisible. |
| 0:20–0:45 | **People mood** — React 🔥 → counts move → shared wash warms. “The room felt that — no typing.” |
| 0:45–1:10 | **Living room** — Open Room Studio, show personal tint. Stream beat → Hype → hint *“Warm the room?”* → Accept. “Chat isn't a feed. It's a room that follows the show.” |
| 1:10–1:40 | **Pulse** — Streamer card: roomMood Hyped + stream beat Peaking + top reacts. “Oh we're spicy — let's raid.” Loop. |
| 1:40–1:55 | **Emotional design** — Not a dashboard beside chat. The lighting changed with the moment. |
| 1:55–2:00 | **Close** — “Chat isn't just messages. It's the living room of the stream.” |

---

## 10. Later: Circles re-integration

| Today | Later in Circles |
|---|---|
| Reactions | Circle Chat + Circle Score Participation |
| roomMood wash | Circle-wide ambient during peaking windows |
| Room Studio | Per-member room themes; shared Circle palette packs |
| Mood hints | Circle peaking → collective lighting suggestions |
| Mood Pulse | Circle Pulse across connected creators |
| Voice (P1) | Accessibility default in Circle + Stream chat |

---

## 11. Locked decisions (1 Aug)

| Decision | Choice |
|---|---|
| Mood Map | Keep as depth tab; do not expand for P0 |
| Voice | **P1** — sim-first if time; not on critical path |
| Pulse | Floating / promoted card on stream; event tab mirrors |
| Follow mode | **Default ON** for demo |
| streamMood source | Timeline simulator + manual Set beat on Pulse |
| Style | Evolve into Room Studio (un-parked) |

---

## 12. Executable tasks

Hack-day checklist (IDs, acceptance, file touch points, parallel split):  
→ [`TASKS-TODAY.md`](./TASKS-TODAY.md)
