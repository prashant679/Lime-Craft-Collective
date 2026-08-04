# Lime Craft Collective — Tech Stack & Architecture

## 1. Goals this stack has to serve

- A brochure/lead-gen site (no e-commerce, no user accounts).
- You (non-technical, minimal coding) need to update text, swap photos, add/remove gallery images and swatches yourself, without touching code.
- Heavy, full-bleed photography needs to load fast.
- An interactive texture/color swatch picker (click-to-preview, not a room-upload configurator).
- A working contact form that emails you, plus a WhatsApp click-to-chat button.
- Deployed on your own domain, limecraftcollective.com (already owned).
- Built to last — this isn't a rush job, so we're optimizing for maintainability over speed-to-ship.

## 2. Framework: Next.js (App Router)

**Why:** Next.js is the natural choice for a marketing site that also needs strong SEO, fast image loading, and a clean split between "pages you can edit via CMS" and "custom interactive components" (like the swatch picker). It has first-party support for:
- Static generation for fast-loading marketing pages (About, Services, FAQs).
- Built-in image optimization (`next/image`) — important given how photography-heavy this site will be.
- API routes for the contact form (no separate backend server needed).
- Built-in metadata API for SEO tags per page.

**Styling:** Tailwind CSS. It keeps the design system (colors, spacing, type scale) defined once in config and reused everywhere, which matters for consistency across many similar sections (this is a very "repeating card/section" style site, per both the PDF and VN Concrete's structure).

**Animation (optional, for the subtle scroll/hover effects you approved):** Framer Motion — lightweight, works cleanly with Next.js, good for fade-ins and hover states on swatch tiles/cards without overengineering it.

## 3. Content management: Headless CMS

Since you want to edit content yourself but this stays a static/brochure site (not a custom admin panel), a **headless CMS** is the right fit — you get a clean editing UI, the site itself stays fast and simple.

**Recommended: Sanity.io**
- Free tier is generous enough for a site this size.
- Structured content model (see Section 6) — you get real fields (not a blank text box), so it's hard to "break" the design when editing.
- Excellent image handling (hotspot cropping, automatic optimization) — useful for your full-bleed photography.
- `next-sanity` integrates directly with Next.js with minimal glue code.
- Studio (the editing interface) can be customized with plain-language field labels so it's approachable for non-developers.

**Alternatives considered:**
| Option | Why not primary |
|---|---|
| Contentful | Similar capability, but free tier is more limited and the editing UI is less flexible for image-heavy content. |
| Payload CMS | Great, but self-hosted — adds a server/database to maintain, which conflicts with "minimal maintenance." |
| Notion-as-CMS | Very low learning curve, but weaker image handling and less structured — harder to guarantee design consistency for swatches/services. Worth reconsidering only if Sanity's Studio still feels too technical once you try it. |

## 4. Texture & color swatch picker

Per your confirmation, this is a **static, click-to-preview swatch system** — not a photo-upload configurator (which would require image processing / AI infrastructure and ongoing cost, and isn't needed for a lead-gen brochure site).

**How it works:**
- Each service page (Microtopping, Limewash) has a swatch grid.
- Swatches are content entries in the CMS (image + name + short description + category tag), so you can add/remove/reorder them without a developer.
- Clicking/tapping a swatch opens an enlarged preview (modal or inline expand) — optionally shown against a sample interior photo for context, using your own project photos.
- The four extra Limewash finish names (Liquid Metal, Lime Crumbled, Lime Rustic, Lime Silk) live in this same swatch system as their own entries, tagged to the Limewash and/or Microtopping page as appropriate.

This is a lightweight React component — no external service needed.

## 5. Contact form & WhatsApp

**Contact form & WhatsApp click-to-chat:**
- Submitting the contact form constructs a prefilled inquiry message (Name, Email, Phone, Message) and opens it directly via `wa.me/918586096452` — zero backend server, external API key, or transactional email service to maintain.
- Floating WhatsApp click-to-chat button persistent on mobile viewports for 1-tap inquiries.

## 6. Content model (what you'll be able to edit in the CMS)

- **Site Settings** — logo, contact info, GST number, address, social links.
- **Service** — name, slug, description, hero image, "Why [Service]" bullet list, associated swatches.
- **Swatch** — name, image, texture category (Smooth / Semi-Rough / Rough), belongs-to service(s).
- **Gallery Image** — image, caption, tagged service (so it can appear on both the Gallery page and the relevant Service page).
- **FAQ** — question, answer.
- **Page copy blocks** — About Us, Our Vision, Our Philosophy (as structured, editable fields — not one giant text blob).

## 7. Hosting comparison

You asked to see all three options compared rather than one picked for you:

| | **Vercel** | **Netlify** | **Cloudflare Pages** |
|---|---|---|---|
| Next.js support | Built by the same company that maintains Next.js — first-party, zero-config, always supports the newest features immediately | Very good, slightly behind on bleeding-edge Next.js features | Good, but historically slower to support newer Next.js server features (App Router edge cases) |
| Free tier | Generous for a site this size | Generous, similar to Vercel | Generous, and includes free bandwidth (no bandwidth overage worries) |
| Ease of setup for a non-technical owner | Easiest — connect GitHub repo, deploys automatically on every change | Very easy, similar workflow | Easy, slightly more configuration for Next.js specifically |
| Custom domain setup | Straightforward, clear DNS instructions | Straightforward | Straightforward (and Cloudflare is also a domain registrar/DNS provider, so if you ever move DNS management there too, it's all in one place) |
| Image optimization | Native, automatic with `next/image` | Supported via plugin | Supported, slightly more setup |
| Cost as the site grows | Reasonable, scales with usage | Reasonable, scales with usage | Often cheapest at scale due to no bandwidth charges |

**Recommendation:** **Vercel**, specifically because Next.js is developed by the same team — it removes an entire category of "does this feature work on my host" questions, which matters given you want minimal ongoing maintenance headaches. Netlify is a very close second and a fine choice if you prefer its dashboard. Cloudflare Pages is worth it mainly if bandwidth cost becomes a real concern later (unlikely for a brochure site).

## 8. Domain

limecraftcollective.com is already purchased. Once a host is chosen, this is a one-time DNS pointing step (updating nameservers or adding A/CNAME records at your domain registrar) — takes effect within a few hours typically.

## 9. SEO & discoverability basics

Since low reach is the core problem this site is solving, baseline SEO should be built in from day one even though it wasn't flagged as an immediate priority:
- Proper page titles/meta descriptions per page (Next.js Metadata API).
- `sitemap.xml` and `robots.txt` (auto-generated by Next.js).
- **LocalBusiness structured data** (schema.org) with your address and service area — this specifically helps local searches like "concrete texture finishes Delhi NCR" surface you in Google, which directly addresses the reach problem.
- Descriptive `alt` text on all images (also good for accessibility).

## 10. Analytics (optional, low-lift)

A lightweight, privacy-friendly analytics tool (Vercel Analytics if hosting on Vercel, or Plausible) so you can see which pages/services get traffic — useful for judging whether the new site is actually fixing the reach problem. Not required, but cheap to add.

## 11. Summary stack

- **Framework:** Next.js (App Router) + Tailwind CSS + Framer Motion (subtle motion)
- **CMS:** Sanity.io via `next-sanity`
- **Forms & Chat:** Client-side WhatsApp `wa.me` prefilled links (zero backend dependency)
- **Hosting:** Vercel (recommended), Netlify or Cloudflare Pages as alternatives
- **Domain:** limecraftcollective.com (already owned)
- **Analytics:** Vercel Analytics or Plausible (optional)
