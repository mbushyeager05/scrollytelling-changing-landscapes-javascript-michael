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
  gsap.set(".coast-sun", { opacity: 0 });
  gsap.set(".theme_coast .layer__background", { backgroundColor: "transparent" });
  gsap.set(".coast-cloud-a, .coast-cloud-b, .coast-cloud-c, .coast-cloud-d, .coast-cloud-e, .coast-cloud-f, .coast-cloud-g, .coast-cloud-h, .coast-cloud-i, .coast-cloud-j", { opacity: 0 });
  gsap.set(".birds-container", { opacity: 0, x: -100 });
  gsap.set(".theme_mountains .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".mountain-sun", { opacity: 0, scale: 0.7, y: 300, transformOrigin: "50% 50%" });
  gsap.set(".theme_desert .layer__background", { background: "linear-gradient(180deg, #E8C08A 0%, #D4956E 30%, #B8714A 55%, #8B5A3A 80%, #5B3A29 100%)" });
  gsap.set(".theme_desert .layer__illustration", { yPercent: 100 });
  gsap.set(".coast-flash-overlay", { opacity: 0, backgroundColor: "#D4956E" });
  gsap.set(".desert-content--entry", { opacity: 0, y: 40 });
  gsap.set(".desert-content--pin", { opacity: 0, y: 60 });
  gsap.set(".desert-hand", { opacity: 0 });
  gsap.set("#compass-svg", { opacity: 0, rotation: -120, transformOrigin: "50% 50%" });
  gsap.set(".desert-cactus", { opacity: 0 });
  gsap.set(".theme_cave .layer__illustration", { opacity: 0 });
  gsap.set(".theme_cave .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".theme_nightsky .layer__background", { background: "linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 30%, #1a1a3a 60%, #2a2a5a 100%)" });
  gsap.set(".theme_nightsky .layer__illustration", { yPercent: 100, opacity: 0 });
  gsap.set(".theme_nightsky .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".aurora", { opacity: 0 });
  gsap.set(".theme_journey .layer__illustration", { yPercent: 100, opacity: 0 });
  gsap.set(".theme_journey .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".journey-sun", { opacity: 0, y: 400, scale: 0.6, transformOrigin: "50% 50%" });
  gsap.set(".journey-cloud", { opacity: 0 });
  gsap.set(".theme_journey .layer__background", { background: "transparent" });

  // ── TRAFFIC LIGHT ───────────────────────────────────────────
  const OFF  = "#0B0E13";
  const tl_light = gsap.timeline({ repeat: -1 });
  // Red phase (3s)
  tl_light
    .set("#traffic-red",    { attr: { fill: "#FB2D00" } })
    .set("#traffic-yellow", { attr: { fill: OFF } })
    .set("#traffic-green",  { attr: { fill: OFF } })
    .to({}, { duration: 3 })
    // Red + Yellow briefly
    .to("#traffic-yellow", { attr: { fill: "#FFD700" }, duration: 0.4 })
    .to({}, { duration: 0.8 })
    // Switch to Green
    .to("#traffic-red",    { attr: { fill: OFF },       duration: 0.4 })
    .to("#traffic-yellow", { attr: { fill: OFF },       duration: 0.4 }, "<")
    .to("#traffic-green",  { attr: { fill: "#00CC44" }, duration: 0.4 }, "<")
    // Green phase (3s)
    .to({}, { duration: 3 })
    // Yellow only
    .to("#traffic-green",  { attr: { fill: OFF },       duration: 0.4 })
    .to("#traffic-yellow", { attr: { fill: "#FFD700" }, duration: 0.4 }, "<")
    .to({}, { duration: 1 })
    // Back to Red
    .to("#traffic-yellow", { attr: { fill: OFF },       duration: 0.4 })
    .to("#traffic-red",    { attr: { fill: "#FB2D00" }, duration: 0.4 }, "<");

  // ── CITY HUMANS WALKING ─────────────────────────────────────
  // humans--1: slow walkers
  gsap.to(".city-humans--1", {
    x: 40, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut"
  });
  gsap.to(".city-humans--1", {
    y: -6, duration: 0.45, repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  // humans--2: fast walkers
  gsap.to(".city-humans--2", {
    x: -120, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4
  });
  gsap.to(".city-humans--2", {
    y: -8, duration: 0.22, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1
  });

  // humans--3: medium-fast walkers
  gsap.to(".city-humans--3", {
    x: 80, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.0
  });
  gsap.to(".city-humans--3", {
    y: -7, duration: 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2
  });

  // ── HORIZON ─────────────────────────────────────────────────

  // 1. Page load intro timeline — plays automatically before scroll
  gsap.timeline({
    delay: 0.4,
    onComplete: () => {
      gsap.to(".horizon-hero", {
        y: -20,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  })
    .to(".sun", { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power2.out" })
    .to(".theme_horizon__title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.6")
    .to(".theme_horizon__subtitle", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.5")
    .to(".scroll-prompt", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");

  // 2. Master pinned timeline — section locks in place while sequence plays
  const horizonPin = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_horizon",
      start: "top top",
      end: "+=4000",
      pin: true,
      scrub: 1.5,
      anticipatePin: 1
    }
  });

  // Step 1 — Scroll prompt fades out
  horizonPin.to(".scroll-prompt", {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in"
  });

  // Step 2 — Title and subtitle float upward and fade out
  horizonPin.to(".theme_horizon__title", {
    y: -120,
    opacity: 0,
    duration: 2,
    ease: "power1.inOut"
  }, "<0.2");

  horizonPin.to(".theme_horizon__subtitle", {
    y: -80,
    opacity: 0,
    duration: 1.8,
    ease: "power1.inOut"
  }, "<0.1");

  // Step 3 — Clouds drift outward left and right simultaneously
  horizonPin.to(".cloud-a", { x: -500, duration: 2, ease: "power1.inOut" }, "<0.3");
  horizonPin.to(".cloud-b", { x:  480, duration: 2, ease: "power1.inOut" }, "<");
  horizonPin.to(".cloud-c", { x: -420, duration: 2.2, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-d", { x:  550, duration: 2.4, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-e", { x: -500, duration: 2.2, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-f", { x:  460, duration: 2, ease: "power1.inOut" }, "<0.2");
  horizonPin.to(".cloud-g", { x: -520, duration: 2.4, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-h", { x:  440, duration: 2, ease: "power1.inOut" }, "<0.2");
  horizonPin.to(".cloud-i", { x:  480, duration: 2.2, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-j", { x: -460, duration: 2, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-k", { x:  500, duration: 2.4, ease: "power1.inOut" }, "<0.1");
  horizonPin.to(".cloud-l", { x: -440, duration: 2, ease: "power1.inOut" }, "<0.2");

  // Step 4 — Sun drifts downward as sky darkens
  horizonPin.to(".sun", {
    y: 1800,
    duration: 4,
    ease: "none"
  }, "<0.5");

  // Step 5 — Sun color shifts to dark red as it sets
  horizonPin.to("#sun-circle", {
    attr: { fill: "#5C1010" },
    duration: 2,
    ease: "none"
  }, "<1");

  // Step 6 — Sun fades out completely
  horizonPin.to(".sun", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.in"
  }, "<0.5");

  // Step 7 — Night overlay darkens sky fully to match city (#1a1a2e)
  horizonPin.to(".horizon-night-overlay", {
    opacity: 1,
    duration: 2.5,
    ease: "power1.inOut"
  }, "<0.3");

  // Step 8 — Content block fades in before section unpins
  horizonPin.to(".theme_horizon .content-block--left", {
    opacity: 1,
    duration: 1.5,
    ease: "power2.out"
  }, "<0.5");

  // 3. Ambient cloud drift — runs continuously layered on top
  gsap.to(".cloud-a", { x: "+=120", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cloud-b", { x: "-=140", duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cloud-c", { x: "+=100", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  gsap.to(".cloud-d", { x: "-=130", duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
  gsap.to(".cloud-e", { x: "+=110", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".cloud-f", { x: "-=120", duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
  gsap.to(".cloud-g", { x: "+=130", duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 5 });
  gsap.to(".cloud-h", { x: "-=100", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
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

  // Forest illustration rises up as city scrolls out
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

  // Forest content blocks start hidden
  gsap.set(".theme_forest .layer__content > *", { opacity: 0, y: 60 });

  // Forest content blocks slide in before pin starts
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

  // Bigfoot starts off the left edge completely hidden
  gsap.set(".forest-bigfoot", { x: "-130%", opacity: 1 });

  // Master pinned timeline — forest locks while Bigfoot sequence plays
  const forestPin = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_forest",
      start: "bottom bottom",
      end: "+=3500",
      pin: true,
      scrub: 2,
      anticipatePin: 1
    }
  });

  // Step 1 — Bigfoot slowly creeps in from the left — massive and deliberate
  forestPin.to(".forest-bigfoot", {
    x: "80%",
    duration: 3,
    ease: "power1.inOut"
  });

  // Step 2 — Bigfoot slows to a stop center screen — holds for a beat
  forestPin.to(".forest-bigfoot", {
    x: "120%",
    duration: 1.5,
    ease: "power2.out"
  });

  // Step 3 — Bigfoot pauses — nothing moves — the forest goes still
  forestPin.to({}, { duration: 1.5 });

  // Step 4 — Bigfoot slowly turns and walks off to the right
  forestPin.to(".forest-bigfoot", {
    x: "820%",
    duration: 3,
    ease: "power1.in"
  });


  // Mist fades in as forest transitions to mountains — after pin releases
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

  // Forest fades out entirely as mountains bleed through
  gsap.to(".theme_forest", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_forest",
      start: "75% top",
      end: "bottom top",
      scrub: 2
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

  // Forest fades out entirely — coast section bleeds through from behind
  gsap.to(".theme_forest", {
    opacity: 0,
    ease: "none",
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

  // Sun rises then drifts — single scrubbed timeline eliminates y conflict
  const mountainSunTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "top 90%",
      end: "bottom top",
      scrub: 2
    }
  });
  mountainSunTl
    .to(".mountain-sun", { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 1.5 })
    .to(".mountain-sun", { y: 1200, ease: "none", duration: 4 }, "<0.8");

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

  // ── COAST WAVES ───────────────────────────────────────────────
  gsap.to(".wave--back", {
    attr: { d: "M0 200 C 180 140, 360 260, 540 200 C 720 140, 900 260, 1080 200 C 1260 140, 1350 220, 1440 200 L1440 320 L0 320 Z" },
    duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut"
  });
  gsap.to(".wave--mid", {
    attr: { d: "M0 215 C 200 155, 400 275, 600 215 C 800 155, 1000 275, 1200 215 C 1320 175, 1390 235, 1440 215 L1440 320 L0 320 Z" },
    duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5
  });
  gsap.to(".wave--front", {
    attr: { d: "M0 235 C 160 175, 320 295, 480 235 C 640 175, 800 295, 960 235 C 1120 175, 1300 265, 1440 235 L1440 320 L0 320 Z" },
    duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.9
  });
  gsap.to(".wave--foam", {
    attr: { d: "M0 245 C 120 230, 240 260, 360 245 C 480 230, 600 260, 720 245 C 840 230, 960 260, 1080 245 C 1200 230, 1320 255, 1440 245" },
    duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3
  });

  // ── COAST AIRPLANES ───────────────────────────────────────────

  // All three planes start off the left edge completely hidden
  gsap.set(".coast-airplane--1", { x: "-120%", opacity: 1 });
  gsap.set(".coast-airplane--2", { x: "-120%", opacity: 1 });
  gsap.set(".coast-airplane--3", { x: "-120%", opacity: 1 });

  // Master pinned timeline — coast locks while airplanes fly through
  const coastPin = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: 2,
      anticipatePin: 1
    }
  });

  // Step 1 — Coast settles, brief pause before planes
  coastPin.to({}, { duration: 0.8 });

  // Step 2 — Plane 1 flies across completely before next one appears
  coastPin.to(".coast-airplane--1", {
    x: 2800,
    duration: 5,
    ease: "none"
  });

  // Step 3 — Brief gap then plane 2 enters
  coastPin.to({}, { duration: 0.8 });
  coastPin.to(".coast-airplane--2", {
    x: 2800,
    duration: 5,
    ease: "none"
  });

  // Step 4 — Brief gap then plane 3 enters
  coastPin.to({}, { duration: 0.8 });
  coastPin.to(".coast-airplane--3", {
    x: 2800,
    duration: 5,
    ease: "none"
  });

  // Step 5 — Hold for a beat after all planes have cleared
  coastPin.to({}, { duration: 1.2 });

  // Step 6 — Waves react — swell slightly as if from jet wash
  coastPin.to(".wave--front", {
    attr: { d: "M0 210 C 160 140, 320 270, 480 210 C 640 140, 800 270, 960 210 C 1120 140, 1300 230, 1440 210 L1440 320 L0 320 Z" },
    duration: 0.8,
    ease: "power2.out"
  }, "<0.4");

  coastPin.to(".wave--front", {
    attr: { d: "M0 220 C 160 160, 320 280, 480 220 C 640 160, 800 280, 960 220 C 1120 160, 1300 250, 1440 220 L1440 320 L0 320 Z" },
    duration: 1.2,
    ease: "power2.inOut"
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

  // Mountains fade out — coast section bleeds through from behind
  gsap.to(".theme_mountains", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_mountains",
      start: "75% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Single timeline owns all y movement — rise then drift, no competing tweens
  gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top 90%",
      end: "bottom top",
      scrub: 2
    }
  })
    .fromTo(".coast-sun", { y: 800 }, { y: 0, ease: "power2.out", duration: 1 })
    .to(".coast-sun", { y: 1600, ease: "none", duration: 4 });

  // Opacity: fade in during rise
  gsap.to(".coast-sun", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top 90%",
      end: "22% top",
      scrub: 2
    }
  });

  // Opacity: fade out as sun sets
  gsap.to(".coast-sun", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "52% top",
      end: "78% top",
      scrub: 2
    }
  });

  // Sun warms to deep orange/red as it starts setting
  gsap.to("#sun-circle-ocean", {
    attr: { fill: "#5C1010" },
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "30% top",
      end: "65% top",
      scrub: 2
    }
  });

  // Sky warms to golden once sun has risen and starts setting
  gsap.to(".theme_coast .layer__background", {
    backgroundColor: "rgba(255, 160, 40, 0.35)",
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "20% top",
      end: "42% top",
      scrub: 2
    }
  });

  // Deepens to rich amber/orange as sun sets further
  gsap.to(".theme_coast .layer__background", {
    backgroundColor: "rgba(210, 80, 20, 0.5)",
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "42% top",
      end: "62% top",
      scrub: 2
    }
  });

  // Darkens to deep dusk as sun disappears behind ocean
  gsap.to(".theme_coast .layer__background", {
    backgroundColor: "rgba(100, 30, 10, 0.55)",
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "62% top",
      end: "86% top",
      scrub: 2
    }
  });

  // Clouds a+b+d+e pop in first, c+f stagger in mid-section
  gsap.to(".coast-cloud-a, .coast-cloud-b, .coast-cloud-d, .coast-cloud-e", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top 80%",
      end: "12% top",
      scrub: 1
    }
  });
  gsap.to(".coast-cloud-c, .coast-cloud-f", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "18% top",
      end: "30% top",
      scrub: 1
    }
  });

  // Fast x-drift — short durations = quick movement
  gsap.to(".coast-cloud-a", { x:  380, duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".coast-cloud-b", { x: -340, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  gsap.to(".coast-cloud-c", { x:  300, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
  gsap.to(".coast-cloud-d", { x: -360, duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
  gsap.to(".coast-cloud-e", { x:  420, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
  gsap.to(".coast-cloud-f", { x: -280, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.0 });

  // y-bob layered on top
  gsap.to(".coast-cloud-a", { y:  16, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".coast-cloud-b", { y: -14, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
  gsap.to(".coast-cloud-c", { y:  18, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  gsap.to(".coast-cloud-d", { y: -12, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  gsap.to(".coast-cloud-e", { y:  20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
  gsap.to(".coast-cloud-f", { y: -16, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.5 });

  gsap.to(".coast-cloud-g, .coast-cloud-h, .coast-cloud-i, .coast-cloud-j", {
    opacity: 1, ease: "none",
    scrollTrigger: { trigger: ".theme_coast", start: "top 60%", end: "15% top", scrub: 1 }
  });
  gsap.to(".coast-cloud-g", { x:  320, duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });
  gsap.to(".coast-cloud-h", { x: -290, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.0 });
  gsap.to(".coast-cloud-i", { x:  350, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
  gsap.to(".coast-cloud-j", { x: -310, duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
  gsap.to(".coast-cloud-g", { y:  14, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.0 });
  gsap.to(".coast-cloud-h", { y: -12, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
  gsap.to(".coast-cloud-i", { y:  18, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
  gsap.to(".coast-cloud-j", { y: -15, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8 });

  // Ocean rises slowly — gives sun and sky time to show
  gsap.to(".theme_coast .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "top 80%",
      end: "80% top",
      scrub: 8
    }
  });

  // ── COAST → DESERT WAVE TRANSITION ────────────────────────

  // Waves shift to desert background color
  gsap.to(".wave--back",  { attr: { fill: "#8B5A3A" }, ease: "none",
    scrollTrigger: { trigger: ".theme_coast", start: "75% top", end: "95% top", scrub: 2 } });
  gsap.to(".wave--mid",   { attr: { fill: "#B8714A" }, ease: "none",
    scrollTrigger: { trigger: ".theme_coast", start: "75% top", end: "95% top", scrub: 2 } });
  gsap.to(".wave--front", { attr: { fill: "#D4956E" }, ease: "none",
    scrollTrigger: { trigger: ".theme_coast", start: "75% top", end: "95% top", scrub: 2 } });

  // Waves fade out just as desert flash takes over
  gsap.to(".coast-waves", {
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "90% top",
      end: "98% top",
      scrub: 1
    }
  });

  // ── DESERT ─────────────────────────────────────────────────

  // 1. Ocean fades out as heat builds
  gsap.to(".theme_coast .layer__illustration", {
    opacity: 0,
    ease: "power3.in",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "80% top",
      end: "90% top",
      scrub: 0.8
    }
  });

  // 2. Desert sky pops in over everything
  gsap.to(".coast-flash-overlay", {
    opacity: 1,
    ease: "power3.in",
    scrollTrigger: {
      trigger: ".theme_coast",
      start: "85% top",
      end: "bottom top",
      scrub: 0.8
    }
  });

  // 3. Screen burns to white — flash at the peak
  gsap.to(".coast-flash-overlay", {
    backgroundColor: "#FFFFFF",
    ease: "power4.in",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "top 20%",
      end: "top top",
      scrub: 0.8
    }
  });

  // 4. Desert illustration rises up as section enters
  gsap.to(".theme_desert .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "top 110%",
      end: "20% top",
      scrub: 3
    }
  });

  // 5. Flash clears as desert fully reveals
  gsap.to(".coast-flash-overlay", {
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "top top",
      end: "20% top",
      scrub: 1
    }
  });

  // 6. Entry content fades in as section enters (before pin)
  gsap.utils.toArray(".desert-content--entry").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".theme_desert",
        start: "top 80%",
        end: "25% top",
        scrub: 1.5
      },
      delay: i * 0.15
    });
  });

  // 7. Master pinned timeline — desert locks in place while sequence plays
  const desertPin = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "35% top",
      end: "+=4000",
      pin: true,
      scrub: 1.5,
      anticipatePin: 1
    }
  });

  // Step 1 — Cacti fade in one by one from left to right
  desertPin.fromTo(".desert-cactus--4", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
  desertPin.fromTo(".desert-cactus--1", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");
  desertPin.fromTo(".desert-cactus--2", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");
  desertPin.fromTo(".desert-cactus--3", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");
  desertPin.fromTo(".desert-cactus--5", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");

  // Step 2 — Hand rises and compass spins in together
  desertPin.to(".desert-hand", {
    y: -40,
    rotation: 10,
    opacity: 1,
    transformOrigin: "50% 100%",
    duration: 2,
    ease: "power1.inOut"
  }, "<0.8");
  desertPin.fromTo("#compass-svg",
    { rotation: -120, opacity: 0, transformOrigin: "50% 50%" },
    { rotation: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
    "<"
  );

  // Step 4 — Pin content cards slide in after compass reveals
  gsap.utils.toArray(".desert-content--pin").forEach((el, i) => {
    desertPin.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, i === 0 ? "<0.6" : "<0.4");
  });

  // Compass needle spins continuously — independent of pin
  gsap.to("#compass-needle", {
    rotation: 360,
    svgOrigin: "70 70",
    duration: 6,
    repeat: -1,
    ease: "none"
  });

  // Cacti fade out as desert transitions to cave
  gsap.to(".desert-cactus", {
    opacity: 0,
    ease: "power1.in",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "80% top",
      end: "95% top",
      scrub: 4
    }
  });

  // ── CAVE ───────────────────────────────────────────────────

  // 1. Desert illustration drifts down very gradually
  gsap.to(".theme_desert .layer__illustration", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_cave",
      start: "top 60%",
      end: "40% top",
      scrub: 4
    }
  });

  // 2a. Desert gradient fades out — starts earlier and runs longer
  gsap.to(".theme_desert .layer__background", {
    opacity: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "55% top",
      end: "bottom top",
      scrub: 4
    }
  });

  // 2b. Desert background-color slowly bleeds to cave dark
  gsap.to(".theme_desert", {
    backgroundColor: "#0a0a1a",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "55% top",
      end: "bottom top",
      scrub: 4
    }
  });

  // 3. Desert illustration fades out gently
  gsap.to(".theme_desert .layer__illustration", {
    opacity: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".theme_desert",
      start: "65% top",
      end: "bottom top",
      scrub: 4
    }
  });

  // 4. Cave illustration bleeds in gently
  gsap.to(".theme_cave .layer__illustration", {
    opacity: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".theme_cave",
      start: "top 80%",
      end: "35% top",
      scrub: 4
    }
  });

  // 5. Cave content blocks fade in after illustration is visible
  gsap.utils.toArray(".theme_cave .layer__content > *").forEach((el) => {
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

  // ── NIGHT SKY ──────────────────────────────────────────────

  // Create individual star elements programmatically and append to theme_cave layer__background (behind illustration)
  const starContainer = document.querySelector(".theme_cave .layer__background");
  const starCount = 300;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: #ffffff;
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: 0;
    `;
    starContainer.appendChild(star);
    stars.push(star);
  }

  // Stars stagger in through the cave darkness
  gsap.to(stars, {
    opacity: "random(0.4, 1)",
    stagger: {
      amount: 2,
      from: "random"
    },
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".theme_cave",
      start: "65% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Stars twinkle continuously once visible
  stars.forEach((star) => {
    gsap.to(star, {
      opacity: "random(0.1, 1)",
      duration: "random(0.8, 2.5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: "random(0, 3)"
    });
  });

  // Shooting star SVG — created and animated programmatically
  const shootingStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  shootingStar.style.cssText = `
    position: absolute;
    width: 200px;
    height: 3px;
    opacity: 0;
    pointer-events: none;
    overflow: visible;
  `;

  const ssNS = "http://www.w3.org/2000/svg";
  const ssDefs = document.createElementNS(ssNS, "defs");
  const ssGrad = document.createElementNS(ssNS, "linearGradient");
  ssGrad.setAttribute("id", "starTrailGrad");
  ssGrad.setAttribute("x1", "0%"); ssGrad.setAttribute("y1", "0%");
  ssGrad.setAttribute("x2", "100%"); ssGrad.setAttribute("y2", "0%");

  const ss1 = document.createElementNS(ssNS, "stop");
  ss1.setAttribute("offset", "0%"); ss1.setAttribute("stop-color", "#ffffff"); ss1.setAttribute("stop-opacity", "0");
  const ss2 = document.createElementNS(ssNS, "stop");
  ss2.setAttribute("offset", "100%"); ss2.setAttribute("stop-color", "#ffffff"); ss2.setAttribute("stop-opacity", "1");

  ssGrad.appendChild(ss1); ssGrad.appendChild(ss2);
  ssDefs.appendChild(ssGrad);

  const ssTrail = document.createElementNS(ssNS, "rect");
  ssTrail.setAttribute("width", "200"); ssTrail.setAttribute("height", "2");
  ssTrail.setAttribute("y", "0.5"); ssTrail.setAttribute("rx", "1");
  ssTrail.setAttribute("fill", "url(#starTrailGrad)");

  const ssTip = document.createElementNS(ssNS, "circle");
  ssTip.setAttribute("cx", "200"); ssTip.setAttribute("cy", "1.5"); ssTip.setAttribute("r", "2");
  ssTip.setAttribute("fill", "#ffffff");

  shootingStar.appendChild(ssDefs);
  shootingStar.appendChild(ssTrail);
  shootingStar.appendChild(ssTip);
  document.querySelector(".theme_cave .layer__elements").appendChild(shootingStar);

  function fireStar() {
    const topPct  = Math.random() * 55 + 5;
    const leftPct = Math.random() * 50 + 5;
    gsap.set(shootingStar, { top: topPct + "%", left: leftPct + "%", rotation: 20, x: 0, y: 0, opacity: 0 });
    gsap.timeline({ onComplete: () => gsap.delayedCall(Math.random() * 6 + 3, fireStar) })
      .to(shootingStar, { opacity: 1, duration: 0.06, ease: "none" })
      .to(shootingStar, { x: 420, y: 210, ease: "power2.in", duration: 0.65 }, 0)
      .to(shootingStar, { opacity: 0, ease: "power1.in", duration: 0.3 }, 0.35);
  }

  gsap.delayedCall(2, fireStar);

  // ── CAVE TORCH FLAMES ───────────────────────────────────────
  [1, 2, 3].forEach((n, i) => {
    const delay = i * 0.3;
    // Outer flames sway left/right
    gsap.to(`#f0-${n}, #f1-${n}`, {
      scaleX: 0.88, scaleY: 1.06, x: -4,
      duration: 0.55 + i * 0.08, repeat: -1, yoyo: true,
      ease: "sine.inOut", transformOrigin: "50% 100%", delay
    });
    gsap.to(`#f2-${n}, #f3-${n}`, {
      scaleX: 0.92, scaleY: 1.04, x: 3,
      duration: 0.4 + i * 0.06, repeat: -1, yoyo: true,
      ease: "sine.inOut", transformOrigin: "50% 100%", delay: delay + 0.1
    });
    // Inner hotspot flickers
    gsap.to(`#f4-${n}`, {
      scaleY: 0.9, opacity: 0.7,
      duration: 0.25 + i * 0.04, repeat: -1, yoyo: true,
      ease: "power1.inOut", transformOrigin: "50% 100%", delay: delay + 0.05
    });
    // Wisps sway
    gsap.to(`#wl-${n}`, {
      x: -6, opacity: 0.28,
      duration: 0.7 + i * 0.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay
    });
    gsap.to(`#wr-${n}`, {
      x: 6, opacity: 0.22,
      duration: 0.6 + i * 0.09, repeat: -1, yoyo: true, ease: "sine.inOut", delay: delay + 0.15
    });
    gsap.to(`#wc-${n}`, {
      scaleY: 1.08, opacity: 0.5,
      duration: 0.45 + i * 0.07, repeat: -1, yoyo: true, ease: "sine.inOut", delay: delay + 0.08
    });
    // Glow breathes
    gsap.to(`#glw-${n}`, {
      attr: { rx: 118, ry: 130 }, opacity: 0.85,
      duration: 1.1 + i * 0.15, repeat: -1, yoyo: true, ease: "sine.inOut", delay
    });
    // Embers pop in/out randomly
    [`#e0-${n}`,`#e1-${n}`,`#e2-${n}`,`#e3-${n}`,`#e4-${n}`,`#e5-${n}`,`#e6-${n}`].forEach((em, j) => {
      gsap.to(em, {
        opacity: "random(0.6, 1)", y: -(20 + j * 8),
        duration: 0.3 + Math.random() * 0.4, repeat: -1, yoyo: true,
        ease: "power2.out", delay: delay + j * 0.12 + Math.random() * 0.3
      });
    });
  });

  // Entire cave section fades out smoothly — starts at 70% and finishes as cave scrolls off
  gsap.to(".theme_cave", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_cave",
      start: "70% top",
      end: "bottom top",
      scrub: 2
    }
  });

  // Night sky illustration rises up through the stars
  gsap.to(".theme_nightsky .layer__illustration", {
    yPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_nightsky",
      start: "top bottom",
      end: "top top",
      scrub: 1.5
    }
  });

  // Night sky illustration fades in as it rises — stored so we can kill it when pin starts
  const nsIllustrationEntrance = gsap.to(".theme_nightsky .layer__illustration", {
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_nightsky",
      start: "top bottom",
      end: "25% top",
      scrub: 2
    }
  });

  // Night sky content blocks fade in
  gsap.utils.toArray(".theme_nightsky .layer__content > *").forEach((el) => {
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

  // ── NIGHT SKY STARS ────────────────────────────────────────

  // Populate the nightsky section with its own star field
  const nsStarContainer = document.querySelector(".theme_nightsky .layer__background");
  const nsStars = [];

  for (let i = 0; i < 280; i++) {
    const s = document.createElement("div");
    s.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: #ffffff;
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    nsStarContainer.appendChild(s);
    nsStars.push(s);
  }

  // Stars twinkle continuously in the nightsky section
  nsStars.forEach((s) => {
    gsap.to(s, {
      opacity: "random(0.05, 0.9)",
      duration: "random(1.2, 3.5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: "random(0, 4)"
    });
  });

  // Two nightsky shooting stars
  function makeNSStar() {
    const nsSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    nsSVG.style.cssText = `
      position: absolute;
      width: 200px;
      height: 3px;
      opacity: 0;
      pointer-events: none;
      overflow: visible;
    `;
    const nsNS = "http://www.w3.org/2000/svg";
    const nsDefs = document.createElementNS(nsNS, "defs");
    const nsGrad = document.createElementNS(nsNS, "linearGradient");
    const gradId = "nsStarGrad" + Math.floor(Math.random() * 99999);
    nsGrad.setAttribute("id", gradId);
    nsGrad.setAttribute("x1", "0%"); nsGrad.setAttribute("y1", "0%");
    nsGrad.setAttribute("x2", "100%"); nsGrad.setAttribute("y2", "0%");
    const ns1 = document.createElementNS(nsNS, "stop");
    ns1.setAttribute("offset", "0%"); ns1.setAttribute("stop-color", "#ffffff"); ns1.setAttribute("stop-opacity", "0");
    const ns2 = document.createElementNS(nsNS, "stop");
    ns2.setAttribute("offset", "100%"); ns2.setAttribute("stop-color", "#ffffff"); ns2.setAttribute("stop-opacity", "1");
    nsGrad.appendChild(ns1); nsGrad.appendChild(ns2);
    nsDefs.appendChild(nsGrad);
    const nsTrail = document.createElementNS(nsNS, "rect");
    nsTrail.setAttribute("width", "200"); nsTrail.setAttribute("height", "2");
    nsTrail.setAttribute("y", "0.5"); nsTrail.setAttribute("rx", "1");
    nsTrail.setAttribute("fill", `url(#${gradId})`);
    const nsTip = document.createElementNS(nsNS, "circle");
    nsTip.setAttribute("cx", "200"); nsTip.setAttribute("cy", "1.5"); nsTip.setAttribute("r", "2");
    nsTip.setAttribute("fill", "#ffffff");
    nsSVG.appendChild(nsDefs); nsSVG.appendChild(nsTrail); nsSVG.appendChild(nsTip);
    document.querySelector(".theme_nightsky .layer__elements").appendChild(nsSVG);
    return nsSVG;
  }

  const nsStar1 = makeNSStar();
  const nsStar2 = makeNSStar();

  function fireNSStar(el, initialDelay) {
    gsap.delayedCall(initialDelay, function shoot() {
      const tp = Math.random() * 50 + 5;
      const lp = Math.random() * 55 + 5;
      gsap.set(el, { top: tp + "%", left: lp + "%", rotation: 18, x: 0, y: 0, opacity: 0 });
      gsap.timeline({ onComplete: () => gsap.delayedCall(Math.random() * 7 + 4, shoot) })
        .to(el, { opacity: 1, duration: 0.06, ease: "none" })
        .to(el, { x: 400, y: 200, ease: "power2.in", duration: 0.7 }, 0)
        .to(el, { opacity: 0, ease: "power1.in", duration: 0.32 }, 0.38);
    });
  }

  fireNSStar(nsStar1, 1.2);
  fireNSStar(nsStar2, 5.5);

  // ── AURORA BOREALIS ────────────────────────────────────────

  // Aurora fades in as night sky illustration rises
  gsap.to(".aurora", {
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".theme_nightsky",
      start: "15% top",
      end: "35% top",
      scrub: 2
    }
  });

  // Band 1 — slow deep wave, large amplitude
  gsap.to(".aurora-band--1", {
    attr: { d: "M -100 60 C 200 220, 500 -30, 800 150 C 1100 330, 1300 10, 1540 190" },
    duration: 14,
    repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  // Band 2 — medium wave, offset timing
  gsap.to(".aurora-band--2", {
    attr: { d: "M -100 190 C 180 30, 460 310, 760 130 C 1060 -50, 1280 270, 1540 110" },
    duration: 17,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2
  });

  // Band 3 — violet drifts independently
  gsap.to(".aurora-band--3", {
    attr: { d: "M -100 130 C 220 280, 520 -10, 820 190 C 1120 390, 1320 30, 1540 230" },
    duration: 20,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2
  });

  // Band 4 — pink, gentle ripple
  gsap.to(".aurora-band--4", {
    attr: { d: "M -100 130 C 160 240, 440 70, 740 220 C 1040 370, 1260 110, 1540 260" },
    duration: 13,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.5
  });

  // Band 5 — cyan highlight
  gsap.to(".aurora-band--5", {
    attr: { d: "M -100 160 C 240 280, 540 30, 840 210 C 1140 390, 1340 70, 1540 260" },
    duration: 11,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6
  });

  // Band 6 — deep blue, slow drift
  gsap.to(".aurora-band--6", {
    attr: { d: "M -100 140 C 190 280, 480 -10, 780 190 C 1080 390, 1310 70, 1540 250" },
    duration: 18,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8
  });

  // Band 7 — lime green, medium
  gsap.to(".aurora-band--7", {
    attr: { d: "M -100 110 C 210 260, 510 0, 810 170 C 1110 340, 1320 70, 1540 200" },
    duration: 15,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4
  });

  // Band 8 — magenta, slow
  gsap.to(".aurora-band--8", {
    attr: { d: "M -100 170 C 170 310, 460 40, 760 240 C 1060 440, 1280 150, 1540 290" },
    duration: 16,
    repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.8
  });

  // Opacity breathing per band — existing
  gsap.to(".aurora-band--1", { opacity: 0.55, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".aurora-band--2", { opacity: 0.5,  duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  gsap.to(".aurora-band--3", { opacity: 0.45, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
  gsap.to(".aurora-band--4", { opacity: 0.4,  duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
  gsap.to(".aurora-band--5", { opacity: 0.5,  duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
  gsap.to(".aurora-band--6", { opacity: 0.35, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".aurora-band--7", { opacity: 0.4,  duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4.5 });
  gsap.to(".aurora-band--8", { opacity: 0.35, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });

  // New bands — wave animations
  gsap.to(".aurora-band--9", {
    attr: { d: "M -100 130 C 230 280, 530 30, 830 220 C 1130 410, 1350 100, 1540 260" },
    duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4
  });
  gsap.to(".aurora-band--10", {
    attr: { d: "M -100 80 C 200 220, 490 -20, 790 170 C 1090 360, 1310 70, 1540 210" },
    duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.2
  });
  gsap.to(".aurora-band--11", {
    attr: { d: "M -100 145 C 250 285, 550 35, 850 205 C 1150 375, 1345 75, 1540 225" },
    duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.7
  });
  gsap.to(".aurora-band--12", {
    attr: { d: "M -100 120 C 180 260, 470 10, 770 190 C 1070 370, 1300 80, 1540 220" },
    duration: 19, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.3
  });
  gsap.to(".aurora-band--13", {
    attr: { d: "M -100 165 C 215 305, 515 55, 815 235 C 1115 415, 1330 135, 1540 275" },
    duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.9
  });
  gsap.to(".aurora-band--14", {
    attr: { d: "M -100 105 C 200 245, 500 -5, 800 195 C 1100 385, 1320 95, 1540 235" },
    duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4.1
  });

  // New bands — opacity breathing
  gsap.to(".aurora-band--9",  { opacity: 0.35, duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.1 });
  gsap.to(".aurora-band--10", { opacity: 0.3,  duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.7 });
  gsap.to(".aurora-band--11", { opacity: 0.5,  duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
  gsap.to(".aurora-band--12", { opacity: 0.3,  duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.8 });
  gsap.to(".aurora-band--13", { opacity: 0.45, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6 });
  gsap.to(".aurora-band--14", { opacity: 0.4,  duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.9 });

  // Whole aurora breathes
  gsap.to(".aurora", {
    opacity: 0.95,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.5
  });

  // ── NIGHT SKY → JOURNEY PINNED TRANSITION ──────────────────

  // Set journey elements hidden before pin starts
  gsap.set(".journey-sun", { opacity: 0, y: 400, scale: 0.6, transformOrigin: "50% 50%" });
  gsap.set(".journey-cloud", { opacity: 0 });
  gsap.set(".theme_journey .layer__content > *", { opacity: 0, y: 60 });
  gsap.set(".theme_journey .layer__background", { background: "transparent" });

  // Master pinned timeline — night sky locks, dawn breaks around the cliff
  const dawnPin = gsap.timeline({
    scrollTrigger: {
      trigger: ".theme_nightsky",
      start: "40% top",
      end: "+=5000",
      pin: true,
      scrub: 2,
      anticipatePin: 1,
      onEnter: () => {
        if (nsIllustrationEntrance.scrollTrigger) nsIllustrationEntrance.scrollTrigger.kill();
      }
    }
  });

  // Step 1 — Everything fades out slowly leaving just the background
  dawnPin.to(".theme_nightsky .layer__illustration", { opacity: 0, duration: 2, ease: "power1.inOut" });
  dawnPin.to(".theme_nightsky .layer__elements",     { opacity: 0, duration: 2, ease: "power1.inOut" }, "<");
  dawnPin.to(".theme_nightsky .layer__content",      { opacity: 0, duration: 2, ease: "power1.inOut" }, "<");

  // Step 2 — Sky bleeds from deep navy to warm dawn blue — full circle
  dawnPin.to(".theme_nightsky", {
    backgroundColor: "#87CEEB",
    duration: 2.5,
    ease: "power1.inOut"
  }, "<0.5");

  dawnPin.to(".theme_nightsky .layer__background", {
    opacity: 0,
    duration: 2,
    ease: "power1.inOut"
  }, "<");

  // Step 5 — Warm golden dawn gradient bleeds up from the bottom
  dawnPin.to(".theme_journey .layer__background", {
    background: "linear-gradient(180deg, rgba(135,206,235,0) 0%, rgba(220,150,80,0.45) 55%, rgba(184,113,74,0.85) 100%)",
    duration: 2,
    ease: "power2.out"
  }, "<0.8");

  // Step 6 — Journey sun rises from below the cliff
  dawnPin.to(".journey-sun", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 2.5,
    ease: "power2.out"
  }, "<0.4");

  // Step 7 — Journey clouds drift in one by one
  dawnPin.to(".journey-cloud--a", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.6");
  dawnPin.to(".journey-cloud--b", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");
  dawnPin.to(".journey-cloud--c", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");
  dawnPin.to(".journey-cloud--d", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");
  dawnPin.to(".journey-cloud--e", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");
  dawnPin.to(".journey-cloud--f", { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");

  // Step 8 — Journey content fades in — full circle moment
  dawnPin.to(".theme_journey .layer__content > *", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2
  }, "<0.5");

  // Journey sun warms to gold as it climbs
  gsap.to("#journey-sun-circle", {
    attr: { fill: "#FFD166" },
    ease: "none",
    scrollTrigger: {
      trigger: ".theme_journey",
      start: "15% top",
      end: "50% top",
      scrub: 2
    }
  });

  // Journey clouds drift continuously
  gsap.to(".journey-cloud--a", { x:  380, duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".journey-cloud--b", { x: -340, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  gsap.to(".journey-cloud--c", { x:  300, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
  gsap.to(".journey-cloud--d", { x: -360, duration: 6,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
  gsap.to(".journey-cloud--e", { x:  420, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
  gsap.to(".journey-cloud--f", { x: -280, duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.0 });

  gsap.to(".journey-cloud--a", { y:  16, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  gsap.to(".journey-cloud--b", { y: -14, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
  gsap.to(".journey-cloud--c", { y:  18, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  gsap.to(".journey-cloud--d", { y: -12, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  gsap.to(".journey-cloud--e", { y:  20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
  gsap.to(".journey-cloud--f", { y: -16, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.5 });

}

// Back to top — scroll to top then reload to reset all animations
document.getElementById("backToTop").addEventListener("click", () => {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  window.location.reload();
});

// ── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const html     = document.documentElement;
  const btn      = document.getElementById("themeToggle");
  const dropdown = document.getElementById("themeDropdown");
  const label    = document.getElementById("themeLabel");
  const options  = dropdown.querySelectorAll(".theme-select__option");

  const labels = { dark: "🌙 Dark", light: "☀️ Light", os: "💻 OS Theme" };

  function applyTheme(value) {
    if (value === "os") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", value);
    }
    label.textContent = labels[value];
    options.forEach(opt => opt.classList.toggle("is-active", opt.dataset.value === value));
    localStorage.setItem("theme", value);
  }

  // Restore saved theme or default to dark
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  function openDropdown() {
    dropdown.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    options[0].focus();
  }

  // Toggle dropdown open/close
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.contains("is-open") ? closeDropdown() : openDropdown();
  });

  // Keyboard: open dropdown with Enter/Space, close with Escape
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dropdown.classList.contains("is-open") ? closeDropdown() : openDropdown();
    } else if (e.key === "Escape") {
      closeDropdown();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      openDropdown();
    }
  });

  // Option selection — click and keyboard
  options.forEach((opt, i) => {
    opt.setAttribute("tabindex", "-1");
    opt.addEventListener("click", () => {
      applyTheme(opt.dataset.value);
      closeDropdown();
      btn.focus();
    });
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        applyTheme(opt.dataset.value);
        closeDropdown();
        btn.focus();
      } else if (e.key === "Escape") {
        closeDropdown();
        btn.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        options[(i + 1) % options.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        options[(i - 1 + options.length) % options.length].focus();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener("click", () => closeDropdown());
})();
