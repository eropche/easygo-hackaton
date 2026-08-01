# Tasks — Living Room Chat (1 Aug)

Executable checklist from [`PRD-EMOTIONAL-CHAT.md`](./PRD-EMOTIONAL-CHAT.md).  
Work in `kick-circles-demo/` only. Park Circles / Pass / quests / ranks as pitch work.

**Definition of done:** ↺ → react → shared wash → Studio tweak → stream beat hint → Accept → Pulse shows roomMood + streamMood — no dead ends.

**Locked defaults:** Follow ON · stream beat = simulator + manual buttons · voice = P1 · Mood Map = don't expand · Style → Room Studio.

---

## Sprint 0 — Align (done when PRD locked)

| ID | Task | Done when |
|---|---|---|
| A1 | Pitch = *Living Room Chat* (people mood + stream mood + Studio + hints) | Team yes |
| A2 | Decisions written in PRD §11 | This doc + PRD |

Status: ✅ decisions locked in PRD.

---

## Sprint 1 — Reactions (P0) ~75 min

*Baseline works. Make it the people-mood input.*

| ID | Task | Done when | Touch |
|---|---|---|---|
| R1 | Seeded Circle chat ≥4 messages with visible pills | Stream → Circle → pills show | chat seed |
| R2 | Core `🔥😂👀💀` in picker (keep `❓👏`) | Picker complete | `REACTIONS` |
| R3 | Click pop / count bump animation | Feels instant on camera | CSS + `addReaction` |
| R4 | `onReactionChange()` hook after every react | Single fan-out for wash + Pulse | `app.js` |
| R5 | ↺ clears `msgReacts` / `myReacts` / later `reactionLog` | Clean demo state | reset path |

**Acceptance:** Click 🔥 → count up → hook fires → reset clears.

---

## Sprint 2 — Room mood + shared wash (P0) ~90 min

| ID | Task | Done when | Touch |
|---|---|---|---|
| M1 | `reactionLog[]` `{ emo, t }` on react (+ seed few) | Log grows on click | state |
| M2 | `reactionWindow(ms = 60000)` → counts per emo | Pure helper | `app.js` |
| M3 | Map window → `roomMood`: `neutral` / `hype` / `laugh` / `cool` | Comment thresholds in code | `app.js` |
| M4 | Apply `mood-*` / wash class on `.chat-rail` | Updates on react + 1s tick | render |
| M5 | CSS washes: warm orange / yellow / cool blue; transitions | Visible without a chart | `styles.css` |
| M6 | Age window toward neutral when idle | Glow fades if you stop | tick |
| M7 | Optional demo **Burst 🔥** control | Judges see wash in &lt;2s | toolbar / Pulse |

**Acceptance:** Burst 🔥 → wash warms ~1s → idle → neutral.

**One source of truth:** wash + Pulse both call `reactionWindow()` / `roomMood`.

---

## Sprint 3 — Room Studio + mood hints (P0) ~90 min

### Room Studio

| ID | Task | Done when | Touch |
|---|---|---|---|
| U1 | Extend Style → **Room Studio**: tint, accent, glow intensity | Panel editable | HTML + `S.look` / `roomTheme` |
| U2 | Persist personal base; apply CSS vars on `.chat-rail` | Survives refresh in session | save / CSS |
| U3 | **Follow room mood** toggle, default **ON** | Toggle visible + respected | Studio UI |
| U4 | Shared wash layers on personal base (additive) | Custom tint + hype glow both visible | CSS |

### Stream beat + hints

| ID | Task | Done when | Touch |
|---|---|---|---|
| H1 | `streamMood` state + beat catalog (hype / chill / tense / cozy) | Each has label + suggested palette | `app.js` |
| H2 | Manual **Set beat** controls (Pulse or toolbar) | One click changes streamMood | UI |
| H3 | Optional short auto timeline (chapter advances) | Demo can run hands-light | timer |
| H4 | Hint chip on beat change: copy + Accept / Dismiss | Non-blocking, readable | HTML/CSS/JS |
| H5 | Accept → apply suggested tokens; Follow ON → auto-apply + quiet toast | Hint ≠ hijack when Follow OFF | logic |

**Acceptance:** Set beat Hype → hint → Accept (or Follow) → room palette shifts without killing personal Studio base.

---

## Sprint 4 — Mood Pulse + loop (P0) ~60–90 min

| ID | Task | Done when | Touch |
|---|---|---|---|
| P1 | Mood Pulse card on stream view | Visible without event-tab hunt | `index.html` |
| P2 | Show roomMood bar, streamMood beat, top 3 emos, lurker count (sim OK) | Matches PRD §5.5 | render |
| P3 | Re-render from `onReactionChange` + beat changes | One react updates wash + Pulse | hook |
| P4 | Mirror data in `eventPulse()` (optional, no conflicting numbers) | Consistent story | `eventPulse` |
| L1 | ↺ clears `reactionLog`, wash class, hint, resets beat | Rehearsal-safe | reset |
| L2 | Walk 2-min script once; fix dead clicks | Script runs cold | — |
| L3 | 5-line presenter cheat sheet | Glancable mid-demo | note / PRD §9 |

**Acceptance:** Full living-room loop rehearsable.

---

## Sprint 5 — P1 polish (if ahead) ~45 min

| ID | Task | Done when | Touch |
|---|---|---|---|
| V1–V4 | Voice mic → `[voice]` sample post (sim-first) | Optional script beat | chat form |
| L4 | Light player tint from roomMood | Video still readable | CSS |
| L5 | Reaction animation polish | Camera-ready | CSS |

Skip entirely if Sprint 3–4 are shaky.

---

## Sprint 6 — Rehearse + backup ~60 min

| ID | Task | Done when |
|---|---|---|
| D1 | Rehearse script ×3 with ↺ between runs | Under 2:00 |
| D2 | Screen-record backup with voiceover | File saved |
| D3 | Submit checklist (zip / URL / pitch page) | Team aligned |

---

## Do not do today

- Kick live API / auth  
- Real CV / audio ML on stream  
- Circles / Pass / quests / ranks as pitch work  
- NLP on message text  
- Expanding Mood Map canvas  
- New frameworks / build step  

---

## Parallelization (2 people)

| Person A | Person B |
|---|---|
| R* → M1–M3 (data) → P* | M4–M5 (CSS wash) → U* Studio → H* hints |
| L* reset + script | V* only if both P0s green |

Merge point: `reactionWindow()` + `roomMood` + `streamMood` + `onReactionChange()`.

---

## Progress tracker

| Sprint | Status |
|---|---|
| 0 Align | ✅ |
| 1 Reactions | ✅ |
| 2 Room mood + wash | ✅ |
| 3 Studio + hints | ✅ |
| 4 Pulse + loop | ✅ |
| 5 P1 polish | ☐ |
| 6 Rehearse | ☐ |
