<!-- BEGIN:nextjs-agent-rules -->

ALways use
docs/design.md , web-design-guidelines, tailwind-4-docs, next.js for this project


# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Lime Craft Collective — Agent Instructions

This is a Next.js (App Router) + Tailwind CSS + Sanity CMS marketing site
for a decorative concrete finishes business (microtopping, limewash).

Full specs:
- docs/design.md — colors, type, layout patterns
- docs/tech-stack.md — architecture decisions
- docs/content-plan.md — page-by-page content and sitemap

## Non-negotiable rules
- Colors: terracotta #C1592E (accent only, never a background flood),
  olive #7C8266, cream #F7F3E8 (main background), ink #1F1A15 (body text),
  muted #6B6259, tan #D8CBB8 (dividers/borders).
- Headlines: Fraunces (serif). Body: Inter (sans).
- Layout: alternating two-column sections (image/text), generous
  whitespace (96-140px section padding on desktop), thin rule dividers
  under section headers, checkmark bullet lists with filled dark circles.
- Tailwind v4 — no tailwind.config.js/ts, theme lives in globals.css
  under @theme.
- No e-commerce, no user accounts. This is a lead-gen brochure site.

## Corrections log
(Add lines here whenever you catch the agent repeating a mistake.)

- 2026-08-04: Missing Publish button in embedded Studio — do NOT chase the
  legacy dataset ACL (`_.groups.*` grants lack `publish`/`delete`). API
  publish succeeds despite that ACL, so it does not gate publishing. Verify
  the document state first: if there's no draft, no Publish button appears
  (that's normal). Publishing `drafts.siteSettings` via the data API resolved
  the issue.


