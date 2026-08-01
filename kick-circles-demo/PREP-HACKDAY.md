# KICK Circles — Team 1 Master Brief

**Event:** Saturday 1 August 2026 · 9:00–18:30 · Fortress Melbourne
**Deliverables:** (1) Solution presentation page (2) Working clickable prototype, dummy data OK
**Primary success metric (from brief):** Weekly return rate for users who follow at least one Circle
**Judge signal from mixer:** they want to see real gamification

---

## 1. The pitch

### The problem with every other team's answer

The brief asks *"How would you build KICK Circles?"* Almost every team answers the **discovery** half:

> "We cluster co-watch data, find your community, show you an orbit map."

That is table stakes. It is also the half that AI writes identically for everyone. And critically — **discovery does not move the success metric.** Nobody returns weekly because a graph told them they belong.

### Our answer

> **Everyone can detect a Circle. We built the reason to come back to it.**

KICK Circles is a **participation layer** that sits on top of Kick. Discovery gets you in the door once. What keeps you is a season you're mid-way through, a quest you haven't finished, a role you're one rank from, and a shelf of things you earned with people you now recognise.

**One-line brief answer:**

> KICK Circles turns shared watch behaviour into communities, then turns those communities into a game you play together — quests, live events, seasonal progression, and an identity that proves you were there.

### Three pillars (use these headings in the deck)

| Pillar | What it is | Why it matters |
|---|---|---|
| **1. Belong** | Circle detection, explainable invites, Circle Score, orbit map | Answers the brief's discovery question, handles "not creepy" |
| **2. Play** | Quests, live events (polls, predictions, emote storms, quiz), reactions, raid squads | Answers "interactive chat features", gives the judge gamification |
| **3. Prove** | Roles, ranks, Circle Pass, collectibles, profile shelf | Answers "why would users return", drives the success metric |

Discovery is one third of our product. For most teams it is the whole product.

---

## 2. Full feature stack

Everything we've groomed, consolidated. Nothing here is a separate product — it's one layer.

### Pillar 1 — Belong (discovery & trust)

| # | Feature | Detail |
|---|---|---|
| 1.1 | **Circle detection** | Weighted viewer↔creator graph; cluster of ≥3 creators with co-watch overlap |
| 1.2 | **Explainable invite** | "You return to 3 connected creators · watched 7 different days · saved 4 clips" |
| 1.3 | **Private by default** | Invite, never expose. Membership hidden unless you opt in |
| 1.4 | **Circle Map / orbit** | You → creators → connected creators → Circle. Every edge has a reason |
| 1.5 | **Circle Score** | 4 weighted dimensions, 28-day rolling, daily cap |
| 1.6 | **Circle identity** | Topic, style, lifespan. Weak clusters never launch; dead ones archive |
| 1.7 | **Multi-Circle** | A user belongs to several Circles (IRL Chaos, Late Night Watchers, Clip Hunters) |

### Pillar 2 — Play (engagement inside the Circle)

| # | Feature | Detail |
|---|---|---|
| 2.1 | **Circle Chat** | Shared room across all connected creators' streams. Slow mode, Circle mods |
| 2.2 | **Message reactions** | 😂🔥💀👀❓👏 per message. *Not on Twitch or Kick today.* Feeds stats + clip discovery |
| 2.3 | **Daily quests** | React, clip, quiz, raid, quality chat, discover a creator |
| 2.4 | **Weekly Circle mission** | Collective goal — "approve 50 chaos clips". Co-op, not PvP |
| 2.5 | **Live polls** | Circle votes on what a creator should do next |
| 2.6 | **Predictions** | Bet Circle XP on binary outcomes. Pool splits to winners |
| 2.7 | **Emote Storm** | Team emote battle during hype moments |
| 2.8 | **Circle Quiz** | Daily trivia about connected creators — drives Discovery score |
| 2.9 | **Raid squads** | Coordinate 3+ members to support a connected creator |
| 2.10 | **Circle peaking alert** | Push when multiple connected creators go live at once |

### Pillar 3 — Prove (identity & retention)

