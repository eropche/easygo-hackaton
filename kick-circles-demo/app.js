/* ═══════════════════════════════════════════════════════════
   KICK CIRCLES — Team 1 prototype
   Pillars: Belong · Play · Prove
   ═══════════════════════════════════════════════════════════ */

const KEY = 'kickCircles.v4';

const REACTIONS = ['😂', '🔥', '💀', '👀', '❓', '👏', '💙', '🫂', '🥺', '😢', '💔', '🫶', '💧', '😔', '🤍', '🙏', '✨', '💪', '😌', '🌸', '☀️', '🎉', '💯', '🚀', '😭', '⚡'];
const SCENE_EMOJIS = {
  tense: ['💙', '🫂', '🥺', '😢', '💔', '🫶', '💧', '😔', '🤍', '🙏'],
  cozy: ['🫶', '💙', '✨', '🤍', '🙏', '💪', '😌', '🌸', '☀️', '🫂'],
  hype: ['🔥', '😂', '👏', '💀', '👀', '🎉', '💯', '🚀', '😭', '⚡'],
  chill: ['👀', '💙', '✨', '😌', '🌙', '🤍', '👏', '🔥', '💧', '🙏'],
};
/** Seed counts for Quiet Validation sticky by stream beat */
const STICKY_SEED = {
  tense: { '💙': 12, '🫂': 8, '🥺': 6, '🫶': 5, '😢': 4, '💧': 3, '😔': 3, '🤍': 2, '🙏': 2, '💔': 2 },
  cozy: { '🫶': 10, '💙': 8, '✨': 6, '🤍': 5, '🙏': 4, '💪': 4, '😌': 3, '🌸': 3, '🫂': 5, '☀️': 2 },
  hype: { '🔥': 14, '😂': 9, '👏': 7, '💀': 5, '👀': 4, '🎉': 6, '💯': 5, '🚀': 3, '😭': 4, '⚡': 3 },
};
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
  roomTheme: { tint: '', accent: '#53fc18', glow: 0.55, wallpaper: '' },
  followMood: true,
  streamMood: 'chill',
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

const CHAT_STREAM = [
  { id: 't1', system: true, text: 'Clavicular · Stream chat · Living Room · tap a message to react' },
  { id: 't2', author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'That rooftop jump was unreal. Clip is up.', reacts: { '🔥': 12, '😂': 3 } },
  { id: 't3', author: 'ClipLord', badge: 'sub', badgeText: 'SUB 8', color: '#b06cff', text: 'Weekly mission at 72% — keep the clips relevant', reacts: { '👏': 5 } },
  { id: 't4', author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'wait is he actually going into the arcade', reacts: { '👀': 9, '😂': 2 } },
  { id: 't5', author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'Emote Storm is live — pick your side below', reacts: {} },
  { id: 't6', author: 'KEKWKing', text: 'what camera is he using tho', reacts: { '❓': 7 } },
  { id: 't7', author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'N3on just went live too, circle is stacked tonight', reacts: { '🔥': 6 } },
  { id: 't8', author: 'StreetCam', text: 'bro the wind up there is crazy', reacts: { '👀': 4 } },
  { id: 't9', author: 'orbitron', text: 'stream chat hitting different tonight', reacts: { '🔥': 3 } },
  { id: 't10', author: 'gg_enjoyer', text: 'is this the rooftop challenge again', reacts: {} },
  { id: 't11', author: 'MoonMile', text: 'chat stay ready', reacts: { '👀': 2 } },
  { id: 't12', author: 'CutKing', text: 'already clipping', reacts: { '🔥': 5 } },
  { id: 't13', author: 'neon_nova', text: 'viewers climbing rn', reacts: { '🚀': 2 } },
  { id: 't14', author: 'ReelRat', text: 'this angle is clean', reacts: { '👀': 3 } },
  { id: 't15', author: 'chatlurker', text: 'LURKING HARD', reacts: {} },
  { id: 't16', author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'mods watching · keep it kind', reacts: { '👏': 2 } },
];

const CHAT_CIRCLE = [
  { id: 's1', system: true, text: 'IRL Chaos Circle chat · slow mode 30s · Circle rules apply' },
  { id: 'm1', author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'Shared Circle feed · scaffolding for collab', reacts: { '🔥': 4 } },
  { id: 'm2', author: 'ClipLord', badge: 'sub', badgeText: 'SUB 8', color: '#b06cff', text: 'Weekly mission at 72% — keep the clips relevant', reacts: { '👏': 5 } },
  { id: 'm3', author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'circle chat is quieter than stream rn', reacts: { '👀': 3 } },
  { id: 'm4', author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'Circle mods active', reacts: {} },
  { id: 'm5', author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'N3on just went live too', reacts: { '🔥': 2 } },
];

const CLIPS = [
  { icon: '🏙️', title: 'Rooftop jump', short: 'Jump', by: 'Clavicular', reacts: 247 },
  { icon: '🎰', title: 'Arcade meltdown', short: 'Arcade', by: 'N3on', reacts: 189 },
  { icon: '🍜', title: 'Spicy noodle dare', short: 'Noodles', by: 'Clavicular', reacts: 156 },
  { icon: '🚕', title: 'Taxi negotiation', short: 'Taxi', by: 'Placeholder1', reacts: 121 },
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
  q: 'Next stop?',
  sub: '45s · 1.2k',
  options: [
    { t: 'Arcade', ic: '🎰', v: 512 },
    { t: 'Rooftop', ic: '🏙️', v: 388 },
    { t: 'Ramen', ic: '🍜', v: 244 },
  ],
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
let activeChat = 'stream';
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
        roomTheme: { ...d.roomTheme, ...(p.roomTheme || {}) },
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
  if ($('stripMission')) $('stripMission').textContent = `${pct}%`;
  if ($('stripBar')) $('stripBar').style.width = `${pct}%`;
  if ($('stripScore')) $('stripScore').textContent = S.score.toLocaleString();
}

function renderClips() {
  if (!$('clipsRow')) return;
  $('clipsRow').innerHTML = CLIPS.map((c) => `
    <button type="button" class="clip-chip" title="${c.title} · ${c.by}">
      <span class="clip-ic">${c.icon}</span>
      <span class="clip-meta"><b>${c.short || c.title}</b><i>🔥${c.reacts}</i></span>
    </button>`).join('');
}

const chatData = () => (activeChat === 'stream' ? CHAT_STREAM : CHAT_CIRCLE);
/** Living Room surface — Quiet Validation, story, ambience, dense chat */
const livingRoomChat = () => CHAT_STREAM;

/** Which message has the tap-to-react emoji tray open */
let openEmojiTrayId = null;

let pinnedMsg = null; // validation sticky { id, author, text, color, badge, badgeText, until }
let pinTimer = null;
/** Session validating lines for the quick moment board */
let momentBoardIds = [];

const VALIDATION_REACTS = new Set(['🔥', '👀', '👏', '💙', '🫂', '🫶', '🥺', '🤍', '🙏', '😢']);
const VALIDATION_WORDS = /same|felt that|you'?re not alone|valid|here for you|it'?s okay to feel|sending love|we got you|allowed to feel|i feel that|you'?re allowed|stay kind|breathe/i;
const HYPE_BLOCK = /peak content|clip that|w fail|hilarious|lmao|kekw|run it back/i;

const COOL_EMOJIS = new Set(['💀', '❓', '👀', '💙', '🫂', '🥺', '😢', '💔', '🫶', '💧', '😔', '🤍', '🙏']);
const LAUGH_EMOJIS = new Set(['😂', '👏', '😭']);
const HYPE_EMOJIS = new Set(['🔥', '🎉', '💯', '🚀', '⚡', '✨', '💪']);

function sceneEmojiPack() {
  return SCENE_EMOJIS[S.streamMood] || SCENE_EMOJIS.chill;
}

function trayEmojiList() {
  return [...new Set([...sceneEmojiPack(), ...REACTIONS.slice(0, 6)])];
}

function findChatMessage(id) {
  return CHAT_STREAM.find((m) => m.id === id) || CHAT_CIRCLE.find((m) => m.id === id) || null;
}

function mergeReactCounts(msg) {
  const stored = S.msgReacts[msg.id] || {};
  const all = {};
  Object.keys(msg.reacts || {}).forEach((k) => { all[k] = msg.reacts[k] || 0; });
  Object.keys(stored).forEach((k) => { all[k] = (all[k] || 0) + (stored[k] || 0); });
  return all;
}

function countedReactChips(msgId, all, mine) {
  return Object.entries(all)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([e, v]) => {
      const on = mine.includes(e) ? 'on' : '';
      return `<button type="button" class="react-pill ${on}" data-react="${msgId}" data-emo="${e}">${e} ${v}</button>`;
    }).join('');
}

function emojiTrayHtml(msgId) {
  return `<div class="msg-emoji-tray" data-tray="${msgId}">${
    trayEmojiList().map((e) =>
      `<button type="button" class="tray-emo" data-react="${msgId}" data-emo="${e}">${e}</button>`
    ).join('')
  }</div>`;
}

function bindMessageReacts(root) {
  if (!root) return;
  root.querySelectorAll('[data-tap-msg]').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      const id = el.dataset.tapMsg;
      openEmojiTrayId = openEmojiTrayId === id ? null : id;
      if (root.id === 'chatBody' || root === $('chatBody')) renderChat();
      else if (root.id === 'cdChatBody') renderCreatorChat();
      else renderChatPin();
    };
  });
  root.querySelectorAll('[data-react]').forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation();
      addReaction(b.dataset.react, b.dataset.emo);
      openEmojiTrayId = null;
    };
  });
}

function isLowMoodMoment() {
  try {
    const room = getRoomMood().mood;
    return room === 'cool' || S.streamMood === 'tense';
  } catch (e) {
    return S.streamMood === 'tense';
  }
}

function validationScore(msg) {
  if (!msg || msg.system) return 0;
  if (HYPE_BLOCK.test(msg.text || '')) return 0;
  const stored = S.msgReacts[msg.id] || {};
  let score = 0;
  VALIDATION_REACTS.forEach((e) => {
    score += (msg.reacts && msg.reacts[e] || 0) + (stored[e] || 0);
  });
  if (VALIDATION_WORDS.test(msg.text || '')) score += 6;
  return score;
}

function trackMomentBoard(msgId) {
  if (!msgId) return;
  if (!momentBoardIds.includes(msgId)) momentBoardIds.unshift(msgId);
  momentBoardIds = momentBoardIds.slice(0, 12);
  renderMomentBoard();
}

function renderMomentBoard() {
  const el = $('momentBoard');
  if (!el) return;
  const rows = momentBoardIds
    .map((id) => findChatMessage(id))
    .filter((m) => m && validationScore(m) > 0)
    .sort((a, b) => validationScore(b) - validationScore(a))
    .slice(0, 3);

  if (!rows.length) {
    el.hidden = true;
    el.innerHTML = '';
    return;
  }

  el.hidden = false;
  el.innerHTML = `
    <div class="moment-board-label">Moment board · validated lines</div>
    ${rows.map((m, i) => `
      <div class="moment-row">
        <span class="moment-rank">${i + 1}</span>
        <span class="moment-text"><b style="color:${m.color || '#c9d6dc'}">${m.author}</b> ${m.text}</span>
        <span class="moment-score">${validationScore(m)}</span>
      </div>`).join('')}`;
}

function engageScore(msg) {
  if (!msg || msg.system) return 0;
  const reacts = Object.values(mergeReactCounts(msg)).reduce((a, b) => a + b, 0);
  return reacts + (VALIDATION_WORDS.test(msg.text || '') ? 20 : 0);
}

function isPinLive() {
  return !!(pinnedMsg && Date.now() <= pinnedMsg.until);
}

/** Keep a featured Stream message fixed above the scrolling feed. */
function ensureLivingRoomSticky() {
  if (activeChat !== 'stream') return;
  if (isPinLive()) return;

  const ranked = livingRoomChat()
    .filter((m) => !m.system)
    .map((m) => ({ m, s: Math.max(validationScore(m), engageScore(m)) }))
    .sort((a, b) => b.s - a.s);

  const best = ranked[0];
  if (!best || best.s < 3) return;

  const kind = validationScore(best.m) > 0 || VALIDATION_WORDS.test(best.m.text || '')
    ? 'validation'
    : 'moment';
  pinValidationMessage(best.m, { force: true, kind });
}

function renderChatPin() {
  const el = $('chatPin');
  if (!el) return;
  if (!isPinLive()) {
    if (pinnedMsg && Date.now() > pinnedMsg.until) pinnedMsg = null;
    el.hidden = true;
    el.innerHTML = '';
    renderMomentBoard();
    return;
  }

  const msg = findChatMessage(pinnedMsg.id) || pinnedMsg;
  const all = mergeReactCounts(msg);
  const mine = S.myReacts[pinnedMsg.id] || [];
  const pills = countedReactChips(pinnedMsg.id, all, mine);
  const tray = openEmojiTrayId === pinnedMsg.id ? emojiTrayHtml(pinnedMsg.id) : '';
  const badge = pinnedMsg.badge
    ? `<span class="msg-badge b-${pinnedMsg.badge}">${pinnedMsg.badgeText}</span>`
    : '';
  const label = pinnedMsg.kind === 'validation'
    ? 'Quiet validation · sticky · tap to react'
    : 'Pinned · sticky · chat rolls underneath';

  el.hidden = false;
  el.style.removeProperty('display');
  el.classList.add('validation-sticky');
  el.innerHTML = `
    <div class="chat-pin-label">${label}</div>
    <div class="chat-pin-body" data-tap-msg="${pinnedMsg.id}">
      ${badge}<span class="msg-author" style="color:${pinnedMsg.color || '#c9d6dc'}">${pinnedMsg.author}</span>
      ${pinnedMsg.text}
    </div>
    <div class="msg-reacts chat-pin-reacts">${pills}</div>
    ${tray}`;

  bindMessageReacts(el);
  renderMomentBoard();
}

