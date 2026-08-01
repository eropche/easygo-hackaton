/* ═══════════════════════════════════════════════════════════
   KICK CIRCLES — Team 1 prototype
   Pillars: Belong · Play · Prove
   ═══════════════════════════════════════════════════════════ */

const KEY = 'kickCircles.v4';

const REACTIONS = ['😂', '🔥', '💀', '👀', '❓', '👏'];
const DAILY_CAP = 200;

const DEFAULT = {
  xp: 240,
  score: 1740,
  streak: 3,
  dailyEarned: 0,
  reactionsGiven: 0,
  clipsSubmitted: 0,
  chatMessages: 0,
  questionsAsked: 0,
  styleSeen: [],
  collective: 7420,
  pollVote: null,
  prediction: { side: null, bet: 100, resolved: false },
  stormTeam: null,
  stormA: 412,
  stormB: 389,
  quizAnswer: null,
  joined: ['irl-chaos', 'late-night'],
  selected: 'irl-chaos',
  missionCounts: { 'irl-chaos': 36, 'late-night': 11, 'clip-hunters': 0 },
  tasks: {},
  look: { avatar: '🐰', frame: 'kick', title: 'member', color: '#53fc18', effect: 'none', flair: 'none', bubble: 'plain' },
  msgReacts: {},
  myReacts: {},
  privacy: { hideMembership: true, showLeaderboard: false, slowMode: true, ageGate: true },
  notifs: [
    { id: 'n1', icon: '🔥', title: 'IRL Chaos is peaking', body: '3 connected creators are live right now', read: false },
    { id: 'n2', icon: '🎬', title: 'Weekly mission at 72%', body: '14 more clips to finish Catch the chaos', read: false },
    { id: 'n3', icon: '✉️', title: 'You have a pending invitation', body: 'Clip Hunters — you qualified 2 days ago', read: false },
  ],
  seenInvite: false,
};

/* ─── CIRCLE DATA ──────────────────────────────────────── */

const CIRCLES = [
  {
    id: 'irl-chaos', name: 'IRL Chaos', state: 'live', stateLabel: '3 creators live',
    desc: 'High-energy IRL creators linked by repeat co-watching, collabs and shared clip activity.',
    topic: 'High-energy IRL', formed: '14 days ago', lifespan: 'Seasonal', members: 1284,
    creators: ['Clavicular', 'N3on', 'Placeholder1'],
    linked: ['ChaosKid', 'StreetCam'],
    reasons: [
      { n: 3, t: 'connected creators you return to' },
      { n: 7, t: 'different days watched in the last 28' },
      { n: 4, t: 'clips saved from this cluster' },
      { n: 2, t: 'creators discovered through the Circle' },
    ],
    dims: { Consistency: 620, Participation: 510, Contribution: 430, Discovery: 180 },
    mission: { title: 'Catch the chaos', desc: 'Find and approve 50 moments from connected streams.', max: 50 },
    detect: { overlap: '62%', creators: 3, active: 1284, stable: '14 days', floor: 'passed' },
  },
  {
    id: 'late-night', name: 'Late Night Watchers', state: 'quiet', stateLabel: 'quiet · 0 live',
    desc: 'Overlap driven by time-of-day. You watch these creators after 11pm on the same nights.',
    topic: 'Time-of-day cluster', formed: '31 days ago', lifespan: 'Rolling', members: 642,
    creators: ['MoonMile', 'Sleepless', 'DJ_Vega', 'QuietCam'],
    linked: ['NightBus'],
    reasons: [
      { n: 4, t: 'creators watched after 11pm' },
      { n: 12, t: 'late sessions in the last 28 days' },
      { n: 1, t: 'clip saved from this cluster' },
    ],
    dims: { Consistency: 480, Participation: 190, Contribution: 90, Discovery: 240 },
    mission: { title: 'Keep the lights on', desc: 'Circle sends 30 messages during a quiet hour.', max: 30 },
    detect: { overlap: '44%', creators: 4, active: 642, stable: '31 days', floor: 'near floor' },
  },
  {
    id: 'clip-hunters', name: 'Clip Hunters', state: 'invite', stateLabel: 'invited',
    desc: 'Viewers who consistently clip and vote on moments across several creators. You qualified 2 days ago.',
    topic: 'Behavioural cluster', formed: '6 days ago', lifespan: 'Seasonal', members: 318,
    creators: ['Clavicular', 'N3on', 'FrameByFrame', 'CutKing', 'ReelRat'],
    linked: ['ClipVault'],
    reasons: [
      { n: 9, t: 'clips you submitted that got approved' },
      { n: 5, t: 'creators you clip from regularly' },
      { n: 41, t: 'votes you cast on other members\u2019 clips' },
    ],
    dims: { Consistency: 300, Participation: 420, Contribution: 610, Discovery: 350 },
    mission: { title: 'Clip of the week', desc: 'Circle nominates and votes 25 clips into the weekly reel.', max: 25 },
    detect: { overlap: '58%', creators: 5, active: 318, stable: '6 days', floor: 'passed' },
  },
];

const DIM_META = [
  { key: 'Consistency', weight: 0.30, color: 'var(--kick)' },
  { key: 'Participation', weight: 0.25, color: 'var(--blue)' },
  { key: 'Contribution', weight: 0.25, color: 'var(--purple)' },
  { key: 'Discovery', weight: 0.20, color: 'var(--gold)' },
];

const CHAT_CIRCLE = [
  { id: 's1', system: true, text: 'IRL Chaos Circle chat · slow mode 30s · Circle rules apply' },
  { id: 'm1', author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'That rooftop jump was unreal. Clip is up.', reacts: { '🔥': 12, '😂': 3 } },
  { id: 'm2', author: 'ClipLord', badge: 'sub', badgeText: 'SUB 8', color: '#b06cff', text: 'Weekly mission at 72% — keep the clips relevant', reacts: { '👏': 5 } },
  { id: 'm3', author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'wait is he actually going into the arcade', reacts: { '👀': 9, '😂': 2 } },
  { id: 'm4', author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'Emote Storm is live — pick your side below', reacts: {} },
  { id: 'm5', author: 'KEKWKing', text: 'what camera is he using tho', reacts: { '❓': 7 } },
  { id: 'm6', author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'N3on just went live too, circle is stacked tonight', reacts: { '🔥': 6 } },
];

const CHAT_STREAM = [
  { id: 't1', system: true, text: 'Welcome to the chat room!' },
  { id: 't2', author: 'randomviewer91', text: 'W stream', reacts: {} },
  { id: 't3', author: 'gg_enjoyer', text: 'first time here, this is cool', reacts: {} },
  { id: 't4', author: 'xX_noscope_Xx', text: 'GO LEFT', reacts: {} },
  { id: 't5', author: 'chatlurker', text: 'LEFT LEFT LEFT', reacts: {} },
];

const CLIPS = [
  { icon: '🏙️', title: 'Rooftop jump', by: 'Clavicular', reacts: 247 },
  { icon: '🎰', title: 'Arcade meltdown', by: 'N3on', reacts: 189 },
  { icon: '🍜', title: 'Spicy noodle dare', by: 'Clavicular', reacts: 156 },
  { icon: '🚕', title: 'Taxi negotiation', by: 'Placeholder1', reacts: 121 },
];