| # | Feature | Detail |
|---|---|---|
| 3.1 | **Circle Pass** | 28-day free seasonal track. Tiers unlock cosmetics + roles |
| 3.2 | **Roles (permanent)** | Newcomer → Scout → Clip Hunter → Captain → Founding Member |
| 3.3 | **Ranks (seasonal)** | Bronze → Silver → Gold → Platinum → Chaos. Resets each season |
| 3.4 | **Streaks** | Daily Circle visit streak with escalating multiplier |
| 3.5 | **Achievements** | First clip, quiz master, emote champion, top 10, 30-day member |
| 3.6 | **Collectibles shelf** | MySpace-style profile display of everything earned |
| 3.7 | **Avatar customisation** | Avatar, frame, title, chat name colour — unlocked by XP, never bought |
| 3.8 | **Trending clips** | Surfaced by Circle reactions + votes, not view count |
| 3.9 | **Weekly recap** | "You saved 4 moments, found 2 creators, rose 9 places" |

---

## 3. Where it lives on Kick (integration surfaces)

The prototype must look like **Kick with a new layer**, not a separate website. This is a big differentiator — most teams will build a standalone dashboard.

```
┌──────────────────────────────────────────────┬───────────────────────────┐
│                                              │ CHAT RAIL                 │
│                                              │ [Stream chat][Circle chat]│ ← tab
│              VIDEO PLAYER                    │ ┌───────────────────────┐ │
│              ● LIVE   12.4K                  │ │ NightOwl: rooftop...  │ │
│                                              │ │  🔥12  😂3   [+]      │ │ ← reactions
│                                              │ └───────────────────────┘ │
├──────────────────────────────────────────────┤ ┌─ LIVE EVENT ──────────┐ │
│ ◉ CIRCLE STRIP                          NEW  │ │ Poll / Prediction /   │ │
│ IRL Chaos · peaking · Quest 72% · [Open]     │ │ Emote Storm / Quiz    │ │
├──────────────────────────────────────────────┤ └───────────────────────┘ │
│ [avatar] Clavicular · IRL                    │ [Gift][Points][◉ Circle]  │ ← new button
│ [Follow] [Subscribe] [Clip] [◉ Circle]       │ ┌ input ────────────────┐ │
├──────────────────────────────────────────────┤ │ 😂 🔥 👀 quick react  │ │
│ TRENDING IN YOUR CIRCLE (clips)              │ └───────────────────────┘ │
└──────────────────────────────────────────────┴───────────────────────────┘
```

| Surface | Placement | Priority |
|---|---|---|
| **Circle Strip** | Directly under the player | P0 |
| **Circle chat tab** | Beside Stream chat in the rail | P0 |
| **Message reactions** | On every chat message | P0 |
| **Circle button** | In chat toolbar next to Gifts / Channel Points | P0 |
| **Live event card** | Bottom of chat rail | P0 |
| **Trending clips row** | Under stream meta | P1 |
| **Profile shelf** | On the Kick profile page | P1 |
| **Notification toast** | Top-right, Kick style | P1 |

---

## 4. Gamification model (this is what the judge asked for)

### What 2026 gamification actually looks like

Non-gaming apps passed gaming in app-store revenue in 2025. The mechanics that migrated are not badges — they are these:

| Principle | Source | Our implementation |
|---|---|---|
| Seasonal pass over infinite grind | Fortnite, Duolingo, Weverse | **Circle Pass**, 28 days, free track only |
| Co-op over PvP | Weverse listening parties | **Weekly Circle mission**, shared bar |
| Contribution weighting | Community platforms | React ≠ clip ≠ raid. Different weights |
| Identity cosmetics, not power | Gen Z fandom apps | Frames, titles, shelf. Zero pay-to-win |
| Streak contracts | Duolingo | Daily Circle streak with multiplier |
| Anti-grind caps | Modern loyalty design | 200 score/day hard cap |
| Status without money | Kick's own Kicks policy | Nothing purchasable affects rank |

### Circle Score (put this formula in the deck — it scores "technical thinking")

```
Circle Score  (28-day rolling window)

  0.30 × Consistency    watch days across Circle creators
+ 0.25 × Participation  reactions, chat, quiz, poll votes
+ 0.25 × Contribution   clips approved, mission progress, raids
+ 0.20 × Discovery      new creators found within the cluster

Daily cap: 200 points      Decay: linear over 28 days
Subscriber multiplier: 1.5× on Participation only
```