function seedStickyReacts(msg, beat) {
  const seed = STICKY_SEED[beat] || STICKY_SEED.tense;
  msg.reacts = msg.reacts || {};
  Object.entries(seed).forEach(([emo, n]) => {
    msg.reacts[emo] = Math.max(msg.reacts[emo] || 0, n);
    pushReactionLog(emo, Math.min(n, 4));
  });
}

function pinValidationMessage(msg, { force, seed, kind } = {}) {
  if (!msg || msg.system) return;
  if (!force && HYPE_BLOCK.test(msg.text || '')) return;

  if (seed) seedStickyReacts(msg, S.streamMood || 'tense');

  const score = validationScore(msg);
  const keywordHit = VALIDATION_WORDS.test(msg.text || '');
  const low = isLowMoodMoment();

  if (!force) {
    if (!keywordHit && !(low && score >= 3)) return;
    if (keywordHit && score < 2 && !low) return;
  }

  const existingScore = pinnedMsg ? validationScore(findChatMessage(pinnedMsg.id) || pinnedMsg) : -1;
  if (
    pinnedMsg
    && pinnedMsg.id !== msg.id
    && pinnedMsg.until > Date.now()
    && !force
    && score < existingScore
  ) return;

  if (pinnedMsg && pinnedMsg.id === msg.id && pinnedMsg.until > Date.now() && !force) {
    trackMomentBoard(msg.id);
    renderChatPin();
    return;
  }

  const pinKind = kind
    || (keywordHit || score > 0 ? 'validation' : 'moment');
  const hold = force ? 180000 : 60000;

  pinnedMsg = {
    id: msg.id,
    author: msg.author,
    text: msg.text,
    color: msg.color,
    badge: msg.badge,
    badgeText: msg.badgeText,
    reacts: msg.reacts || {},
    kind: pinKind,
    until: Date.now() + hold,
  };
  trackMomentBoard(msg.id);
  if (pinTimer) clearTimeout(pinTimer);
  pinTimer = setTimeout(() => {
    if (pinnedMsg && pinnedMsg.id === msg.id) {
      pinnedMsg = null;
      renderChatPin();
      if (activeChat === 'stream') {
        ensureLivingRoomSticky();
        renderChat();
      }
    }
  }, hold);
  renderChatPin();
}

/** @deprecated use pinValidationMessage — kept as alias for story burst paths */
function pinGoodMessage(msg, opts) {
  pinValidationMessage(msg, opts);
}

function renderChat() {
  if (activeChat === 'mood') applyChatMode();
  else {
    $('chatContext').textContent = activeChat === 'stream'
      ? 'Living Room · tap a message to react · Quiet Validation + mood ambience'
      : `Shared across 3 connected creators · ${S.privacy.slowMode ? 'slow mode' : 'open'} · Circle mods active`;
  }

  if (activeChat === 'stream') ensureLivingRoomSticky();
  renderChatPin();

  const pinId = isPinLive() ? pinnedMsg.id : null;
  // Sticky lives outside the scroller — omit duplicate from rolling feed
  $('chatBody').innerHTML = chatData().filter((m) => m.id !== pinId).map((m) => {
    if (m.system) return `<div class="msg system">${m.text}</div>`;
    const all = mergeReactCounts(m);
    const mine = S.myReacts[m.id] || [];
    const pills = countedReactChips(m.id, all, mine);
    const tray = openEmojiTrayId === m.id ? emojiTrayHtml(m.id) : '';
    const badge = m.badge ? `<span class="msg-badge b-${m.badge}">${m.badgeText}</span>` : '';
    const k = m.mine ? myLook() : null;
    const head = k
      ? `${k.flair}<span class="${k.nameCls}" style="${k.nameStyle}">${m.author}</span>`
      : `${badge}<span class="msg-author" style="color:${m.color || '#c9d6dc'}">${m.author}</span>`;
    return `
      <div class="${k ? k.cls : 'msg'}" style="${k ? k.style : ''}" data-msg-id="${m.id}">
        <div class="msg-line" data-tap-msg="${m.id}">${head}${m.text}</div>
        <div class="msg-reacts">${pills}</div>
        ${tray}
      </div>`;
  }).join('');

  $('chatBody').scrollTop = $('chatBody').scrollHeight;
  bindMessageReacts($('chatBody'));
}

function addReaction(msgId, emo) {
  S.myReacts[msgId] = S.myReacts[msgId] || [];
  S.msgReacts[msgId] = S.msgReacts[msgId] || {};
  const mine = S.myReacts[msgId];
  let added = false;

  if (mine.includes(emo)) {
    mine.splice(mine.indexOf(emo), 1);
    S.msgReacts[msgId][emo] = Math.max(0, (S.msgReacts[msgId][emo] || 0) - 1);
    S.collective = Math.max(0, S.collective - 1);
    removeReactionLog(emo);
  } else {
    mine.push(emo);
    S.msgReacts[msgId][emo] = (S.msgReacts[msgId][emo] || 0) + 1;
    S.reactionsGiven += 1;
    S.collective += 1;
    pushReactionLog(emo);
    added = true;
    if (REACT_MOOD[emo]) nudgeMood(REACT_MOOD[emo], 2, true);
    bumpTask('react');
  }
  document.querySelectorAll('.react-picker.open').forEach((o) => o.classList.remove('open'));
  save();
  checkStyleUnlocks();
  renderChat();
  renderHeader();
  renderCollective();
  onReactionChange();
  if (added) {
    bumpReactPill(msgId, emo);
    const msg = findChatMessage(msgId);
    if (msg) pinValidationMessage(msg);
  } else {
    renderChatPin();
  }
}

function sendMessage(text) {
  const dest = activeChat === 'mood' ? 'stream' : activeChat;
  const list = dest === 'stream' ? CHAT_STREAM : CHAT_CIRCLE;
  const msg = { id: `me${Date.now()}`, author: 'SpookyBunny', mine: true, text, reacts: {} };
  list.push(msg);
  S.chatMessages += 1;
  if (text.includes('?')) S.questionsAsked += 1;
  save();
  checkStyleUnlocks();
  if (dest === 'stream') {
    bumpTask('chat');
    applyMessageSignal(text, true);
  }
  pinValidationMessage(msg);
  if (activeChat !== 'mood') renderChat();
  else renderMoodUI();
}

/* ─── LIVING ROOM — roomMood + streamMood ──────────────── */

/** Sliding-window reaction events. Audience owns roomMood. Session-only (↺ clears). */
let reactionLog = [];
let lastHintBeat = null;
let lastRoomMoodSeen = 'neutral';
let lastRoomMoodHinted = null;
let roomMoodTick = null;
let beatTimelineTimer = null;
let storyTimers = [];
let storyRunning = false;
let storyStartedAt = 0;
let storyTickTimer = null;
let storyAct = 0;

const ROOM_WINDOW_MS = 60000;

/** Thresholds: need ≥3 reacts in window; dominant share ≥40% to leave neutral. */
const ROOM_MOOD_META = {
  neutral: { label: 'Neutral', ic: '·', className: 'mood-neutral' },
  hype: { label: 'Hyped', ic: '🔥', className: 'mood-hype' },
  laugh: { label: 'Laughing', ic: '😂', className: 'mood-laugh' },
  cool: { label: 'Cool / confused', ic: '💀', className: 'mood-cool' },
};

/** Audience roomMood → suggested Room Studio tokens */
const ROOM_MOOD_PALETTES = {
  hype: {
    hint: 'Room feels warm — light it up?',
    whisper: 'room feels warm',
    ic: '🔥',
    accent: '#ff8a3d',
    tint: 'rgba(255,138,61,.14)',
    wallpaper: 'warm-mesh',
  },
  laugh: {
    hint: 'Room feels playful — soft gold?',
    whisper: 'room feels playful',
    ic: '😂',
    accent: '#ffd84a',
    tint: 'rgba(255,216,74,.12)',
    wallpaper: 'amber-soft',
  },
  cool: {
    hint: 'Room feels quiet — cool the lights?',
    whisper: 'room feels quiet',
    ic: '💙',
    accent: '#7b9cff',
    tint: 'rgba(123,156,255,.12)',
    wallpaper: 'cool-mesh',
  },
  neutral: {
    whisper: 'room feels calm',
    ic: '·',
  },
};

const WALLPAPER_PRESETS = [
  { id: '', label: 'None' },
  { id: 'warm-mesh', label: 'Warm mesh' },
  { id: 'cool-mesh', label: 'Cool mesh' },
  { id: 'amber-soft', label: 'Amber soft' },
  { id: 'night-city', label: 'Night city' },
  { id: 'rooftop-soft', label: 'Rooftop' },
];

const STREAM_BEATS = {
  hype: {
    id: 'hype', label: 'Peaking', ic: '🔥',
    hint: 'Stream is peaking — warm the room?',
    accent: '#ff8a3d', tintHint: 'rgba(255,138,61,.12)',
  },
  chill: {
    id: 'chill', label: 'Chill walk', ic: '🌙',
    hint: 'Quiet stretch — cool the room?',
    accent: '#5eb7ff', tintHint: 'rgba(94,183,255,.10)',
  },
  tense: {
    id: 'tense', label: 'Tense', ic: '⚡',
    hint: 'Tension rising — try cool blue?',
    accent: '#7b9cff', tintHint: 'rgba(123,156,255,.12)',
  },
  cozy: {
    id: 'cozy', label: 'Cozy', ic: '✨',
    hint: 'Comfy moment — soft amber?',
    accent: '#ffb020', tintHint: 'rgba(255,176,32,.12)',
  },
};

const BEAT_TIMELINE = ['chill', 'hype', 'tense', 'cozy', 'hype'];

function pushReactionLog(emo, n = 1) {
  const t = Date.now();
  for (let i = 0; i < n; i++) reactionLog.push({ emo, t });
  if (reactionLog.length > 400) reactionLog = reactionLog.slice(-400);
}

function removeReactionLog(emo) {
  for (let i = reactionLog.length - 1; i >= 0; i--) {
    if (reactionLog[i].emo === emo) { reactionLog.splice(i, 1); break; }
  }
}

function reactionWindow(ms = ROOM_WINDOW_MS) {
  const cutoff = Date.now() - ms;
  const counts = {};
  REACTIONS.forEach((e) => { counts[e] = 0; });
  reactionLog.forEach((r) => {
    if (r.t >= cutoff) counts[r.emo] = (counts[r.emo] || 0) + 1;
  });
  return counts;
}

/**
 * roomMood from audience reactions only.
 * Sparse (<3) or no clear majority → neutral.
 */
function getRoomMood() {
  const counts = reactionWindow();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total < 3) return { mood: 'neutral', counts, total, top: [] };

  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [topEmo, topN] = ranked[0];
  const share = topN / total;

  let mood = 'neutral';
  if (share >= 0.4) {
    if (HYPE_EMOJIS.has(topEmo)) mood = 'hype';
    else if (LAUGH_EMOJIS.has(topEmo)) mood = 'laugh';
    else if (COOL_EMOJIS.has(topEmo)) mood = 'cool';
  }

  return {
    mood,
    counts,
    total,
    top: ranked.filter(([, n]) => n > 0).slice(0, 3),
  };
}

function bumpReactPill(msgId, emo) {
  requestAnimationFrame(() => {
    const pill = document.querySelector(`[data-react="${msgId}"][data-emo="${emo}"]`);
    if (!pill) return;
    pill.classList.remove('pop');
    void pill.offsetWidth;
    pill.classList.add('pop');
  });
}

function applyRoomTheme() {
  const rail = document.querySelector('.chat-rail');
  if (!rail) return;
  const rt = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
  S.roomTheme = rt;
  rail.style.setProperty('--room-accent', rt.accent || '#53fc18');
  rail.style.setProperty('--room-glow', String(rt.glow ?? 0.55));
  if (rt.tint) {
    rail.style.setProperty('--room-tint', rt.tint);
    rail.classList.add('has-tint');
  } else {
    rail.style.removeProperty('--room-tint');
    rail.classList.remove('has-tint');
  }
  const wp = rt.wallpaper || '';
  if (wp) rail.setAttribute('data-wallpaper', wp);
  else rail.removeAttribute('data-wallpaper');
  // Let CSS compose wallpaper + tint layers (no inline background override)
  rail.style.background = '';
}

function applySharedWash() {
  const rail = document.querySelector('.chat-rail');
  const players = document.querySelectorAll('.player');
  const { mood } = getRoomMood();
  const meta = ROOM_MOOD_META[mood] || ROOM_MOOD_META.neutral;
  ['mood-neutral', 'mood-hype', 'mood-laugh', 'mood-cool'].forEach((c) => {
    if (rail) rail.classList.remove(c);
    players.forEach((p) => p.classList.remove(c));
  });
  if (rail) rail.classList.add(meta.className);
  players.forEach((p) => p.classList.add(meta.className));
  applyRoomTheme();
  updateRoomFeelWhisper(mood);
}

