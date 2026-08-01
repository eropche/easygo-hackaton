// Worker entry. Static assets in ./public are served automatically by
// Workers static-assets — this fetch handler only runs for non-asset requests.

const KICK_HEADERS = {
  accept: "application/json",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...init.headers },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({ ok: true });
    }

    // Resolve a channel slug to its chatroom id so the browser can subscribe
    // to Kick's public Pusher websocket. Same-origin proxy dodges CORS.
    if (url.pathname === "/api/chatroom") {
      const slug = url.searchParams.get("slug") || "";
      if (!/^[a-z0-9_-]+$/i.test(slug)) {
        return json({ error: "invalid slug" }, { status: 400 });
      }
      try {
        const res = await fetch(`https://kick.com/api/v2/channels/${slug.toLowerCase()}`, {
          headers: KICK_HEADERS,
          cf: { cacheTtl: 300, cacheEverything: true },
        });
        if (!res.ok) return json({ error: `kick api ${res.status}` }, { status: 502 });
        const data = await res.json();
        return json({
          slug: data.slug,
          chatroomId: data.chatroom?.id ?? null,
          isLive: Boolean(data.livestream),
          viewers: data.livestream?.viewer_count ?? 0,
        });
      } catch (err) {
        return json({ error: String(err) }, { status: 502 });
      }
    }

    // A few currently-live channels to suggest in the UI.
    if (url.pathname === "/api/live") {
      try {
        const res = await fetch(
          "https://kick.com/stream/livestreams/en?page=1&limit=15&sort=desc",
          { headers: KICK_HEADERS, cf: { cacheTtl: 30, cacheEverything: true } }
        );
        if (!res.ok) return json({ error: `kick api ${res.status}` }, { status: 502 });
        const data = await res.json();
        const rows = data?.data ?? [];
        const channels = rows
          .map((row) => ({
            slug: row.channel?.slug,
            viewers: row.viewer_count ?? 0,
          }))
          .filter((c) => c.slug);
        return json({ channels });
      } catch (err) {
        return json({ error: String(err) }, { status: 502 });
      }
    }

    return json({ error: "Not found" }, { status: 404 });
  },
};
