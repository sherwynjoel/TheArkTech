import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  gsap.utils.toArray<HTMLElement>(".service").forEach((service) => {
    gsap.from(service, {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: service,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });
}