const TASKS = [
  { id: 'react', kind: 'daily', icon: '🔥', title: 'React 10 times', desc: 'Use message reactions in Circle chat. Lowest-friction way to participate.', xp: 40, max: 10, dim: 'Participation', action: 'Go to chat', view: 'stream' },
  { id: 'clip', kind: 'daily', icon: '📎', title: 'Submit a chaos clip', desc: 'Share a moment from any connected creator. The Circle votes it in.', xp: 80, max: 1, dim: 'Contribution', action: 'Submit clip', view: null },
  { id: 'poll', kind: 'daily', icon: '🗳️', title: 'Vote in a Circle poll', desc: 'Help the Circle decide what a creator should do next.', xp: 30, max: 1, dim: 'Participation', action: 'Open poll', view: 'stream' },
  { id: 'predict', kind: 'daily', icon: '🎯', title: 'Back a prediction', desc: 'Stake Circle XP on a binary outcome. Pool splits between winners.', xp: 60, max: 1, dim: 'Participation', action: 'Open prediction', view: 'stream' },
  { id: 'storm', kind: 'daily', icon: '😂', title: 'Join an Emote Storm', desc: 'Pick a side in the team emote battle during a hype moment.', xp: 50, max: 1, dim: 'Participation', action: 'Join storm', view: 'stream' },
  { id: 'quiz', kind: 'daily', icon: '🧠', title: 'Daily Circle quiz', desc: 'Trivia about connected creators. Wrong answers still earn a little.', xp: 120, max: 1, dim: 'Discovery', action: 'Take quiz', view: 'stream' },
  { id: 'chat', kind: 'daily', icon: '💬', title: 'Quality chat ×5', desc: 'Five messages in slow mode. Volume alone earns nothing.', xp: 60, max: 5, dim: 'Participation', action: 'Go to chat', view: 'stream' },
  { id: 'raid', kind: 'daily', icon: '🚀', title: 'Join a raid squad', desc: 'Coordinate with 3+ members to support a connected creator.', xp: 100, max: 1, dim: 'Contribution', action: 'Find squad', view: null },
  { id: 'discover', kind: 'daily', icon: '🔭', title: 'Discover a creator', desc: 'Watch 10 min of a Circle creator you have not seen this week.', xp: 90, max: 1, dim: 'Discovery', action: 'Explore', view: null },
  { id: 'mission', kind: 'weekly', icon: '🎬', title: 'Weekly mission', desc: 'The whole Circle works on one goal together. Co-op — no one competes.', xp: 200, max: 50, dim: 'Contribution', action: 'Contribute', view: null },
];

const PASS_TIERS = [
  { n: 1, icon: '🟢', name: 'Member', req: 'Join a Circle', at: 0 },
  { n: 2, icon: '😂', name: 'Chaos emote', req: '50 reactions given', at: 300 },
  { n: 3, icon: '🖼️', name: 'Profile frame', req: 'Submit 1 clip', at: 450 },
  { n: 4, icon: '🔭', name: 'Scout title', req: '3-day streak', at: 600 },
  { n: 5, icon: '✨', name: 'Animated reaction', req: 'Complete a raid squad', at: 800 },
  { n: 6, icon: '🎁', name: 'Mystery drop', req: 'Weekly mission complete', at: 1000 },
  { n: 7, icon: '👑', name: 'Clip Hunter role', req: 'Top 25% contribution', at: 1300 },
];

const ROLES = [
  { id: 'newcomer', ic: '🌱', name: 'Newcomer', req: 'Join a Circle', at: 0 },
  { id: 'scout', ic: '🔭', name: 'Scout', req: '300 XP · 3 quests', at: 300 },
  { id: 'hunter', ic: '🎯', name: 'Clip Hunter', req: '1 approved clip · 600 XP', at: 600 },
  { id: 'captain', ic: '👑', name: 'Circle Captain', req: 'Top 10% of the season', at: 1200 },
  { id: 'founder', ic: '⭐', name: 'Founding Member', req: 'Season 04 original', at: 2500 },
];

const TIERS = [
  { ic: '🥉', nm: 'Bronze', xp: 0 },
  { ic: '🥈', nm: 'Silver', xp: 500 },
  { ic: '🥇', nm: 'Gold', xp: 1000 },
  { ic: '💎', nm: 'Platinum', xp: 1800 },
  { ic: '🔥', nm: 'Chaos', xp: 3000 },
];

const AVATARS = ['🐰', '🦊', '👻', '🎮', '🔥', '⚡', '🐙', '🌙'];
const FRAMES = {
  kick: { label: 'Kick Green', color: '#53fc18', at: 0 },
  chaos: { label: 'Chaos Purple', color: '#b06cff', at: 400 },
  gold: { label: 'Season Gold', color: '#ffb020', at: 700 },
  neon: { label: 'Neon Pink', color: '#ff5c8a', at: 1100 },
};
const TITLES = {
  member: { label: 'IRL Chaos Member', at: 0 },
  scout: { label: 'IRL Chaos Scout', at: 300 },
  hunter: { label: 'Clip Hunter', at: 600 },
  captain: { label: 'Circle Captain', at: 1200 },
};
const COLORS = ['#53fc18', '#5eb7ff', '#ffb020', '#ff5c8a', '#b06cff', '#ffffff'];

/* ─── CHAT IDENTITY ────────────────────────────────────────
   Every unlock below is earned from chat behaviour, so the
   same signals that power the insights also power identity.
   ──────────────────────────────────────────────────────── */

const NAME_FX = {
  none: { label: 'Plain', hint: 'Default', test: () => true },
  glow: { label: 'Glow', hint: 'Send 3 messages', test: (s) => s.chatMessages >= 3 },
  gradient: { label: 'Fade', hint: 'Give 10 reactions', test: (s) => s.reactionsGiven >= 10 },
  rainbow: { label: 'Chaos', hint: 'Reach 600 XP', test: (s) => s.xp >= 600 },
};

const FLAIRS = {
  none: { label: 'No flair', ic: '', hint: 'Default', test: () => true },
  night: { label: 'First Nighter', ic: '🌙', hint: 'Default', test: () => true },
  regular: { label: 'Regular', ic: '♦', hint: 'Send 5 messages', test: (s) => s.chatMessages >= 5 },
  asker: { label: 'Asker', ic: '❓', hint: 'Ask 3 questions', test: (s) => s.questionsAsked >= 3 },
  reactor: { label: 'Reactor', ic: '🔥', hint: 'Give 10 reactions', test: (s) => s.reactionsGiven >= 10 },
  clipper: { label: 'Clipper', ic: '🎬', hint: 'Submit a clip', test: (s) => s.clipsSubmitted >= 1 },
};

const BUBBLES = {
  plain: { label: 'Plain', hint: 'Default', test: () => true },
  tint: { label: 'Tinted', hint: 'Send 1 message', test: (s) => s.chatMessages >= 1 },
  outline: { label: 'Edge', hint: 'Give 5 reactions', test: (s) => s.reactionsGiven >= 5 },
  card: { label: 'Card', hint: 'Submit a clip', test: (s) => s.clipsSubmitted >= 1 },
};

const STYLE_SETS = [
  { kind: 'effect', title: 'Name effect', map: NAME_FX },
  { kind: 'flair', title: 'Chat flair', map: FLAIRS },
  { kind: 'bubble', title: 'Message style', map: BUBBLES },
];