function updateRoomFeelWhisper(mood) {
  const el = $('roomFeelWhisper');
  if (!el) return;
  const pal = ROOM_MOOD_PALETTES[mood] || ROOM_MOOD_PALETTES.neutral;
  if (!mood || mood === 'neutral') {
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.hidden = false;
  el.textContent = pal.whisper || '';
}

function bindMoodHintActions(onAccept) {
  const chip = $('moodHintChip');
  if (!chip) return;
  const accept = $('hintAccept');
  const dismiss = $('hintDismiss');
  const body = $('hintBody');
  if (accept) {
    accept.onclick = (e) => {
      e.stopPropagation();
      onAccept();
      hideMoodHint();
    };
  }
  if (dismiss) {
    dismiss.onclick = (e) => {
      e.stopPropagation();
      hideMoodHint();
    };
  }
  if (body) body.onclick = () => { onAccept(); hideMoodHint(); };
  chip.onclick = (e) => {
    if (e.target.closest('button')) return;
    onAccept();
    hideMoodHint();
  };
}

function showMoodHint(force = false) {
  const chip = $('moodHintChip');
  if (!chip) return;
  const beat = STREAM_BEATS[S.streamMood] || STREAM_BEATS.chill;
  if (!force && lastHintBeat === S.streamMood && chip.classList.contains('show')) return;

  lastHintBeat = S.streamMood;
  lastRoomMoodHinted = null;
  chip.innerHTML = `
    <span class="hint-ic">${beat.ic}</span>
    <span class="hint-text" id="hintBody">${beat.hint}</span>
    <button type="button" class="hint-accept" id="hintAccept">Accept</button>
    <button type="button" class="hint-dismiss" id="hintDismiss">Dismiss</button>`;
  chip.classList.add('show');
  bindMoodHintActions(() => applyStreamPalette(true, { quiet: true }));
}

function showRoomMoodHint(mood) {
  const chip = $('moodHintChip');
  const pal = ROOM_MOOD_PALETTES[mood];
  if (!chip || !pal || !pal.hint) return;

  lastRoomMoodHinted = mood;
  lastHintBeat = null;
  chip.innerHTML = `
    <span class="hint-ic">${pal.ic}</span>
    <span class="hint-text" id="hintBody">${pal.hint}</span>
    <button type="button" class="hint-accept" id="hintAccept">Accept</button>
    <button type="button" class="hint-dismiss" id="hintDismiss">Dismiss</button>`;
  chip.classList.add('show');
  bindMoodHintActions(() => applyRoomMoodPalette(mood, { quiet: true }));
}

function hideMoodHint() {
  const chip = $('moodHintChip');
  if (chip) {
    chip.classList.remove('show');
    chip.onclick = null;
  }
}

function applyRoomMoodPalette(mood, { quiet } = {}) {
  const pal = ROOM_MOOD_PALETTES[mood];
  if (!pal || !pal.accent) return;
  S.roomTheme = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
  S.roomTheme.accent = pal.accent;
  S.roomTheme.tint = pal.tint;
  S.roomTheme.wallpaper = pal.wallpaper || S.roomTheme.wallpaper || '';
  save();
  applyRoomTheme();
  applySharedWash();
  lastRoomMoodHinted = mood;
  if ($('styleModal')?.classList.contains('open')) renderStyle();
}

function applyStreamPalette(fromAccept, { quiet } = {}) {
  const beat = STREAM_BEATS[S.streamMood] || STREAM_BEATS.chill;
  S.roomTheme = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
  S.roomTheme.accent = beat.accent;
  if (beat.tintHint) S.roomTheme.tint = beat.tintHint;
  save();
  applyRoomTheme();
  // Ambience accept is silent; Follow auto-apply stays quiet when asked
  if (!quiet && !fromAccept) {
    /* no toast — lighting should feel ambient, not an alert */
  }
  if ($('styleModal')?.classList.contains('open')) renderStyle();
}

function maybeSuggestRoomMood() {
  const { mood } = getRoomMood();
  updateRoomFeelWhisper(mood);
  if (mood === lastRoomMoodSeen) return;
  lastRoomMoodSeen = mood;

  if (mood === 'neutral') return;

  if (S.followMood !== false) {
    applyRoomMoodPalette(mood, { quiet: true });
    hideMoodHint();
    return;
  }

  if (lastRoomMoodHinted !== mood) showRoomMoodHint(mood);
}

function setStreamMood(id, { silent } = {}) {
  if (!STREAM_BEATS[id]) return;
  S.streamMood = id;
  save();
  renderMoodPulse();
  if (activeEvent === 'pulse') renderEvent();

  if (S.followMood) {
    applyStreamPalette(false, { quiet: true });
    hideMoodHint();
  } else if (!silent) {
    showMoodHint(true);
  }
}

function burstReactions(emo = '🔥', n = 8) {
  pushReactionLog(emo, n);
  const list = livingRoomChat().filter((m) => !m.system);
  const target = list[list.length - 1];
  if (target) {
    S.msgReacts[target.id] = S.msgReacts[target.id] || {};
    S.msgReacts[target.id][emo] = (S.msgReacts[target.id][emo] || 0) + n;
    save();
    renderChat();
  }
  if (REACT_MOOD[emo]) nudgeMood(REACT_MOOD[emo], Math.min(6, n), true);
  onReactionChange();
}

function onReactionChange() {
  applySharedWash();
  maybeSuggestRoomMood();
  renderMoodPulse();
  renderCreatorChat();
  if (activeEvent === 'pulse') renderEvent();
}

function resetAmbience() {
  reactionLog = [];
  lastRoomMoodSeen = 'neutral';
  lastRoomMoodHinted = null;
  lastHintBeat = null;
  hideMoodHint();
  applySharedWash();
  updateRoomFeelWhisper('neutral');
  renderMoodPulse();
  if (activeEvent === 'pulse') renderEvent();
}

function seedReactionLog() {
  const now = Date.now();
  const seed = [
    ['🔥', 5], ['😂', 3], ['👀', 2], ['🔥', 2], ['👏', 1],
  ];
  seed.forEach(([emo, n], i) => {
    for (let j = 0; j < n; j++) {
      reactionLog.push({ emo, t: now - (8000 + i * 2000 + j * 400) });
    }
  });
}

function startRoomMoodTick() {
  if (roomMoodTick) clearInterval(roomMoodTick);
  roomMoodTick = setInterval(() => {
    applySharedWash();
    maybeSuggestRoomMood();
    renderMoodPulse();
  }, 1000);
}

function startBeatTimeline() {
  if (beatTimelineTimer) clearInterval(beatTimelineTimer);
  let i = 0;
  beatTimelineTimer = setInterval(() => {
    i = (i + 1) % BEAT_TIMELINE.length;
    setStreamMood(BEAT_TIMELINE[i], { silent: true });
  }, 45000);
}

function resetLivingRoomSession() {
  reactionLog = [];
  lastHintBeat = null;
  lastRoomMoodSeen = 'neutral';
  lastRoomMoodHinted = null;
  hideMoodHint();
  updateRoomFeelWhisper('neutral');
}

/* ─── FAIL → ENCOURAGE STORY DEMO ──────────────────────── */

const STORY_BASE_CHAT = [
  { id: 'story-sys', system: true, text: 'chatVoo · Exciting beat · reactions drive roomMood' },
  { id: 'story-m0', author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'LETS GOOOOO', reacts: { '🔥': 4 } },
  { id: 'story-m1', author: 'StreetCam', text: 'energy is INSANE rn', reacts: { '🔥': 2 } },
  { id: 'story-m2', author: 'chatlurker', text: 'chatVoo mode', reacts: {} },
];

const STORY_DEMO = {
  duration: 48000,
  acts: [
    { at: 0, act: 1, chip: 'Act 1 · Exciting', caption: 'chatVoo energy — room is buzzing', beat: 'hype', viewers: 12481 },
    { at: 12000, act: 2, chip: 'Act 2 · Encourage', caption: 'Chat is lifting him up', beat: 'cozy', viewers: 13120 },
    { at: 28000, act: 3, chip: 'Act 3 · Loved it', caption: 'They liked the real moment — room is peaking', beat: 'hype', viewers: 14890 },
  ],
  messages: [
    // Act 1 — exciting / chatVoo (~15 lines)
    { at: 500, author: 'Clavicular', badge: 'stream', badgeText: 'STREAMER', color: '#53fc18', text: 'CHAT — THIS IS THE MOMENT. chatVoo energy!', reacts: { '🔥': 6 } },
    { at: 1100, author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'AAAAA LETS GO', reacts: { '🔥': 4 } },
    { at: 1700, author: 'gg_enjoyer', text: 'W W W W W', reacts: { '🔥': 3 } },
    { at: 2300, author: 'KEKWKing', text: 'he is SO back', reacts: { '😂': 2 } },
    { at: 2900, author: 'beanbag', text: 'goosebumps fr', reacts: { '👀': 2 } },
    { at: 3500, author: 'quietfox', text: 'chat is vibrating', reacts: { '🔥': 2 } },
    { at: 4200, author: 'lowkey_fan', text: 'volume UP', reacts: { '🔥': 2 } },
    { at: 4900, author: 'spice_rack', text: 'peak stream already', reacts: {} },
    { at: 5600, author: 'chatlurker', text: 'chatVoo hitting different', reacts: { '👀': 3 } },
    { at: 6300, author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'this energy is contagious — room feels alive', reacts: {}, forcePin: true },
    { at: 7000, author: 'orbitron', text: 'same', reacts: { '🔥': 2 } },
    { at: 7600, author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'stand up chat', reacts: { '👏': 2 } },
    { at: 8200, author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'hype mode ON — keep it clean', reacts: { '🔥': 2 } },
    { at: 9000, author: 'ReelRat', text: 'CLIP THAT', reacts: { '🔥': 3 } },
    { at: 9800, author: 'MoonMile', text: 'best opener of the week', reacts: { '🔥': 3 } },
    { at: 10800, author: 'CutKing', text: 'we are SO here for this', reacts: { '🔥': 2 } },

    // Act 2 — cozy / lift (~16 lines)
    { at: 12200, author: 'orbitron', text: 'here for you — we got you', reacts: { '🫶': 3 } },
    { at: 12800, author: 'neon_nova', text: 'it’s okay to feel this', reacts: { '💙': 2 } },
    { at: 13400, author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'sending love. take your time', reacts: { '🤍': 3 } },
    { at: 14100, author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'valid. room is with you', reacts: { '🫂': 4 } },
    { at: 14800, author: 'StreetCam', text: 'chat is warmer than he feels rn', reacts: { '👀': 2 } },
    { at: 15500, author: 'ClipLord', badge: 'sub', badgeText: 'SUB 8', color: '#b06cff', text: 'you’re allowed. no rush', reacts: { '✨': 3 } },
    { at: 16200, author: 'gg_enjoyer', text: 'same energy — felt that hard', reacts: { '💙': 2 } },
    { at: 16900, author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'we believe in soft resets', reacts: { '🙏': 2 } },
    { at: 17600, author: 'KEKWKing', text: 'stay kind chat', reacts: {} },
    { at: 18300, author: 'ReelRat', text: 'you’re not alone in this room', reacts: { '🫂': 3 } },
    { at: 19100, author: 'beanbag', text: 'breathe with us', reacts: { '💧': 2 } },
    { at: 19900, author: 'lowkey_fan', text: 'this is the real moment', reacts: { '👀': 2 } },
    { at: 20800, author: 'spice_rack', text: 'here for you', reacts: { '🫶': 2 } },
    { at: 21800, author: 'quietfox', text: 'room holding space', reacts: { '🤍': 2 } },
    { at: 22800, author: 'Clavicular', badge: 'stream', badgeText: 'STREAMER', color: '#53fc18', text: 'okay… okay you guys are too nice', reacts: { '💙': 5 } },
    { at: 24200, author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'that’s it. feel it then climb', reacts: { '💪': 3 } },
    { at: 25800, author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'kind chat W', reacts: { '👏': 2 } },

    // Act 3 — hype (~16 lines)
    { at: 28500, author: 'KEKWKing', text: 'PEAK CONTENT', reacts: { '🔥': 6 } },
    { at: 29200, author: 'CutKing', text: 'CLIP THAT', reacts: { '🔥': 5 } },
    { at: 29900, author: 'ReelRat', text: 'best stream all week', reacts: { '🔥': 4 } },
    { at: 30600, author: 'MoonMile', text: 'they liked the fail more than the jump LMAO', reacts: { '😂': 5 } },
    { at: 31300, author: 'TokyoDrift', badge: 'vip', badgeText: 'VIP', color: '#ff5c8a', text: 'CHAT IS COOKING', reacts: { '🔥': 4 } },
    { at: 32000, author: 'neon_nova', text: 'this is the loop', reacts: { '⚡': 3 } },
    { at: 32800, author: 'orbitron', text: 'run it back', reacts: { '🚀': 3 } },
    { at: 33600, author: 'PixelPam', badge: 'sub', badgeText: 'SUB 3', color: '#b06cff', text: 'from exciting to loved — chatVoo arc', reacts: { '😭': 4 } },
    { at: 34400, author: 'StreetCam', text: 'viewers spiking', reacts: { '👀': 3 } },
    { at: 35200, author: 'ClipLord', badge: 'sub', badgeText: 'SUB 8', color: '#b06cff', text: 'already in the reel', reacts: { '💯': 3 } },
    { at: 36000, author: 'gg_enjoyer', text: 'W ROOM', reacts: { '🎉': 4 } },
    { at: 37000, author: 'beanbag', text: 'he smiling now', reacts: { '😂': 2 } },
    { at: 38000, author: 'Clavicular', badge: 'stream', badgeText: 'STREAMER', color: '#53fc18', text: 'fine — running it back. y’all wild', reacts: { '🔥': 8 } },
    { at: 39500, author: 'NightOwl', badge: 'cap', badgeText: 'CAPTAIN', color: '#ffb020', text: 'room is peaking — this is the loop', reacts: { '🔥': 4 } },
    { at: 41000, author: 'raid_ready', text: 'RAID ENERGY', reacts: { '🚀': 3 } },
    { at: 42500, author: 'Mod_ChaosBot', badge: 'mod', badgeText: 'MOD', color: '#00d488', text: 'keep the love rolling', reacts: { '👏': 3 } },
    { at: 44000, author: 'chatlurker', text: 'best exciting → love pipeline ever', reacts: { '😂': 3, '🔥': 2 } },
  ],
  bursts: [
    // Act 1 — exciting / chatVoo hype onto sticky when present
    { at: 2800, emo: '🔥', n: 5 },
    { at: 4500, emo: '👀', n: 4 },
    { at: 6800, emo: '🔥', n: 8, pin: true },
    { at: 7500, emo: '👏', n: 5, pin: true },
    { at: 8500, emo: '😂', n: 4, pin: true },
    { at: 9500, emo: '🔥', n: 6, pin: true },
    { at: 10500, emo: '🚀', n: 4, pin: true },
    // Act 2 — cozy pile on sticky
    { at: 13000, emo: '🫶', n: 6, pin: true },
    { at: 14500, emo: '💙', n: 5, pin: true },
    { at: 16000, emo: '✨', n: 4, pin: true },
    { at: 17500, emo: '🤍', n: 4, pin: true },
    { at: 19500, emo: '🙏', n: 3, pin: true },
    { at: 22000, emo: '💪', n: 4, pin: true },
    // Act 3 — hype
    { at: 29000, emo: '🔥', n: 10, pin: true },
    { at: 30500, emo: '😂', n: 8 },
    { at: 33000, emo: '🎉', n: 6, pin: true },
    { at: 35000, emo: '💯', n: 5 },
    { at: 38500, emo: '🔥', n: 8, pin: true },
    { at: 41500, emo: '🚀', n: 4 },
  ],
};

function clearStoryTimers() {
  storyTimers.forEach((t) => clearTimeout(t));
  storyTimers = [];
  if (storyTickTimer) { clearInterval(storyTickTimer); storyTickTimer = null; }
}

function stopStoryDemo() {
  clearStoryTimers();
  storyRunning = false;
  const btn = $('storyDemoBtn');
  if (btn) {
    btn.textContent = '▶ Play story';
    btn.classList.remove('running');
  }
}

function setStoryScene(act) {
  storyAct = act;
  document.querySelectorAll('.story-scene').forEach((img) => {
    img.classList.toggle('on', +img.dataset.act === act);
  });
}

function setStoryUI({ chip, caption, viewers }) {
  if (chip) {
    if ($('storyAct')) $('storyAct').textContent = chip;
    if ($('cdStoryAct')) $('cdStoryAct').textContent = chip;
  }
  if (caption) {
    if ($('storyCaption')) $('storyCaption').textContent = caption;
    if ($('cdStoryCaption')) $('cdStoryCaption').textContent = caption;
  }
  if (viewers) {
    const v = `👁 ${viewers.toLocaleString()}`;
    if ($('storyViewers')) $('storyViewers').textContent = v;
    if ($('cdPreviewViewers')) $('cdPreviewViewers').textContent = v;
    if ($('cdViewers')) $('cdViewers').textContent = viewers.toLocaleString();
  }
}

function pruneStoryChat() {
  const list = livingRoomChat();
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i].story) list.splice(i, 1);
  }
}

