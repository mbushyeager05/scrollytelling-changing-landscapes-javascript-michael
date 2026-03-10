// ─── REDUCED MOTION CHECK ───
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {

  gsap.registerPlugin(ScrollTrigger);

  // ─── INITIAL STATES (prevent flash before GSAP runs) ───
  gsap.set(".sun", { opacity: 0, y: 700 });

  // ════════════════════════════════════════════════
  // HORIZON: PINNED INTRO — reveals on scroll
  // Section is pinned while title, sun, subtitle animate in.
  // Background stays frozen until the reveal is complete.
  // ════════════════════════════════════════════════

  const introTl = gsap.timeline();

  introTl
    // Scroll prompt fades out as the user starts scrolling
    .to(".scroll-prompt", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    })
    // Title rises in
    .to(".theme_horizon__title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, 0.2)
    // Sun rises up from below
    .to(".sun", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0.3)
    // Subtitle fades in last
    .to(".theme_horizon__subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 0.7);

  // Pin the horizon section while the intro plays.
  // GSAP automatically offsets all later ScrollTriggers by the pin distance.
  ScrollTrigger.create({
    trigger: ".theme_horizon",
    start: "top top",
    end: "+=800",
    pin: true,
    anticipatePin: 1,
    scrub: 1.5,
    animation: introTl
  });

  // ════════════════════════════════════════════════
  // HORIZON: SCROLLTRIGGER ANIMATIONS
  // (all start/end positions are auto-adjusted by GSAP for the pin)
  // ════════════════════════════════════════════════

  // Sun follows scroll all the way through the horizon section
  gsap.to(".sun", {
    y: 3500,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // Sun sets — color shift and fade 80% → bottom
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

  // Background darkens — night overlay fades in
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

  // City rises up from off-screen
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

  // Cliff — slow upward parallax
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

  // Left-side clouds — drift right at staggered speeds
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

  // Right-side clouds — drift left
  gsap.to(".cloud-e", {
    x: "-120vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "10% top", end: "bottom top", scrub: 1.1 }
  });
  gsap.to(".cloud-f", {
    x: "-140vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "20% top", end: "bottom top", scrub: 0.9 }
  });
  gsap.to(".cloud-g", {
    x: "-100vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "15% top", end: "bottom top", scrub: 1.3 }
  });
  gsap.to(".cloud-h", {
    x: "-160vw",
    ease: "none",
    scrollTrigger: { trigger: ".theme_horizon", start: "30% top", end: "bottom top", scrub: 0.8 }
  });

  // ════════════════════════════════════════════════
  // CITY: PARALLAX
  // ════════════════════════════════════════════════

  // City content elements slide/fade in as they enter the viewport
  gsap.utils.toArray([
    ".theme_city .heading",
    ".theme_city .text-box-container-left",
    ".theme_city .text-box-container-right",
    ".theme_city .what-shifted",
    ".theme_city .teaching-code"
  ]).forEach(el => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "top 58%",
        scrub: 1.5
      }
    });
  });

  // ════════════════════════════════════════════════
  // CITY: TRAFFIC LIGHT CYCLE
  // ════════════════════════════════════════════════

  const RED    = "#FB2D00";
  const YELLOW = "#FFD93D";
  const GREEN  = "#22C55E";
  const OFF    = "#0B0E13";

  const trafficTl = gsap.timeline({ repeat: -1 });

  trafficTl
    // Red is already on — hold for 3s
    .to({}, { duration: 3 })
    // Switch to yellow
    .to("#light-red",    { attr: { fill: OFF },    duration: 0.3 })
    .to("#light-yellow", { attr: { fill: YELLOW }, duration: 0.3 }, "<")
    // Hold yellow for 1s
    .to({}, { duration: 1 })
    // Switch to green
    .to("#light-yellow", { attr: { fill: OFF },    duration: 0.3 })
    .to("#light-green",  { attr: { fill: GREEN },  duration: 0.3 }, "<")
    // Hold green for 3s
    .to({}, { duration: 3 })
    // Back to yellow (amber)
    .to("#light-green",  { attr: { fill: OFF },    duration: 0.3 })
    .to("#light-yellow", { attr: { fill: YELLOW }, duration: 0.3 }, "<")
    // Hold yellow for 1s
    .to({}, { duration: 1 })
    // Back to red
    .to("#light-yellow", { attr: { fill: OFF },    duration: 0.3 })
    .to("#light-red",    { attr: { fill: RED },    duration: 0.3 }, "<");

} // end prefersReducedMotion check
