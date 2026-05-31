import { Warp } from "@paper-design/shaders-react";

/**
 * Themed Warp shader background (from @paper-design/shaders-react).
 *
 * Adapted for TheArkTech: this is the shader *fill only* (no hero text), meant
 * to sit absolutely behind other content — e.g. the contact form. Colors are
 * tuned to the site's black + blue theme instead of the original teal demo.
 *
 * Honors prefers-reduced-motion by freezing the animation (speed 0).
 */
export default function WarpShaderBackground() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <Warp
      style={{ height: "100%", width: "100%" }}
      proportion={0.45}
      softness={1}
      distortion={0.25}
      swirl={0.8}
      swirlIterations={10}
      shape="checks"
      shapeScale={0.1}
      scale={1}
      rotation={0}
      speed={reduce ? 0 : 0.6}
      colors={[
        "hsl(222, 66%, 6%)",   // near-black navy base
        "hsl(224, 64%, 22%)",  // deep blue  (~brand-deep #1e3a8a)
        "hsl(217, 91%, 55%)",  // brand blue (~#3b82f6)
        "hsl(213, 94%, 68%)",  // bright blue (~#60a5fa)
      ]}
    />
  );
}