function injectStoryMessage(m) {
  const id = `story-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  livingRoomChat().push({
    id,
    story: true,
    author: m.author,
    badge: m.badge,
    badgeText: m.badgeText,
    color: m.color,
    text: m.text,
    reacts: { ...(m.reacts || {}) },
    system: !!m.system,
  });
  if (activeChat === 'stream') renderChat();
  renderCreatorChat();
  pushCreatorActivity(`${m.author}: ${m.text}`);
  const last = livingRoomChat()[livingRoomChat().length - 1];
  if (!last) return;
  const force = !!m.forcePin || (VALIDATION_WORDS.test(last.text || '') && S.streamMood === 'tense');
  pinValidationMessage(last, { force, seed: !!m.forcePin });
  if (m.forcePin) onReactionChange();
}

function storyHasMoodGap() {
  const room = getRoomMood().mood;
  const show = S.streamMood;
  const roomHot = room === 'hype' || room === 'laugh';
  const showLow = show === 'tense' || show === 'cozy';
  return roomHot && showLow;
}

function renderMoodPulse() {
  const el = $('moodPulseCard');
  if (!el) return;
  const room = getRoomMood();
  const meta = ROOM_MOOD_META[room.mood] || ROOM_MOOD_META.neutral;
  const beat = STREAM_BEATS[S.streamMood] || STREAM_BEATS.chill;
  const gap = storyHasMoodGap();
  if (gap) pushCreatorActivityOnce('Gap: room warmer than streamer feels');

  const topHtml = room.top.length
    ? room.top.map(([e, n]) => `<span class="mp-emo">${e} <b>${n}</b></span>`).join('')
    : '<span class="mp-emo muted">waiting for reacts…</span>';

  const showLabel = S.streamMood === 'tense'
    ? `${beat.ic} Upset / tense`
    : S.streamMood === 'cozy'
      ? `${beat.ic} Recovering`
      : `${beat.ic} ${beat.label}`;

  el.innerHTML = `
    <div class="mp-head">
      <span class="mp-kicker">Mood Pulse <span class="new-tag">CREATOR</span></span>
      <div class="mp-actions">
        <button type="button" class="mp-mini" id="pulseStoryBtn">${storyRunning ? 'Running…' : '▶ Story'}</button>
        <button type="button" class="mp-mini" id="burstHypeBtn" title="Demo burst">Burst 🔥</button>
      </div>
    </div>
    <div class="mp-row">
      <div class="mp-block">
        <small>PEOPLE · roomMood</small>
        <div class="mp-label ${meta.className}">${meta.ic} ${meta.label}</div>
        <div class="mp-bar"><span class="${meta.className}" style="width:${room.total ? Math.min(100, 20 + room.total * 8) : 8}%"></span></div>
      </div>
      <div class="mp-block">
        <small>SHOW · streamMood</small>
        <div class="mp-label">${showLabel}</div>
        <div class="mp-beats">
          ${Object.values(STREAM_BEATS).map((b) =>
            `<button type="button" class="mp-beat ${S.streamMood === b.id ? 'on' : ''}" data-beat="${b.id}">${b.ic}</button>`
          ).join('')}
        </div>
      </div>
    </div>
    <div class="mp-gap ${gap ? 'show' : ''}" id="moodGapLine">
      Audience loves the fail — room warmer than the streamer feels
    </div>
    <div class="mp-top">
      <small>Top reacts · 60s</small>
      <div class="mp-emos">${topHtml}</div>
    </div>
    <div class="mp-foot">
      <span>👁 ${1240 + room.total * 3} in room · ~${180 + Math.floor(room.total / 2)} lurkers</span>
    </div>`;

  const burst = $('burstHypeBtn');
  if (burst) burst.onclick = () => burstReactions('🔥', 8);
  const ps = $('pulseStoryBtn');
  if (ps) ps.onclick = () => startStoryDemo();
  el.querySelectorAll('[data-beat]').forEach((b) => {
    b.onclick = () => setStreamMood(b.dataset.beat);
  });
}

let lastGapToast = false;
function pushCreatorActivityOnce(text) {
  if (lastGapToast) return;
  lastGapToast = true;
  pushCreatorActivity(text);
  setTimeout(() => { lastGapToast = false; }, 8000);
}

function startStoryDemo() {
  stopStoryDemo();
  storyRunning = true;
  storyStartedAt = Date.now();
  lastGapToast = false;

  const btn = $('storyDemoBtn');
  if (btn) {
    btn.textContent = '↺ Replay story';
    btn.classList.add('running');
  }

  pruneStoryChat();
  // Replace Stream (Living Room) chat with cold-open for the story
  CHAT_STREAM.length = 0;
  STORY_BASE_CHAT.forEach((m) => CHAT_STREAM.push({ ...m, reacts: { ...(m.reacts || {}) } }));

  reactionLog = [];
  momentBoardIds = [];
  pinnedMsg = null;
  if (pinTimer) clearTimeout(pinTimer);
  pinTimer = null;
  S.msgReacts = {};
  S.myReacts = {};
  save();

  activeChat = 'stream';
  document.querySelectorAll('.chat-tab').forEach((x) => x.classList.toggle('active', x.dataset.chat === 'stream'));
  applyChatMode();
  renderChat();

  setStoryScene(1);
  setStreamMood('hype', { silent: true });
  setStoryUI(STORY_DEMO.acts[0]);
  onReactionChange();

  STORY_DEMO.acts.forEach((a) => {
    storyTimers.push(setTimeout(() => {
      setStoryScene(a.act);
      setStoryUI(a);
      setStreamMood(a.beat, { silent: true });
      renderMoodPulse();
    }, a.at));
  });

  STORY_DEMO.messages.forEach((m) => {
    storyTimers.push(setTimeout(() => injectStoryMessage(m), m.at));
  });

  STORY_DEMO.bursts.forEach((b) => {
    storyTimers.push(setTimeout(() => {
      pushReactionLog(b.emo, b.n);
      const pinLive = pinnedMsg && pinnedMsg.until > Date.now();
      const last = (b.pin && pinLive)
        ? findChatMessage(pinnedMsg.id)
        : [...livingRoomChat()].reverse().find((x) => !x.system);
      if (last) {
        S.msgReacts[last.id] = S.msgReacts[last.id] || {};
        S.msgReacts[last.id][b.emo] = (S.msgReacts[last.id][b.emo] || 0) + b.n;
        if (last.reacts) last.reacts[b.emo] = (last.reacts[b.emo] || 0) + b.n;
        save();
        if (activeChat === 'stream') renderChat();
        renderCreatorChat();
        if (VALIDATION_REACTS.has(b.emo) || b.pin) pinValidationMessage(last);
      }
      if (REACT_MOOD[b.emo]) nudgeMood(REACT_MOOD[b.emo], Math.min(4, b.n), false);
      onReactionChange();
    }, b.at));
  });

  storyTickTimer = setInterval(() => {
    const elapsed = Date.now() - storyStartedAt;
    const pct = Math.min(100, (elapsed / STORY_DEMO.duration) * 100);
    const sec = Math.floor(elapsed / 1000);
    const tc = `0:${String(sec).padStart(2, '0')}`;
    if ($('storyProgress')) $('storyProgress').style.width = `${pct}%`;
    if ($('storyTimecode')) $('storyTimecode').textContent = tc;
    if ($('cdProgress')) $('cdProgress').style.width = `${pct}%`;
    if ($('cdTimecode')) $('cdTimecode').textContent = tc;
    if ($('cdTimeLive')) $('cdTimeLive').textContent = tc;
    if (elapsed >= STORY_DEMO.duration) {
      clearInterval(storyTickTimer);
      storyTickTimer = null;
      storyRunning = false;
      if (btn) {
        btn.textContent = '↺ Replay story';
        btn.classList.remove('running');
      }
      pushCreatorActivity('Story complete — chatVoo exciting → loved by the room');
      toast('Story complete', 'Exciting → encourage → they loved it. That’s chatVoo.', '🔥');
      renderMoodPulse();
    }
  }, 250);

  toast('Story demo', 'Exciting → encourage → room loves it · chatVoo', '🎬');
  renderCreatorChat();
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
    <div class="event-title compact">🗳️ ${POLL.q} <small>${POLL.sub}</small></div>
    <div class="poll-chips">
      ${POLL.options.map((o, i) => {
        const v = o.v + (S.pollVote === i ? 1 : 0);
        const pct = Math.round((v / total) * 100);
        return `<button class="poll-chip ${S.pollVote === i ? 'picked' : ''}" data-poll="${i}">
          <span class="poll-ic">${o.ic || '•'}</span>
          <span class="poll-t">${o.t}</span>
          <span class="poll-pct">${pct}%</span>
        </button>`;
      }).join('')}
    </div>`;
}

function eventPrediction() {
  const p = S.prediction;
  if (p.resolved) {
    const won = p.side === 0;
    return `
      <div class="event-title compact">🎯 ${won ? 'Won' : 'Lost'} <small>${won ? `+${p.bet * 2} XP` : `−${p.bet} XP`}</small></div>`;
  }
  return `
    <div class="event-title compact">🎯 Make arcade? <small>${p.bet} XP</small></div>
    <div class="poll-chips">
      ${[50, 100, 200].map((b) => `<button class="poll-chip bet ${p.bet === b ? 'picked' : ''}" data-bet="${b}">${b}</button>`).join('')}
      ${PREDICTION.options.map((o, i) => `<button class="poll-chip ${p.side === i ? 'picked' : ''}" data-pred="${i}"><span class="poll-ic">${i === 0 ? '✅' : '❌'}</span><span class="poll-t">${i === 0 ? 'Yes' : 'No'}</span></button>`).join('')}
    </div>
    ${p.side !== null ? '<button class="primary-btn sm" id="resolveBtn">Resolve</button>' : ''}`;
}

