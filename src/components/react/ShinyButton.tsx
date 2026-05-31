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