function styleCatalog() {
  return STYLE_SETS.flatMap((s) => Object.entries(s.map).map(([k, v]) => ({ id: `${s.kind}:${k}`, ...v })));
}

function checkStyleUnlocks(silent = false) {
  styleCatalog().forEach((it) => {
    if (it.test(S) && !S.styleSeen.includes(it.id)) {
      S.styleSeen.push(it.id);
      if (!silent && it.hint !== 'Default') {
        toast('Chat style unlocked', `${it.label} — earned from how you chat`, '🎨');
      }
    }
  });
  save();
}

function myLook() {
  const L = S.look;
  const f = FLAIRS[L.flair] || FLAIRS.none;
  return {
    cls: `msg mine bub-${L.bubble}`,
    style: `--nc:${L.color}`,
    nameCls: `msg-author fx-${L.effect}`,
    nameStyle: `--nc:${L.color};color:${L.color}`,
    flair: L.flair && L.flair !== 'none' ? `<span class="flair">${f.ic} ${f.label}</span>` : '',
  };
}

const COLLECTIBLES = [
  { id: 'member', ic: '🟢', nm: 'Circle Member', at: 0 },
  { id: 'clipcard', ic: '🎬', nm: 'Clip Card', at: 350 },
  { id: 'storm', ic: '🌪️', nm: 'Storm Survivor', at: 500 },
  { id: 'quiz', ic: '🧠', nm: 'Quiz Whiz', at: 700 },
  { id: 'raid', ic: '🚀', nm: 'Raid Runner', at: 900 },
  { id: 'frame', ic: '🖼️', nm: 'Framed', at: 1100 },
  { id: 'season', ic: '🏅', nm: 'Season 04', at: 1400 },
  { id: 'legend', ic: '⭐', nm: 'Chaos Legend', at: 2000 },
];

const ACHIEVEMENTS = [
  { id: 'firstReact', ic: '🔥', nm: 'First Reaction', test: (s) => s.reactionsGiven >= 1 },
  { id: 'react25', ic: '💥', nm: '25 Reactions', test: (s) => s.reactionsGiven >= 25 },
  { id: 'firstClip', ic: '📎', nm: 'First Clip', test: (s) => s.clipsSubmitted >= 1 },
  { id: 'voter', ic: '🗳️', nm: 'Voice of Circle', test: (s) => s.pollVote !== null },
  { id: 'gambler', ic: '🎯', nm: 'Oracle', test: (s) => s.prediction.resolved },
  { id: 'quiz', ic: '🧠', nm: 'Quiz Master', test: (s) => s.quizAnswer === 1 },
  { id: 'streak', ic: '📅', nm: '3-Day Streak', test: (s) => s.streak >= 3 },
  { id: 'chatty', ic: '💬', nm: 'Contributor', test: (s) => s.chatMessages >= 5 },
  { id: 'multi', ic: '◎', nm: 'Multi-Circle', test: (s) => s.joined.length >= 3 },
];

const LEADERBOARD = [
  { nm: 'NightOwl', role: 'Captain', score: 2240 },
  { nm: 'ClipLord', role: 'Clip Hunter', score: 1980 },
  { nm: 'SpookyBunny', role: 'Scout', score: 1740, me: true },
  { nm: 'TokyoDrift', role: 'Scout', score: 1620 },
  { nm: 'PixelPam', role: 'Newcomer', score: 1510 },
];

const POLL = {
  q: 'Where should the crew go next?',
  sub: 'Circle poll · closes in 45s · 1,284 members',
  options: [{ t: 'Arcade', v: 512 }, { t: 'Rooftop bar', v: 388 }, { t: 'Ramen alley', v: 244 }],
};

const PREDICTION = {
  q: 'Does he make it into the arcade before it closes?',
  sub: 'Stake Circle XP · pool splits between winners',
  options: ['Yes, he makes it', 'No, too late'],
};

const QUIZ = {
  q: 'Which connected creator streamed from Tokyo first?',
  options: ['Clavicular', 'N3on', 'Placeholder1'],
  correct: 1,
};

const PULSE_BASE = { '😂': 34, '🔥': 61, '💀': 8, '👀': 27, '❓': 14, '👏': 11 };

/* ─── STATE ────────────────────────────────────────────── */

let S = load();
let activeChat = 'circle';
let activeEvent = 'poll';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      const d = structuredClone(DEFAULT);
      return {
        ...d, ...p,
        look: { ...d.look, ...(p.look || {}) },
        privacy: { ...d.privacy, ...(p.privacy || {}) },
        missionCounts: { ...d.missionCounts, ...(p.missionCounts || {}) },
      };
    }
  } catch (e) { /* fall back to defaults */ }
  return structuredClone(DEFAULT);
}

const save = () => localStorage.setItem(KEY, JSON.stringify(S));
const $ = (id) => document.getElementById(id);

/* ─── DERIVED ──────────────────────────────────────────── */

const level = () => Math.floor(S.xp / 250) + 1;
const levelPct = () => ((S.xp % 250) / 250) * 100;
const sel = () => CIRCLES.find((c) => c.id === S.selected) || CIRCLES[0];
const missionCount = () => S.missionCounts[S.selected] || 0;

function currentRole() { let r = ROLES[0]; for (const x of ROLES) if (S.xp >= x.at) r = x; return r; }
function currentTier() { let t = TIERS[0]; for (const x of TIERS) if (S.xp >= x.xp) t = x; return t; }
function passTier() { let n = 0; for (const t of PASS_TIERS) if (S.xp >= t.at) n = t.n; return n; }

/* ─── NOTIFICATIONS ────────────────────────────────────── */

