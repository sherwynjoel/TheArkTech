import { useEffect, useRef, useState } from "react";
import { Warp } from "@paper-design/shaders-react";

/**
 * Themed Warp shader background (from @paper-design/shaders-react).
 *
 * Adapted for TheArkTech: shader *fill only* (no hero text), tuned to the
 * site's black + blue theme. Sits absolutely behind the contact form.
 *
 * Performance: the library's render loop only pauses on tab-hidden, NOT when
 * scrolled off-screen, and renders at full devicePixelRatio by default. To keep
 * the page smooth we:
 *   - cap maxPixelRatio (full-screen fragment shader at 2x-3x DPR is the main cost),
 *   - pause via our own IntersectionObserver when the section leaves the viewport,
 *   - reduce swirlIterations (per-pixel cost),
 *   - freeze entirely under prefers-reduced-motion.
 */
export default function WarpShaderBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  // Start paused; the observer flips it on once the section is actually visible.
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (reduce) return; // stays paused -> a single static frame, no RAF
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div ref={wrapRef} style={{ height: "100%", width: "100%" }}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        maxPixelCount={1920 * 1080}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={4}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={paused || reduce ? 0 : 0.6}
        colors={[
          "hsl(222, 66%, 6%)",   // near-black navy base
          "hsl(224, 64%, 22%)",  // deep blue  (~brand-deep #1e3a8a)
          "hsl(217, 91%, 55%)",  // brand blue (~#3b82f6)
          "hsl(213, 94%, 68%)",  // bright blue (~#60a5fa)
        ]}
      />
    </div>
  );
}
