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
