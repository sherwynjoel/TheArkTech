# TheArkTech UI Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the TheArkTech marketing homepage so every section has a distinct, non-"AI-generated" layout, on a refined black+blue theme with Clash Display + Satoshi typography and three React-island effects (warp shader, shiny button, flip words).

**Architecture:** Astro 5 static site. Page is composed in `src/pages/index.astro` from focused `.astro` section components plus three hydrated React islands. Design tokens live as CSS variables in `global.css` and are mirrored into the Tailwind theme. Fonts and industry photos are self-hosted in `public/`.

**Tech Stack:** Astro 5, `@astrojs/react` (React 19 — already installed), Tailwind 3, vanilla WebGL (no extra libs), self-hosted Fontshare woff2.

**Verification model:** This repo has no unit-test framework and the work is visual. Each task verifies with `npm run build` (must exit 0, no NEW errors) and, where noted, a visual check via `npm run dev` at http://localhost:4321. Commit after each task. Do NOT add a test framework (YAGNI).

**Known pre-existing build output (NOT a failure):** the static build prints `[WARN] [router] No API Route handler exists for the method "GET"` for `/api/quote` and `/api/submit`. This is present on the baseline and is expected; ignore it.

**Spec:** `docs/superpowers/specs/2026-06-01-arktech-ui-revamp-design.md`

---

## File Structure

```
astro.config.mjs                      MODIFY  add react() integration
public/fonts/                         CREATE  self-hosted woff2 (Clash Display, Satoshi)
public/industries/*.jpg               EXISTS  12 photos (done, committed)
src/styles/global.css                 REWRITE design tokens, @font-face, base, utilities, keyframes
tailwind.config.cjs                   MODIFY  map tokens + font families
tailwind.config.js                    DELETE  duplicate config
src/data/services.ts                  CREATE  6-item services data array
src/data/industries.ts               CREATE  12-item industry data array
src/components/react/FlipWords.tsx    CREATE  island: rotating word
src/components/react/ShinyButton.tsx  CREATE  island: primary CTA
src/components/react/WarpBackground.tsx CREATE island: WebGL themed shader + fallback
src/components/Nav.astro              CREATE  glass sticky nav
src/components/Hero.astro             OVERWRITE asymmetric hero (replaces orphaned old Hero.astro)
src/components/TrustStrip.astro       CREATE  credibility band
src/components/Services.astro         CREATE  editorial numbered blocks
src/components/WhyChooseUs.astro      CREATE  bento grid
src/components/IndustryCard.astro     CREATE  single photo card (image.png style)
src/components/Industries.astro       CREATE  photo card grid
src/components/TechMarquee.astro      CREATE  dual-row marquee
src/components/Contact.astro          CREATE  glass form + WarpBackground island
src/components/SiteFooter.astro       CREATE  refined footer (fixes contact data)
src/components/CallFab.astro          CREATE  persistent call button
src/pages/index.astro                 REWRITE composes everything; keeps SEO
```

**Files removed at the end (Task 18):** `src/pages/index.astro.bak`, the orphaned old components `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/ContactForm.astro`, `src/components/ServiceCard.astro`, `src/components/Welcome.astro`. (Per spec §5.) `src/components/Hero.astro` is NOT deleted — Task 9 overwrites it with the new hero. `ParticlesBackground.astro` is kept but no longer used everywhere. `SEO.astro` is reused unchanged.

---

## Task 0: Confirm baseline (deps installed, build green)

**Files:** none

- [ ] **Step 1: Ensure dependencies are installed**

Run: `npm install`
Expected: completes; `node_modules` present. (Deprecation/audit warnings are fine.)

- [ ] **Step 2: Confirm React deps deduped**

Run: `npm ls @astrojs/react react react-dom`
Expected: shows `@astrojs/react@4.3.0`, `react@19.1.1`, `react-dom@19.1.1`.

- [ ] **Step 3: Baseline build**

Run: `npm run build`
Expected: exits 0, "1 page(s) built". (The two `/api/*` GET warnings are expected — see header.)

No commit (no changes).

---

## Task 1: Enable React integration

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Replace the entire contents of `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  server: { host: true, port: 4321 },
  output: 'static',
  site: 'https://thearktech.in',
  integrations: [tailwind(), sitemap(), react()],
});
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0. (React integration loads even with no islands yet.)

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: enable @astrojs/react integration"
```

---

## Task 2: Self-host fonts (Clash Display + Satoshi)

**Files:**
- Create: `public/fonts/*.woff2`

- [ ] **Step 1: Download woff2 files from Fontshare**

Fontshare hashes its CDN URLs and rotates them, so the reliable method is to read the css endpoint and extract the woff2 URLs. Run in PowerShell from repo root:

```powershell
New-Item -ItemType Directory -Force public/fonts | Out-Null
$css = (Invoke-WebRequest -UseBasicParsing "https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap").Content
$urls = [regex]::Matches($css, "https://[^)]+\.woff2") | ForEach-Object { $_.Value } | Select-Object -Unique
Write-Output ("found {0} urls" -f $urls.Count)
$i = 0
foreach ($u in $urls) { Invoke-WebRequest -UseBasicParsing $u -OutFile ("public/fonts/raw_{0}.woff2" -f $i); $i++ }
Get-ChildItem public/fonts | Select-Object Name,Length
```

