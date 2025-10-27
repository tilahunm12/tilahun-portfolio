## Purpose

This file provides concise, repo-specific guidance for AI coding agents so they can be immediately productive working on the `tilahun-portfolio` site (React + Vite).

## Big picture
- This is a single-page React app built with Vite. Entry: `src/main.jsx` -> `src/App.jsx`.
- Layout is component-driven: `src/components/*` contains the page sections (Navbar, Hero, About, Projects, Skills, Contact, Footer).
- The app uses a simple Context provider for theme handling: `src/context/ThemeContext.jsx` (sets `data-theme` on <body>, uses framer-motion for a short transition).
- No backend or API integrations in the repo — everything is client-side and static-host friendly (deployed via `gh-pages`).

## Important files and patterns (examples)
- `src/main.jsx` — app bootstrap and React StrictMode.
- `src/App.jsx` — composes the page using `ThemeProvider` and section components; look here to add new top-level sections or router integration.
- `src/context/ThemeContext.jsx` — toggleTheme uses localStorage and updates `document.body.dataset.theme`. When changing theme variables, update CSS in `src/styles/global.css`.
- `src/components/*` — small, focused functional components. Follow the existing naming and export default pattern (e.g., `Hero.jsx`, `Navbar.jsx`).
- `vite.config.js` — base is set to `/tilahun-portfolio/` for GH Pages. If you change the deploy target, update `base` and `package.json` `homepage` accordingly.
- `public/` — static files, includes `404.html` used for GitHub Pages fallback.

## Scripts & dev workflow (copyable)
- Start dev server with hot reload: `npm run dev` (runs `vite`).
- Build for production: `npm run build` (outputs `dist/`).
- Preview production build locally: `npm run preview`.
- Lint code: `npm run lint` (uses ESLint config).
- Deploy to GitHub Pages: `npm run deploy` (runs `gh-pages -d dist`). `predeploy` runs the build.

Notes: `vite.config.js`'s `base` and `package.json` `homepage` are configured for deployment to `tilahunm12.github.io/tilahun-portfolio` — change both when changing host path.

## Libraries and integration points
- UI / animation: `framer-motion` (used in theme transitions and possibly component animations).
- Visual effects: `react-parallax-tilt` used by some hero/project components.
- Scrolling: `react-scroll` is available for anchor scrolling.
- Routing: `react-router-dom` is in dependencies but the current code composes a single-page layout (no routes). If adding routes, update `src/main.jsx` and `src/App.jsx` and ensure links/anchors remain accessible.

## Conventions & quick guidance
- Use functional components with default exports (match existing files in `src/components`).
- CSS is global (see `src/styles/global.css`, `App.css`). Theme toggling relies on `body[data-theme]` selectors — prefer that pattern for theme-specific styles.
- Keep components small and side-effect free; use `ThemeContext` for theme state only.
- When adding images/assets, place them in `src/assets` and import them from components to allow Vite optimizations.

## What an AI agent should do first
1. Follow existing file patterns: small functional components, `ThemeProvider` wrapping, `body[data-theme]` CSS variables.
2. When modifying build/deploy settings, update `vite.config.js` `base` and `package.json` `homepage` together.
3. For UI changes, search `src/components` and `src/styles/global.css` to find the relevant markup and variables.

## When uncertain, inspect these files
- `src/main.jsx`, `src/App.jsx`, `src/context/ThemeContext.jsx`, `vite.config.js`, `package.json`, `src/components/*`, `src/styles/global.css`, `public/404.html`.

If parts of this guidance are unclear or you'd like more examples (component patterns, theme variable names, or a sample PR with changes), tell me which area to expand.
