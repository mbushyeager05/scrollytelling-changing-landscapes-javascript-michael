// ─── REDUCED MOTION CHECK ───
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {

  // ─── HORIZON: HERO ANIMATION ───
  const horizonTl = gsap.timeline();

  horizonTl
    // Title fades in first
    .from(".theme_horizon__title", {
      opacity: 0,
      y: 40,
      duration: 1.9,
      ease: "power2.out"
    })

    // Subtitle fades in after
    .from(".theme_horizon__subtitle", {
      opacity: 0,
      y: 30,
      duration: 1.7,
      ease: "power2.out"
    }, "-=0.3")

    // Sun rises up from below
    .from(".sun", {
      opacity: 0,
      y: 500,
      duration: 4,
      ease: "power1.out"
    }, "-=0.2");

} // end prefersReducedMotion check