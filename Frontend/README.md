# The Blog Hub - Frontend

React 19 + Vite. Three portals: Visitor, Author and Admin.

## Setup
```bash
npm install
cp .env.example .env   # set the backend URL
npm run dev
```

## Scripts
- `npm run dev` - start the dev server
- `npm run build` - production build (output in `dist/`, not committed)
- `npm run lint` - run ESLint

## Dark mode
- The toggle (moon/sun) is in every navbar and sidebar, and in the top-right corner of the landing, login, register and forgot-password pages.
- The choice is saved in `localStorage` (`theme`). Until the user picks one, the OS setting (`prefers-color-scheme`) is used.
- Colours live in `src/theme.css` as CSS variables named `--bg-*`, `--tx-*` and `--bd-*` (background, text, border + the original hex). The light value is the original colour; the dark value is in the `html[data-theme="dark"]` block. To tune dark mode, edit only that block.
- When you add new CSS, use these variables (for example `background: var(--bg-ffffff)`) instead of raw hex values so the new component supports dark mode too.
- Black PNG icons get the `icon-adaptive` class so they are inverted in dark mode.

## Branding
- Logo files: `src/assets/Images/Brand/` (`logo.png` for light surfaces, `logo-on-dark.png` with light text for dark surfaces, `logo-icon.png` for the collapsed sidebar). Always use the `<Logo />` component (`src/components/Logo/`), it picks the right file for the current theme. Use `<Logo onDark />` on surfaces that are always dark.
- Favicons live in `public/` (`favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png`) and are linked in `index.html`.

## Landing page
`src/Visitor/Landing/` - hero, features, how it works, roles, latest stories (loaded from `/blogs?limit=3`, hidden if the API is unreachable) and a call to action. Its colours are the scoped `--lp-*` variables at the top of `Landing.css`.
