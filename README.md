# easygo-hackaton

Easygo Mini Hackathon · powered by KICK — **Challenge 02: Chat Insights & Engagement**

> How would you turn chat into more than a roll of messages?

---

## Main challenge — Chat Insights & Engagement

Chat is where the stream actually happens, but it scrolls away. Streamers can't see what's
landing, and viewers have no way to be more than "just another message."

Our answer is a **participation layer inside the chat rail itself** — viewers get real ways to
act, and the signals those actions produce feed straight back out as insight.

**What's built and working:**

| Feature | What it does |
|---|---|
| **Per-message reactions** | Six reactions on any message. Doesn't exist on Twitch or Kick today — the lowest-friction way for a lurker to participate |
| **Circle Pulse** | Live aggregate histogram of the reaction mix — the insight half, and what a streamer would see |
| **Live events** | Polls, XP predictions, emote storms and a daily quiz, all inline in the chat rail |
| **Chat identity** | Name colour, effects, flair and message styling — every unlock earned from *chat behaviour* (messages, questions, reactions, clips), never purchased |
| **Trending clips** | Ranked by Circle reactions rather than view count |
| **Quests & seasonal pass** | The reason to come back tomorrow, with a visible anti-grind daily cap |

Everything runs on mocked data that mirrors what the KICK Public API exposes for chat.

**→ [`kick-circles-demo/`](kick-circles-demo/)** — open `index.html`, or `python3 -m http.server 8080`

Docs: [prototype README](kick-circles-demo/README.md) · [full brief and demo script](kick-circles-demo/PREP-HACKDAY.md)

---

## Wild card — KICK Circles as a walkable world

An Animal-Crossing-style overworld where recommendations become geography: biomes lead to
Circle villages, villages lead to rooms where people actually talk. Discovery you *walk
through* instead of scroll past.

**→ https://kick-circles.netlify.app/**

---

## Running anything here

No build step, no dependencies, no API keys.

```bash
cd kick-circles-demo
python3 -m http.server 8080   # → http://localhost:8080
```

State is per-browser in `localStorage`. The **↺** button in the header resets to the clean
demo state — use it before presenting.
