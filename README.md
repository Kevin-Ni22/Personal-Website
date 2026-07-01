# Kevin Ni — Personal Website

A single-file, cyberpunk-themed portfolio built with Three.js (WebGL). No build step, no dependencies to install — everything loads from a CDN at runtime.

## Files

- `index.html` — the entire site (HTML, CSS, and the WebGL scene inline)
- `Kevin_Ni_Resume_Fintech.pdf` — linked from the Contact section ("Résumé · Fintech")
- `Kevin_Ni_Resume_Robotics.pdf` — linked from the Contact section ("Résumé · Robotics")
- `.github/workflows/static.yml` — GitHub Pages deploy workflow (uploads the whole repo root)

All three of `index.html` and the two PDFs must sit together in the repo root so the résumé download links resolve.

## Deploy (GitHub Pages)

1. Put these files in your repository root (replacing the old `index.html`).
   The old `styles.css`, `script.js`, and `resume.pdf` are no longer used and can be deleted.
2. Commit and push to your default branch (`main`).
3. The included workflow publishes the site automatically. Check **Actions** for the run and
   **Settings → Pages** for the live URL.

## Local preview

Because the page loads Three.js as an ES module, open it through a local server rather than
double-clicking the file:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing notes

- Content lives directly in `index.html` — bio, experience ("System Log"), projects ("Deployed
  Builds"), skills ("Arsenal"), and the hobby "Background Processes" list are plain HTML you can edit.
- The 3D scene, colors, and glitch timing are in the `<script type="module">` block near the bottom.
- The site respects `prefers-reduced-motion` and falls back to a static background if WebGL is unavailable.
