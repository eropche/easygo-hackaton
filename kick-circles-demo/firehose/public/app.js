/* The Pit — Kick chat reimagined.
 *
 * Instead of a linear scroll, messages rise from the bottom as bubbles.
 * Identical messages sent close together MERGE into one bubble that grows
 * with a ×N combo counter — spam becomes signal. A hype meter tracks chat
 * velocity; hot chat makes the whole pit pulse.
 *
 * Live data: Kick's chat is public over Pusher websockets. The Worker
 * resolves a channel slug → chatroom id (/api/chatroom); the browser then
 * subscribes to `chatrooms.<id>.v2` directly. Falls back to a simulated
 * demo chat when offline / not connected.
 */

// Kick's public Pusher app key (client-side constant on kick.com).
const PUSHER_URL =
  "wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false";

const stage = document.getElementById("stage");
const feedList = document.getElementById("feed-list");
const hypeFill = document.getElementById("hype-fill");
const hypeRate = document.getElementById("hype-rate");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");

let ws = null;
let demoTimer = null;
let playRateBase = 1600; // demo message interval

/* ── status ─────────────────────────────── */
function setStatus(mode, text) {
  statusDot.className = `dot dot--${mode}`;
  statusText.textContent = text;
}

/* ── message pipeline ───────────────────── */
const USER_COLORS = ["#53fc18", "#f5d90a", "#ff4d4d", "#7c5cff", "#38bdf8", "#fb7185", "#34d399"];
const recent = new Map(); // normalized text -> {el, count, expires}
const MERGE_WINDOW = 8000;
const MAX_BUBBLES = 45;

// timestamps of recent messages for the hype meter
const ticks = [];

function colorFor(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return USER_COLORS[h % USER_COLORS.length];
}

// [emote:37226:KEKW] → <img>, everything else escaped text
const MAX_EMOTES = 10; // emote-spam guard — extra emotes render as text

/* Emotes: NEVER put the fullsize (often animated) CDN image in the DOM.
 * Chrome keeps decoded frames resident for every visible animated image, so a
 * busy chat leaks renderer memory at ~1MB/s until the tab OOMs (grey page).
 * Instead decode each emote once, snapshot its first frame downscaled onto a
 * canvas, and reuse the tiny static data-URL everywhere. */
const EMOTE_PX = 64;
const EMOTE_CACHE_MAX = 400;
const emoteCache = new Map(); // id -> dataURL string, or Promise while loading

function emoteUrl(id) {
  const hit = emoteCache.get(id);
  if (hit) return hit;
  const p = new Promise((resolve, reject) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => {
      try {
        const s = Math.min(1, EMOTE_PX / Math.max(im.naturalWidth, im.naturalHeight, 1));
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(im.naturalWidth * s));
        c.height = Math.max(1, Math.round(im.naturalHeight * s));
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        const url = c.toDataURL();
        if (emoteCache.size >= EMOTE_CACHE_MAX) {
          emoteCache.delete(emoteCache.keys().next().value);
        }
        emoteCache.set(id, url);
        resolve(url);
      } catch (e) { emoteCache.delete(id); reject(e); }
    };
    im.onerror = () => { emoteCache.delete(id); reject(new Error("emote load failed")); };
    im.src = `https://files.kick.com/emotes/${id}/fullsize`;
  });
  emoteCache.set(id, p);
  return p;
}

function appendEmote(el, id, alt) {
  const img = document.createElement("img");
  img.className = "bubble__emote";
  img.alt = alt;
  const u = emoteUrl(id);
  if (typeof u === "string") {
    img.src = u;
  } else {
    u.then(
      (url) => { img.src = url; },
      () => { img.replaceWith(document.createTextNode(alt)); }
    );
  }
  el.appendChild(img);
}

function renderContent(el, content) {
  const re = /\[emote:(\d+):([^\]]*)\]/g;
  let last = 0, m, emotes = 0;
  while ((m = re.exec(content))) {
    if (m.index > last) el.appendChild(document.createTextNode(content.slice(last, m.index)));
    if (++emotes <= MAX_EMOTES) {
      appendEmote(el, m[1], m[2]);
    } else {
      el.appendChild(document.createTextNode(m[2]));
    }
    last = re.lastIndex;
  }
  if (last < content.length) el.appendChild(document.createTextNode(content.slice(last)));
}

function normalize(content) {
  return content.trim().toLowerCase().replace(/\s+/g, " ");
}

