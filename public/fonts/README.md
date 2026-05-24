# TT Tunnels Bold (700)

The site loads **TT Tunnels Bold** at `font-weight: 700` via `@font-face` in `app/globals.css`.

## Add the webfont file

1. Get **TT Tunnels Bold** from your [TypeType license](https://typetype.org/fonts/tt-tunnels/) or install the official trial on your machine.
2. Export or convert to **woff2** (recommended name: `TTTunnels-Bold.woff2`).
3. Place it in this folder:

   - `TTTunnels-Bold.woff2` (required for self-hosted web)
   - `TTTunnels-Bold.woff` (optional fallback)

If the file is installed locally (trial or licensed), the site may pick it up via `local()` without a web file. For production, always host `TTTunnels-Bold.woff2` here.

## Trial OTF → woff2

If you only have `TT Tunnels Trial Bold.otf`:

```bash
npx --yes ttf2woff2 "path/to/TT Tunnels Trial Bold.otf"
mv "path/to/TT Tunnels Trial Bold.woff2" public/fonts/TTTunnels-Bold.woff2
```

Until `TTTunnels-Bold.woff2` exists, headlines will fall back to system sans-serif (not Impact).
