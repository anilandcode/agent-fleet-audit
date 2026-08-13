# Agent Fleet Audit design system

This is the current design source of truth for the public website and `/app` control-plane demo. The implementation is original Agent Fleet Audit work informed by supplied enterprise-AI references; reference logos, brand copy, customer marks, and proprietary artwork are not reproduced.

## Design intent

The experience should feel like governed infrastructure: quiet, precise, cinematic, and technically credible. It uses substantial negative space, thin evidence paths, localized champagne light, and editorial composition instead of neon AI tropes or repeated generic cards.

Core principles:

1. **Evidence before decoration.** Diagrams and labels communicate context, policy, ownership, or outcome.
2. **Editorial rhythm.** Alternate centered hero, split narrative, mosaic, horizontal rail, interstitial, product, and conversion compositions.
3. **Restrained depth.** Graphite panels use fine borders, small inset light, and soft local haze rather than glossy effects.
4. **Original brand world.** Generated imagery is text-free and code-native labels remain sharp and accessible.
5. **Motion never gates reading.** Content remains visible with reduced motion and below desktop pinning breakpoints.

## Foundations

### Color

| Token | Value | Use |
| --- | --- | --- |
| Graphite canvas | `#0b0c0c` / near black | Primary site and product background |
| Olive stage | `#50544B` | Desktop presentation frame |
| Champagne | `#EAD096` | Active evidence, highlights, selected controls |
| Deep graphite | `#262727` | Panels and dividers |
| Warm ivory | `#F4F1E8` | Primary text |
| Muted ivory | translucent ivory | Secondary copy and technical metadata |

Champagne is a local signal, not a full-page heading color. Contrast must remain readable without relying on glow.

### Typography

- Display and body: self-hosted **Stack Sans Notch Variable**.
- Technical labels: **IBM Plex Mono** at restrained uppercase tracking.
- Hero: `clamp(48px, 4.8vw, 72px)` depending on breakpoint.
- Section headings: approximately 39–52px desktop and 39–42px mobile.
- Body: 16px desktop and 15px mobile.
- Buttons: 11–12px desktop and 12px mobile, minimum 48px touch target.
- Brand wordmark: title case, approximately 18px desktop and 14px mobile.

### Spacing and width

The near-black website canvas sits on an olive stage at desktop/tablet and becomes full bleed on small screens.

- Desktop content gutter: 40px inside the dark canvas.
- Tablet content gutter: 24px.
- Mobile content gutter: 16px.
- Major chapter vertical space: approximately 136px desktop and 92px mobile.
- Paragraphs retain readable line-length limits even when their containing chapter is full width.

### Shape and line

- Major chambers/product windows: 22–24px radius.
- Image cards/grouped boards: 18–20px radius.
- Utility cards, form fields, downloads, and FAQ: 14–16px radius.
- Buttons and technical tags: pill radius.
- Dividers: one-pixel translucent ivory/olive lines.
- The brand icon is an original inline SVG of layered incomplete champagne rings.

## Page composition

The public site follows this chapter order:

1. Full-width sticky navigation and centered hero chamber.
2. Editorial platform introduction.
3. Six-capability mosaic with a connected-decision visual.
4. Four-panel architecture board.
5. Horizontal ownership/failure rail.
6. Owned intelligence topology and three AI concept scenes.
7. Institutional knowledge stack.
8. Quantum fleet-core transition.
9. Accountability timeline.
10. Interactive product chapter.
11. Commercial, diagnostic, proof/FAQ, and oversized-wordmark footer.

The removed six-word capability rail must not be reintroduced below the hero. “View demo” routes to `/app`; `#platform`, `#controls`, `#engagements`, and `#diagnostic` remain landing-page anchors.

## Product interface

The dashboard uses the same material system with higher information density:

- Single-tenant sidebar and workspace context.
- Fleet inventory, policies, approvals, traces, budgets, and audit findings.
- Governed/active states use champagne and muted green indicators.
- The landing demo exposes four accessible tabs: Memory, Agents, Policies, and Approvals, each with a unique generated visual.
- Tab transitions are opacity-only; arrow keys, Home, and End update selection and focus.

## Imagery

Raster artwork is generated, original, and text-free. Interface labels, logos, paths, and nodes remain HTML/SVG. Active image families are:

- `reference-clone`: six monochrome failure scenes.
- `visual-correction`: capability, architecture, AI-concept, quantum, and demo-tab visuals.
- `visual-expansion`: hero, editorial, and institutional-memory visuals.

Every active pair supplies AVIF first and WebP fallback. The hero AVIF is preloaded; below-the-fold images are lazy loaded. Unused generated variants are preserved under `public/media/agent-fleet/archive/unused/`. User-provided inspiration remains in `Images/`. See [Generated asset inventory](docs/ASSET_INVENTORY.md).

## Motion and interaction

- GSAP owns page-level choreography: header progress, hero reveal, chapter reveals, desktop ownership progression, topology, timeline, and restrained product motion.
- Motion for React owns component interaction: navigation/menu transitions, buttons, FAQ, focus feedback, and demo crossfades.
- GSAP and Motion must not animate the same transform target.
- Images do not use scroll parallax or hover lift.
- Continuous effects use opacity and transforms; layout-affecting animation is avoided.
- Below 900px, pinned/scrubbed spatial motion is disabled and horizontal content uses native scroll snap.
- `prefers-reduced-motion: reduce` exposes all content immediately and disables pinning/parallax.

## Responsive and accessibility requirements

- Validate at 1440×900, 1024px, 768px, and 390px.
- No horizontal page overflow, clipped navigation, or hidden animated content.
- Mobile uses a 58px header and accessible expanded/collapsed navigation.
- Semantic headings, form labels, keyboard focus, alt text, tab roles, FAQ behavior, and sufficient contrast are mandatory.
- Decorative images use empty alt text; narrative images receive concise descriptive alt text.

## Implementation sources

- Global foundations and dashboard: `app/globals.css`.
- Landing composition and responsive rules: `app/landing-redesign.css`.
- Page structure and image assignments: `components/landing-page.tsx`.
- Generated asset provenance: `docs/ASSET_INVENTORY.md`.

Any future redesign must update this file and the asset inventory in the same change.