function onMessage({ user, color, content, mine = false, channel = null }) {
  ticks.push(performance.now());

  addFeedRow(user, color, content, channel);

  const key = normalize(content);
  const hit = recent.get(key);
  if (hit && performance.now() < hit.expires && document.body.contains(hit.el)) {
    // merge: grow the existing bubble instead of spawning a clone
    hit.count += 1;
    hit.expires = performance.now() + MERGE_WINDOW;
    hit.el.classList.add("bubble--combo");
    hit.badge.textContent = `×${hit.count}`;
    hit.badge.style.display = "block";
    const scale = Math.min(1 + Math.log2(hit.count) * 0.28, 2.6);
    hit.el.style.setProperty("--scale", scale);
    hit.speed = Math.max(hit.speed * 0.82, 12); // combos linger — they rise slower
    return;
  }

  spawnBubble({ user, color, content, mine, key, channel });
}

/* ── bubbles ────────────────────────────── */
const active = new Set();

function spawnBubble({ user, color, content, mine, key, channel }) {
  const el = document.createElement("div");
  el.className = "bubble" + (mine ? " bubble--mine" : "");

  if (channel) {
    const tag = document.createElement("span");
    tag.className = "bubble__chan";
    tag.textContent = "▶ " + channel;
    el.appendChild(tag);
    el.classList.add("bubble--link");
    el.title = `Open kick.com/${channel}`;
    el.addEventListener("click", () => window.open(`https://kick.com/${channel}`, "_blank"));
  }

  const u = document.createElement("span");
  u.className = "bubble__user";
  u.style.color = color;
  u.textContent = user;
  el.appendChild(u);
  renderContent(el, content);

  const badge = document.createElement("span");
  badge.className = "bubble__combo";
  badge.style.display = "none";
  el.appendChild(badge);

  // Wrapper handles motion via transform (compositor-only); the bubble itself
  // keeps its centering + combo-scale transform separate.
  const wrap = document.createElement("div");
  wrap.className = "bubble-wrap";
  wrap.style.left = 8 + Math.random() * 84 + "%";
  wrap.appendChild(el);
  stage.appendChild(wrap);

  const bubble = {
    el, wrap, badge, count: 1,
    y: -80,
    speed: 34 + Math.random() * 22, // px/sec
    drift: (Math.random() - 0.5) * 14,
    expires: performance.now() + MERGE_WINDOW,
  };
  active.add(bubble);
  recent.set(key, bubble);

  // cap population — drop the oldest
  if (active.size > MAX_BUBBLES) {
    const oldest = active.values().next().value;
    removeBubble(oldest);
  }
}

function removeBubble(b) {
  active.delete(b);
  b.wrap.remove();
  for (const [k, v] of recent) if (v === b) recent.delete(k);
}

