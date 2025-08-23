import { animate, inView, scroll } from "motion";

// Fade-up sections
inView(".fade-up", ({ target }) => {
  animate(target, { opacity: [0, 1], y: [50, 0] }, { duration: 0.8, easing: "ease-out" });
});

// Services cards
inView(".service", ({ target }) => {
  animate(target, { opacity: [0, 1], y: [100, 0] }, { duration: 0.6, easing: "ease-out" });
});

// Progress bar
scroll(animate(".progress-bar", { scaleX: [0, 1] }));
