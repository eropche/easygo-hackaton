/* ═══════════════════════════════════════════════════════════
   KICK Circles Overworld — host bridge
   ───────────────────────────────────────────────────────────
   Lives OUTSIDE the overworld IIFE. Talks only through
   window.postMessage and the public window.KICK_CIRCLES_DEBUG
   API. The host app and this world cannot share variables,
   CSS, or DOM — so a crash here cannot take down Stream/Mood,
   and host changes cannot break the walkable world.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const SOURCE = 'kick-overworld';
  const TARGET = 'kick-overworld';
  const embed = new URLSearchParams(location.search).get('embed') === '1';

  function post(type, payload) {
    if (window.parent === window) return;
    try {
      window.parent.postMessage({ source: SOURCE, type, payload: payload || null }, '*');
    } catch (e) { /* parent gone */ }
  }

  function injectEmbedChrome() {
    if (!embed) return;
    document.documentElement.classList.add('ow-embed');
    const style = document.createElement('style');
    style.textContent = `
      html.ow-embed, html.ow-embed body { width:100%; height:100%; overflow:hidden; }
      html.ow-embed .brand-chip { display:none !important; }
      html.ow-embed #pitchBtn,
      html.ow-embed #resetBtn { display:none !important; }
      html.ow-embed .hud { top:8px; right:8px; }
      html.ow-embed .intro { max-width:min(520px, calc(100% - 24px)); }
    `;
    document.head.appendChild(style);
  }

  function onHostMessage(event) {
    const msg = event.data;
    if (!msg || msg.target !== TARGET || typeof msg.type !== 'string') return;

    const api = window.KICK_CIRCLES_DEBUG;
    switch (msg.type) {
      case 'ping':
        post('pong', { t: Date.now(), embed });
        break;
      case 'getState':
        post('state', api ? api.getState() : null);
        break;
      case 'getRuntime':
        post('runtime', api ? api.getRuntimeModel() : null);
        break;
      case 'focusStreamer':
        if (api && msg.payload && msg.payload.channel) {
          const ok = api.focusStreamer(msg.payload.channel);
          post('focused', { channel: msg.payload.channel, ok: !!ok });
        }
        break;
      case 'focusPlace':
        if (api && msg.payload && msg.payload.id) {
          api.focusPlace(msg.payload.id);
          post('focused', { place: msg.payload.id, ok: true });
        }
        break;
      case 'blur':
        // host left the Overworld tab — overworld keeps running but we can pause nothing safely
        post('blurred', {});
        break;
      case 'focus':
        window.dispatchEvent(new Event('resize'));
        post('focused-tab', {});
        break;
      default:
        break;
    }
  }

  injectEmbedChrome();
  window.addEventListener('message', onHostMessage);

  // Ready once the overworld IIFE has published its debug API (it runs before this file).
  function announce() {
    post('ready', {
      embed,
      hasApi: !!window.KICK_CIRCLES_DEBUG,
      href: location.href,
    });
  }

  if (document.readyState === 'complete') announce();
  else window.addEventListener('load', announce);

  // Light heartbeat so the host dock can mirror zone / player without polling DOM
  setInterval(() => {
    if (!window.KICK_CIRCLES_DEBUG) return;
    post('heartbeat', window.KICK_CIRCLES_DEBUG.getState());
  }, 2500);

  // Surface uncaught errors to the host without sharing stack into host globals
  window.addEventListener('error', (e) => {
    post('error', { message: String(e.message || 'overworld error') });
  });
})();
