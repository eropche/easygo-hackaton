#!/usr/bin/env python3
"""Local demo server: static files + Kick API proxy for Firehose live chat.

    python3 serve.py
    → http://localhost:8080

Proxies (CORS-safe, same-origin for the overworld iframe):
  GET /api/health
  GET /api/chatroom?slug=<channel>
  GET /api/live
"""
from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8080
ROOT = None  # set to script dir
KICK_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)
SLUG_RE = re.compile(r"^[a-z0-9_-]+$", re.I)


def kick_get(url: str, timeout: float = 12.0) -> tuple[int, dict | list | None, str]:
    req = urllib.request.Request(
        url,
        headers={"accept": "application/json", "user-agent": KICK_UA},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            body = res.read().decode("utf-8", errors="replace")
            try:
                return res.status, json.loads(body), body
            except json.JSONDecodeError:
                return res.status, None, body
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            return e.code, json.loads(body), body
        except Exception:
            return e.code, None, body
    except Exception as e:
        return 502, None, str(e)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        # quieter than default — still show API hits
        if self.path.startswith("/api/"):
            super().log_message(fmt, *args)

    def _json(self, data, status=200):
        raw = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("cache-control", "no-store")
        self.send_header("content-length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        from urllib.parse import parse_qs, urlparse

        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            return self._json({"ok": True})

        if path == "/api/chatroom":
            qs = parse_qs(parsed.query)
            slug = (qs.get("slug") or [""])[0].strip()
            if not SLUG_RE.match(slug):
                return self._json({"error": "invalid slug"}, 400)
            status, data, _ = kick_get(f"https://kick.com/api/v2/channels/{slug.lower()}")
            if status != 200 or not isinstance(data, dict):
                return self._json({"error": f"kick api {status}"}, 502)
            chatroom = data.get("chatroom") or {}
            live = data.get("livestream")
            return self._json(
                {
                    "slug": data.get("slug") or slug.lower(),
                    "chatroomId": chatroom.get("id"),
                    "isLive": bool(live),
                    "viewers": (live or {}).get("viewer_count") or 0,
                }
            )

        if path == "/api/live":
            status, data, _ = kick_get(
                "https://kick.com/stream/livestreams/en?page=1&limit=15&sort=desc"
            )
            if status != 200 or not isinstance(data, dict):
                return self._json({"error": f"kick api {status}"}, 502)
            rows = data.get("data") or []
            channels = []
            for row in rows:
                ch = (row or {}).get("channel") or {}
                s = ch.get("slug")
                if s:
                    channels.append({"slug": s, "viewers": row.get("viewer_count") or 0})
            return self._json({"channels": channels})

        return super().do_GET()


def main():
    global ROOT
    from pathlib import Path

    ROOT = Path(__file__).resolve().parent
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"KICK Circles demo → http://localhost:{PORT}")
    print(f"  Firehose API    → http://localhost:{PORT}/api/health")
    print(f"  Overworld       → http://localhost:{PORT}/")
    print(f"  The Pit         → http://localhost:{PORT}/firehose/public/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nbye")


if __name__ == "__main__":
    main()
