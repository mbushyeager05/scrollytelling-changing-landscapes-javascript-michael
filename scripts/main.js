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

}