function toast(title, body, icon = '✦') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<b>${icon} ${title}</b>${body}`;
  $('toastStack').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3200);

  S.notifs.unshift({ id: `n${Date.now()}${Math.random()}`, icon, title, body, read: false });
  S.notifs = S.notifs.slice(0, 12);
  save();
  renderNotifs();
}

function renderNotifs() {
  const unread = S.notifs.filter((n) => !n.read).length;
  const dot = $('bellDot');
  dot.textContent = unread;
  dot.style.display = unread ? 'grid' : 'none';

  $('notifList').innerHTML = S.notifs.length
    ? S.notifs.map((n) => `
        <div class="notif ${n.read ? '' : 'unread'}">
          <span class="notif-ic">${n.icon}</span>
          <div><b>${n.title}</b><small>${n.body}</small></div>
        </div>`).join('')
    : '<div class="notif-empty">Nothing yet</div>';
}

/* ─── REWARDS ──────────────────────────────────────────── */

function award(xp, label) {
  const beforeTier = passTier();
  const beforeRole = currentRole().id;

  S.xp += xp;

  const room = Math.max(0, DAILY_CAP - S.dailyEarned);
  const gain = Math.min(room, Math.round(xp * 1.5));
  S.score += gain;
  S.dailyEarned += gain;
  save();

  if (gain === 0 && xp > 0) toast('Daily cap reached', 'XP still earned, Circle Score is capped at 200/day', '🛑');
  else toast(`+${xp} XP`, label, '✦');

  if (passTier() > beforeTier) {
    const t = PASS_TIERS.find((x) => x.n === passTier());
    setTimeout(() => toast('Circle Pass unlocked', `Tier ${t.n} · ${t.name} ${t.icon}`, '🎖️'), 550);
  }
  if (currentRole().id !== beforeRole) {
    setTimeout(() => toast('Role promotion', `You are now ${currentRole().name} ${currentRole().ic}`, '👑'), 950);
  }
  renderAll();
}

function bumpTask(id, amount = 1) {
  const t = TASKS.find((x) => x.id === id);
  if (!t) return;
  const cur = S.tasks[id] || 0;
  if (cur >= t.max) return;
  S.tasks[id] = Math.min(t.max, cur + amount);
  save();
  if (S.tasks[id] >= t.max) award(t.xp, `Quest complete · ${t.title}`);
  else renderTasks();
}

/* ─── HEADER ───────────────────────────────────────────── */

function renderHeader() {
  $('hdrLevel').textContent = `Lv.${level()}`;
  $('hdrLevelBar').style.width = `${levelPct()}%`;
  $('hdrXp').textContent = `${S.xp} XP`;
  $('hdrAvatar').textContent = S.look.avatar;
  $('hdrRole').textContent = currentRole().name;
}

/* ─── STREAM ───────────────────────────────────────────── */

function renderStrip() {
  const c = CIRCLES[0];
  const pct = Math.round((S.missionCounts['irl-chaos'] / c.mission.max) * 100);
  $('stripMission').textContent = `${pct}%`;
  $('stripBar').style.width = `${pct}%`;
  $('stripScore').textContent = S.score.toLocaleString();
}

function renderClips() {
  $('clipsRow').innerHTML = CLIPS.map((c) => `
    <div class="clip-card">
      <div class="clip-thumb">${c.icon}<span class="clip-reacts">🔥 ${c.reacts}</span></div>
      <div class="clip-body"><div class="clip-title">${c.title}</div><div class="clip-by">${c.by}</div></div>
    </div>`).join('');
}

const chatData = () => (activeChat === 'circle' ? CHAT_CIRCLE : CHAT_STREAM);

function renderChat() {
  $('chatContext').textContent = activeChat === 'circle'
    ? `Shared across 3 connected creators · ${S.privacy.slowMode ? 'slow mode' : 'open'} · Circle mods active`
    : 'Clavicular channel chat · standard Kick chat';

  $('chatBody').innerHTML = chatData().map((m) => {
    if (m.system) return `<div class="msg system">${m.text}</div>`;
    const stored = S.msgReacts[m.id] || {};
    const all = {};
    [...Object.keys(m.reacts || {}), ...Object.keys(stored)].forEach((k) => {
      all[k] = ((m.reacts || {})[k] || 0) + (stored[k] || 0);
    });
    const mine = S.myReacts[m.id] || [];
    const pills = Object.entries(all).filter(([, v]) => v > 0)
      .map(([e, v]) => `<button class="react-pill ${mine.includes(e) ? 'on' : ''}" data-react="${m.id}" data-emo="${e}">${e} ${v}</button>`).join('');
    const badge = m.badge ? `<span class="msg-badge b-${m.badge}">${m.badgeText}</span>` : '';
    const k = m.mine ? myLook() : null;
    const head = k
      ? `${k.flair}<span class="${k.nameCls}" style="${k.nameStyle}">${m.author}</span>`
      : `${badge}<span class="msg-author" style="color:${m.color || '#c9d6dc'}">${m.author}</span>`;
    return `
      <div class="${k ? k.cls : 'msg'}" style="${k ? k.style : ''}">
        <div class="msg-line">${head}${m.text}</div>
        <div class="msg-reacts">${pills}<button class="react-add" data-picker="${m.id}">+</button></div>
        <div class="react-picker" id="pick-${m.id}">
          ${REACTIONS.map((e) => `<button data-react="${m.id}" data-emo="${e}">${e}</button>`).join('')}
        </div>
      </div>`;
  }).join('');

  $('chatBody').scrollTop = $('chatBody').scrollHeight;

  $('chatBody').querySelectorAll('[data-picker]').forEach((b) => {
    b.onclick = () => {
      const p = $(`pick-${b.dataset.picker}`);
      document.querySelectorAll('.react-picker.open').forEach((o) => { if (o !== p) o.classList.remove('open'); });
      p.classList.toggle('open');
    };
  });
  $('chatBody').querySelectorAll('[data-react]').forEach((b) => {
    b.onclick = () => addReaction(b.dataset.react, b.dataset.emo);
  });
}

function addReaction(msgId, emo) {
  S.myReacts[msgId] = S.myReacts[msgId] || [];
  S.msgReacts[msgId] = S.msgReacts[msgId] || {};
  const mine = S.myReacts[msgId];

  if (mine.includes(emo)) {
    mine.splice(mine.indexOf(emo), 1);
    S.msgReacts[msgId][emo] = Math.max(0, (S.msgReacts[msgId][emo] || 0) - 1);
    S.collective = Math.max(0, S.collective - 1);
  } else {
    mine.push(emo);
    S.msgReacts[msgId][emo] = (S.msgReacts[msgId][emo] || 0) + 1;
    S.reactionsGiven += 1;
    S.collective += 1;
    bumpTask('react');
  }
  document.querySelectorAll('.react-picker.open').forEach((o) => o.classList.remove('open'));
  save();
  checkStyleUnlocks();
  renderChat();
  renderHeader();
  renderCollective();
  if (activeEvent === 'pulse') renderEvent();
}

function sendMessage(text) {
  chatData().push({ id: `me${Date.now()}`, author: 'SpookyBunny', mine: true, text, reacts: {} });
  S.chatMessages += 1;
  if (text.includes('?')) S.questionsAsked += 1;
  save();
  checkStyleUnlocks();
  if (activeChat === 'circle') bumpTask('chat');
  renderChat();
}

/* ─── LIVE EVENTS ──────────────────────────────────────── */

function renderEvent() {
  const map = { poll: eventPoll, prediction: eventPrediction, storm: eventStorm, quiz: eventQuiz, pulse: eventPulse };
  $('eventBody').innerHTML = (map[activeEvent] || eventPoll)();
  bindEvent();
}

function eventPoll() {
  const total = POLL.options.reduce((a, o) => a + o.v, 0) + (S.pollVote !== null ? 1 : 0);
  return `
    <div class="event-title">🗳️ ${POLL.q}</div>
    <div class="event-sub">${POLL.sub}</div>
    ${POLL.options.map((o, i) => {
      const v = o.v + (S.pollVote === i ? 1 : 0);
      const pct = Math.round((v / total) * 100);
      return `<button class="opt-btn ${S.pollVote === i ? 'picked' : ''}" data-poll="${i}">
        <span class="opt-fill" style="width:${pct}%"></span><span>${o.t}</span><span>${pct}%</span></button>`;
    }).join('')}
    <div class="event-note">${S.pollVote !== null ? '✓ Voted · +30 XP' : 'Winning option is sent to the creator overlay'}</div>`;
}

function eventPrediction() {
  const p = S.prediction;
  if (p.resolved) {
    const won = p.side === 0;
    return `
      <div class="event-title">🎯 Prediction resolved</div>
      <div class="event-sub">${PREDICTION.q}</div>
      <div class="opt-btn ${won ? 'correct' : 'wrong'}"><span>${won ? 'You won' : 'You lost'}</span><span>${won ? `+${p.bet * 2} XP` : `−${p.bet} XP`}</span></div>
      <div class="event-note">Payout splits the pool between everyone on the winning side.</div>`;
  }
  return `
    <div class="event-title">🎯 ${PREDICTION.q}</div>
    <div class="event-sub">${PREDICTION.sub}</div>
    <div class="bet-row">${[50, 100, 200].map((b) => `<button class="bet-chip ${p.bet === b ? 'on' : ''}" data-bet="${b}">${b} XP</button>`).join('')}</div>
    ${PREDICTION.options.map((o, i) => `<button class="opt-btn ${p.side === i ? 'picked' : ''}" data-pred="${i}"><span>${o}</span><span>${i === 0 ? '2.1×' : '1.8×'}</span></button>`).join('')}
    ${p.side !== null ? '<button class="primary-btn sm" id="resolveBtn" style="width:100%;margin-top:6px">Resolve (demo)</button>' : ''}
    <div class="event-note">Circle XP only — never Kicks. Status can't be bought.</div>`;
}