function eventStorm() {
  return `
    <div class="event-title compact">😂 Storm <small>${S.stormA} vs ${S.stormB}</small></div>
    <div class="poll-chips">
      ${S.stormTeam
        ? `<button class="poll-chip picked" id="spamBtn">Spam ${S.stormTeam.toUpperCase()}</button>`
        : `<button class="poll-chip" data-storm="kekw"><span class="poll-ic">😂</span><span class="poll-t">KEKW</span></button>
           <button class="poll-chip" data-storm="hype"><span class="poll-ic">🔥</span><span class="poll-t">HYPE</span></button>`}
    </div>`;
}

function eventQuiz() {
  const done = S.quizAnswer !== null;
  return `
    <div class="event-title compact">🧠 Quiz <small>${QUIZ.q.replace('Which connected creator streamed from Tokyo first?', 'Tokyo first?')}</small></div>
    <div class="poll-chips">
      ${QUIZ.options.map((o, i) => {
        let cls = '';
        if (done) cls = i === QUIZ.correct ? 'correct' : (i === S.quizAnswer ? 'wrong' : '');
        return `<button class="poll-chip ${cls}" data-quiz="${i}" ${done ? 'disabled' : ''}><span class="poll-t">${o}</span></button>`;
      }).join('')}
    </div>`;
}

function eventPulse() {
  const room = getRoomMood();
  const counts = room.counts;
  const beat = STREAM_BEATS[S.streamMood] || STREAM_BEATS.chill;
  const meta = ROOM_MOOD_META[room.mood] || ROOM_MOOD_META.neutral;
  const top = room.top.slice(0, 3);

  return `
    <div class="event-title compact">📊 ${meta.ic} ${meta.label} · ${beat.ic} ${beat.label}</div>
    <div class="poll-chips">
      ${top.map(([e, n]) => `<span class="poll-chip static"><span class="poll-ic">${e}</span><span class="poll-pct">${n}</span></span>`).join('') || '<span class="muted">no reacts yet</span>'}
    </div>`;
}

