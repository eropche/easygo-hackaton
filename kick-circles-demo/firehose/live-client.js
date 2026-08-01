/* Kick Firehose live client — compartment for Circles Overworld + The Pit.
 *
 * Resolves channel slug → chatroom id via same-origin /api/chatroom (Worker or
 * local serve.py proxy), then subscribes to Kick's public Pusher websocket.
 * No DOM — callers push messages into their own UI.
 */
(function (global) {
  'use strict';

  const PUSHER_URL =
    'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false';

  let ws = null;
  let connectGen = 0;

  function kickSlug(channel) {
    return String(channel || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '');
  }

  function plainContent(content) {
    return String(content || '')
      .replace(/\[emote:\d+:([^\]]*)\]/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function apiUrl(apiBase, path) {
    const base = (apiBase == null || apiBase === '' ? '' : String(apiBase)).replace(/\/$/, '');
    return base + path;
  }

  async function resolveChatroom(slug, apiBase) {
    const s = kickSlug(slug);
    if (!s) return null;

    // 1) Prefer browser → Kick (Kick allows this from localhost; server proxies often get WAF 403)
    try {
      const res = await fetch('https://kick.com/api/v2/channels/' + encodeURIComponent(s), {
        headers: { accept: 'application/json' },
        credentials: 'omit',
      });
      if (res.ok) {
        const data = await res.json();
        const id = data && data.chatroom && data.chatroom.id;
        if (id) {
          return {
            slug: data.slug || s,
            chatroomId: id,
            isLive: Boolean(data.livestream),
            viewers: (data.livestream && data.livestream.viewer_count) || 0,
          };
        }
      }
    } catch (_) { /* CORS / network — try proxy next */ }

    // 2) Same-origin proxy (serve.py / Wrangler) as fallback
    try {
      const res = await fetch(apiUrl(apiBase, '/api/chatroom?slug=' + encodeURIComponent(s)));
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.chatroomId) return null;
      return {
        slug: data.slug || s,
        chatroomId: data.chatroomId,
        isLive: !!data.isLive,
        viewers: data.viewers || 0,
      };
    } catch (_) {
      return null;
    }
  }

  function disconnect() {
    connectGen += 1;
    if (ws) {
      const s = ws;
      ws = null;
      try { s.close(); } catch (_) { /* ignore */ }
    }
  }

  /**
   * @param {string|string[]} slugs
   * @param {{ apiBase?: string, onMessage?: Function, onStatus?: Function }} opts
   */
  async function connect(slugs, opts) {
    if (typeof slugs === 'string') slugs = [slugs];
    opts = opts || {};
    const apiBase = opts.apiBase == null ? '' : opts.apiBase;
    const onMessage = typeof opts.onMessage === 'function' ? opts.onMessage : function () {};
    const onStatus = typeof opts.onStatus === 'function' ? opts.onStatus : function () {};

    disconnect();
    const gen = connectGen;
    const unique = [...new Set(slugs.map(kickSlug).filter(Boolean))];
    if (!unique.length) {
      onStatus('err', 'no channels');
      return { ok: false, rooms: [] };
    }

    onStatus('connecting', 'resolving ' + unique.length + ' channel' + (unique.length > 1 ? 's' : '') + '…');

    const results = await Promise.all(
      unique.map(async (slug) => {
        try {
          return await resolveChatroom(slug, apiBase);
        } catch (_) {
          return null;
        }
      })
    );
    if (gen !== connectGen) return { ok: false, rooms: [], cancelled: true };

    const rooms = results.filter(Boolean);
    if (!rooms.length) {
      onStatus('err', 'couldn’t reach Kick API — is serve.py running?');
      return { ok: false, rooms: [] };
    }

    const roomSlugs = new Map(rooms.map((r) => ['chatrooms.' + r.chatroomId + '.v2', r.slug]));
    const sock = new WebSocket(PUSHER_URL);
    ws = sock;

    sock.addEventListener('open', () => {
      if (sock !== ws || gen !== connectGen) return;
      for (const name of roomSlugs.keys()) {
        sock.send(JSON.stringify({ event: 'pusher:subscribe', data: { auth: '', channel: name } }));
      }
      onStatus(
        'live',
        rooms.length > 1 ? 'live · ' + rooms.length + ' channels' : 'live · ' + rooms[0].slug
      );
    });

    sock.addEventListener('message', (ev) => {
      if (sock !== ws || gen !== connectGen) return;
      try {
        const msg = JSON.parse(ev.data);
        if (msg.event !== 'App\\Events\\ChatMessageEvent') return;
        const d = JSON.parse(msg.data);
        const name = (d.sender && d.sender.username) || '?';
        onMessage({
          user: name,
          color: (d.sender && d.sender.identity && d.sender.identity.color) || null,
          content: d.content || '',
          plain: plainContent(d.content || ''),
          channel: roomSlugs.get(msg.channel) || null,
        });
      } catch (_) { /* ignore malformed frames */ }
    });

    sock.addEventListener('close', () => {
      if (sock !== ws) return;
      ws = null;
      if (gen === connectGen) onStatus('err', 'disconnected');
    });
    sock.addEventListener('error', () => {
      try { sock.close(); } catch (_) { /* ignore */ }
    });

    return { ok: true, rooms };
  }

  global.KickFirehose = {
    PUSHER_URL,
    kickSlug,
    plainContent,
    resolveChatroom,
    connect,
    disconnect,
    get connected() { return !!ws && ws.readyState === 1; },
  };
})(typeof window !== 'undefined' ? window : globalThis);