Why a cap and a decay: it prevents grinding, it makes the leaderboard reflect *recent* community health rather than who joined first, and it makes returning weekly the optimal strategy — which is exactly the success metric.

### Circle Pass — Season 04

```
Tier 1   Join Circle              →  Member collectible
Tier 2   50 reactions given       →  Chaos emote
Tier 3   Submit 1 approved clip   →  Profile frame
Tier 4   3-day streak             →  Scout title
Tier 5   Complete a raid squad    →  Animated reaction
Tier 6   Weekly mission complete  →  Mystery drop
Tier 7   Top 25% contribution     →  Clip Hunter role
```

Free track only. No paid tier. Nothing here requires Kicks.

### Roles vs Ranks — the retention trick

| Roles — permanent | Ranks — reset every season |
|---|---|
| Newcomer, Scout, Clip Hunter, Captain, Founding Member | Bronze, Silver, Gold, Platinum, Chaos |
| You never lose them | Gives everyone a reason to come back on day 1 of a season |

Permanent roles protect long-time members from feeling reset. Seasonal ranks create a recurring re-engagement spike. Both together is how you get weekly return rate up without punishing anyone.

### Kick's existing badges

Kick already has subscriber / moderator / VIP / OG / sub-gifter badges, and they come through on `chat.message.sent` in `sender.identity.badges`. There is **no API to grant them**, so we don't try.

We **read** them and use them as modifiers:

| Kick native badge | Effect in Circles |
|---|---|
| Subscriber | 1.5× Participation multiplier |
| Moderator | Can start Circle events |
| VIP / OG | Highlighted on leaderboard |
| Sub gifter | Access to high-stakes prediction pools |

Our own game badges live on the profile shelf. Clean separation, and it shows we understand the platform.

---

## 5. Risks & mitigations (brief asks for this explicitly)

| Risk | Mitigation |
|---|---|
| Feels creepy | Every invite states its reason. Membership private by default. Opt-in to leaderboard |
| Grinding / spam | Daily score cap, quality-weighted contributions, slow mode, no reward for message volume |
| Dead Circles | Activity floor — merge or archive below threshold. Weak clusters never launch |
| Toxic rivalries | No cross-Circle chat, no Circle-vs-Circle battles. All missions are co-op |
| Pay-to-win | Pass is free. Kicks and subs never affect rank, only cosmetic multiplier on one dimension |
| Moderation load | Circle-specific mods, account-age gate, slow mode at launch, one-tap report and leave |
| Reaction abuse | Rate-limited, aggregate-only display, no per-user reaction history exposed |

---

## 6. Success metrics

**Primary:** incremental 7-day return rate for users who follow ≥1 Circle, measured against an eligible holdout group.

**Secondary:**
- Circle Pass tier completion rate
- Daily quest completion rate
- Reactions per active member per session
- Weekly mission completion rate per Circle
- Share of members holding ≥1 permanent role
- Circle survival rate at 28 days

---

## 7. Hack day plan — 1 August

| Time | Work |
|---|---|
| 9:00–9:45 | Align on pitch and the three pillars. Assign owners. Pull dummy data from this doc |
| 9:45–13:00 | **P0 build:** Kick stream mock, chat with reactions, Circle strip, Circle drawer, live events |
| 13:00–14:00 | Lunch |
| 14:00–16:00 | **P1 build:** Quests, Circle Pass, profile shelf + customisation, ranks, trending clips, toasts |
| 16:00–17:00 | Presentation page — pitch, data model, Circle Score formula, risks, metrics |
| 17:00–18:00 | Demo rehearsal ×3. Screen-record a backup. Reset state between runs |
| 18:00–18:30 | Submit and buffer |

### Owners

| Who | Owns |
|---|---|
| Egor | Pitch narrative, Circle Score model, demo script, presentation page |
| Frontend lead | Stream mock, chat rail, reactions, navigation shell |
| MySpace teammate | Profile shelf, customisation, achievements, collectibles |
| Fourth | Quests, Circle Pass, ranks, dummy data, live events |

---

## 8. Demo script — 2 minutes

Judges said a strong submission makes the idea obvious in under two minutes. Rehearse this exactly.