function bindEvent() {
  document.querySelectorAll('[data-poll]').forEach((b) => {
    b.onclick = () => {
      if (S.pollVote !== null) return;
      S.pollVote = +b.dataset.poll; save(); bumpTask('poll');
      pushAgentsToward('hype', 4, 0.35);
      pushMoodEvent('hype', 'SpookyBunny', `voted ${POLL.options[S.pollVote].t}`, true);
      renderEvent(); renderMoodUI();
    };
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
    pushAgentsToward(won ? 'hype' : 'tilt', 5, 0.4);
    renderEvent(); renderMoodUI();
  };
  document.querySelectorAll('[data-storm]').forEach((b) => {
    b.onclick = () => {
      S.stormTeam = b.dataset.storm;
      if (S.stormTeam === 'kekw') S.stormA += 14; else S.stormB += 14;
      save(); bumpTask('storm');
      pushAgentsToward('hype', 5, 0.45);
      pushMoodEvent('hype', 'SpookyBunny', `joined ${S.stormTeam.toUpperCase()}`, true);
      renderEvent(); renderMoodUI();
    };
  });
  const sb = $('spamBtn');
  if (sb) sb.onclick = () => {
    if (S.stormTeam === 'kekw') S.stormA += Math.ceil(Math.random() * 6); else S.stormB += Math.ceil(Math.random() * 6);
    CHAT_STREAM.push({
      id: `spam${Date.now()}`, author: 'SpookyBunny', mine: true,
      text: S.stormTeam === 'kekw' ? 'KEKW' : 'HYPE', reacts: {},
    });
    pushAgentsToward('hype', 3, 0.5);
    pushMoodEvent('hype', 'SpookyBunny', S.stormTeam === 'kekw' ? 'KEKW' : 'HYPE', true);
    save();
    if (activeChat !== 'mood') renderChat();
    renderEvent(); renderMoodUI();
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
      // Soft handoff into the world — never required for host state to stay consistent
      try { OverworldBridge.travelToSelected(); } catch (err) { /* bridge optional */ }
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

/* ═══════════════════════════════════════════════════════
   CHAT MOOD MAP
   Chat is placed on the valence × arousal circumplex —
   the standard model for describing emotion. X is negative
   to positive, Y is calm to energised. That makes every
   position mean something a streamer can act on.
   ═══════════════════════════════════════════════════════ */

const MOODS = {
  hype: { label: 'Hype', ic: '🔥', color: '#53fc18', v: 0.62, a: 0.72, read: 'loud and loving it' },
  cozy: { label: 'Cozy', ic: '💚', color: '#5eb7ff', v: 0.66, a: -0.6, read: 'calm and happy' },
  tilt: { label: 'Tilt', ic: '💀', color: '#ff5c8a', v: -0.62, a: 0.66, read: 'loud and unhappy' },
  drift: { label: 'Drifting', ic: '😐', color: '#8496a1', v: -0.42, a: -0.68, read: 'going quiet' },
  confused: { label: 'Confused', ic: '❓', color: '#ffb020', v: -0.05, a: 0.08, read: 'lost the thread' },
};

/* Chat terrains — same heavy vocabulary as Top 5 firehose classes.
   Pure pockets keep the punchy word; mixed / mid-map → Tactical. */
const TERRAIN_NAMES = {
  hype: ['Chaotic', 'Electric', 'Clutch', 'Roaring'],
  cozy: ['Chill', 'Lore', 'Lounge', 'Soft Nest'],
  tilt: ['Salty', 'Tilted', 'Rage Pocket', 'Toxic Spike'],
  drift: ['Chill', 'Lull', 'Quiet Flat', 'AFK Meadow'],
  confused: ['Scramble', 'Fog Bank', 'Lost Thread', 'Question Pit'],
};
function nameChatTerrain(dom, purity, cx, cy, used) {
  const pool = TERRAIN_NAMES[dom] || ['Wild'];
  let pick;
  if (purity < 52 || (Math.abs(cx) < 0.22 && Math.abs(cy) < 0.22)) pick = 'Tactical';
  else if (purity >= 78) pick = pool[0];
  else if (cy > 0.35) pick = pool[Math.min(1, pool.length - 1)];
  else if (cy < -0.35) pick = pool[Math.min(2, pool.length - 1)];
  else pick = pool[Math.min(3, pool.length - 1)] || pool[0];
  if (!used.has(pick)) { used.add(pick); return pick; }
  for (const alt of pool) if (!used.has(alt)) { used.add(alt); return alt; }
  let n = 2; let tagged = `${pick} ${n}`;
  while (used.has(tagged)) { n += 1; tagged = `${pick} ${n}`; }
  used.add(tagged);
  return tagged;
}
const MOOD_KEYS = Object.keys(MOODS);

const MOOD_LINES = {
  hype: ['LETS GOOO', 'no way', 'W streamer', 'chat is cooking', 'GOATED', 'insane'],
  cozy: ['this is nice', 'comfy stream', 'love this', 'good vibes', 'ty for stream'],
  tilt: ['what is he doing', 'nah thats bad', 'unlucky', 'come on man', 'L'],
  drift: ['zzz', 'anyone here', 'might head off', '...', 'quiet tonight'],
  confused: ['wait what', 'what camera is he using?', 'i dont get it', 'huh?', 'can someone explain'],
};

const REACT_MOOD = {
  '🔥': 'hype', '😂': 'hype', '🎉': 'hype', '💯': 'hype', '🚀': 'hype', '⚡': 'hype',
  '👏': 'cozy', '✨': 'cozy', '💪': 'cozy', '🌸': 'cozy', '☀️': 'cozy', '😌': 'cozy',
  '👀': 'confused', '❓': 'confused',
  '💀': 'tilt',
  '💙': 'confused', '🫂': 'confused', '🥺': 'confused', '😢': 'confused', '💔': 'confused',
  '🫶': 'confused', '💧': 'confused', '😔': 'confused', '🤍': 'confused', '🙏': 'confused',
  '😭': 'hype',
};

/* Chat-native instruments — nothing here is a dashboard "tool".
   Viewers move mood by typing in Circle. Streamers move mood by
   dropping a cue into Circle that chat then swarms. */
const MSG_SIGNALS = [
  { mood: 'hype', re: /\b(kekw|lul|lol|lets?\s*go+|goated|insane|w\b|pog|🔥|😂)\b/i, push: 3 },
  { mood: 'tilt', re: /\b(l\b|nah|unlucky|trash|💀|rip|what is he doing)\b/i, push: 3 },
  { mood: 'confused', re: /(\?|wait what|huh|i don'?t get|what camera|explain)/i, push: 3 },
  { mood: 'cozy', re: /\b(comfy|love this|good vibes|ty for|nice|💚)\b/i, push: 3 },
  { mood: 'drift', re: /\b(zzz|anyone here|quiet|bored|afk|\.\.\.)\b/i, push: 2 },
];

const STREAMER_CUES = [
  {
    id: 'kekw', ic: '😂', label: 'spam KEKW',
    cue: 'spam KEKW 😂',
    mood: 'hype', storm: 'kekw',
    swarm: ['KEKW', 'KEKW', '😂😂😂', 'KEKW', 'absolute cinema', 'KEKW KEKW', 'chat cooking'],
  },
  {
    id: 'hype', ic: '🔥', label: 'go crazy',
    cue: 'LETS GO chat — go crazy',
    mood: 'hype', storm: 'hype',
    swarm: ['LETS GOOO', '🔥🔥🔥', 'W streamer', 'GOATED', 'HYPE HYPE', 'no way'],
  },
  {
    id: 'chill', ic: '🧊', label: 'everyone chill',
    cue: 'chat chill for a sec',
    mood: 'cozy',
    swarm: ['ok chill', 'my bad', 'comfy again', 'good vibes', 'love this', 'ty for clarifying'],
  },
  {
    id: 'ama', ic: '❓', label: 'ask me anything',
    cue: 'AMA — drop your questions',
    mood: 'confused',
    swarm: ['what camera is he using?', 'where next?', 'wait what?', 'how long is the stream?', 'huh?', 'can someone explain'],
  },
  {
    id: 'wake', ic: '🗳️', label: 'wake chat',
    cue: 'chat woke? vote in the poll',
    mood: 'hype', open: 'poll',
    swarm: ['poll time', 'arcade', 'im voting', 'wake up chat', 'W', 'lets decide'],
  },
];

/* confused sits at the centre, so widen its catchment penalty or it
   swallows every agent that drifts near the origin */
const MOOD_PULL = { hype: 1, cozy: 1, tilt: 1, drift: 1, confused: 1.45 };

let agents = [];
let zones = [];
let moodPaused = false;
let moodEvents = [];
let moodHistory = [];
let moodShowHulls = true;
let moodShowLabels = true;
let moodRAF = null;
let lastMoodTick = 0;
let lastDominant = null;
let lastCue = null;
let lasso = null;
let bigPad = 34;

function seedAgents() {
  const mix = { hype: 14, cozy: 12, tilt: 5, drift: 9, confused: 6 };
  const names = ['NightOwl', 'ClipLord', 'TokyoDrift', 'KEKWKing', 'PixelPam', 'neon_nova', 'orbitron',
    'speedrunner88', 'chatlurker', 'gg_enjoyer', 'MoonMile', 'CutKing', 'ReelRat', 'StreetCam'];
  agents = [];
  Object.entries(mix).forEach(([m, n]) => {
    for (let i = 0; i < n; i++) {
      const M = MOODS[m];
      agents.push({
        mood: m,
        x: M.v + (Math.random() - 0.5) * 0.42,
        y: M.a + (Math.random() - 0.5) * 0.42,
        vx: 0, vy: 0,
        r: 3 + Math.random() * 3,
        ph: Math.random() * 6.28,
        name: names[Math.floor(Math.random() * names.length)],
      });
    }
  });
}

function pushMoodEvent(mood, name, text, mine = false) {
  moodEvents.unshift({ mood, name, text, mine, t: Date.now() });
  moodEvents = moodEvents.slice(0, 40);
}

function nudgeMood(mood, count = 2, mine = false) {
  const M = MOODS[mood];
  for (let i = 0; i < count; i++) {
    const far = agents.filter((a) => a.mood !== mood);
    const a = far.length ? far[Math.floor(Math.random() * far.length)] : agents[i];
    if (!a) continue;
    a.mood = mood;
    a.vx += (M.v - a.x) * 0.09;
    a.vy += (M.a - a.y) * 0.09;
  }
  const line = MOOD_LINES[mood][Math.floor(Math.random() * MOOD_LINES[mood].length)];
  pushMoodEvent(mood, mine ? 'SpookyBunny' : agents[0].name, line, mine);
}

/* mood follows position, so an instrument that moves someone
   actually changes what they are — not just where they sit */
function moodAt(x, y) {
  let best = MOOD_KEYS[0]; let bd = Infinity;
  MOOD_KEYS.forEach((k) => {
    const M = MOODS[k];
    const d = Math.hypot(M.v - x, M.a - y) * MOOD_PULL[k];
    if (d < bd) { bd = d; best = k; }
  });
  return best;
}

/* DBSCAN — chat terrains emerge from where chatters actually are,
   then get vibe names (Chaotic, Chilling, Tactical…) */
function clusterAgents(eps = 0.3, minPts = 3) {
  const n = agents.length;
  const labels = new Array(n).fill(-1);
  const region = (i) => {
    const out = [];
    for (let j = 0; j < n; j++) {
      if (Math.hypot(agents[i].x - agents[j].x, agents[i].y - agents[j].y) <= eps) out.push(j);
    }
    return out;
  };

  let cid = 0;
  for (let i = 0; i < n; i++) {
    if (labels[i] !== -1) continue;
    const nb = region(i);
    if (nb.length < minPts) { labels[i] = -2; continue; }
    labels[i] = cid;
    const queue = nb.slice();
    while (queue.length) {
      const j = queue.pop();
      if (labels[j] === -2) labels[j] = cid;
      if (labels[j] !== -1) continue;
      labels[j] = cid;
      const nb2 = region(j);
      if (nb2.length >= minPts) queue.push(...nb2);
    }
    cid += 1;
  }

  agents.forEach((a, i) => { a.zone = labels[i]; });

  const out = [];
  const usedNames = new Set();
  for (let c = 0; c < cid; c++) {
    const mem = agents.filter((a) => a.zone === c);
    if (!mem.length) continue;
    const counts = {};
    MOOD_KEYS.forEach((k) => { counts[k] = 0; });
    mem.forEach((a) => { counts[a.mood] += 1; });
    const dom = MOOD_KEYS.reduce((b, k) => (counts[k] > counts[b] ? k : b), MOOD_KEYS[0]);
    const purity = Math.round((counts[dom] / mem.length) * 100);
    const cx = mem.reduce((s, a) => s + a.x, 0) / mem.length;
    const cy = mem.reduce((s, a) => s + a.y, 0) / mem.length;
    out.push({
      id: c,
      name: nameChatTerrain(dom, purity, cx, cy, usedNames),
      members: mem,
      size: mem.length,
      dom,
      purity,
      cx,
      cy,
    });
  }
  zones = out.sort((a, b) => b.size - a.size);
}

function stepMood(dt) {
  agents.forEach((a) => {
    const M = MOODS[a.mood];
    a.vx += (M.v - a.x) * 0.4 * dt + (Math.random() - 0.5) * 0.5 * dt;
    a.vy += (M.a - a.y) * 0.4 * dt + (Math.random() - 0.5) * 0.5 * dt;
    a.vx *= 0.93; a.vy *= 0.93;
    a.x = Math.max(-1, Math.min(1, a.x + a.vx * dt));
    a.y = Math.max(-1, Math.min(1, a.y + a.vy * dt));
    a.ph += dt * 2;
  });

  /* mood is contagious — sitting next to a mood pulls you into it */
  if (Math.random() < dt * 6) {
    const a = agents[Math.floor(Math.random() * agents.length)];
    const near = agents.filter((b) => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < 0.32);
    if (near.length >= 2) a.mood = near[Math.floor(Math.random() * near.length)].mood;
  }

  if (Math.random() < dt * 1.6) {
    const a = agents[Math.floor(Math.random() * agents.length)];
    const line = MOOD_LINES[a.mood][Math.floor(Math.random() * MOOD_LINES[a.mood].length)];
    pushMoodEvent(a.mood, a.name, line);
  }
  if (Math.random() < dt * 0.28) {
    nudgeMood(MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)], 1);
  }
}

function moodMetrics() {
  const counts = {};
  MOOD_KEYS.forEach((k) => { counts[k] = 0; });
  agents.forEach((a) => { counts[a.mood] += 1; });

  const dominant = MOOD_KEYS.reduce((b, k) => (counts[k] > counts[b] ? k : b), MOOD_KEYS[0]);
  const n = agents.length;
  const avgA = agents.reduce((s, a) => s + a.y, 0) / n;
  const avgV = agents.reduce((s, a) => s + a.x, 0) / n;
  const index = Math.round(((avgA + 1) / 2) * 60 + ((avgV + 1) / 2) * 40);

  const sorted = MOOD_KEYS.slice().sort((a, b) => counts[b] - counts[a]);
  const A = MOODS[sorted[0]]; const B = MOODS[sorted[1]];
  const split = Math.round((Math.hypot(A.v - B.v, A.a - B.a) / 2.83) * (counts[sorted[1]] / n) * 260);

  return {
    counts, dominant, index,
    confusion: Math.round((counts.confused / n) * 100),
    split: Math.min(100, split),
    rate: Math.round(46 + ((avgA + 1) / 2) * 90),
    zones: zones.length,
    selected: agents.filter((a) => a.sel).length,
  };
}

function targetAgents() {
  const s = agents.filter((a) => a.sel);
  return s.length ? s : agents;
}

function classifyMessage(text) {
  for (const s of MSG_SIGNALS) {
    if (s.re.test(text)) return s;
  }
  return null;
}

/* push agents toward a mood — selection focuses the hit */
function pushAgentsToward(mood, count, strength = 0.35) {
  const M = MOODS[mood];
  if (!M) return;
  const pool = targetAgents();
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const a = pool[Math.floor(Math.random() * pool.length)];
    a.x = Math.max(-1, Math.min(1, a.x + (M.v - a.x) * strength + (Math.random() - 0.5) * 0.12));
    a.y = Math.max(-1, Math.min(1, a.y + (M.a - a.y) * strength + (Math.random() - 0.5) * 0.12));
    a.mood = moodAt(a.x, a.y);
  }
}

function applyMessageSignal(text, mine = false) {
  const hit = classifyMessage(text);
  if (!hit) return null;
  pushAgentsToward(hit.mood, hit.push, 0.4);
  pushMoodEvent(hit.mood, mine ? 'SpookyBunny' : 'chat', text, mine);
  clusterAgents();
  renderMoodUI();
  if (mine) toast('Mood shifted', `"${text.slice(0, 28)}" → ${MOODS[hit.mood].label}`, MOODS[hit.mood].ic);
  return hit;
}

/* Streamer cue = a real message in Stream Living Room + a swarm of replies.
   That swarm is the instrument — the map just reads it. */
function dropStreamerCue(id) {
  const cue = STREAMER_CUES.find((c) => c.id === id);
  if (!cue) return;

  livingRoomChat().push({
    id: `cue${Date.now()}`,
    author: 'Clavicular',
    badge: 'stream',
    badgeText: 'STREAMER',
    color: '#53fc18',
    text: cue.cue,
    reacts: {},
  });

  const names = ['NightOwl', 'ClipLord', 'TokyoDrift', 'KEKWKing', 'PixelPam', 'neon_nova', 'speedrunner88', 'MoonMile'];
  cue.swarm.forEach((line, i) => {
    setTimeout(() => {
      livingRoomChat().push({
        id: `sw${Date.now()}${i}`,
        author: names[i % names.length],
        color: '#c9d6dc',
        text: line,
        reacts: {},
      });
      pushAgentsToward(cue.mood, 4, 0.55);
      pushMoodEvent(cue.mood, names[i % names.length], line);
      if (activeChat !== 'mood') renderChat();
      clusterAgents();
      renderMoodUI();
    }, 180 + i * 220);
  });

  pushAgentsToward(cue.mood, 10, 0.65);
  pushMoodEvent(cue.mood, 'Clavicular', cue.cue, false);
  lastCue = { ...cue, at: Date.now() };

  if (cue.storm) {
    S.stormTeam = cue.storm;
    if (cue.storm === 'kekw') S.stormA += 40; else S.stormB += 40;
    activeEvent = 'storm';
    document.querySelectorAll('.event-tab').forEach((x) => x.classList.toggle('active', x.dataset.event === 'storm'));
  }
  if (cue.open) {
    activeEvent = cue.open;
    document.querySelectorAll('.event-tab').forEach((x) => x.classList.toggle('active', x.dataset.event === cue.open));
  }

  save();
  const focus = agents.filter((a) => a.sel).length;
  toast('Cue dropped into Stream', focus
    ? `${cue.label} · landing harder on ${focus} selected chatters`
    : `${cue.label} · chat is swarming`, cue.ic);

  if (activeChat === 'mood') {
    activeChat = 'stream';
    document.querySelectorAll('.chat-tab').forEach((x) => x.classList.toggle('active', x.dataset.chat === 'stream'));
    applyChatMode();
  }
  renderChat();
  renderEvent();
  clusterAgents();
  renderMoodUI();
}

function renderCueStrip() {
  const html = STREAMER_CUES.map((c) =>
    `<button class="cue-btn" data-cue="${c.id}" title="Drop into Stream chat">${c.ic} ${c.label}</button>`).join('');
  if ($('cueBtns')) {
    $('cueBtns').innerHTML = html;
    $('cueBtns').querySelectorAll('[data-cue]').forEach((b) => {
      b.onclick = () => dropStreamerCue(b.dataset.cue);
    });
  }
  if ($('mmCues')) {
    $('mmCues').innerHTML = STREAMER_CUES.map((c) =>
      `<button class="cue-btn wide" data-cue-mm="${c.id}">${c.ic} ${c.label}</button>`).join('');
    $('mmCues').querySelectorAll('[data-cue-mm]').forEach((b) => {
      b.onclick = () => dropStreamerCue(b.dataset.cueMm);
    });
  }
}

/* convex hull — monotone chain */
function hull(pts) {
  if (pts.length < 3) return [];
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  const up = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop();
    up.push(q);
  }
  lo.pop(); up.pop();
  return lo.concat(up);
}

function drawMood(cv, big) {
  if (!cv || !cv.clientWidth) return;
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth; const h = cv.clientHeight;
  if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);

  const pad = big ? 34 : 20;
  const X = (v) => pad + ((v + 1) / 2) * (w - pad * 2);
  const Y = (a) => h - pad - ((a + 1) / 2) * (h - pad * 2);

  g.fillStyle = '#080a0b';
  g.fillRect(0, 0, w, h);

  const glow = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.5);
  glow.addColorStop(0, 'rgba(83,252,24,.07)');
  glow.addColorStop(1, 'transparent');
  g.fillStyle = glow; g.fillRect(0, 0, w, h);

  g.strokeStyle = 'rgba(255,255,255,.045)'; g.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const gx = pad + (i / 8) * (w - pad * 2); const gy = pad + (i / 8) * (h - pad * 2);
    g.beginPath(); g.moveTo(gx, pad); g.lineTo(gx, h - pad); g.stroke();
    g.beginPath(); g.moveTo(pad, gy); g.lineTo(w - pad, gy); g.stroke();
  }
  g.strokeStyle = 'rgba(255,255,255,.16)';
  g.beginPath(); g.moveTo(X(0), pad); g.lineTo(X(0), h - pad); g.stroke();
  g.beginPath(); g.moveTo(pad, Y(0)); g.lineTo(w - pad, Y(0)); g.stroke();

  if (moodShowLabels) {
    g.font = `700 ${big ? 10 : 8}px Inter, sans-serif`;
    g.fillStyle = 'rgba(132,150,161,.75)';
    g.textAlign = 'center';
    g.fillText('ENERGISED', X(0), pad - 8);
    g.fillText('CALM', X(0), h - pad + (big ? 18 : 13));
    g.save(); g.translate(pad - 9, Y(0)); g.rotate(-Math.PI / 2);
    g.fillText('NEGATIVE', 0, 0); g.restore();
    g.save(); g.translate(w - pad + (big ? 11 : 9), Y(0)); g.rotate(Math.PI / 2);
    g.fillText('POSITIVE', 0, 0); g.restore();

    g.font = `800 ${big ? 12 : 9}px Inter, sans-serif`;
    const q = [['TILT', -0.55, 0.78, '#ff5c8a'], ['HYPE', 0.55, 0.78, '#53fc18'],
      ['DRIFTING', -0.55, -0.82, '#8496a1'], ['COZY', 0.55, -0.82, '#5eb7ff']];
    q.forEach(([t, vx, vy, c]) => { g.fillStyle = `${c}44`; g.fillText(t, X(vx), Y(vy)); });
  }

  if (moodShowHulls) {
    zones.forEach((z) => {
      const pts = z.members.map((a) => [X(a.x), Y(a.y)]);
      if (pts.length < 3) return;
      const hl = hull(pts);
      if (hl.length < 3) return;
      const col = MOODS[z.dom].color;
      const picked = z.members.some((a) => a.sel);

      g.beginPath(); g.moveTo(hl[0][0], hl[0][1]);
      hl.slice(1).forEach((p) => g.lineTo(p[0], p[1]));
      g.closePath();
      g.fillStyle = `${col}${picked ? '26' : '12'}`; g.fill();
      g.strokeStyle = picked ? '#ffffff' : `${col}66`;
      g.lineWidth = picked ? 2 : 1.4;
      g.setLineDash(picked ? [5, 3] : []);
      g.stroke();
      g.setLineDash([]);

      if (moodShowLabels && big) {
        const txt = `${z.name} · ${z.size} · ${z.purity}% ${MOODS[z.dom].label}`;
        g.font = '800 9px Inter, sans-serif'; g.textAlign = 'center';
        const tw = g.measureText(txt).width + 13;
        const lx = X(z.cx); const ly = Y(z.cy);
        g.fillStyle = 'rgba(8,10,11,.9)';
        g.fillRect(lx - tw / 2, ly - 8, tw, 16);
        g.strokeStyle = picked ? '#fff' : `${col}88`; g.lineWidth = 1;
        g.strokeRect(lx - tw / 2, ly - 8, tw, 16);
        g.fillStyle = picked ? '#fff' : col;
        g.fillText(txt, lx, ly + 3);
      }
    });
  }

  agents.forEach((a) => {
    const c = MOODS[a.mood].color;
    const px = X(a.x); const py = Y(a.y);
    const pulse = 1 + Math.sin(a.ph) * 0.16;
    const rr = a.r * (big ? 1.5 : 1) * pulse;
    const halo = g.createRadialGradient(px, py, 0, px, py, rr * 4);
    halo.addColorStop(0, `${c}55`); halo.addColorStop(1, 'transparent');
    g.fillStyle = halo;
    g.beginPath(); g.arc(px, py, rr * 4, 0, 6.29); g.fill();
    g.fillStyle = c;
    g.beginPath(); g.arc(px, py, rr, 0, 6.29); g.fill();
    if (a.sel) {
      g.strokeStyle = '#fff'; g.lineWidth = 1.6;
      g.beginPath(); g.arc(px, py, rr + 4, 0, 6.29); g.stroke();
    }
  });

  if (big && lasso && lasso.live) {
    const x0 = Math.min(lasso.x0, lasso.x1); const y0 = Math.min(lasso.y0, lasso.y1);
    const ww = Math.abs(lasso.x1 - lasso.x0); const hh = Math.abs(lasso.y1 - lasso.y0);
    g.fillStyle = 'rgba(83,252,24,.09)';
    g.fillRect(x0, y0, ww, hh);
    g.strokeStyle = 'rgba(83,252,24,.75)'; g.lineWidth = 1.3;
    g.setLineDash([5, 4]); g.strokeRect(x0, y0, ww, hh); g.setLineDash([]);
  }
}

