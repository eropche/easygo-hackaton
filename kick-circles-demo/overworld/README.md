# KICK Circles — The Overworld

A single-file, data-driven walkable world explorer for KICK Circles.
**Nothing is a menu that could be a place.**

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/smatthewluke/Kick-Circles)

The repository includes `netlify.toml`, so Netlify can publish it directly with no build command. The deploy button creates a Netlify site from this GitHub repository; subsequent pushes to the selected production branch trigger new production deploys through Netlify's Git integration.

To connect an existing Netlify site instead, import the repository in Netlify and leave the build command empty. The configuration publishes the repository root, keeps the HTML fresh, and applies cache and content-type headers to atlas data.

## Run it

Serve the repository root with any static web server, then open it in a modern browser. No build or dependencies are required. For example: `python3 -m http.server 8000`.

- The bundled `data/kick_top100_streamers_circles_world_explorer_2026-07-24.json` atlas loads automatically at startup, raising its coastlines, roads, districts and 100 creator pavilions around the handcrafted **Legend Isles**.
- If automatic loading is unavailable (such as when opening `index.html` directly with a `file://` URL), the Legend Isles demo remains usable and the **World Atlas Forge** can still load a JSON file manually.
- Press the **🗺 World atlas** HUD button at any time to inspect atlas health, load another atlas, or return to the demo world.

The file is parsed locally in the browser — nothing is uploaded anywhere. The last good atlas persists in IndexedDB and can be restored on the next visit.

## Controls

- **WASD / arrows** move · **click or tap** walk · **E** interact
- **M** world map (scroll to zoom, drag to pan, click a place to fast-travel)
- **✴ constellation** on the map toggles the semantic graph explorer (2,508 edges, filter by link type)
- **🧭 wayfinder** — a twenty-questions-style compass game that narrows 100 creators to your places and lights them up
- **Ctrl/Cmd+Shift+D** or `?debug=1` — Atlas Lens diagnostics
- `window.KICK_CIRCLES_DEBUG` — scripting API (routes, focus, restore, export)

## What the imported atlas becomes

- **The Hundred Gate & Top Streamers Region** — BIG Skyline, MEDIUM Guildway and SMALL/NICHE Lantern Wilds rank streets with 100 magnitude-scaled creator pavilions
- **Game Realms, Vibe Archipelago, Doing Districts, Reacts & Troll Badlands, Language Harbours, Time & Rhythm Skies, Intensity Biomes** — 96 taxonomy nodes as walkable places
- **81 Halls of Twenty** — enterable category rooms with ranked creator monuments
- **200 circle seeds** — tiered as full islands, village doors and pop-ups
- **Weighted graph routing** (Dijkstra over the traversal graph) shown as firefly trails, plus iris-wipe fast travel, a live minimap with LOD labels, portal echoes, confidence plaques and language ferry tokens

Import is transactional: read → parse → validate → normalize → index → generate geography → stage → commit → persist. A failed import never touches the live world.