The css text lists `@font-face` blocks in order; each block names `font-family` and `font-weight` and references a woff2. Inspect `$css` (or print it) to map each `raw_N.woff2` to a weight, then rename to the exact filenames the `@font-face` rules in Task 3 expect:
- Clash Display 600 → `ClashDisplay-Semibold.woff2`
- Clash Display 700 → `ClashDisplay-Bold.woff2`
- Satoshi 400 → `Satoshi-Regular.woff2`
- Satoshi 500 → `Satoshi-Medium.woff2`
- Satoshi 700 → `Satoshi-Bold.woff2`

Rename example:
```powershell
Rename-Item public/fonts/raw_0.woff2 ClashDisplay-Semibold.woff2
# ...repeat for each, per the mapping you read from $css
```

**Fallback if the endpoint fails:** open `https://www.fontshare.com/fonts/clash-display` and `https://www.fontshare.com/fonts/satoshi` in a browser, download the family zips, and copy the matching weight woff2 files into `public/fonts/` with the names above.

- [ ] **Step 2: Verify the five files exist and are real fonts**

Run: `Get-ChildItem public/fonts | Select-Object Name,Length`
Expected: exactly these 5 files, each > 5000 bytes:
`ClashDisplay-Semibold.woff2`, `ClashDisplay-Bold.woff2`, `Satoshi-Regular.woff2`, `Satoshi-Medium.woff2`, `Satoshi-Bold.woff2`.
(A tiny or HTML-sized file means a bad URL — re-fetch.) Delete any leftover `raw_*.woff2`.

- [ ] **Step 3: Commit**

```bash
git add public/fonts
git commit -m "feat: self-host Clash Display + Satoshi fonts"
```

---

## Task 3: Design tokens, fonts, base styles, utilities

**Files:**
- Rewrite: `src/styles/global.css`

- [ ] **Step 1: Replace `src/styles/global.css` entirely**

```css
/* ============ Fonts (self-hosted) ============ */
@font-face {
  font-family: "Clash Display"; src: url("/fonts/ClashDisplay-Semibold.woff2") format("woff2");
  font-weight: 600; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Clash Display"; src: url("/fonts/ClashDisplay-Bold.woff2") format("woff2");
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Satoshi"; src: url("/fonts/Satoshi-Regular.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Satoshi"; src: url("/fonts/Satoshi-Medium.woff2") format("woff2");
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Satoshi"; src: url("/fonts/Satoshi-Bold.woff2") format("woff2");
  font-weight: 700; font-style: normal; font-display: swap;
}

/* ============ Design tokens ============ */
:root {
  --bg: #000000;
  --bg-elev: #0a0e1a;
  --bg-elev-2: #0d1426;
  --ink: #ffffff;
  --ink-muted: #9aa6bd;
  --ink-faint: #64748b;
  --brand: #3b82f6;
  --brand-bright: #60a5fa;
  --brand-deep: #1e3a8a;
  --accent-cyan: #22d3ee;
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-brd: rgba(255, 255, 255, 0.12);
  --glass-blur: 16px;
  --ring: rgba(59, 130, 246, 0.55);
  --maxw: 80rem;
}

/* ============ Base ============ */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: "Satoshi", ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
h1, h2, h3, .font-display {
  font-family: "Clash Display", "Satoshi", sans-serif;
  font-weight: 600;
  letter-spacing: -0.02em;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }

:focus-visible { outline: 2px solid var(--brand-bright); outline-offset: 2px; }

/* ============ Reusable utilities ============ */
.container-x { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: 1.5rem; }

.eyebrow {
  font-family: "Satoshi", sans-serif; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.18em;
  font-size: 0.75rem; color: var(--ink-faint);
}

.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-brd);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.btn-glass {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.85rem 1.6rem; border-radius: 9999px;
  background: var(--glass-bg); border: 1px solid var(--glass-brd);
  backdrop-filter: blur(var(--glass-blur)); -webkit-backdrop-filter: blur(var(--glass-blur));
  font-weight: 500; color: var(--ink);
  transition: transform .25s ease, background .25s ease, border-color .25s ease;
}
.btn-glass:hover { transform: translateY(-2px); background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.22); }

/* ============ Scroll reveal ============ */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1); }
.reveal.is-in { opacity: 1; transform: none; }

/* ============ Marquee ============ */
@keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

/* ============ Reduced motion ============ */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: design tokens, self-hosted font-faces, base + utilities"
```

---

## Task 4: Tailwind theme mapping; remove duplicate config

**Files:**
- Modify: `tailwind.config.cjs`
- Delete: `tailwind.config.js`