function eventStorm() {
  return `
    <div class="event-title">😂 Emote Storm</div>
    <div class="event-sub">Pick a side · highest count in 60s wins +50 XP</div>
    <div class="storm-vs"><div><strong>${S.stormA}</strong><span>KEKW</span></div><div><strong>${S.stormB}</strong><span>HYPE</span></div></div>
    ${S.stormTeam
      ? `<button class="primary-btn sm" style="width:100%" id="spamBtn">Spam ${S.stormTeam.toUpperCase()} 😂</button>
         <div class="event-note">You're on team ${S.stormTeam.toUpperCase()}</div>`
      : `<div style="display:flex;gap:6px">
          <button class="opt-btn" data-storm="kekw" style="margin:0"><span>Join KEKW</span></button>
          <button class="opt-btn" data-storm="hype" style="margin:0"><span>Join HYPE</span></button></div>`}`;
}

function eventQuiz() {
  const done = S.quizAnswer !== null;
  return `
    <div class="event-title">🧠 Daily Circle quiz</div>
    <div class="event-sub">${QUIZ.q}</div>
    ${QUIZ.options.map((o, i) => {
      let cls = '';
      if (done) cls = i === QUIZ.correct ? 'correct' : (i === S.quizAnswer ? 'wrong' : '');
      return `<button class="opt-btn ${cls}" data-quiz="${i}" ${done ? 'disabled' : ''}><span>${o}</span></button>`;
    }).join('')}
    <div class="event-note">${done ? (S.quizAnswer === QUIZ.correct ? '✓ Correct · +120 XP' : 'Not quite · +20 XP for trying') : 'Feeds your Discovery score'}</div>`;
}

function eventPulse() {
  const live = {};
  REACTIONS.forEach((e) => { live[e] = PULSE_BASE[e]; });
  Object.values(S.msgReacts).forEach((m) => {
    Object.entries(m).forEach(([e, v]) => { live[e] = (live[e] || 0) + v; });
  });
  const max = Math.max(...Object.values(live));
  const total = Object.values(live).reduce((a, b) => a + b, 0);
  const top = Object.entries(live).sort((a, b) => b[1] - a[1])[0];

  return `
    <div class="event-title">📊 Circle Pulse</div>
    <div class="event-sub">Reaction mix · last 10 minutes · ${total} reactions</div>
    <div class="pulse-rows">
      ${REACTIONS.map((e) => `
        <div class="pulse-row">
          <span class="pulse-emo">${e}</span>
          <div class="pulse-track"><span style="width:${(live[e] / max) * 100}%"></span></div>
          <span class="pulse-val">${live[e]}</span>
        </div>`).join('')}
    </div>
    <div class="event-note">Dominant signal <strong>${top[0]}</strong> — this is what powers clip discovery and the streamer's own insight card. Aggregate only; individual reaction history is never exposed.</div>`;
}

function bindEvent() {
  document.querySelectorAll('[data-poll]').forEach((b) => {
    b.onclick = () => { if (S.pollVote !== null) return; S.pollVote = +b.dataset.poll; save(); bumpTask('poll'); renderEvent(); };
  });
  document.querySelectorAll('[data-bet]').forEach((b) => {
    b.onclick = () => { S.prediction.bet = +b.dataset.bet; save(); renderEvent(); };
  });
  document.querySelectorAll('[data-pred]').forEach((b) => {
    b.onclick = () => { if (S.prediction.resolved) return; S.prediction.side = +b.dataset.pred; save(); bumpTask('predict'); renderEvent(); };
  });
  const rb = $('resolveBtn');
  if (rb) rb.onclick = () => {
    S.prediction.resolved = true; save();
    const won = S.prediction.side === 0;
    award(won ? S.prediction.bet * 2 : 0, won ? 'Prediction won' : 'Prediction lost');
    renderEvent();
  };
  document.querySelectorAll('[data-storm]').forEach((b) => {
    b.onclick = () => {
      S.stormTeam = b.dataset.storm;
      if (S.stormTeam === 'kekw') S.stormA += 14; else S.stormB += 14;
      save(); bumpTask('storm'); renderEvent();
    };
  });
  const sb = $('spamBtn');
  if (sb) sb.onclick = () => {
    if (S.stormTeam === 'kekw') S.stormA += Math.ceil(Math.random() * 6); else S.stormB += Math.ceil(Math.random() * 6);
    save(); renderEvent();
  };
  document.querySelectorAll('[data-quiz]').forEach((b) => {
    b.onclick = () => {
      if (S.quizAnswer !== null) return;
      S.quizAnswer = +b.dataset.quiz;
      S.tasks.quiz = 1; save();
      const right = S.quizAnswer === QUIZ.correct;
      award(right ? 120 : 20, right ? 'Quiz correct' : 'Quiz attempted');
      renderEvent();
    };
  });
}

/* ─── CIRCLES ──────────────────────────────────────────── */

function renderCircles() {
  $('circleCards').innerHTML = CIRCLES.map((c) => {
    const joined = S.joined.includes(c.id);
    const active = S.selected === c.id;
    return `
      <div class="circle-card ${joined ? 'joined' : ''} ${active ? 'active' : ''}" data-select="${c.id}">
        <div class="cc-top">
          <div class="cc-name">${c.name}</div>
          <span class="cc-state ${c.state}">${c.stateLabel}</span>
        </div>
        <p class="cc-desc">${c.desc}</p>
        <div class="cc-stats">
          <div><b>${c.members.toLocaleString()}</b>members</div>
          <div><b>${c.creators.length}</b>creators</div>
          <div><b>${c.detect.overlap}</b>overlap</div>
        </div>
        <button class="cc-btn ${joined ? '' : 'join'}" data-follow="${c.id}">${joined ? '✓ Following' : 'Follow Circle'}</button>
      </div>`;
  }).join('');

  document.querySelectorAll('[data-select]').forEach((el) => {
    el.onclick = (e) => {
      if (e.target.closest('[data-follow]')) return;
      S.selected = el.dataset.select; save(); renderCircleDetail(); renderCircles();
    };
  });
  document.querySelectorAll('[data-follow]').forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation();
      const id = b.dataset.follow;
      if (S.joined.includes(id)) return;
      S.joined.push(id); S.selected = id; save();
      award(50, `Joined ${CIRCLES.find((c) => c.id === id).name}`);
    };
  });

  renderCircleDetail();
}