let lastFrame = performance.now();
function frame(now) {
  const dt = (now - lastFrame) / 1000;
  lastFrame = now;
  const h = stage.clientHeight;

  for (const b of Array.from(active)) {
    b.y += b.speed * dt;
    const x = Math.sin(b.y / 60) * b.drift;
    b.wrap.style.transform = `translate(${x}px, ${-b.y}px)`;
    const remaining = h - b.y;
    if (remaining < 120) b.wrap.style.opacity = Math.max(remaining / 120, 0);
    if (b.y > h + 40) removeBubble(b);
  }

  updateHype(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ── hype meter ─────────────────────────── */
let lastHypePaint = 0;
function updateHype(now) {
  while (ticks.length && now - ticks[0] > 5000) ticks.shift();
  if (now - lastHypePaint < 200) return; // DOM writes 5×/s is plenty
  lastHypePaint = now;
  const rate = ticks.length / 5; // msgs per second
  const pct = Math.min((rate / 8) * 100, 100);
  hypeFill.style.width = pct + "%";
  hypeRate.textContent = rate.toFixed(1) + "/s";
  document.body.classList.toggle("hype", rate >= 5);
}

/* ── classic feed ───────────────────────── */
// The feed is hidden by default — keep messages as plain data and only build
// DOM (rows + emote images) while it's actually visible.
const feedBuffer = [];
const FEED_MAX = 150;

function buildFeedRow({ user, color, content, channel }) {
  const row = document.createElement("div");
  if (channel) {
    const a = document.createElement("a");
    a.className = "feed__chan";
    a.href = `https://kick.com/${channel}`;
    a.target = "_blank";
    a.textContent = `[${channel}] `;
    row.appendChild(a);
  }
  const u = document.createElement("span");
  u.className = "bubble__user";
  u.style.color = color;
  u.textContent = user + ": ";
  row.appendChild(u);
  renderContent(row, content);
  return row;
}

function addFeedRow(user, color, content, channel) {
  feedBuffer.push({ user, color, content, channel });
  if (feedBuffer.length > FEED_MAX) feedBuffer.shift();
  if (document.getElementById("feed").classList.contains("feed--hidden")) return;
  feedList.appendChild(buildFeedRow({ user, color, content, channel }));
  while (feedList.children.length > FEED_MAX) feedList.firstChild.remove();
  feedList.scrollTop = feedList.scrollHeight;
}

document.getElementById("feed-toggle").addEventListener("click", () => {
  const hidden = document.getElementById("feed").classList.toggle("feed--hidden");
  if (hidden) {
    feedList.textContent = ""; // drop the rows while invisible
  } else {
    for (const msg of feedBuffer) feedList.appendChild(buildFeedRow(msg));
    feedList.scrollTop = feedList.scrollHeight;
  }
});

/* ── live connection (Kick via shared firehose/live-client.js) ──── */
async function connect(slugs) {
  if (typeof slugs === "string") slugs = [slugs];
  startDemo(); // keep the pit alive while chatrooms resolve
  if (!window.KickFirehose) {
    setStatus("err", "live client missing — demo mode");
    return;
  }
  setStatus("off", `resolving ${slugs.length} channel${slugs.length > 1 ? "s" : ""}…`);
  const result = await KickFirehose.connect(slugs, {
    apiBase: "",
    onStatus: (mode, text) => {
      if (mode === "live") {
        setStatus("live", text);
        stopDemo();
      } else if (mode === "connecting") {
        setStatus("off", text);
      } else {
        setStatus("err", (text || "disconnected") + " — demo mode");
        startDemo();
      }
    },
    onMessage: (msg) => {
      onMessage({
        user: msg.user,
        color: msg.color || colorFor(msg.user || "?"),
        content: msg.content || "",
        channel: msg.channel || null,
      });
    },
  });
  if (!result || !result.ok) {
    setStatus("err", "couldn't reach any channel — demo mode");
    startDemo();
  }
}

async function connectTop() {
  try {
    const res = await fetch("/api/live");
    const data = await res.json();
    const slugs = (data.channels || []).map((c) => c.slug).slice(0, 2);
    if (!slugs.length) throw new Error("no live channels");
    await connect(slugs);
  } catch {
    setStatus("err", "couldn't load top channels — demo mode");
    startDemo();
  }
}

function disconnect() {
  if (window.KickFirehose) KickFirehose.disconnect();
  ws = null;
}

/* ── demo mode ──────────────────────────── */
const DEMO_USERS = ["pogfan42", "kickenjoyer", "trainbtw", "gigachadx", "mod_sarah", "lurker9000", "emotespam", "chatterbox"];
const DEMO_MSGS = [
  "W", "W", "W streamer", "LOL", "LOL", "no shot", "clip it",
  "KEKW", "KEKW", "he's cracked", "actual insane", "chat is this real",
  "GG", "GG", "first time?", "ratio", "let's gooo", "COOKED", "COOKED",
  "pause", "?????", "banger stream today", "mods asleep", "W take",
];

function startDemo() {
  if (demoTimer) return;
  const tick = () => {
    const user = DEMO_USERS[(Math.random() * DEMO_USERS.length) | 0];
    const text = DEMO_MSGS[(Math.random() * DEMO_MSGS.length) | 0];
    onMessage({ user, color: colorFor(user), content: text });
    // occasionally simulate a hype burst
    const burst = Math.random() < 0.06;
    playRateBase = burst ? 220 : 1400 + Math.random() * 900;
    demoTimer = setTimeout(tick, playRateBase);
  };
  demoTimer = setTimeout(tick, 300);
}

function stopDemo() {
  clearTimeout(demoTimer);
  demoTimer = null;
}

/* ── UI wiring ──────────────────────────── */
document.getElementById("connect-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const slug = document.getElementById("slug-input").value.trim().toLowerCase();
  if (slug) connect(slug);
});

const msgInput = document.getElementById("msg-input");
function sendMine() {
  const text = msgInput.value.trim();
  if (!text) return;
  msgInput.value = "";
  onMessage({ user: "you", color: "#7c5cff", content: text, mine: true });
}
document.getElementById("msg-send").addEventListener("click", sendMine);
msgInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMine(); });

// live-channel suggestions
(async () => {
  try {
    const res = await fetch("/api/live");
    const data = await res.json();
    const box = document.getElementById("suggest");
    const all = document.createElement("button");
    all.className = "suggest__chip";
    all.textContent = "★ top 2";
    all.addEventListener("click", connectTop);
    box.appendChild(all);
    for (const ch of data.channels || []) {
      const chip = document.createElement("button");
      chip.className = "suggest__chip";
      chip.textContent = `${ch.slug} · ${Intl.NumberFormat().format(ch.viewers)} watching`;
      chip.addEventListener("click", () => {
        document.getElementById("slug-input").value = ch.slug;
        connect(ch.slug);
      });
      box.appendChild(chip);
    }
  } catch { /* suggestions are optional */ }
})();

// auto-join the top 15 live channels' chats on load
connectTop();