/* ─── TACTICAL SELECTION ───────────────────────────────── */

function canvasToVal(cv, px, py) {
  const w = cv.clientWidth; const h = cv.clientHeight; const p = bigPad;
  return [
    ((px - p) / (w - p * 2)) * 2 - 1,
    ((h - p - py) / (h - p * 2)) * 2 - 1,
  ];
}

function clearSelection() {
  agents.forEach((a) => { a.sel = false; });
  renderMoodUI();
}

function selectZone(id) {
  const z = zones.find((x) => x.id === id);
  if (!z) return;
  const already = z.members.every((a) => a.sel) && agents.filter((a) => a.sel).length === z.size;
  agents.forEach((a) => { a.sel = false; });
  if (!already) z.members.forEach((a) => { a.sel = true; });
  renderMoodUI();
}

function bindMoodCanvas() {
  const cv = $('moodBig');
  if (!cv || cv.dataset.bound) return;
  cv.dataset.bound = '1';

  const pos = (e) => {
    const r = cv.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  cv.onmousedown = (e) => {
    const [px, py] = pos(e);
    lasso = { x0: px, y0: py, x1: px, y1: py, live: true, moved: false };
  };
  cv.onmousemove = (e) => {
    if (!lasso || !lasso.live) return;
    const [px, py] = pos(e);
    lasso.x1 = px; lasso.y1 = py;
    if (Math.hypot(px - lasso.x0, py - lasso.y0) > 6) lasso.moved = true;
  };
  cv.onmouseup = (e) => {
    if (!lasso) return;
    const [px, py] = pos(e);

    if (!lasso.moved) {
      const [vx, vy] = canvasToVal(cv, px, py);
      let best = null; let bd = Infinity;
      zones.forEach((z) => {
        const d = Math.hypot(z.cx - vx, z.cy - vy);
        if (d < bd) { bd = d; best = z; }
      });
      if (best && bd < 0.45) selectZone(best.id); else clearSelection();
    } else {
      const [ax, ay] = canvasToVal(cv, Math.min(lasso.x0, lasso.x1), Math.max(lasso.y0, lasso.y1));
      const [bx, by] = canvasToVal(cv, Math.max(lasso.x0, lasso.x1), Math.min(lasso.y0, lasso.y1));
      agents.forEach((a) => { a.sel = a.x >= ax && a.x <= bx && a.y >= ay && a.y <= by; });
      const n = agents.filter((a) => a.sel).length;
      toast('Tactical terrain drawn', n ? `${n} chatters selected` : 'nobody in that region', '🎯');
      renderMoodUI();
    }
    lasso = null;
  };
  cv.onmouseleave = () => { lasso = null; };
}

function drawSpark() {
  const cv = $('moodSpark');
  if (!cv || !cv.clientWidth) return;
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth; const h = cv.clientHeight;
  if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  if (moodHistory.length < 2) return;
  const max = 100;
  g.beginPath();
  moodHistory.forEach((v, i) => {
    const x = (i / (moodHistory.length - 1)) * w;
    const y = h - (v / max) * (h - 6) - 3;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  });
  g.strokeStyle = '#53fc18'; g.lineWidth = 1.8; g.stroke();
  g.lineTo(w, h); g.lineTo(0, h); g.closePath();
  const f = g.createLinearGradient(0, 0, 0, h);
  f.addColorStop(0, 'rgba(83,252,24,.28)'); f.addColorStop(1, 'transparent');
  g.fillStyle = f; g.fill();
}

function legendHtml() {
  return MOOD_KEYS.map((k) =>
    `<span><i style="background:${MOODS[k].color}"></i>${MOODS[k].label}</span>`).join('');
}

function renderMoodUI() {
  const m = moodMetrics();
  const D = MOODS[m.dominant];

  if ($('moodNow')) {
    $('moodNow').innerHTML = `${D.ic} ${D.label.toUpperCase()}`;
    $('moodNow').style.color = D.color;
    $('moodSub').textContent = `${D.read} · ${m.counts[m.dominant]} of ${agents.length} chatters`;
    $('moodIdx').textContent = m.index;
    $('moodStatsMini').innerHTML = `
      <div><b>${m.rate}</b><span>msg/min</span></div>
      <div><b>${m.zones}</b><span>terrains</span></div>
      <div><b>${m.confusion}%</b><span>confused</span></div>
      <div><b>${m.split}</b><span>split</span></div>`;
  }

  if ($('mmIdx')) {
    $('mmIdx').textContent = m.index;
    $('mmStats').innerHTML = `
      <div class="mm-stat"><b>${m.rate}</b><span>messages / min</span></div>
      <div class="mm-stat"><b>${D.ic} ${D.label}</b><span>dominant mood</span></div>
      <div class="mm-stat ${m.confusion >= 18 ? 'warn' : ''}"><b>${m.confusion}%</b><span>confused</span></div>
      <div class="mm-stat ${m.split >= 45 ? 'warn' : ''}"><b>${m.split}</b><span>split index</span></div>`;

    $('mmEvents').innerHTML = moodEvents.slice(0, 14).map((e) => `
      <div class="mm-ev ${e.mine ? 'mine' : ''}">
        <span class="mm-ev-dot" style="background:${MOODS[e.mood].color}"></span>
        <div><b>${e.name}</b><small>${e.text}</small></div>
        <span class="mm-ev-t">${e.mine ? 'you' : 'now'}</span>
      </div>`).join('');

    const sel = m.selected;

    $('mmZones').innerHTML = zones.length
      ? zones.map((z) => {
        const on = z.members.some((a) => a.sel);
        return `<button class="zone-chip ${on ? 'on' : ''}" data-zone="${z.id}"
            style="--zc:${MOODS[z.dom].color}">
            <b>${z.name}</b><span>${z.size} · ${z.purity}% ${MOODS[z.dom].label}</span></button>`;
      }).join('') + (sel ? '<button class="zone-chip clear" id="zoneClear">Clear selection</button>' : '')
      : '<span class="muted small">No terrain has enough density right now — chat is scattered.</span>';

    if ($('mmHow')) {
      $('mmHow').innerHTML = `
        <div class="how-row"><b>You type in Circle</b><span>KEKW · ??? · L · comfy → map moves</span></div>
        <div class="how-row"><b>Streamer drops a cue</b><span>lands as a real message · chat swarms</span></div>
        <div class="how-row"><b>Reactions &amp; storms</b><span>same signals, same map</span></div>`;
    }

    $('mcTarget').innerHTML = sel
      ? `<b>🎯 ${sel} chatters focused</b><small>your next message / cue lands harder on this terrain</small>`
      : `<b>◎ Whole Circle</b><small>select a terrain to focus the next cue</small>`;

    if ($('mmLastCue')) {
      $('mmLastCue').innerHTML = lastCue
        ? `Last cue: <strong>${lastCue.ic} ${lastCue.label}</strong> — watch Circle chat and the map.`
        : 'Try <strong>spam KEKW</strong> — it posts into Circle, chat replies, Hype grows.';
    }

    renderCueStrip();
    document.querySelectorAll('[data-zone]').forEach((b) => { b.onclick = () => selectZone(+b.dataset.zone); });
    if ($('zoneClear')) $('zoneClear').onclick = clearSelection;
  }

  if (m.dominant !== lastDominant) {
    if (lastDominant) toast('Chat mood shifted', `${MOODS[lastDominant].label} → ${D.label} · ${D.read}`, D.ic);
    lastDominant = m.dominant;
  }
}

function moodLoop(ts) {
  const dt = Math.min(0.05, (ts - lastMoodTick) / 1000 || 0.016);
  lastMoodTick = ts;
  const miniOn = activeChat === 'mood';
  const bigOn = $('moodModal').classList.contains('open');

  if ((miniOn || bigOn) && !moodPaused) {
    stepMood(dt);
    if (!moodLoop.acc || ts - moodLoop.acc > 700) {
      moodLoop.acc = ts;
      clusterAgents();
      moodHistory.push(moodMetrics().index);
      if (moodHistory.length > 42) moodHistory.shift();
      renderMoodUI();
    }
  }
  if (miniOn) drawMood($('moodMini'), false);
  if (bigOn) { drawMood($('moodBig'), true); drawSpark(); }

  moodRAF = requestAnimationFrame(moodLoop);
}

function openMoodModal() {
  $('moodModal').classList.add('open');
  $('moodLegendBig').innerHTML = legendHtml();
  clusterAgents();
  bindMoodCanvas();
  renderMoodUI();
}

/* ─── CHAT STYLE PANEL ─────────────────────────────────── */

function previewMsg(text) {
  const k = myLook();
  return `<div class="${k.cls}" style="${k.style}">
    <div class="msg-line">${k.flair}<span class="${k.nameCls}" style="${k.nameStyle}">SpookyBunny</span>${text}</div>
  </div>`;
}

function renderStyle() {
  const rt = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
  S.roomTheme = rt;
  const accents = ['#53fc18', '#ff8a3d', '#ffd84a', '#5eb7ff', '#7b9cff', '#ffb020', '#b06cff', '#ff5c8a'];
  const wpClass = rt.wallpaper ? ` wallpaper-${rt.wallpaper}` : '';

  $('stylePreview').innerHTML = `
    <div class="preview-head">Live preview · living room</div>
    <div class="preview-body preview-room${wpClass}" style="--room-accent:${rt.accent};--room-tint:${rt.tint || 'transparent'};box-shadow:inset 0 0 ${12 + (rt.glow || 0.5) * 28}px ${rt.accent}55" ${rt.wallpaper ? `data-wallpaper="${rt.wallpaper}"` : ''}>
      <div class="msg"><div class="msg-line"><span class="msg-author" style="color:#c9d6dc">TokyoDrift</span>wait is he actually going in</div></div>
      ${previewMsg('this is how my messages look now')}
      <div class="msg"><div class="msg-line"><span class="msg-author" style="color:#b06cff">PixelPam</span>ok that room glow hits</div></div>
    </div>`;

  const swatches = `<div class="style-swatches">${COLORS.map((c) =>
    `<button class="swatch ${S.look.color === c ? 'sel' : ''}" data-style="color" data-v="${c}" style="background:${c}"></button>`).join('')}</div>`;

  const roomAccent = `<div class="style-swatches">${accents.map((c) =>
    `<button type="button" class="swatch ${rt.accent === c ? 'sel' : ''}" data-room="accent" data-v="${c}" style="background:${c}"></button>`).join('')}</div>`;

  const wallpapers = `<div class="style-picks room-wallpapers">${WALLPAPER_PRESETS.map((w) =>
    `<button type="button" class="style-pick wallpaper-pick ${(rt.wallpaper || '') === w.id ? 'sel' : ''}" data-room="wallpaper" data-v="${w.id}" title="${w.label}">
      <span class="wp-swatch${w.id ? ` wallpaper-${w.id}` : ''}"></span>
      <small>${w.label}</small>
    </button>`).join('')}</div>`;

  $('styleSections').innerHTML = `
    <div class="style-set room-studio">
      <h4>Room Studio <span class="new-tag">NEW</span></h4>
      <p class="muted small">Dress the chat rail — color, glow, wallpaper. Mood wash layers on top.</p>
      <label class="follow-row">
        <span><b>Follow room mood</b><small>Auto-apply chat mood + stream beat lighting</small></span>
        <input type="checkbox" id="followMoodToggle" ${S.followMood !== false ? 'checked' : ''} />
      </label>
      <div class="room-field"><span>Accent</span>${roomAccent}</div>
      <div class="room-field">
        <span>Glow ${Math.round((rt.glow ?? 0.55) * 100)}%</span>
        <input type="range" id="roomGlow" min="0" max="100" value="${Math.round((rt.glow ?? 0.55) * 100)}" />
      </div>
      <div class="room-field">
        <span>Tint wash</span>
        <div class="style-picks room-tints">
          <button type="button" class="style-pick ${!rt.tint ? 'sel' : ''}" data-room="tint" data-v="">None</button>
          <button type="button" class="style-pick ${rt.tint === 'rgba(255,138,61,.12)' || rt.tint === 'rgba(255,138,61,.14)' ? 'sel' : ''}" data-room="tint" data-v="rgba(255,138,61,.14)">Warm</button>
          <button type="button" class="style-pick ${rt.tint === 'rgba(94,183,255,.10)' ? 'sel' : ''}" data-room="tint" data-v="rgba(94,183,255,.10)">Cool</button>
          <button type="button" class="style-pick ${rt.tint === 'rgba(255,176,32,.12)' || rt.tint === 'rgba(255,216,74,.12)' ? 'sel' : ''}" data-room="tint" data-v="rgba(255,176,32,.12)">Amber</button>
          <button type="button" class="style-pick ${rt.tint === 'rgba(123,156,255,.12)' ? 'sel' : ''}" data-room="tint" data-v="rgba(123,156,255,.12)">Violet</button>
        </div>
      </div>
      <div class="room-field">
        <span>Wallpaper</span>
        ${wallpapers}
      </div>
    </div>
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
    <b>Living room + identity.</b>
    Room Studio is how you dress the space. Name flair is still earned from chat behaviour —
    reactions, questions, clips. Hint ≠ hijack when Follow is off.
    ${locked.length ? `<br><br><span class="muted">${locked.length} flair still locked · next: ${locked[0].label}</span>`
      : '<br><br><span class="muted">All flair unlocked — earned in chat.</span>'}`;

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

  document.querySelectorAll('[data-room]').forEach((b) => {
    b.onclick = () => {
      S.roomTheme = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
      S.roomTheme[b.dataset.room] = b.dataset.v;
      save();
      applyRoomTheme();
      renderStyle();
    };
  });

  const follow = $('followMoodToggle');
  if (follow) {
    follow.onchange = () => {
      S.followMood = follow.checked;
      save();
      if (S.followMood) {
        const { mood } = getRoomMood();
        if (mood !== 'neutral') applyRoomMoodPalette(mood, { quiet: true });
        else applyStreamPalette(false, { quiet: true });
      }
    };
  }
  const glow = $('roomGlow');
  if (glow) {
    glow.oninput = () => {
      S.roomTheme = { ...DEFAULT.roomTheme, ...(S.roomTheme || {}) };
      S.roomTheme.glow = (+glow.value) / 100;
      save();
      applyRoomTheme();
      const label = glow.previousElementSibling;
      if (label) label.textContent = `Glow ${glow.value}%`;
    };
  }
}

function openStyle() {
  renderStyle();
  $('styleModal').classList.add('open');
}

/* ─── NAV & RENDER ─────────────────────────────────────── */

function applyChatMode() {
  const mood = activeChat === 'mood';
  const stream = activeChat === 'stream';
  $('moodPane').classList.toggle('on', mood);
  $('chatBody').style.display = mood ? 'none' : '';
  if ($('chatPin')) $('chatPin').style.display = mood ? 'none' : '';
  if ($('momentBoard')) $('momentBoard').style.display = mood ? 'none' : '';
  const liveEv = document.querySelector('.live-event');
  if (liveEv) liveEv.style.display = '';
  if ($('cueStrip')) $('cueStrip').classList.toggle('on', stream);
  $('chatContext').textContent = mood
    ? 'Live mood read of Stream chat · moved by messages, cues, reactions'
    : (stream
      ? 'Living Room · tap a message to react · Quiet Validation + mood ambience'
      : `Shared across 3 connected creators · ${S.privacy.slowMode ? 'slow mode' : 'open'} · Circle mods active`);
  if (!mood) renderChatPin();
}

/* ═══════════════════════════════════════════════════════════
   OVERWORLD BRIDGE — host side
   Only channel between host app and overworld/iframe.
   Never import overworld symbols; never touch iframe DOM.
   ═══════════════════════════════════════════════════════════ */
const OverworldBridge = (() => {
  const TARGET = 'kick-overworld';
  let ready = false;
  let lastHeart = null;

  function frame() { return $('overworldFrame'); }

  function ensureLoaded() {
    const f = frame();
    if (!f) return;
    const src = f.dataset.src;
    if (src && (!f.src || f.src === 'about:blank' || f.src.endsWith('about:blank'))) {
      f.src = src;
    }
  }

  function send(type, payload) {
    const f = frame();
    if (!f || !f.contentWindow) return;
    try {
      f.contentWindow.postMessage({ target: TARGET, type, payload: payload || null }, '*');
    } catch (e) { /* sandboxed / not ready */ }
  }

  function onMessage(event) {
    const msg = event.data;
    if (!msg || msg.source !== 'kick-overworld') return;
    if (msg.type === 'ready') {
      ready = true;
      send('focus');
    }
    if (msg.type === 'heartbeat' || msg.type === 'state') {
      lastHeart = msg.payload;
      const hint = $('owZoneHint');
      if (hint && lastHeart && lastHeart.zone) {
        hint.textContent = `Now in ${lastHeart.zone}` + (lastHeart.mode ? ` · ${lastHeart.mode} atlas` : '');
      }
    }
    if (msg.type === 'error') {
      console.warn('[overworld]', msg.payload && msg.payload.message);
    }
  }

  function travelToSelected() {
    const c = sel();
    const channel = (c.creators && c.creators[0]) || null;
    if (channel) send('focusStreamer', { channel });
    else toast('Overworld', 'Walk to a pavilion — no creator pin for this Circle yet', '🗺');
  }

  function init() {
    window.addEventListener('message', onMessage);
    const dock = $('circlesDock');
    const fab = $('dockToggle');
    const close = $('dockClose');
    if (fab) fab.onclick = () => dock.classList.toggle('open');
    if (close) close.onclick = () => dock.classList.remove('open');
    if ($('owTravelBtn')) $('owTravelBtn').onclick = () => {
      dock.classList.remove('open');
      travelToSelected();
    };
  }

  return { ensureLoaded, send, init, travelToSelected, get isReady() { return ready; } };
})();

function switchView(v) {
  document.querySelectorAll('.view').forEach((x) => x.classList.remove('active'));
  const target = $(`view-${v}`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === v));
  document.body.classList.toggle('creator-mode', v === 'creator');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (v === 'circles') {
    OverworldBridge.ensureLoaded();
    OverworldBridge.send('focus');
    // My Circles dock stays closed until the user opens it
  } else {
    OverworldBridge.send('blur');
  }
  const brand = $('brandCirclesBtn');
  if (brand) brand.classList.toggle('on', v === 'circles');

  if (v === 'creator') {
    renderCreatorChat();
    renderMoodPulse();
    renderCreatorActivity();
  }
}

