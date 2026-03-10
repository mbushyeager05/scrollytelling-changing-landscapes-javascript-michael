// ─── REDUCED MOTION CHECK ───
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {

  gsap.registerPlugin(ScrollTrigger);

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


  // ════════════════════════════════════════════════
  // HORIZON: SCROLLTRIGGER ANIMATIONS
  // ════════════════════════════════════════════════

  // ─── PHASE 2: Sun stays visible — moves with scroll ───
  // Animates down at scroll speed so it stays pinned in the sky
  gsap.to(".sun", {
    y: 2800,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "top top",
      end: "80% top",
      scrub: 1
    }
  });

  // ─── PHASE 3: Sun sets — 80% → bottom ───
  gsap.to("#sun-circle", {
    attr: { cy: 900 },
    fill: "#8B1A1A",
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "80% top",
      end: "bottom top",
      scrub: 2
    }
  });

  gsap.to(".sun", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "80% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // ─── Background darkens — night overlay fades in ───
  gsap.to(".horizon-night-overlay", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "70% top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  // ─── City rises up from off-screen ───
  gsap.fromTo(".city-illustration",
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".theme_horizon",
        start: "75% top",
        end: "bottom top",
        scrub: 1.5
      }
    }
  );

  // ─── Cliff — slow upward parallax ───
  gsap.to(".horizon-illustration", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  // ─── Clouds — drift right at staggered speeds ───
  gsap.to(".cloud-a", {
    x: "120vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "30% top", end: "bottom top", scrub: 1 }
  });

  gsap.to(".cloud-b", {
    x: "140vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "20% top", end: "bottom top", scrub: 1.2 }
  });

  gsap.to(".cloud-c", {
    x: "100vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "40% top", end: "bottom top", scrub: 0.8 }
  });

  gsap.to(".cloud-d", {
    x: "160vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "25% top", end: "bottom top", scrub: 1.4 }
  });

} // end prefersReducedMotion check
