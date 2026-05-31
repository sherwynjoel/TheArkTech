# TheArkTech — UI Revamp Design

**Date:** 2026-06-01
**Status:** Approved structure; pending spec review
**Goal:** Revamp the TheArkTech marketing site so it stops looking "AI-generated." Every section gets a visually distinct layout (killing the repeated "particles + centered text + glass cards" pattern), built on a refined black + blue theme with editorial typography and a few high-impact interactive effects.

---

## 1. Decisions (locked)

| Topic | Decision |
|-------|----------|
| **Tech** | Enable `@astrojs/react`. The three interactive effects ship as **hydrated React islands**; everything else stays static Astro. |
| **Typography** | **Clash Display** (headings) + **Satoshi** (body), self-hosted from Fontshare (woff2) — no external font CDN, no FOUT. |
| **Cards** | Industries use **photo-topped cards** modeled on `image.png` (image top, rounded corners, layered depth, meta/badge row, full-width pill button). |
| **Industry photos** | 12 curated, watermark-free JPEGs already downloaded to `public/industries/` (800×600). User can overwrite later. |
| **Structure** | Free restructure into a "software studio" narrative (see §4). |
| **Color** | Keep black base + blue-600 (`#3b82f6`); enrich with navy/indigo gradients, a sparing cyan highlight, and glass tints for depth. |
| **Motion** | Emil-Kowalski-style: spring/ease-out entrances, fast exits, staggered reveals, interruptible, `prefers-reduced-motion` respected. |

### 21st.dev effects → how each is built
- **Warp shader** (contact bg): WebGL fragment shader, themed blue/navy. React island wrapping a `<canvas>`. Pauses when offscreen (IntersectionObserver) and disables on `prefers-reduced-motion`.
- **Shiny Button**: used for **exactly one** primary CTA (hero "Start a project"). Implemented as a React island (per "use React" decision) but is visually a CSS shine-sweep over a gradient.
- **Flip Words**: hero catchline rotating word. React island, cross-fade + vertical slide, pauses on reduced-motion (shows first word).

---

## 2. Color tokens (CSS variables)

```
--bg:           #000000   /* page base */
--bg-elev:      #0a0e1a   /* raised surfaces / deep navy */
--bg-elev-2:    #0d1426
--ink:          #ffffff
--ink-muted:    #9aa6bd   /* body/secondary text */
--ink-faint:    #64748b   /* labels / eyebrows */
--brand:        #3b82f6   /* blue-600, primary accent (unchanged) */
--brand-bright: #60a5fa   /* hover/active */
--brand-deep:   #1e3a8a   /* gradient anchor */
--accent-cyan:  #22d3ee   /* sparing highlight only */
--glass-bg:     rgba(255,255,255,0.06)
--glass-brd:    rgba(255,255,255,0.12)
--glass-blur:   16px
--ring:         rgba(59,130,246,0.55)  /* focus */
```

---

## 3. Typography scale
- Display (Clash Display, 600/700): hero `clamp(2.75rem, 6vw, 5rem)`; section h2 `clamp(2rem, 4vw, 3.25rem)`.
- Body (Satoshi, 400/500): `1rem`–`1.125rem`, line-height 1.6, `--ink-muted`.
- Mono-ish eyebrow labels: Satoshi 500, uppercase, letter-spacing 0.15em, small, `--brand`/faint (e.g. "01 / SERVICES").

---

## 4. Section architecture (each visually distinct)

