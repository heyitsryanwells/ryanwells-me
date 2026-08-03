# Content to replace before launch

Everything below is invented to make the layout reviewable. The site looks
finished, but these are not your real facts. All of it lives in
`lib/content.ts`.

## Blocking (wrong if published as-is)

| Field | What's there now | What I need |
| --- | --- | --- |
| `site.email` | `hello@ryanwells.me` | The address you want public |
| `site.socials` | Guessed LinkedIn URL | Your real LinkedIn URL (the GitHub one is correct) |
| `about.timeline` | One real row, two "Add your prior role" stubs | Your actual roles, orgs, and one line each |
| `guides` | 5 invented guides | Real assets, or cut to the ones you'll actually produce |

The newsletter was removed from the site on 2026-08-03 and will be revisited
later. Nothing here covers it.

## High value (these carry the whole site)

| Field | Why it matters |
| --- | --- |
| `about.wins` | Four accomplishment lines, currently written from general knowledge of your work rather than your numbers. Real figures here do more for the site than any design decision. |
| `hero.intro` | Your positioning in three lines. Worth writing yourself. |
| `proofBar.items` | Currently tool names. Stronger as logos of companies you've worked with, certifications, or places that have published you. |

## Accurate as written (verify anyway)

- `expertise.areas` — the six domains are drawn from work you actually do. Wording is mine.
- `toolCategories` — real tools from your stack. The one-line takes are mine; make them yours.
- `about.paragraphs` — plausible narrative, correct in outline, invented in specifics.

## Resolved

- `site.location` is now Knoxville, TN, in both `site.location` and the `Based`
  row of `hero.specs`.

## Assets

- `public/portrait.webp` is your headshot with the navy studio background
  chroma-keyed out, 1100px, alpha preserved, with an alpha ramp over the bottom
  18% so the shirt dissolves into the page instead of ending on a hard line.
  Regenerate it from `scratchpad/cutout.js` if you swap the source photo.
- The hero shows it in colour and unframed. Interior pages render it through
  the `.plate` treatment in `app/globals.css` (greyscale, framed, captioned).
- `public/portrait-light.webp` is the alternate source photo, currently unused
  and still carrying its background.
- No favicon or social share image yet. Both worth adding before you promote the site.
