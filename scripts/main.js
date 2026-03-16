gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true
  });

  // ── INITIAL STATES ──────────────────────────────────────────

  gsap.set(".theme_horizon__title", { opacity: 0, y: 60 });
  gsap.set(".theme_horizon__subtitle", { opacity: 0, y: 40 });
  gsap.set(".scroll-prompt", { opacity: 0 });
  gsap.set(".sun", { opacity: 0, scale: 0.6, y: 150, transformOrigin: "50% 50%" });
  gsap.set(".horizon-night-overlay", { opacity: 0 });
  gsap.set(".theme_horizon .content-block--left", { opacity: 0 });
  gsap.set(".theme_city .layer__illustration", { yPercent: 100 });
  gsap.set(".theme_forest .layer__illustration", { yPercent: 100 });
  gsap.set(".theme_mountains .layer__illustration", { yPercent: 100 });
  gsap.set(".theme_coast .layer__illustration", { yPercent: 100 });
  gsap.set(".coast-sun", { opacity: 0, y: 120 });
  gsap.set(".birds-container", { opacity: 0, x: -100 });
  gsap.set(".theme_mountains .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".mountain-sun", { opacity: 0, scale: 0.7, y: 300, transformOrigin: "50% 50%" });

  // ── HORIZON ─────────────────────────────────────────────────

  // 1. Page load intro timeline
  gsap.timeline({ delay: 0.4, onComplete: () => {
    gsap.to(".horizon-hero", { y: -20, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }})
    .to(".sun", { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power2.out" })
    .to(".theme_horizon__title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.6")
    .to(".theme_horizon__subtitle", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.5")
    .to(".scroll-prompt", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");

  // 2. Scroll prompt fades out when scrolling starts
  gsap.to(".scroll-prompt", {
    opacity: 0,
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "1% top",
      end: "5% top",
      scrub: 1
    }
  });

  // 3. Title scrolls up first on scroll
  gsap.to(".theme_horizon__title", {
    y: -300,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "5% top",
      end: "35% top",
      scrub: 1.2
    }
  });

  // 4. Subtitle follows title upward slightly after
  gsap.to(".theme_horizon__subtitle", {
    y: -240,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "10% top",
      end: "38% top",
      scrub: 1.2
    }
  });

  // 5. Sun follows title closely
  gsap.to(".sun", {
    y: 1800,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "6% top",
      end: "bottom top",
      scrub: 1.2
    }
  });

  // 6. Sun color shifts to dark red
  gsap.to("#sun-circle", {
    attr: { fill: "#5C1010" },
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "55% top",
      end: "80% top",
      scrub: 2
    }
  });

  // 7. Sun fades out as it sets
  gsap.to(".sun", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "60% top",
      end: "82% top",
      scrub: 2
    }
  });

  // 8. Night overlay darkens the sky
  gsap.to(".horizon-night-overlay", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "45% top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  // 9. Horizon content block fades in on scroll
  gsap.to(".theme_horizon .content-block--left", {
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_horizon .content-block--left",
      start: "top 85%",
      end: "top 55%",
      scrub: 1.5
    }
  });

  // 10. Clouds scroll across the screen
  gsap.to(".cloud-a", { x: -500, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "top top",  end: "40% top",  scrub: 1 } });
  gsap.to(".cloud-b", { x:  480, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "top top",  end: "40% top",  scrub: 1.2 } });
  gsap.to(".cloud-c", { x: -420, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "5% top",   end: "45% top",  scrub: 0.8 } });
  gsap.to(".cloud-d", { x:  550, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "20% top",  end: "60% top",  scrub: 1 } });
  gsap.to(".cloud-e", { x: -500, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "25% top",  end: "65% top",  scrub: 1.3 } });
  gsap.to(".cloud-f", { x:  460, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "40% top",  end: "75% top",  scrub: 1 } });
  gsap.to(".cloud-g", { x: -520, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "50% top",  end: "85% top",  scrub: 1.2 } });
  gsap.to(".cloud-h", { x:  440, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "55% top",  end: "90% top",  scrub: 0.9 } });

  // 11. Ambient cloud drift (layered on top of scroll movement)
  gsap.to(".cloud-a", { x: "+=120", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cloud-b", { x: "-=140", duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cloud-c", { x: "+=100", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  gsap.to(".cloud-d", { x: "-=130", duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
  gsap.to(".cloud-e", { x: "+=110", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".cloud-f", { x: "-=120", duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
  gsap.to(".cloud-g", { x: "+=130", duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 5 });
  gsap.to(".cloud-h", { x: "-=100", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

  gsap.to(".cloud-i", { x:  480, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "60% top", end: "90% top", scrub: 1 } });
  gsap.to(".cloud-j", { x: -460, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "65% top", end: "95% top", scrub: 1.2 } });
  gsap.to(".cloud-k", { x:  500, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "70% top", end: "bottom top", scrub: 0.9 } });
  gsap.to(".cloud-l", { x: -440, ease: "none", scrollTrigger: { trigger: ".theme_horizon", start: "75% top", end: "bottom top", scrub: 1.1 } });

  gsap.to(".cloud-i", { x: "+=110", duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".cloud-j", { x: "-=130", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
  gsap.to(".cloud-k", { x: "+=120", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
  gsap.to(".cloud-l", { x: "-=100", duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });

  // ── CITY ─────────────────────────────────────────────────────

  // City content blocks start hidden
  gsap.set(".theme_city .layer__content > *", { opacity: 0, y: 60 });

  // Each block pops up as it scrolls into view
  gsap.utils.toArray(".theme_city .layer__content > *").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        scrub: 1.2
      }
    });
  });

  gsap.to(".theme_city .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "50% top",
      end: "bottom top",
      scrub: 5
    }
  });

  // ── FOREST ───────────────────────────────────────────────────

  // Forest content blocks start hidden
  gsap.set(".theme_forest .layer__content > *", { opacity: 0, y: 60 });

  // Each block pops up as it scrolls into view
  gsap.utils.toArray(".theme_forest .layer__content > *").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        scrub: 1.2
      }
    });
  });

  gsap.to(".theme_forest .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_city",
      start: "20% top",
      end: "bottom top",
      scrub: 5
    }
  });

  // ── MOUNTAINS ────────────────────────────────────────────────

  // Birds fly in from left as mountains section enters
  gsap.to(".birds-container", {
    opacity: 1,
    x: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "top 130%",
      end: "top 75%",
      scrub: 1.5
    }
  });

  // Birds drift right via parallax — only for first ~30% of mountains scroll
  gsap.to(".birds-container", {
    xPercent: 110,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "top top",
      end: "30% top",
      scrub: 2
    }
  });

  // Wing-flap animation for birds
  [
    { sel: "#b1",  ox: "120", oy: "200", dur: 0.45, delay: 0.00 },
    { sel: "#b2",  ox: "167", oy: "185", dur: 0.38, delay: 0.06 },
    { sel: "#b3",  ox: "199", oy: "195", dur: 0.42, delay: 0.03 },
    { sel: "#b4",  ox: "227", oy: "178", dur: 0.35, delay: 0.09 },
    { sel: "#b5",  ox: "250", oy: "188", dur: 0.40, delay: 0.05 },
    { sel: "#b6",  ox: "267", oy: "175", dur: 0.36, delay: 0.12 },
    { sel: "#b7",  ox: "282", oy: "180", dur: 0.43, delay: 0.02 },
    { sel: "#b8",  ox: "294", oy: "170", dur: 0.37, delay: 0.08 },
    { sel: "#b9",  ox: "305", oy: "176", dur: 0.41, delay: 0.04 },
    { sel: "#b10", ox: "315", oy: "168", dur: 0.39, delay: 0.10 },
  ].forEach(b => {
    gsap.to(b.sel, {
      scaleY: -0.6,
      svgOrigin: `${b.ox} ${b.oy}`,
      duration: b.dur,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: b.delay
    });
  });

  // Mountain clouds — fade in during forest→mountains transition, then drift freely
  gsap.set(".mountain-cloud-a, .mountain-cloud-b, .mountain-cloud-c, .mountain-cloud-d, .mountain-cloud-e, .mountain-cloud-f", { opacity: 0 });

  // a + b fade in while transitioning from forest
  gsap.to(".mountain-cloud-a, .mountain-cloud-b", { opacity: 1, ease: "none", scrollTrigger: { trigger: ".theme_forest", start: "55% top", end: "bottom top", scrub: 1 } });
  // c + d fade in as mountains enters
  gsap.to(".mountain-cloud-c, .mountain-cloud-d", { opacity: 1, ease: "none", scrollTrigger: { trigger: ".theme_mountains", start: "top 90%", end: "top 50%", scrub: 1 } });
  // e + f fade in mid-section, after birds clear
  gsap.to(".mountain-cloud-e, .mountain-cloud-f", { opacity: 1, ease: "none", scrollTrigger: { trigger: ".theme_mountains", start: "25% top", end: "40% top", scrub: 1 } });

  // Continuous x drift — makes clouds look like they're actually moving across the sky
  gsap.to(".mountain-cloud-a", { x: 260,  duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".mountain-cloud-b", { x: -240, duration: 35, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 8 });
  gsap.to(".mountain-cloud-c", { x: 220,  duration: 28, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
  gsap.to(".mountain-cloud-d", { x: -200, duration: 32, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 12 });
  gsap.to(".mountain-cloud-e", { x: -180, duration: 26, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 6 });
  gsap.to(".mountain-cloud-f", { x: 200,  duration: 29, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });

  // Gentle y bob layered on top for extra life
  gsap.to(".mountain-cloud-a", { y: 22,  duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".mountain-cloud-b", { y: -18, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
  gsap.to(".mountain-cloud-c", { y: 16,  duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  gsap.to(".mountain-cloud-d", { y: -20, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
  gsap.to(".mountain-cloud-e", { y: 20,  duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 5 });
  gsap.to(".mountain-cloud-f", { y: -16, duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 7 });

  // Mountains content blocks pop in after birds/clouds clear
  gsap.utils.toArray(".theme_mountains .layer__content > *").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        scrub: 1.2
      }
    });
  });

  // Mist fades in — forest illustration fades out
  gsap.to(".theme_forest .layer__illustration", {
    opacity: 0.15,
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".theme_forest",
      start: "75% top",
      end: "bottom top",
      scrub: 2
    }
  });

  gsap.to(".theme_forest .layer__background", {
    opacity: 0.85,
    backgroundColor: "#e8f0ed",
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".theme_forest",
      start: "75% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Mountains rise up — triggered on mountains entry, finishes before words appear
  gsap.to(".theme_mountains .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "top 110%",
      end: "20% top",
      scrub: 3
    }
  });

  // Sun rises from below the mountain peaks
  gsap.to(".mountain-sun", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  // Sun drifts down slowly as you scroll — keeps it in view longer (same as horizon)
  gsap.to(".mountain-sun", {
    y: 1200,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "10% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Sun warms from orange to gold as it climbs
  gsap.to("#mountain-sun-circle", {
    attr: { fill: "#FFD166" },
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "15% top",
      end: "50% top",
      scrub: 2
    }
  });

  // ── COAST ─────────────────────────────────────────────────────

  // Mountain sky bleeds to coastal blue
  gsap.to(".theme_mountains", {
    backgroundColor: "#87CEEB",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "70% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Coast sun rises after ocean illustration is in place
  gsap.to(".coast-sun", {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "15% top",
      end: "45% top",
      scrub: 2
    }
  });

  // Ocean illustration rises from below
  gsap.to(".theme_coast .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top bottom",
      end: "top top",
      scrub: 1.5
    }
  });

}
