# ryanwells.me

Personal site and newsletter hub. Next.js 16 (App Router) + Tailwind 4, fully
static, built to deploy on Vercel.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

## Pick a visual direction

Three complete directions ship in this repo. Compare them with the floating
switcher in the bottom-right corner, or link straight to one:

- http://localhost:3000/?theme=terminal — near-black, monospace display, lime accent
- http://localhost:3000/?theme=editorial — warm cream paper, serif display, rust accent
- http://localhost:3000/?theme=signal — deep navy, geometric sans, cyan accent

Every color, font, and corner radius resolves through CSS variables in
`app/globals.css`, so switching costs nothing and no component knows which
theme is active.

### Locking one in

1. Set `data-theme` on `<html>` in `app/layout.tsx` to the winner.
2. Delete `<ThemeSwitcher />`, its import, and the `noFlashScript` block in
   `app/layout.tsx`.
3. Delete `components/theme-switcher.tsx`.
4. Delete the two losing theme blocks in `app/globals.css`.

## Editing content

All copy lives in `lib/content.ts`. Components never hardcode text, so changing
a headline, adding a guide, or reordering the expertise cards is a one-file
edit. See `CONTENT-TODO.md` for everything still carrying placeholder text.

## Connecting the newsletter

Put your Beehiiv / Kit / Substack form endpoint in `newsletter.formAction` in
`lib/content.ts`. Until it is set, the form runs in demo mode so the layout
stays reviewable.

## Structure

```
app/
  layout.tsx        root shell, fonts, metadata, theme bootstrap
  globals.css       theme tokens for all three directions
  page.tsx          home
  about|guides|newsletter|tools|contact/
components/
  ui.tsx            Container, Section, Card, ButtonLink, headings
  nav.tsx           sticky nav with mobile menu
  footer.tsx
  newsletter-form.tsx
  theme-switcher.tsx  preview-only, delete before launch
lib/
  content.ts        all site copy
public/
  portrait.png      hero and about photo
  portrait-light.png  alternate, suits the editorial theme better
```

## Deploy (GitHub Pages)

The site builds to a fully static `./out` via `output: "export"`. No server,
no API routes, no image optimizer. `.github/workflows/deploy.yml` builds and
publishes on every push to `main`.

### One-time setup

1. Push this repo to GitHub. On a Free plan, Pages requires the repo to be
   **public**. GitHub Pro covers private repos.
2. Repo Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3. Repo Settings > Pages > Custom domain: `ryanwells.me`, then tick
   **Enforce HTTPS** once the certificate is issued (takes a few minutes).
4. Add DNS at the registrar:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `heyitsryanwells.github.io` |

   On Cloudflare, set these to **DNS only** (grey cloud) until GitHub issues
   the certificate. Proxying can be turned on afterward.

`public/CNAME` already contains `ryanwells.me` and is copied into every build,
which keeps Pages from dropping the custom domain on redeploy. `public/.nojekyll`
stops Jekyll from stripping the `_next` directory.

### Local check of the real artifact

```bash
npm run build && npx serve out
```

## Images

Pages has no image optimizer, so portraits are pre-sized to 1100px and
converted to WebP (24KB, down from 411KB). `images.unoptimized` is on in
`next.config.ts`. To regenerate after swapping a photo:

```bash
node -e "require('sharp')('public/source.png').resize(1100,1100,{fit:'cover'}).webp({quality:82}).toFile('public/portrait.webp')"
```
