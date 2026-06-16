# Vakilkaro — Trademark Registration (Next.js + Bootstrap)

A responsive Trademark Registration landing page built with **Next.js (App Router)** and **Bootstrap 5**, themed in black + gold.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.js     # imports Bootstrap CSS + Google fonts + Boxicons, sets <head>
  page.js       # the whole page (client component) — content lives in data arrays at the top
  globals.css   # black + gold theme, custom components, and the responsive media queries
public/
  ambassador.png  # <-- drop your licensed brand-ambassador cutout here (transparent PNG)
next.config.js
package.json
```

## What uses Bootstrap

Grid (`container`, `row`, `col-*`), `navbar`, `btn`, `card`/form controls, `table table-bordered`,
badges and utility classes. Interactivity (mobile nav toggle, FAQ accordion, login modal, the
enquiry form) is handled with React state instead of Bootstrap's JS bundle, so it is SSR-safe.

## Things to wire up before going live

1. **Ambassador image** — add `public/ambassador.png` and change `YOUR AMBASSADOR` in `app/page.js`.
2. **Phone number** — replace `+91 1141-XXXXXX` / `911141000000` everywhere.
3. **Enquiry form** — in `app/page.js`, the `submit()` function has a `// TODO` to POST to your CRM.
4. **Login modal** — the two login forms `alert()` a placeholder; point them at your auth / wallet API.

## Responsive breakpoints (in `app/globals.css`)

- `≤ 991.98px` — hero stacks, ambassador badges reposition, nav phone hidden
- `≤ 767.98px` — tighter section spacing
- `≤ 575.98px` — floating WhatsApp/callback hidden, sticky bottom CTA bar shown
- `≤ 360px` — smaller hero/price type

Bootstrap's own grid breakpoints handle the column reflow (3 → 2 → 1) for cards and pricing.