function renderAll() {
  renderHeader(); renderStrip(); renderChat(); renderEvent();
  renderCircles(); renderTasks(); renderPass(); renderProfile(); renderRanks(); renderNotifs();
  applySharedWash();
  renderMoodPulse();
  renderCreatorChat();
}

/* ─── CREATOR DASHBOARD HELPERS ────────────────────────── */

let creatorActivity = [];

function pushCreatorActivity(text) {
  creatorActivity.unshift({ text, t: Date.now() });
  creatorActivity = creatorActivity.slice(0, 24);
  renderCreatorActivity();
}

function renderCreatorActivity() {
  const el = $('cdActivityFeed');
  if (!el) return;
  if (!creatorActivity.length) {
    el.innerHTML = '<div class="cd-empty">Waiting for room signals…</div>';
    return;
  }
  el.innerHTML = creatorActivity.map((a) =>
    `<div class="cd-activity-row"><b>●</b> ${a.text}</div>`
  ).join('');
}

function renderCreatorChat() {
  const el = $('cdChatBody');
  if (!el) return;
  const list = livingRoomChat();
  el.innerHTML = list.map((m) => {
    if (m.system) return `<div class="msg system">${m.text}</div>`;
    const all = mergeReactCounts(m);
    const mine = S.myReacts[m.id] || [];
    const pills = countedReactChips(m.id, all, mine);
    const tray = openEmojiTrayId === m.id ? emojiTrayHtml(m.id) : '';
    const badge = m.badge ? `<span class="msg-badge b-${m.badge}">${m.badgeText}</span>` : '';
    return `
      <div class="msg" data-msg-id="${m.id}">
        <div class="msg-line" data-tap-msg="${m.id}">${badge}<span class="msg-author" style="color:${m.color || '#c9d6dc'}">${m.author}</span>${m.text}</div>
        <div class="msg-reacts">${pills}</div>
        ${tray}
      </div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
  bindMessageReacts(el);
}

/* ─── INIT ─────────────────────────────────────────────── */

function init() {
  checkStyleUnlocks(true);
  seedAgents();
  seedReactionLog();
  renderClips();
  renderAll();
  OverworldBridge.init();
  startRoomMoodTick();
  startBeatTimeline();
  applyRoomTheme();
  applySharedWash();

  const ambReset = $('ambienceReset');
  if (ambReset) ambReset.onclick = () => resetAmbience();

  document.querySelectorAll('.nav-btn').forEach((b) => { b.onclick = () => switchView(b.dataset.view); });
  document.querySelectorAll('[data-goto]').forEach((b) => { b.onclick = () => switchView(b.dataset.goto); });

  const brandBtn = $('brandCirclesBtn');
  if (brandBtn) brandBtn.onclick = () => switchView('circles');

  document.querySelectorAll('.chat-tab').forEach((b) => {
    b.onclick = () => {
      activeChat = b.dataset.chat;
      document.querySelectorAll('.chat-tab').forEach((x) => x.classList.toggle('active', x === b));
      applyChatMode();
      if (activeChat !== 'mood') renderChat();
    };
  });

  $('moodLegendMini').innerHTML = legendHtml();
  $('moodExpand').onclick = openMoodModal;
  $('mmClose').onclick = () => $('moodModal').classList.remove('open');
  $('moodModal').onclick = (e) => { if (e.target.id === 'moodModal') $('moodModal').classList.remove('open'); };
  $('mmPause').onclick = () => {
    moodPaused = !moodPaused;
    $('mmPause').textContent = moodPaused ? 'Resume' : 'Pause';
    $('mmPause').classList.toggle('on', moodPaused);
  };
  $('mmHulls').onclick = () => { moodShowHulls = !moodShowHulls; $('mmHulls').classList.toggle('on', moodShowHulls); };
  $('mmLabels').onclick = () => { moodShowLabels = !moodShowLabels; $('mmLabels').classList.toggle('on', moodShowLabels); };
  $('mmHulls').classList.add('on');
  $('mmLabels').classList.add('on');
  renderCueStrip();
  applyChatMode();
  document.querySelectorAll('.event-tab').forEach((b) => {
    b.onclick = () => {
      activeEvent = b.dataset.event;
      document.querySelectorAll('.event-tab').forEach((x) => x.classList.toggle('active', x === b));
      renderEvent();
    };
  });

  // quick-react strip removed — tap a message for the emoji tray

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

  $('resetBtn').onclick = () => {
    resetLivingRoomSession();
    stopStoryDemo();
    localStorage.removeItem(KEY);
    location.reload();
  };

  if ($('storyDemoBtn')) $('storyDemoBtn').onclick = () => {
    switchView('creator');
    startStoryDemo();
  };

  if ($('cdChatForm')) {
    $('cdChatForm').onsubmit = (e) => {
      e.preventDefault();
      const v = $('cdChatInput').value.trim();
      if (!v) return;
      livingRoomChat().push({
        id: `cd${Date.now()}`, story: true, author: 'Clavicular',
        badge: 'stream', badgeText: 'STREAMER', color: '#53fc18', text: v, reacts: {},
      });
      $('cdChatInput').value = '';
      save();
      if (activeChat === 'stream') renderChat();
      renderCreatorChat();
      pushCreatorActivity(`You: ${v}`);
    };
  }

  if ($('cdQuickReact')) {
    $('cdQuickReact').hidden = true;
    $('cdQuickReact').innerHTML = '';
  }

  if ($('cdGoLive')) {
    $('cdGoLive').onclick = () => {
      if ($('cdStatus')) $('cdStatus').textContent = 'LIVE';
      if ($('cdLiveBadge')) $('cdLiveBadge').textContent = '● LIVE';
      toast('You are live', 'Audience Stream + Creator Pulse are linked', '●');
      pushCreatorActivity('Went live — session active');
    };
  }

  const now = new Date(); const end = new Date(now); end.setHours(24, 0, 0, 0);
  const d = end - now;
  $('resetTimer').textContent = `${Math.floor(d / 36e5)}h ${Math.floor((d % 36e5) / 6e4)}m`;

  moodRAF = requestAnimationFrame(moodLoop);

  if (!S.seenInvite) {
    S.seenInvite = true; save();
    setTimeout(openInvite, 900);
  } else {
    setTimeout(() => toast('IRL Chaos is peaking', '3 connected creators are live right now', '🔥'), 1200);
  }
}

init();