| Time | Beat | What you show |
|---|---|---|
| 0:00–0:15 | **Problem** | "Kick recommends streams. It doesn't give you anywhere to belong — and nothing brings you back on Tuesday." |
| 0:15–0:30 | **Belong** | Circle Map: "You watch 3 connected creators, 7 different days. Here's *why* we invited you." |
| 0:30–0:45 | **On Kick** | Stream page. Circle Strip under the player. Circle tab in chat. "This lives where you already watch." |
| 0:45–1:10 | **Play** | React 🔥 to a message → count moves. Vote in a live poll. Bet XP on a prediction. Weekly mission ticks 72% → 74%. |
| 1:10–1:35 | **Prove** | Quest completes → XP → Circle Pass tier unlocks → collectible lands on the profile shelf → rank moves on the leaderboard. |
| 1:35–1:50 | **Return** | Notification: "IRL Chaos is peaking — 3 creators live, season ends in 12 days." |
| 1:50–2:00 | **Close** | "Discovery gets them in once. The season, the squad and the shelf bring them back every week." |

---

## 9. Judging criteria — how we hit each

| Criterion | Our answer |
|---|---|
| Product clarity | Three pillars: Belong, Play, Prove. One sentence each |
| User experience | Native Kick surfaces, not a separate dashboard |
| Technical thinking | Circle Score formula, detection thresholds, reaction aggregation, decay + caps |
| Community impact | Co-op missions, no rivalries, private by default, Circle mods |
| Retention potential | Circle Pass + streaks + seasonal ranks + peaking alerts, measured against a holdout |
| Prototype quality | Fully clickable: reactions, votes, quests, pass tiers, shelf unlocks all really work |

---

## 10. Out of scope — say this out loud if asked

- Live Kick API integration (brief explicitly permits dummy data; we chose demo reliability)
- ML clustering model (we show the data model and thresholds instead)
- Paid pass tier or Kicks-based betting (deliberate — status must not be purchasable)
- Cross-Circle competition (deliberate — brief warns against toxic rivalries)
- Native Kick badge granting (no API exists; we read them and layer on top)

---

## 11. Talking points

**If asked "isn't this just Discord?"**
> Discord is a separate destination you have to be invited to. Circles are formed automatically from what you already watch, they live inside the stream page, and they're scoped to a creator cluster rather than one server. You don't leave Kick to participate.

**If asked about gamification depth**
> The pass is seasonal and free, the missions are co-op, contribution is weighted so a thoughtful clip beats fifty "W" messages, and there's a hard daily cap. Permanent roles mean long-time members never get reset, seasonal ranks mean everyone has a reason to show up on day one of a season.

**If asked what's genuinely new**
> Per-message reactions don't exist on Twitch or Kick — YouTube and Discord have them, live streaming doesn't. They're the lowest-friction way for a lurker to participate, and they give us a signal nobody else has: which moments the community actually cared about, which then drives clip discovery and the streamer's own insights.

**If asked why users return**
> Three unfinished things at any moment: a daily quest, a weekly Circle mission, and a seasonal pass. Plus a push when several of your Circle's creators go live at once — that's the moment the Circle is worth being in.

**If asked "what's in it for the streamer?"**
> Three things. Cross-promotion they didn't have to negotiate — a Circle is a warm audience pipeline between connected creators. A Circle Pulse insight card showing which moments their community actually reacted to, per minute, which is the Chat Insights half of the challenge. And a co-op mission they can steer live, which converts passive viewers into a chat that's doing something.

**If asked "what happens to a Circle that dies?"**
> It has a lifespan. Every Circle is re-evaluated against the activity floor. Below it, we merge it into the nearest cluster or archive it — members keep their collectibles and their role, they just stop getting notifications. Late Night Watchers in the demo is deliberately sitting near the floor so you can see the quiet state.

**If asked "how do you stop farming?"**
> Four layers, all visible in the prototype. A hard 200/day Circle Score cap. Contribution weighting, so an approved clip is worth more than fifty messages. 28-day rolling decay, so you can't coast on one big week. And an account-age gate — new accounts read for 24 hours before they can post.

**If asked "what would you build next?"**
> Creator-side Circle Pulse dashboard, Circle-to-Circle collaborative events (co-op, never competitive), a mobile-first Circle tab, and a real clustering job replacing the thresholds we hard-coded.

---

## 12. Prototype ↔ brief checklist