function renderCircleDetail() {
  const c = sel();

  $('detailHead').innerHTML = `
    <div class="dh-left">
      <span class="dh-orb ${c.state}"></span>
      <div>
        <h2>${c.name} <span class="cc-state ${c.state}">${c.stateLabel}</span></h2>
        <p class="muted">${c.topic} · formed ${c.formed} · ${c.lifespan} lifespan · ${c.members.toLocaleString()} members</p>
      </div>
    </div>
    <div class="dh-creators">
      ${c.creators.map((n) => `<span class="creator-chip">${n}</span>`).join('')}
      ${c.linked.map((n) => `<span class="creator-chip linked">${n}</span>`).join('')}
    </div>`;

  renderMap(c);

  $('detectGrid').innerHTML = `
    <div class="detect-item"><b>${c.detect.overlap}</b><span>co-watch overlap</span></div>
    <div class="detect-item"><b>${c.detect.creators}</b><span>creators in cluster</span></div>
    <div class="detect-item"><b>${c.detect.active.toLocaleString()}</b><span>active viewers</span></div>
    <div class="detect-item"><b>${c.detect.stable}</b><span>stable for</span></div>
    <div class="detect-item ${c.detect.floor === 'passed' ? 'ok' : 'warn'}"><b>${c.detect.floor === 'passed' ? '✓' : '!'}</b><span>activity floor ${c.detect.floor}</span></div>`;

  $('detectRule').textContent =
    'launch if: creators ≥ 3  AND  co-watch overlap ≥ 40%  AND  active viewers ≥ 250  AND  stable ≥ 5 days';

  $('reasonList').innerHTML = c.reasons.map((r) =>
    `<li><span class="reason-num">${r.n}</span> ${r.t}</li>`).join('');

  const max = 700;
  $('scoreBars').innerHTML = DIM_META.map((d) => {
    const v = c.dims[d.key];
    return `<div class="sb-row">
      <span>${d.key} <span class="muted">${d.weight}</span></span>
      <div class="sb-track"><span style="width:${(v / max) * 100}%;background:${d.color}"></span></div>
      <span class="sb-val">${v}</span></div>`;
  }).join('');

  const mc = missionCount();
  $('missionDesc').textContent = `${c.mission.title} — ${c.mission.desc}`;
  $('missionBar').style.width = `${(mc / c.mission.max) * 100}%`;
  $('missionCount').textContent = `${mc} / ${c.mission.max}`;
  $('missionMembers').textContent = `${c.members.toLocaleString()} members`;

  renderCollective();

  document.querySelectorAll('[data-priv]').forEach((el) => {
    el.checked = !!S.privacy[el.dataset.priv];
    el.onchange = () => {
      S.privacy[el.dataset.priv] = el.checked; save();
      if (el.dataset.priv === 'showLeaderboard') renderRanks();
      if (el.dataset.priv === 'slowMode') renderChat();
      toast('Setting updated', `${el.dataset.priv} → ${el.checked ? 'on' : 'off'}`, '🔒');
    };
  });
}

function renderCollective() {
  const goal = 10000;
  const pct = Math.min(100, (S.collective / goal) * 100);
  $('collectiveBar').style.width = `${pct}%`;
  $('collectiveCount').textContent = `${S.collective.toLocaleString()} / ${goal.toLocaleString()} reactions`;
}

function renderMap(c) {
  const W = 600, H = 330, cx = W / 2, cy = 168;
  const nodes = [{ x: cx, y: cy, r: 26, c: 'var(--kick)', l: 'You' }];
  const n = c.creators.length;
  c.creators.forEach((name, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    nodes.push({ x: cx + Math.cos(a) * 165, y: cy + Math.sin(a) * 105, r: 19, c: 'var(--purple)', l: name });
  });
  c.linked.forEach((name, i) => {
    const a = (Math.PI * 2 * (i + 0.5)) / Math.max(1, c.linked.length) - Math.PI / 2;
    nodes.push({ x: cx + Math.cos(a) * 265, y: cy + Math.sin(a) * 135, r: 14, c: 'var(--blue)', l: name });
  });
  const circleIdx = nodes.length;
  nodes.push({ x: cx, y: H - 32, r: 24, c: 'var(--gold)', l: c.name });

  const edges = [];
  for (let i = 1; i <= n; i++) { edges.push([0, i]); edges.push([i, circleIdx]); }
  for (let i = 0; i < c.linked.length; i++) edges.push([1 + (i % n), n + 1 + i]);
  edges.push([0, circleIdx]);

  $('mapWrap').innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
      ${edges.map(([a, b]) => nodes[a] && nodes[b]
        ? `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" stroke="#2a3339" stroke-width="1.5"/>` : '').join('')}
      ${nodes.map((nd) => `
        <g>
          <circle cx="${nd.x}" cy="${nd.y}" r="${nd.r}" fill="${nd.c}" opacity="0.2"/>
          <circle cx="${nd.x}" cy="${nd.y}" r="${nd.r}" fill="none" stroke="${nd.c}" stroke-width="2"/>
          <text x="${nd.x}" y="${nd.y + nd.r + 14}" text-anchor="middle" fill="#8496a1" font-size="11" font-family="Inter">${nd.l}</text>
        </g>`).join('')}
    </svg>`;
}

/* ─── QUESTS ───────────────────────────────────────────── */

function renderTasks() {
  $('streakNum').textContent = S.streak;
  $('streakMult').textContent = `${(1 + S.streak * 0.1).toFixed(1)}× multiplier`;
  $('capText').textContent = `${S.dailyEarned} / ${DAILY_CAP}`;
  $('capBar').style.width = `${Math.min(100, (S.dailyEarned / DAILY_CAP) * 100)}%`;
  $('capNote').textContent = S.dailyEarned >= DAILY_CAP
    ? 'Cap reached — XP still earns, Circle Score does not'
    : 'Anti-grind: score stops accruing at the cap';

  const c = sel();
  $('taskGrid').innerHTML = TASKS.map((t) => {
    const weekly = t.id === 'mission';
    const cur = weekly ? missionCount() : (S.tasks[t.id] || 0);
    const max = weekly ? c.mission.max : t.max;
    const title = weekly ? `Weekly mission: ${c.mission.title}` : t.title;
    const done = cur >= max;
    return `
      <div class="task ${done ? 'done' : ''} ${weekly ? 'weekly' : ''}">
        <div class="task-top"><span class="task-icon">${t.icon}</span><span class="task-kind ${t.kind}">${t.kind}</span></div>
        <h3>${title}</h3>
        <p>${weekly ? c.mission.desc : t.desc}</p>
        <div class="task-reward">+${t.xp} XP · ${t.dim}</div>
        <div class="task-bar"><span style="width:${Math.min(100, (cur / max) * 100)}%"></span></div>
        <div class="muted" style="font-size:.72rem">${cur} / ${max}</div>
        <button class="task-btn" data-task="${t.id}" ${done ? 'disabled' : ''}>${done ? '✓ Complete' : t.action}</button>
      </div>`;
  }).join('');

  document.querySelectorAll('[data-task]').forEach((b) => { b.onclick = () => runTask(b.dataset.task); });
}

function runTask(id) {
  const t = TASKS.find((x) => x.id === id);
  if (!t) return;
  const c = sel();

  if (id === 'clip') {
    S.clipsSubmitted += 1;
    S.missionCounts[S.selected] = Math.min(c.mission.max, missionCount() + 1);
    save(); bumpTask('clip'); renderStrip(); renderCircleDetail();
    return;
  }
  if (id === 'mission') {
    S.clipsSubmitted += 1;
    S.missionCounts[S.selected] = Math.min(c.mission.max, missionCount() + 1);
    save();
    if (missionCount() >= c.mission.max) award(200, `Weekly mission complete · ${c.mission.title}`);
    else { toast('Contributed', `${c.mission.title} · ${missionCount()}/${c.mission.max}`, '🎬'); renderTasks(); renderStrip(); renderCircleDetail(); }
    return;
  }
  if (id === 'raid' || id === 'discover') { bumpTask(id); return; }

  if (t.view) {
    switchView(t.view);
    if (['poll', 'predict', 'storm', 'quiz'].includes(id)) {
      activeEvent = id === 'predict' ? 'prediction' : id;
      document.querySelectorAll('.event-tab').forEach((x) => x.classList.toggle('active', x.dataset.event === activeEvent));
      renderEvent();
    }
    toast('Opened', t.title, '↗');
  }
}

/* ─── PASS ─────────────────────────────────────────────── */

function renderPass() {
  const cur = passTier();
  $('passBar').style.width = `${(cur / PASS_TIERS.length) * 100}%`;
  $('passLabel').textContent = `Tier ${cur} of ${PASS_TIERS.length}`;
  $('passTrack').innerHTML = PASS_TIERS.map((t) => {
    const on = S.xp >= t.at;
    return `<div class="pass-tier ${on ? 'unlocked' : 'locked'}">
      ${on ? '<span class="pt-check">✓</span>' : ''}
      <div class="pt-num">TIER ${t.n}</div><div class="pt-icon">${t.icon}</div>
      <div class="pt-name">${t.name}</div><div class="pt-req">${t.req}</div></div>`;
  }).join('');
}

/* ─── PROFILE ──────────────────────────────────────────── */

function renderProfile() {
  const L = S.look;
  $('pfpAvatar').textContent = L.avatar;
  $('pfpFrame').style.borderColor = FRAMES[L.frame].color;
  $('pfpFrame').style.boxShadow = `0 0 18px ${FRAMES[L.frame].color}33`;
  $('pfpTitle').textContent = TITLES[L.title].label;
  $('pfpRank').textContent = S.privacy.showLeaderboard ? `#${rankIndex() + 1}` : 'private';

  $('pfpBadges').innerHTML = [
    `<span class="pill">${currentRole().ic} ${currentRole().name}</span>`,
    `<span class="pill">${currentTier().ic} ${currentTier().nm}</span>`,
    `<span class="pill">🔥 ${S.streak}-day streak</span>`,
    `<span class="pill">◎ ${S.joined.length} Circles</span>`,
  ].join('');

  $('shelfGrid').innerHTML = COLLECTIBLES.map((c) =>
    `<div class="shelf-item ${S.xp >= c.at ? 'on' : 'off'}"><span class="ic">${c.ic}</span>${c.nm}</div>`).join('');

  $('achGrid').innerHTML = ACHIEVEMENTS.map((a) =>
    `<div class="ach-item ${a.test(S) ? '' : 'off'}"><span class="ic">${a.ic}</span>${a.nm}</div>`).join('');

  $('recapBox').innerHTML = `
    <div class="recap-item"><b>${S.reactionsGiven}</b><span>reactions given</span></div>
    <div class="recap-item"><b>${S.clipsSubmitted}</b><span>clips submitted</span></div>
    <div class="recap-item"><b>${S.chatMessages}</b><span>messages sent</span></div>
    <div class="recap-item"><b>${S.joined.length}</b><span>Circles followed</span></div>
    <div class="recap-item"><b>${S.streak}</b><span>day streak</span></div>`;

  renderPickers();
}

