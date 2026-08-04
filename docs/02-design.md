# Lime Craft Collective — design.md

This is the visual language for the site, derived from your PDF brand deck and the reference photos you shared. Treat the hex values below as a **starting palette to verify against your actual logo file** — they're picked to match what's visible in the PDF/logo, not sampled pixel-for-pixel from a print-ready asset.

## 1. Brand personality

**Formal luxury, handcrafted, editorial.** Not minimal-cold (like some competitor sites lean), not rustic-cluttered — the PDF's own tone (serif headlines, generous whitespace, warm tones, quiet checkmark lists) is the right anchor. Every design decision should ask: *does this feel like a considered material, or a template?*

## 2. Color palette

| Role | Color | Approx. Hex | Notes |
|---|---|---|---|
| Primary brand / accent | Terracotta / burnt orange | `#C1592E` | From the logo's orange half and section accents |
| Secondary accent | Olive / sage green | `#7C8266` | From the logo's lime + the bathroom reference photos |
| Background (warm neutral) | Cream / off-white | `#F7F3E8` | The PDF's consistent page background |
| Text — primary | Near-black warm brown | `#1F1A15` | Headlines, body copy |
| Text — muted | Warm gray-brown | `#6B6259` | Captions, secondary text |
| Surface / card background | Soft white | `#FFFFFF` or `#FBF9F4` | For cards sitting on the cream background |
| Border / divider | Warm tan | `#D8CBB8` | Thin rule lines, matching the PDF's section dividers |

Use terracotta sparingly and deliberately (headlines, CTAs, key accents) rather than as a background flood — in the PDF it works because it's used as a highlight color against cream, not a dominant field.

## 3. Typography

**Headlines:** A refined serif with some editorial weight — matching the PDF's display serif treatment on "Lime Craft Collective," "About Us," "Our Vision." Suggested options: **Fraunces** (has the right warm, slightly organic serif character) or **Playfair Display** (more classic/formal). Fraunces is the closer match to the PDF's soft, slightly irregular letterforms.

**Body copy:** A clean, humanist sans-serif for readability at paragraph length — **Inter** or **Public Sans**. Keep body text weight regular/light; let the serif carry all the personality.

**Type scale (suggested):**
- H1 (hero): 56–72px serif
- H2 (section headers): 36–44px serif
- H3 (card/subsection headers): 22–28px serif
- Body: 16–18px sans, 1.6 line-height
- Small/caption: 13–14px sans, muted color

**Mixed-weight headlines:** The PDF often bolds half a heading in a different color ("**About** Us", "**Our** Vision") — carry this pattern through as a signature move for section headers.

## 4. Layout language

- **Generous whitespace.** The PDF never crowds a slide — carry that breathing room into web sections (large vertical padding between sections, ~96–140px on desktop).
- **Alternating asymmetric two-column sections.** Full-bleed image on one side, text block on the other, alternating left/right down the page — this is the PDF's dominant layout pattern (About Us, Our Philosophy, Microtopping sections) and should be the backbone of Service and About pages.
- **Full-bleed photography** for hero sections and major transitions, consistent with both the PDF and your reference photos.
- **Thin horizontal rule dividers** under section headers (seen under "Our Philosophy," "Why Microtopping?") — a quiet, editorial way to separate content without heavy boxes/shadows.
- **Checkmark bullet lists** in a filled dark circle style (as in "Our Philosophy," "Why Microtopping?", "Maintenance") — reuse this exact pattern for any feature/benefit list across the site for visual consistency.
- **Three-column benefit blocks** with a thin accent line above each (seen in "Key Benefits") — good pattern for a Home page services/benefits summary.

## 5. Component patterns

- **Buttons:** Solid terracotta fill with cream text for primary actions (Contact, Get a Quote); outline/ghost style in muted brown for secondary actions.
- **Swatch tiles:** Square/rectangular image tiles with a name label overlaid at the bottom-left in a small caps label (matches the "LIME SILK TEXTURE" / "LIQUID METAL TEXTURE" labeling style already in your PDF's texture grid slide) — this pattern is ready-made for the swatch picker.
- **Cards:** Soft white background, no heavy shadow — a thin tan border or subtle drop shadow is enough; keep it flat and editorial rather than skeuomorphic.
- **Navigation:** Simple, minimal top nav on a cream or transparent-over-image background; logo left, links right, a terracotta CTA button ("Get in Touch" / WhatsApp) at the far right.
- **Footer:** Dark warm-brown or terracotta background with cream text — a grounded contrast to close the page, holding contact info, GST number, address, and social link.

## 6. Motion (subtle, per your preference)

- Fade-up on scroll for section content entering the viewport (short duration, ~400–600ms, no bounce).
- Gentle hover scale/opacity shift on swatch tiles and cards (not on every element — restraint matters more than flourish here).
- No parallax or heavy scroll-jacking — keep it "quiet luxury," not flashy.

## 7. Imagery treatment

- Your real project photos are the strongest asset you have — let them run large and full-bleed rather than cropping them into small thumbnails.
- Keep a consistent warm color grade across all photos on the site (even if source photos vary slightly) so the site feels like one cohesive material story rather than a stitched-together gallery.
- Swatch/texture close-ups should be shot/cropped square or near-square for the grid pattern to stay tidy.

## 8. Responsive behavior

- Alternating two-column sections stack to single-column (image on top, text below) under ~768px.
- Swatch grid: 4 columns desktop → 2 columns tablet → 1–2 columns mobile.
- Navigation collapses to a hamburger/menu drawer on mobile, WhatsApp CTA stays persistently visible (e.g. floating button) since mobile is likely a meaningful share of your traffic.

## 9. Accessibility notes

- The terracotta-on-cream combination should be checked for contrast on small text — use the darker text color (`#1F1A15`) for body copy, reserve terracotta for large headlines, buttons, and accents rather than small body text.
- Ensure swatch tile labels remain legible over photo backgrounds (add a subtle dark gradient/overlay behind text, as your PDF's texture grid slide already does).
