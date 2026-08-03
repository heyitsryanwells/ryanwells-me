# Content to replace before launch

Everything below is invented to make the layout reviewable. The site looks
finished, but these are not your real facts. All of it lives in
`lib/content.ts`.

## Blocking (wrong if published as-is)

| Field | What's there now | What I need |
| --- | --- | --- |
| `site.email` | `hello@ryanwells.me` | The address you want public |
| `site.socials` | Guessed LinkedIn URL, empty GitHub | Real profile URLs, or delete the ones you don't want |
| `site.location` | Chattanooga, TN | Confirm or change |
| `about.timeline` | One real row, two "Add your prior role" stubs | Your actual roles, orgs, and one line each |
| `newsletterIssues` | 3 invented issues with invented dates | Real issues, or delete the section until you have three |
| `guides` | 5 invented guides | Real assets, or cut to the ones you'll actually produce |

## High value (these carry the whole site)

| Field | Why it matters |
| --- | --- |
| `about.wins` | Four accomplishment lines, currently written from general knowledge of your work rather than your numbers. Real figures here do more for the site than any design decision. |
| `hero.intro` | Your positioning in three lines. Worth writing yourself. |
| `newsletter.name` | Currently "The Operating Layer". Placeholder. |
| `proofBar.items` | Currently tool names. Stronger as logos of companies you've worked with, certifications, or places that have published you. |

## Accurate as written (verify anyway)

- `expertise.areas` — the six domains are drawn from work you actually do. Wording is mine.
- `toolCategories` — real tools from your stack. The one-line takes are mine; make them yours.
- `about.paragraphs` — plausible narrative, correct in outline, invented in specifics.

## Assets

- `public/portrait.png` is your existing dark-navy headshot. It sits perfectly
  against the Signal theme. On the Editorial (cream) theme, swap to
  `portrait-light.png` or a background-removed cutout.
- No favicon or social share image yet. Both worth adding before you promote the site.