function renderPickers() {
  const L = S.look;
  $('pickAvatar').innerHTML = AVATARS.map((a) =>
    `<button class="pick ${L.avatar === a ? 'on' : ''}" data-set="avatar" data-v="${a}">${a}</button>`).join('');

  $('pickFrame').innerHTML = Object.entries(FRAMES).map(([k, f]) => {
    const lock = S.xp < f.at;
    return `<button class="pick ${L.frame === k ? 'on' : ''} ${lock ? 'off' : ''}" data-set="frame" data-v="${k}"
      ${lock ? 'disabled' : ''} title="${f.label}${lock ? ` · ${f.at} XP` : ''}" style="box-shadow:inset 0 0 0 3px ${f.color}"></button>`;
  }).join('');

  $('pickTitle').innerHTML = Object.entries(TITLES).map(([k, t]) => {
    const lock = S.xp < t.at;
    return `<button class="pick wide ${L.title === k ? 'on' : ''} ${lock ? 'off' : ''}" data-set="title" data-v="${k}" ${lock ? 'disabled' : ''}>
      <span>${t.label}</span><span class="muted">${lock ? `${t.at} XP` : '✓'}</span></button>`;
  }).join('');

  $('pickColor').innerHTML = COLORS.map((c) =>
    `<button class="pick ${L.color === c ? 'on' : ''}" data-set="color" data-v="${c}" style="background:${c}"></button>`).join('');

  const next = Object.values(FRAMES).find((f) => f.at > S.xp);
  $('unlockNote').innerHTML = next
    ? `Next cosmetic at <strong>${next.at} XP</strong> (${next.label}). You have ${S.xp} XP.<br><br>Everything here is earned through Circle participation. Nothing is purchasable with Kicks.`
    : 'All cosmetics unlocked — every one of them earned, none purchasable with Kicks.';

  document.querySelectorAll('[data-set]').forEach((b) => {
    b.onclick = () => { S.look[b.dataset.set] = b.dataset.v; save(); renderProfile(); renderHeader(); renderChat(); };
  });
}

/* ─── RANKS ────────────────────────────────────────────── */

function board() {
  return LEADERBOARD.map((r) => (r.me ? { ...r, score: S.score, role: currentRole().name } : r))
    .sort((a, b) => b.score - a.score);
}
const rankIndex = () => board().findIndex((r) => r.me);

function renderRanks() {
  const role = currentRole();
  const ri = ROLES.indexOf(role);
  $('rolePath').innerHTML = ROLES.map((r, i) => `
    <div class="role-step ${i < ri ? 'done' : i === ri ? 'now' : ''}">
      <span class="ic">${r.ic}</span>
      <div><b>${r.name}</b><small>${r.req}</small></div>
      ${i <= ri ? '<span class="role-check">✓</span>' : ''}
    </div>`).join('');

  $('leaderboard').innerHTML = `
    <thead><tr><th>#</th><th>Member</th><th>Role</th><th>Score</th></tr></thead>
    <tbody>${board().map((r, i) => `
      <tr class="${r.me ? 'me' : ''}">
        <td>${i + 1}</td>
        <td>${r.me && !S.privacy.showLeaderboard ? `${r.nm} <span class="lb-role">(hidden)</span>` : r.nm}</td>
        <td class="lb-role">${r.role}</td>
        <td>${r.score.toLocaleString()}</td>
      </tr>`).join('')}</tbody>`;

  const tier = currentTier();
  $('tierTrack').innerHTML = TIERS.map((t) => `
    <div class="tier ${t.nm === tier.nm ? 'on' : ''}">
      <div class="ic">${t.ic}</div><div class="nm">${t.nm}</div><div class="rq">${t.xp} XP</div></div>`).join('');
}

/* ─── INVITATION ───────────────────────────────────────── */