Every item the brief listed for deliverable 2, and where it is in the demo:

| Brief requirement | Where it lives | ✔ |
|---|---|---|
| My Circles page | `My Circles` tab | ✔ |
| Visual map / web / orbit | Circle Map SVG, regenerates per selected Circle | ✔ |
| **A selected Circle detail view** | Click any Circle card → detail header, creators, map, detection, reasons, score, mission all switch | ✔ |
| Circle Score | Weighted 4-dimension breakdown + published formula | ✔ |
| Follow Circle button | On every card, and in the invitation modal | ✔ |
| Circle chat | Chat rail, `Circle chat` tab, with per-message reactions | ✔ |
| Leaderboard | `Ranks` tab, opt-in, respects the privacy toggle | ✔ |
| Trending clips | Stream page, ranked by Circle reactions not views | ✔ |
| Collectibles / profile shelf | `Profile` tab, 8 collectibles + 9 achievements | ✔ |
| Notification when Circle is active or reward unlocks | Bell + notification centre, plus live toasts | ✔ |

Beyond the checklist: invitation modal, detection thresholds, privacy & safety controls, daily cap meter, Circle Pulse, collective unlock, Circle Pass, quests, roles and ranks.

---

## 13. What we added beyond the obvious build

Use this list if a judge asks what separates us. Each one answers a question the brief actually asked.

| Feature | The question it answers |
|---|---|
| **Invitation modal** with numbered reasons | "How would a user qualify, and how do you make it not creepy?" |
| **Detection panel** with live thresholds and an activity floor | "How are Circles detected? What if a Circle dies?" |
| **Selected Circle detail view** | Explicit brief requirement — most teams will hard-code one Circle |
| **Privacy & safety toggles** that actually change the UI | "How would you handle safety, moderation and abuse?" — ours is a product surface, not a policy slide |
| **Daily cap meter** that visibly stops the score | "How do you stop farming?" — demonstrated, not asserted |
| **Circle Pulse** reaction histogram | The Chat *Insights* half of Challenge 2, and the streamer-side value |
| **Collective unlock** (whole Circle → one emote) | "How do you avoid toxic rivalry?" — the only competition is against a goal |
| **Quiet Circle state** (Late Night Watchers) | Shows we thought about failure modes, not just the happy path |
| **Leave Circle button** | Trust. Leaving is always one tap away |

---

## 14. How to share this with the team

**Short answer: no — `PREP-HACKDAY.md` alone will not run anything.** It is a written brief. The demo is three separate files.

To give a teammate the identical demo, share the **whole `kick-circles-demo/` folder**:

```
kick-circles-demo/
├── index.html      ← the demo
├── styles.css      ← required
├── app.js          ← required
├── README.md       ← how to run it
└── PREP-HACKDAY.md ← this brief (reading only)
```

**Option A — zip it (simplest):**

```bash
cd /Users/eropfree/hackaton
zip -r kick-circles-demo.zip kick-circles-demo
```

Send the zip. They unzip and double-click `index.html`. No install, no build step, no internet needed apart from the Google Fonts link.

**Option B — GitHub, so everyone edits the same thing on hack day:**

```bash
cd /Users/eropfree/hackaton/kick-circles-demo
git init && git add -A && git commit -m "KICK Circles prototype"
gh repo create kick-circles-demo --public --source=. --push
```

Then turn on GitHub Pages (Settings → Pages → deploy from `main`) and you get a public URL you can open on the projector — no laptop dependency during the pitch.

**Option C — local server (best for a live demo):**

```bash
cd kick-circles-demo && python3 -m http.server 8080
```

Then open `http://localhost:8080`.

### Will they see exactly the same thing?

Yes, with two caveats worth knowing before the pitch:

1. **State is per-browser.** Progress is saved in `localStorage` under `kickCircles.v4`. A teammate opening it fresh starts at 240 XP, Level 1, Newcomer — the intended demo start. If you've been clicking around, you're ahead of them. Hit the **↺ button** in the header to reset to the clean state.
2. **The invitation modal only auto-opens once per browser.** After the first time, use the **"View pending invitation"** button on the My Circles page. Reset also brings the auto-open back — which is what you want right before presenting.

**Pre-pitch ritual:** hit ↺, let the invitation modal appear, start talking. That is the demo opener.
