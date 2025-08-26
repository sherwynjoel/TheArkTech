# TheArkTech

## Contact form backend (SMTP)

This project includes an Astro API route at `/api/submit` that accepts the contact form and emails it using SMTP via Nodemailer.

Environment variables required (create a `.env` file):

```
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

Example for Hostinger email hosting:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@thearktech.in
SMTP_PASS=your_app_password
SMTP_FROM=TheArkTech <you@thearktech.in>
SMTP_TO=you@thearktech.in
```

## Run locally (SSR)

```
npm i
npm run dev
```

## Build and run (Node server)

```
npm run build
npm start
```

## Deploy on Hostinger

Options:

1. HPanel Node.js app (Business/Cloud plans)
   - Create a Node.js app in hPanel targeting `dist/server/entry.mjs` after build.
   - Set environment variables above in the app settings.
   - Configure start command: `npm run start`.

2. VPS (Docker or Node)
   - Install Node 20+, clone repo, set `.env`, run `npm i && npm run build && npm start`.
   - Use Nginx reverse proxy from `thearktech.in` to the Node app port.

3. Alternative: Vercel/Netlify serverless
   - Use Astro adapter for Vercel instead of Node, deploy, and point Hostinger DNS to Vercel.