function openInvite() {
  const c = CIRCLES.find((x) => !S.joined.includes(x.id));
  if (!c) {
    toast('No pending invitations', 'You are already in every Circle we detected', '✉️');
    return;
  }
  $('inviteTitle').textContent = `You've found your people.`;
  $('inviteDesc').textContent = `${c.name} · ${c.members.toLocaleString()} members · ${c.creators.slice(0, 3).join(', ')}`;
  $('inviteReasons').innerHTML = c.reasons.map((r) =>
    `<div class="ir"><span class="reason-num">${r.n}</span>${r.t}</div>`).join('');
  $('inviteModal').classList.add('open');
  $('acceptInvite').onclick = () => {
    $('inviteModal').classList.remove('open');
    if (!S.joined.includes(c.id)) { S.joined.push(c.id); S.selected = c.id; save(); award(50, `Joined ${c.name}`); }
  };
}

/* ─── CHAT STYLE PANEL ─────────────────────────────────── */

function previewMsg(text) {
  const k = myLook();
  return `<div class="${k.cls}" style="${k.style}">
    <div class="msg-line">${k.flair}<span class="${k.nameCls}" style="${k.nameStyle}">SpookyBunny</span>${text}</div>
  </div>`;
}

function renderStyle() {
  $('stylePreview').innerHTML = `
    <div class="preview-head">Live preview</div>
    <div class="preview-body">
      <div class="msg"><div class="msg-line"><span class="msg-author" style="color:#c9d6dc">TokyoDrift</span>wait is he actually going in</div></div>
      ${previewMsg('this is how my messages look now')}
      <div class="msg"><div class="msg-line"><span class="msg-author" style="color:#b06cff">PixelPam</span>ok that flair goes hard</div></div>
    </div>`;

  const swatches = `<div class="style-swatches">${COLORS.map((c) =>
    `<button class="swatch ${S.look.color === c ? 'sel' : ''}" data-style="color" data-v="${c}" style="background:${c}"></button>`).join('')}</div>`;

  $('styleSections').innerHTML = `
    <div class="style-set"><h4>Name colour</h4>${swatches}</div>
    ${STYLE_SETS.map((s) => `
      <div class="style-set">
        <h4>${s.title}</h4>
        <div class="style-picks">
          ${Object.entries(s.map).map(([k, v]) => {
            const on = v.test(S);
            return `<button class="style-pick ${S.look[s.kind] === k ? 'sel' : ''} ${on ? '' : 'lock'}"
              data-style="${s.kind}" data-v="${k}" ${on ? '' : 'disabled'}>
              <span>${v.ic ? `${v.ic} ` : ''}${v.label}</span>
              <small>${on ? '✓ earned' : v.hint}</small></button>`;
          }).join('')}
        </div>
      </div>`).join('')}`;

  const locked = styleCatalog().filter((i) => !i.test(S));
  $('identityNote').innerHTML = `
    <b>Why this is not just cosmetics.</b>
    The same chat signals we read for insights — message volume, questions, reactions, clips —
    are what grant these. Your look is evidence of how you show up.
    ${locked.length ? `<br><br><span class="muted">${locked.length} still locked · next: ${locked[0].label} — ${locked[0].hint.toLowerCase()}</span>`
      : '<br><br><span class="muted">Everything unlocked — all of it earned in chat.</span>'}`;

  document.querySelectorAll('[data-style]').forEach((b) => {
    b.onclick = () => {
      S.look[b.dataset.style] = b.dataset.v;
      save();
      renderStyle();
      renderChat();
      renderProfile();
      renderHeader();
    };
  });
}

function openStyle() {
  renderStyle();
  $('styleModal').classList.add('open');
}

/* ─── NAV & RENDER ─────────────────────────────────────── */

function switchView(v) {
  document.querySelectorAll('.view').forEach((x) => x.classList.remove('active'));
  $(`view-${v}`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === v));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll() {
  renderHeader(); renderStrip(); renderChat(); renderEvent();
  renderCircles(); renderTasks(); renderPass(); renderProfile(); renderRanks(); renderNotifs();
}

/* ─── INIT ─────────────────────────────────────────────── */

function init() {
  checkStyleUnlocks(true);
  renderClips();
  renderAll();

  document.querySelectorAll('.nav-btn').forEach((b) => { b.onclick = () => switchView(b.dataset.view); });
  document.querySelectorAll('[data-goto]').forEach((b) => { b.onclick = () => switchView(b.dataset.goto); });

  document.querySelectorAll('.chat-tab').forEach((b) => {
    b.onclick = () => {
      activeChat = b.dataset.chat;
      document.querySelectorAll('.chat-tab').forEach((x) => x.classList.toggle('active', x === b));
      renderChat();
    };
  });
  document.querySelectorAll('.event-tab').forEach((b) => {
    b.onclick = () => {
      activeEvent = b.dataset.event;
      document.querySelectorAll('.event-tab').forEach((x) => x.classList.toggle('active', x === b));
      renderEvent();
    };
  });

  $('quickReact').innerHTML = REACTIONS.map((e) => `<button data-quick="${e}">${e}</button>`).join('');
  $('quickReact').querySelectorAll('[data-quick]').forEach((b) => {
    b.onclick = () => {
      const list = chatData().filter((m) => !m.system);
      const last = list[list.length - 1];
      if (last) addReaction(last.id, b.dataset.quick);
    };
  });

  $('chatForm').onsubmit = (e) => {
    e.preventDefault();
    const v = $('chatInput').value.trim();
    if (!v) return;
    sendMessage(v);
    $('chatInput').value = '';
  };

  $('clipBtn').onclick = () => runTask('clip');
  $('styleBtn').onclick = openStyle;
  $('styleDone').onclick = () => $('styleModal').classList.remove('open');
  $('styleModal').onclick = (e) => { if (e.target.id === 'styleModal') $('styleModal').classList.remove('open'); };
  $('openInviteBtn').onclick = openInvite;
  $('declineInvite').onclick = () => $('inviteModal').classList.remove('open');
  $('inviteModal').onclick = (e) => { if (e.target.id === 'inviteModal') $('inviteModal').classList.remove('open'); };

  $('leaveBtn').onclick = () => {
    const id = S.selected;
    if (!S.joined.includes(id)) return;
    S.joined = S.joined.filter((x) => x !== id);
    save();
    toast('Left Circle', `${sel().name} · leaving is always one tap away`, '🚪');
    renderCircles();
  };

  $('bellBtn').onclick = (e) => { e.stopPropagation(); $('notifPanel').classList.toggle('open'); };
  $('markRead').onclick = () => { S.notifs.forEach((n) => { n.read = true; }); save(); renderNotifs(); };
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notif-wrap')) $('notifPanel').classList.remove('open');
  });

  $('resetBtn').onclick = () => { localStorage.removeItem(KEY); location.reload(); };

  const now = new Date(); const end = new Date(now); end.setHours(24, 0, 0, 0);
  const d = end - now;
  $('resetTimer').textContent = `${Math.floor(d / 36e5)}h ${Math.floor((d % 36e5) / 6e4)}m`;

  if (!S.seenInvite) {
    S.seenInvite = true; save();
    setTimeout(openInvite, 900);
  } else {
    setTimeout(() => toast('IRL Chaos is peaking', '3 connected creators are live right now', '🔥'), 1200);
  }
}

init();
