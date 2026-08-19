# TheArkTech — thearktech.in

Marketing site for TheArkTech, a software agency in Coimbatore. Built with
[Astro 5](https://astro.build) + Tailwind CSS, output as a **fully static site**
(`output: 'static'`, no server adapter) and deployed to Hostinger shared hosting
over FTPS.

## Architecture at a glance

- Single-page homepage (`src/pages/index.astro`) composed of section components
  in `src/components/`; content for services, industries, and portfolio lives in
  `src/data/*.ts`.
- `/terms`, `/privacy`, and a custom `404` are separate static pages.
- Three small React islands (hero word-flip, shiny button, WebGL contact
  background); everything else is CSS + vanilla JS.
- **There is no server backend.** All contact paths (contact form, booking CTA,
  floating buttons) open WhatsApp deep links to +91 94897 22142. An unused PHP
  mail handler exists at `public/contact.php` if email submissions are ever
  wanted on Hostinger.

## Develop

```
npm install
npm run dev        # http://localhost:4321
```

## Build & preview

```
npm run build      # outputs static site to dist/
npm run preview
```

## Deploy

```
npm run deploy     # builds nothing — run `npm run build` first
```

`deploy.mjs` uploads the built pages (`index.html`, `404.html`, `terms/`,
`privacy/`), assets (`_astro/`, `portfolio/`), and sitemaps to Hostinger over
FTPS. If you add a new top-level page, add its directory to the list in
`deploy.mjs`. It needs a `.env` file (never commit it):

```
FTP_HOST=
FTP_USER=
FTP_PASS=
```

`deploy-single.mjs` is a helper for pushing one asset (edit the hardcoded
filename before use). `capture.mjs` regenerates portfolio screenshots with
puppeteer (install it ad hoc; it is intentionally not a dependency).
