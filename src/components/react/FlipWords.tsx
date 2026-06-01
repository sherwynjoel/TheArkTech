import { useEffect, useRef, useState } from "react";

interface Props { words: string[]; interval?: number; }

export default function FlipWords({ words, interval = 2200 }: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      if (reduce.current) {
        // no animation, just swap the word instantly
        setIndex((p) => (p + 1) % words.length);
      } else {
        setVisible(false);
        setTimeout(() => {
          setIndex((p) => (p + 1) % words.length);
          setVisible(true);
        }, 280);
      }
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      style={{
        display: "inline-block",
        color: "var(--brand-bright)",
        transition: "opacity .28s ease, transform .28s cubic-bezier(.2,.7,.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(0.4em)",
        willChange: "opacity, transform",
      }}
    >
      {words[index]}
    </span>
  );
}
