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