- [ ] **Step 1: Replace `tailwind.config.cjs` entirely**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-elev-2": "var(--bg-elev-2)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        brand: "var(--brand)",
        "brand-bright": "var(--brand-bright)",
        "brand-deep": "var(--brand-deep)",
        "accent-cyan": "var(--accent-cyan)",
      },
      fontFamily: {
        display: ['"Clash Display"', "sans-serif"],
        sans: ['"Satoshi"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "80rem" },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Delete the duplicate config**

Run: `Remove-Item tailwind.config.js`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.cjs
git rm tailwind.config.js
git commit -m "feat: map design tokens into tailwind theme; remove duplicate config"
```

---

## Task 5: Data files (services + industries)

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/industries.ts`

- [ ] **Step 1: Create `src/data/services.ts`**

```ts
export interface Service { num: string; title: string; desc: string; }

export const services: Service[] = [
  { num: "01", title: "Website Development", desc: "Fast, secure, responsive websites that elevate your brand and generate real results — for startups, businesses, and professionals." },
  { num: "02", title: "E-Commerce Development", desc: "Online stores with secure checkout, product management, invoices, and a seamless shopping experience." },
  { num: "03", title: "Mobile App Development", desc: "Native & hybrid Android/iOS apps designed for speed, user experience, and scalability." },
  { num: "04", title: "Custom Software & Automation", desc: "Automate your business with AI-powered tools, dashboards, CRMs, and custom-built software." },
  { num: "05", title: "Branding & UI/UX", desc: "Clean, modern, intuitive design that sets your digital identity apart." },
  { num: "06", title: "SEO & Digital Marketing", desc: "Boost your online visibility and grow your business with strategic SEO and marketing support." },
];
```

- [ ] **Step 2: Create `src/data/industries.ts`**

```ts
export interface Industry { slug: string; title: string; desc: string; tag: string; }

export const industries: Industry[] = [
  { slug: "ecommerce", title: "E-Commerce & Retail", desc: "Fast, secure online stores with product management, payments, and order systems.", tag: "Retail" },
  { slug: "healthcare", title: "Healthcare & Wellness", desc: "Appointment systems, clinic management software, and websites for doctors and clinics.", tag: "Health" },
  { slug: "corporate", title: "Corporate & Business", desc: "Clean, modern business websites with branding and lead-generation features.", tag: "Business" },
  { slug: "education", title: "Education & E-Learning", desc: "Portals for academies, educators, courses, and online learning platforms.", tag: "Education" },
  { slug: "food", title: "Food & Restaurants", desc: "Restaurant websites, digital menus, online ordering, and delivery platforms.", tag: "Food" },
  { slug: "realestate", title: "Real Estate & Construction", desc: "Property listings, builder portfolios, and enquiry-driven landing pages.", tag: "Property" },
  { slug: "jewellery", title: "Jewellery & Luxury", desc: "High-end e-commerce with premium UI, product zoom, filters, and secure checkout.", tag: "Luxury" },
  { slug: "travel", title: "Travel & Tourism", desc: "Travel agency websites, booking systems, itineraries, and lead-capture forms.", tag: "Travel" },
  { slug: "finance", title: "Finance & Tax", desc: "Professional sites for CA firms, finance consultants, and accounting companies.", tag: "Finance" },
  { slug: "logistics", title: "Logistics & Manufacturing", desc: "Inventory systems, corporate sites, product catalogs, and business automation.", tag: "Industry" },
  { slug: "portfolio", title: "Portfolio & Creatives", desc: "Portfolio websites for influencers, photographers, designers, and freelancers.", tag: "Creative" },
  { slug: "custom", title: "Custom Requirements", desc: "Every business is unique — we build tailor-made websites and software to match.", tag: "Custom" },
];
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/data
git commit -m "feat: services + industries data arrays"
```

---

## Task 6: React island — FlipWords

**Files:**
- Create: `src/components/react/FlipWords.tsx`

- [ ] **Step 1: Create `src/components/react/FlipWords.tsx`**

```tsx
import { useEffect, useState } from "react";

interface Props { words: string[]; interval?: number; }

export default function FlipWords({ words, interval = 2200 }: Props) {
  const reduce = typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % words.length);
        setShow(true);
      }, 280);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span
      style={{
        display: "inline-block",
        color: "var(--brand-bright)",
        transition: "opacity .28s ease, transform .28s cubic-bezier(.2,.7,.2,1)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(0.4em)",
        willChange: "opacity, transform",
      }}
    >
      {words[i]}
    </span>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0 (component compiles even though not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FlipWords.tsx
git commit -m "feat: FlipWords react island"
```

---

## Task 7: React island — ShinyButton

**Files:**
- Create: `src/components/react/ShinyButton.tsx`

- [ ] **Step 1: Create `src/components/react/ShinyButton.tsx`**

```tsx
import { useState } from "react";

interface Props { href: string; children: string; }

export default function ShinyButton({ href, children }: Props) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.95rem 2rem",
        borderRadius: "9999px",
        fontWeight: 600,
        color: "#fff",
        overflow: "hidden",
        border: "1px solid rgba(96,165,250,0.5)",
        background:
          "linear-gradient(120deg, var(--brand-deep), var(--brand) 50%, var(--brand-bright))",
        boxShadow: hover
          ? "0 10px 40px rgba(59,130,246,0.45)"
          : "0 6px 24px rgba(59,130,246,0.30)",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
          transform: hover ? "translateX(120%)" : "translateX(-120%)",
          transition: "transform .9s ease",
        }}
      />
    </a>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/ShinyButton.tsx
git commit -m "feat: ShinyButton react island"
```

---

## Task 8: Glass Nav

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
const links = [
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];
---
<header id="site-nav" class="fixed top-0 inset-x-0 z-50 transition-all duration-300">
  <div class="container-x flex items-center justify-between py-3">
    <a href="#home" class="flex items-center gap-3">
      <img src="/logo.png" alt="TheArkTech logo" class="h-10 w-12 object-contain" />
      <span class="font-display text-xl font-bold tracking-tight">TheArkTech</span>
    </a>
    <nav class="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1">
      {links.map((l) => (
        <a href={l.href} class="px-4 py-2 rounded-full text-sm font-medium text-ink-muted hover:text-ink hover:bg-white/10 transition">{l.label}</a>
      ))}
    </nav>
    <a href="#contact" class="hidden md:inline-flex btn-glass text-sm py-2 px-5">Get Quote</a>
    <button id="nav-toggle" aria-label="Open menu" aria-expanded="false" class="md:hidden glass rounded-xl p-2">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
  <div id="nav-mobile" class="md:hidden hidden container-x pb-4">
    <div class="glass rounded-2xl p-3 flex flex-col gap-1">
      {links.map((l) => (
        <a href={l.href} class="px-4 py-3 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-white/10 transition">{l.label}</a>
      ))}
      <a href="#contact" class="btn-glass mt-1">Get Quote</a>
    </div>
  </div>
</header>

<script>
  const nav = document.getElementById("site-nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-mobile");
  toggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("hidden") === false;
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.add("hidden"))
  );