1. **Glass nav** — Sticky frosted bar (`backdrop-blur`, hairline border). Scroll-aware: gains darker tint + subtle shadow after scroll. Logo left; glass-pill links; one Shiny CTA on the right. Mobile: glass slide-down panel.
2. **Hero** — *Asymmetric*, not centered. Left: eyebrow label, big Clash headline with **Flip Words** on the key noun ("websites / apps / AI automation / cloud"), Satoshi subcopy, two buttons (primary = **Shiny Button** "Start a project"; secondary = glass "See our work"). Right: layered visual — gradient-mesh blob + floating glass UI/code cards with gentle parallax. Bottom fade into next section.
3. **Trust strip** — Thin band: 3–4 stat/positioning items (e.g. "End-to-end delivery", "Coimbatore, India", "Web · Apps · AI") + small inline tech marks. Breaks rhythm, adds credibility. No particles.
4. **Services** — *Editorial numbered blocks* (01–06), alternating left/right, large Clash titles + Satoshi desc + line icon. Desktop: scroll-reveal stagger (optionally a pinned/sticky index column on the left listing 01–06 that highlights the active block). Distinctly NOT a card grid. Content = the 6 existing services (+ the "if you can imagine it" closer as a final full-width line).
5. **Why Choose Us** — *Bento grid*: 8 reasons in mixed-size glass tiles (a couple span 2 cols/rows), icon + title + short copy, hover lift + border glow. Magazine-like asymmetry, distinct from Services.
6. **Industries** — *Photo card grid* (image.png style): 12 cards, image top with zoom-on-hover, rounded, title, one-line desc, a small meta/badge row, full-width glass pill button ("Explore →" / scrolls to contact). Responsive 1/2/3 cols. Optional filter chips (deferred unless trivial).
7. **Tech Stack** — Dual-row **marquee** moving opposite directions; monochrome wordmarks that gain `--brand`/cyan on hover; soft edge mask. Elevated version of the current showreel.
8. **Contact** — **WebGL warp shader** bg (themed). **Glass form** card floating center: glass inputs with focus glow + floating labels, validation states preserved (success/error banners via existing query-param scheme). Keeps current `name/email/phone/requirement` fields and the dev `/api/submit` vs prod `/contact.php` action switch.
9. **Footer** — Refined: keep optional video bg with stronger glass overlay; multi-column (brand blurb, quick links, contact, socials). **Fix data inconsistencies**: display email == `mailto` target; correct phone; "ARK Tech" → "TheArkTech".

**Cross-cutting:** persistent refined "Call us" FAB; consistent focus rings; scroll-reveal utility; reduced-motion fallbacks everywhere.

---

## 5. Component / file plan

```
astro.config.mjs         + react() integration
package.json             (react/react-dom already present; ensure @astrojs/react)
src/styles/global.css     design tokens, font @font-face, base, utilities, keyframes
public/fonts/             self-hosted Clash Display + Satoshi woff2
public/industries/*.jpg   12 photos (DONE)

src/components/
  Nav.astro               glass sticky nav + scroll-aware script + mobile panel
  Hero.astro              asymmetric hero layout (hosts the two islands below)
  react/FlipWords.tsx     island — rotating word
  react/ShinyButton.tsx   island — primary CTA
  react/WarpBackground.tsx island — WebGL themed shader canvas
  TrustStrip.astro
  Services.astro          editorial numbered blocks (+ optional sticky index)
  WhyChooseUs.astro       bento grid
  Industries.astro        photo card grid (data-driven from an array)
  IndustryCard.astro      single photo card (image.png style)
  TechMarquee.astro       dual-row marquee
  Contact.astro           glass form + WarpBackground island
  Footer.astro            refined footer
src/pages/index.astro     composes the above in order; SEO unchanged/improved
```

- `Welcome.astro`, old `Header.astro`/`Hero.astro`/`Footer.astro`/`ServiceCard.astro`/`ContactForm.astro`, `index.astro.bak` are orphaned today; the revamp supersedes them. They'll be removed or left untouched (decided in plan; default = remove the clearly-dead `.bak` + duplicated component once new ones land).
- Keep `ParticlesBackground.astro` available but **stop using it on every section** (the over-use is a root cause of the AI look). It may appear at most once, subtly, if at all.

---

## 6. Constraints & non-goals
- **Static build stays** (`output: 'static'`); React islands hydrate client-side only — no SSR adapter added.
- Self-hosted fonts only; no Google Fonts/CDN font requests. (Existing AOS CDN CSS link, currently unused, gets removed.)
- WebGL shader must: pause offscreen, honor reduced-motion, and degrade to a static themed gradient if WebGL unavailable.
- Preserve existing copy/business facts (services, industries, Coimbatore, phone) — only fix the inconsistent footer contact details.
- Mobile-first responsive; no horizontal overflow; tap targets ≥ 44px.
- Out of scope (this pass): backend/SMTP changes, new pages/routes, SEO LocalBusiness schema (noted as future), removing unused npm deps.

---

## 7. Success criteria
- Each of the 9 sections reads as a *different* layout — no two share the "centered text + particles" template.
- Hero shows Flip Words rotating; one Shiny Button present (and only one).
- Contact form sits on the themed WebGL warp bg with glass inputs; form still submits via existing action logic.
- Industry cards match the `image.png` shape with real photos and hover interactions.
- Glass nav + glass buttons throughout; Clash/Satoshi fonts load self-hosted.
- Smooth on mid-range mobile; respects `prefers-reduced-motion`; no console errors.
- Color stays black + blue-600 family.