</script>

<style>
  #site-nav.nav-scrolled { background: rgba(0,0,0,0.55); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08); }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: glass sticky scroll-aware nav"
```

---

## Task 9: Hero (overwrites old Hero.astro)

**Files:**
- Overwrite: `src/components/Hero.astro` (old orphaned content is replaced)

- [ ] **Step 1: Replace `src/components/Hero.astro` entirely**

```astro
---
import FlipWords from "./react/FlipWords.tsx";
import ShinyButton from "./react/ShinyButton.tsx";
const words = ["websites", "apps", "AI automation", "cloud"];
---
<section id="home" class="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
  <!-- gradient mesh backdrop -->
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40"
         style="background: radial-gradient(circle, var(--brand-deep), transparent 60%);"></div>
    <div class="absolute top-1/3 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-30"
         style="background: radial-gradient(circle, var(--brand), transparent 60%);"></div>
    <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"></div>
  </div>

  <div class="container-x grid lg:grid-cols-12 gap-12 items-center">
    <div class="lg:col-span-7">
      <p class="eyebrow mb-5">Software studio · Coimbatore, India</p>
      <h1 class="font-display font-bold leading-[1.02] text-[clamp(2.75rem,6vw,5rem)]">
        We build<br />
        <FlipWords client:load words={words} /><br />
        that ship.
      </h1>
      <p class="mt-6 max-w-xl text-lg text-ink-muted">
        TheArkTech delivers premium, end-to-end digital products — from
        modern websites and apps to AI-powered automation — for small
        businesses and startups.
      </p>
      <div class="mt-9 flex flex-wrap items-center gap-4">
        <ShinyButton client:load href="#contact">Start a project</ShinyButton>
        <a href="#services" class="btn-glass">See our work</a>
      </div>
    </div>

    <div class="lg:col-span-5 relative">
      <div class="glass rounded-3xl p-5 rotate-2 hover:rotate-0 transition-transform duration-500">
        <div class="rounded-2xl bg-bg-elev-2 p-4 font-mono text-sm text-ink-muted">
          <p><span class="text-accent-cyan">const</span> ark = <span class="text-brand-bright">build</span>(idea);</p>
          <p class="mt-1">ark.ship(); <span class="text-ink-faint">// fast, secure, yours</span></p>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3 text-center">
          <div class="rounded-xl bg-white/5 py-4"><p class="font-display text-2xl">Web</p></div>
          <div class="rounded-xl bg-white/5 py-4"><p class="font-display text-2xl">Apps</p></div>
          <div class="rounded-xl bg-white/5 py-4"><p class="font-display text-2xl">AI</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0. (Hero is not yet on the page until Task 18; this just confirms it compiles with the two islands.)

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: asymmetric hero with FlipWords + ShinyButton islands"
```

---

## Task 10: Trust strip

**Files:**
- Create: `src/components/TrustStrip.astro`

- [ ] **Step 1: Create `src/components/TrustStrip.astro`**

```astro
---
const items = [
  { k: "End-to-end", v: "design → deploy" },
  { k: "Coimbatore", v: "Tamil Nadu, India" },
  { k: "Web · Apps · AI", v: "one partner" },
  { k: "Fast & secure", v: "by default" },
];
---
<section class="border-y border-white/5 bg-bg-elev/40">
  <div class="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
    {items.map((it) => (
      <div class="px-4 py-6 text-center md:text-left">
        <p class="font-display text-lg">{it.k}</p>
        <p class="text-sm text-ink-faint">{it.v}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustStrip.astro
git commit -m "feat: trust strip band"
```

---

## Task 11: Services (editorial numbered blocks)

**Files:**
- Create: `src/components/Services.astro`

- [ ] **Step 1: Create `src/components/Services.astro`**

```astro
---
import { services } from "../data/services.ts";
---
<section id="services" class="relative py-28">
  <div class="container-x">
    <div class="max-w-2xl mb-16">
      <p class="eyebrow mb-3">What we do</p>
      <h2 class="font-display text-[clamp(2rem,4vw,3.25rem)]">Our services</h2>
    </div>

    <div class="flex flex-col">
      {services.map((s, idx) => (
        <article class={`reveal group border-t border-white/10 py-10 grid md:grid-cols-12 gap-6 items-start ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div class="md:col-span-3">
            <span class="font-display text-5xl text-ink-faint group-hover:text-brand-bright transition-colors">{s.num}</span>
          </div>
          <div class="md:col-span-9">
            <h3 class="font-display text-2xl md:text-3xl">{s.title}</h3>
            <p class="mt-3 max-w-2xl text-ink-muted">{s.desc}</p>
          </div>
        </article>
      ))}
      <div class="border-t border-white/10 py-12 text-center">
        <p class="font-display text-2xl md:text-3xl text-brand-bright">If you can imagine it, we can build it.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: editorial numbered services section"
```

---

## Task 12: Why Choose Us (bento grid)

**Files:**
- Create: `src/components/WhyChooseUs.astro`

- [ ] **Step 1: Create `src/components/WhyChooseUs.astro`**

```astro
---
const reasons = [
  { t: "Innovation-Driven", d: "Creativity plus the latest technologies, smart architecture, and future-ready design." },
  { t: "High Performance", d: "Lightweight, optimized code for fast load times and smooth experiences." },
  { t: "Security You Can Trust", d: "Industry-grade encryption and secure authentication across every build." },
  { t: "End-to-End Support", d: "Design, build, test, deploy, and maintain — a complete, worry-free service." },
  { t: "Modern UI/UX", d: "Clean layouts and intuitive navigation that build trust and clarity." },
  { t: "Transparent Communication", d: "Regular updates, clear timelines, and honest communication throughout." },
  { t: "Custom Solutions", d: "Tailored to your brand and goals — never generic templates." },
  { t: "Proven Results", d: "Successful projects across e-commerce, corporate, mobile, and dashboards." },
];
const span = (i: number) => (i === 0 || i === 5) ? "lg:col-span-2" : "";
---
<section id="why" class="py-28">
  <div class="container-x">
    <div class="max-w-2xl mb-14">
      <p class="eyebrow mb-3">Why choose us</p>
      <h2 class="font-display text-[clamp(2rem,4vw,3.25rem)]">Built to make a difference</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
      {reasons.map((r, i) => (
        <div class={`reveal glass rounded-3xl p-7 hover:-translate-y-1 hover:border-brand/40 transition ${span(i)}`}>
          <div class="h-10 w-10 rounded-xl bg-brand/15 border border-brand/30 mb-5"></div>
          <h3 class="font-display text-xl">{r.t}</h3>
          <p class="mt-2 text-sm text-ink-muted">{r.d}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhyChooseUs.astro
git commit -m "feat: why-choose-us bento grid"
```

---

## Task 13: IndustryCard + Industries grid

**Files:**
- Create: `src/components/IndustryCard.astro`
- Create: `src/components/Industries.astro`

- [ ] **Step 1: Create `src/components/IndustryCard.astro`** (image.png style)

```astro
---
interface Props { slug: string; title: string; desc: string; tag: string; }
const { slug, title, desc, tag } = Astro.props as Props;
---
<article class="reveal group glass rounded-3xl overflow-hidden flex flex-col hover:-translate-y-1.5 transition duration-300">
  <div class="relative h-44 overflow-hidden">
    <img src={`/industries/${slug}.jpg`} alt={title} loading="lazy" decoding="async"
         class="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
    <span class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">{tag}</span>
  </div>
  <div class="flex flex-col flex-1 p-5">
    <h3 class="font-display text-lg">{title}</h3>
    <p class="mt-2 text-sm text-ink-muted flex-1">{desc}</p>
    <a href="#contact" class="btn-glass mt-5 w-full text-sm py-3">Explore →</a>
  </div>
</article>
```

- [ ] **Step 2: Create `src/components/Industries.astro`**

```astro
---
import { industries } from "../data/industries.ts";
import IndustryCard from "./IndustryCard.astro";
---
<section id="industries" class="py-28">
  <div class="container-x">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-14">
      <div class="max-w-2xl">
        <p class="eyebrow mb-3">Industries</p>
        <h2 class="font-display text-[clamp(2rem,4vw,3.25rem)]">Industries we serve</h2>
        <p class="mt-3 text-ink-muted">Digital solutions for businesses across many industries — built to fit your goals.</p>
      </div>
      <a href="#contact" class="btn-glass hidden md:inline-flex">Get a consultation →</a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {industries.map((it) => <IndustryCard slug={it.slug} title={it.title} desc={it.desc} tag={it.tag} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/IndustryCard.astro src/components/Industries.astro
git commit -m "feat: photo-topped industry cards + grid"
```

---

## Task 14: Tech marquee

**Files:**
- Create: `src/components/TechMarquee.astro`

- [ ] **Step 1: Create `src/components/TechMarquee.astro`**

```astro
---
const row1 = ["React","Angular","Vue.js","Next.js","Node.js","Python","Java",".NET","PHP","Flutter"];
const row2 = ["React Native","Swift","AWS","Azure","GCP","Docker","Kubernetes","PostgreSQL","MongoDB","MySQL"];
---
<section id="tech" class="py-24 overflow-hidden">
  <div class="container-x text-center mb-10">
    <p class="eyebrow mb-3">Our stack</p>
    <h2 class="font-display text-[clamp(2rem,4vw,3.25rem)]">Technology we work with</h2>
  </div>
  <div class="marquee-mask space-y-6">
    <div class="flex w-max" style="animation: marquee-left 32s linear infinite;">
      {[...row1, ...row1].map((t) => <span class="marq-item">{t}</span>)}
    </div>
    <div class="flex w-max" style="animation: marquee-right 36s linear infinite;">
      {[...row2, ...row2].map((t) => <span class="marq-item">{t}</span>)}
    </div>
  </div>
</section>

<style>
  .marquee-mask { -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
  .marq-item { display: inline-block; margin: 0 1.5rem; font-family: "Clash Display", sans-serif; font-size: 1.5rem; color: var(--ink-faint); transition: color .3s; }
  .marq-item:hover { color: var(--brand-bright); }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/TechMarquee.astro
git commit -m "feat: dual-row tech marquee"
```

---

## Task 15: React island — WarpBackground (WebGL + fallback)

**Files:**
- Create: `src/components/react/WarpBackground.tsx`

- [ ] **Step 1: Create `src/components/react/WarpBackground.tsx`**

A lightweight full-bleed animated shader in blue/navy. Falls back to a static gradient if WebGL is unavailable or reduced-motion is set; pauses when offscreen.

```tsx
import { useEffect, useRef } from "react";

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 3.0;
  float t = u_time * 0.15;
  float w = sin(p.x + t) + sin(p.y * 1.3 + t * 1.2) + sin((p.x + p.y) * 0.7 - t);
  w = w / 3.0;
  vec3 navy = vec3(0.04, 0.06, 0.13);
  vec3 blue = vec3(0.23, 0.51, 0.96);
  vec3 col = mix(navy, blue, smoothstep(-0.4, 0.9, w) * 0.55);
  gl_FragColor = vec4(col, 1.0);
}
`;
const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }`;

export default function WarpBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl");
    if (!gl || reduce) {
      canvas.style.background =
        "linear-gradient(135deg, var(--brand-deep), #04060d 70%)";
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0; let running = true; const start = performance.now();
    const loop = () => {
      if (!running) return;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) loop(); else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); io.disconnect(); };
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/WarpBackground.tsx
git commit -m "feat: WebGL warp background island with reduced-motion + fallback"
```

---

## Task 16: Contact (glass form + warp background)

**Files:**
- Create: `src/components/Contact.astro`

Preserves existing behavior: dev posts to `/api/submit`, prod posts to `/contact.php`; the status-banner script reads `?submitted`/`?error` query params.

- [ ] **Step 1: Create `src/components/Contact.astro`**

```astro
---
import WarpBackground from "./react/WarpBackground.tsx";
const action = import.meta.env?.DEV ? "/api/submit" : "/contact.php";
---
<section id="contact" class="relative py-28 overflow-hidden">
  <div class="absolute inset-0 -z-10">
    <WarpBackground client:visible />
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <div class="container-x">
    <div class="max-w-xl mx-auto text-center mb-10">
      <p class="eyebrow mb-3">Contact</p>
      <h2 class="font-display text-[clamp(2rem,4vw,3.25rem)]">Let's build it together</h2>
      <p class="mt-3 text-ink-muted">Tell us your requirement — our team will analyse and contact you.</p>
    </div>

    <div id="contact-status" class="max-w-xl mx-auto mb-6"></div>

    <form action={action} method="POST" class="glass max-w-xl mx-auto rounded-3xl p-8 space-y-5">
      <input name="name" type="text" placeholder="Your name" required
        class="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-ink placeholder-ink-faint focus:border-brand focus:ring-2 focus:ring-[var(--ring)] outline-none transition" />
      <input name="email" type="email" placeholder="Your email" required
        class="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-ink placeholder-ink-faint focus:border-brand focus:ring-2 focus:ring-[var(--ring)] outline-none transition" />
      <input name="phone" type="tel" placeholder="Your phone" required
        class="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-ink placeholder-ink-faint focus:border-brand focus:ring-2 focus:ring-[var(--ring)] outline-none transition" />
      <textarea name="requirement" rows="5" minlength="5" placeholder="Your query (min 5 characters)" required
        class="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-ink placeholder-ink-faint focus:border-brand focus:ring-2 focus:ring-[var(--ring)] outline-none transition"></textarea>
      <button type="submit"
        class="w-full rounded-xl py-4 font-semibold text-white transition hover:-translate-y-0.5"
        style="background: linear-gradient(120deg, var(--brand-deep), var(--brand) 60%, var(--brand-bright)); box-shadow: 0 8px 30px rgba(59,130,246,0.35);">
        Submit query
      </button>
    </form>
  </div>
</section>

<script>
  const statusEl = document.getElementById("contact-status");
  if (statusEl) {
    const params = new URLSearchParams(window.location.search);
    const ok = params.get("submitted") === "1";
    const error = params.get("error");
    if (ok) {
      statusEl.innerHTML = `<div class="rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 px-4 py-3 text-sm">Thanks! Your query has been sent. We'll get back to you soon.</div>`;
    } else if (error) {
      const fields = (params.get("fields") || "").split(",").filter(Boolean);
      let msg = "There was a problem submitting the form. Please try again.";
      if (error === "validation" && fields.length) {
        msg = `Please fix: ${fields.join(", ")}.`;
        fields.forEach((n) => document.querySelector(`[name="${n}"]`)?.classList.add("ring-2", "ring-red-500"));
      } else if (error === "server") {
        msg = "Email sending failed. Please try again later.";
      }
      statusEl.innerHTML = `<div class="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm">${msg}</div>`;
    }
    if (window.history && (ok || error)) {
      const url = new URL(window.location.href); url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: glass contact form on WebGL warp background"
```

---

## Task 17: Footer + Call FAB (fix contact data)

**Files:**
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/CallFab.astro`

- [ ] **Step 1: Create `src/components/SiteFooter.astro`** (email display == mailto target; correct phone; brand name correct)

```astro
---
const email = "contact@thearktech.in";
const phone = "+919489722142";
const phoneLabel = "+91 94897 22142";
---
<footer class="relative overflow-hidden border-t border-white/10">
  <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-30">
    <source src="/footer bg.mp4" type="video/mp4" />
  </video>
  <div class="absolute inset-0 bg-black/80"></div>
  <div class="relative container-x py-16 grid gap-10 md:grid-cols-4">
    <div class="md:col-span-2">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="TheArkTech logo" class="h-10 w-12 object-contain" />
        <span class="font-display text-xl font-bold">TheArkTech</span>
      </div>
      <p class="mt-4 max-w-sm text-ink-muted">Your trusted software partner — websites, apps, and AI-powered automation for businesses that want to grow.</p>
    </div>
    <div>
      <p class="eyebrow mb-4">Explore</p>
      <ul class="space-y-2 text-ink-muted">
        <li><a href="#services" class="hover:text-ink">Services</a></li>
        <li><a href="#industries" class="hover:text-ink">Industries</a></li>
        <li><a href="#contact" class="hover:text-ink">Contact</a></li>
      </ul>
    </div>
    <div>
      <p class="eyebrow mb-4">Get in touch</p>
      <ul class="space-y-2 text-ink-muted">
        <li><a href={`mailto:${email}`} class="hover:text-ink">{email}</a></li>
        <li><a href={`tel:${phone}`} class="hover:text-ink">{phoneLabel}</a></li>
        <li>Coimbatore, Tamil Nadu, India</li>
      </ul>
    </div>
  </div>
  <div class="relative container-x border-t border-white/10 py-6 text-sm text-ink-faint">
    &copy; 2025 TheArkTech. All rights reserved.
  </div>
</footer>
```

- [ ] **Step 2: Create `src/components/CallFab.astro`**

```astro
<a href="tel:+919489722142" aria-label="Call us"
   class="fixed bottom-5 right-5 z-50 btn-glass !rounded-full !py-3 !px-5 shadow-lg"
   style="background: var(--brand); border-color: rgba(255,255,255,0.25);">
  <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M2.01 6.003c-.01-1.104.89-2.003 1.994-2.003h2.04c.93 0 1.73.64 1.94 1.548l.47 2.026a2 2 0 0 1-.58 1.916l-1.2 1.2a14.5 14.5 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 1.916-.58l2.026.47A2 2 0 0 1 18 17.956v2.04c0 1.104-.9 2.004-2.004 1.994C7.44 21.83 2.17 16.56 2.01 6.003Z"/></svg>
  <span class="font-semibold">Call us</span>
</a>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteFooter.astro src/components/CallFab.astro
git commit -m "feat: refined footer (fixed contact data) + call FAB"
```

---

## Task 18: Assemble page, scroll-reveal, SEO; remove dead files

**Files:**
- Rewrite: `src/pages/index.astro`
- Delete: dead files (Step 4)

- [ ] **Step 1: Replace `src/pages/index.astro` entirely**

```astro
---
import "../styles/global.css";
import SEO from "../components/SEO.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import TrustStrip from "../components/TrustStrip.astro";
import Services from "../components/Services.astro";
import WhyChooseUs from "../components/WhyChooseUs.astro";
import Industries from "../components/Industries.astro";
import TechMarquee from "../components/TechMarquee.astro";
import Contact from "../components/Contact.astro";
import SiteFooter from "../components/SiteFooter.astro";
import CallFab from "../components/CallFab.astro";
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <SEO
      title="TheArkTech | Software Solutions"
      description="We build modern websites, apps, AI automation, and cloud solutions for small businesses and startups."
      url="https://thearktech.in/"
      image="https://thearktech.in/banner.png"
      siteName="TheArkTech"
      keywords={[
        "web developer in Coimbatore",
        "software development company Coimbatore",
        "best website developer near me",
        "IT services in Coimbatore",
        "ecommerce website development company in coimbatore",
        "software company in tamilnadu"
      ]}
    />
  </head>
  <body class="bg-bg text-ink">
    <Nav />
    <main>
      <Hero />
      <TrustStrip />
      <Services />
      <WhyChooseUs />
      <Industries />
      <TechMarquee />
      <Contact />
    </main>
    <SiteFooter />
    <CallFab />

    <script>
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0, "1 page(s) built". (Plus the two expected `/api/*` GET warnings.)

- [ ] **Step 3: Visual check (full page)**

Run: `npm run dev`, open http://localhost:4321. Confirm in order:
- Glass nav blurs/darkens after scrolling; mobile menu opens/closes.
- Hero: the flip word cycles (websites → apps → AI automation → cloud); the Shiny Button shows a shine sweep on hover.
- Services blocks reveal on scroll, alternating sides.
- Why-Us bento tiles render with two wider tiles.
- Industries: 12 photo cards load images from `/industries/`, hover zoom + lift, pill button.
- Tech marquee scrolls both directions, words tint on hover.
- Contact: animated warp background behind a glass form; inputs glow on focus.
- Footer shows `contact@thearktech.in` and `+91 94897 22142`; Call FAB bottom-right.
- DevTools console: **no errors**.
- In DevTools rendering, set "prefers-reduced-motion: reduce" and reload: reveals appear immediately, warp shows static gradient, flip word stays on first word.

- [ ] **Step 4: Remove dead files**

```bash
git rm src/pages/index.astro.bak src/components/Header.astro src/components/Footer.astro src/components/ContactForm.astro src/components/ServiceCard.astro src/components/Welcome.astro
```

(Do NOT remove `src/components/Hero.astro` — it now holds the new hero. `ParticlesBackground.astro` is intentionally kept though unused.)

- [ ] **Step 5: Verify build again after deletions**

Run: `npm run build`
Expected: exits 0 (nothing imports the deleted files).

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble revamped homepage; scroll-reveal; remove dead components"
```

---

## Task 19: Final verification gate

**Files:** none (verification + optional cleanup commit)

- [ ] **Step 1: No leftover CDN animation references**

Run: `Select-String -Path src\*.astro,src\**\*.astro -Pattern "unpkg|esm.sh|aos@"`
Expected: no matches.

- [ ] **Step 2: No orphan imports of deleted components**

Run: `Select-String -Path src\*.astro,src\**\*.astro -Pattern "ServiceCard|Welcome|ContactForm|components/Header|components/Footer\.astro"`
Expected: no matches.

- [ ] **Step 3: Final build**

Run: `npm run build`
Expected: exits 0, "1 page(s) built", only the two known `/api/*` GET warnings.

- [ ] **Step 4: Commit (only if Steps 1–2 surfaced changes)**

```bash
git add -A
git commit -m "chore: verify no stale CDN/component references after revamp"
```

---

## Self-Review Notes (coverage vs. spec)

- Glass nav ✓ (T8) · Hero asymmetric + FlipWords + ShinyButton ✓ (T6,T7,T9) · Trust strip ✓ (T10) · Services editorial ✓ (T11) · Why-Us bento ✓ (T12) · Industries photo cards ✓ (T13) · Tech marquee ✓ (T14) · Contact warp+glass ✓ (T15,T16) · Footer fixes ✓ (T17) · React enabled ✓ (T1) · Fonts self-hosted ✓ (T2,T3) · tokens/theme ✓ (T3,T4) · reduced-motion + WebGL fallback ✓ (T15) · dead-file cleanup ✓ (T18) · color stays black+blue family ✓ (T3 tokens).
- Out of scope (per spec §6): SMTP/backend, new routes, LocalBusiness schema, npm dep pruning — intentionally not in plan.
- Only ONE Shiny Button (hero) — ✓ used once (T9).
- Type consistency: `Service {num,title,desc}` and `Industry {slug,title,desc,tag}` defined in T5; consumed identically in T11/T13. Island prop names (`words`, `href`, `children`) consistent between T6/T7/T9. `WarpBackground` (no props) consistent T15/T16.
```
