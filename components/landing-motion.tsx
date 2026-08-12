"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({ children }: Readonly<{ children: React.ReactNode }>) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from("[data-hero-art]", { autoAlpha: 0, scale: 1.012, duration: 1.1 })
        .from("[data-hero-kicker], [data-hero-title], [data-hero-copy], [data-hero-actions]", { autoAlpha: 0, y: 20, duration: .75, stagger: .09 }, "<.12")
        .from(".terrain-chip, .hero-system-label, .terrain-node", { autoAlpha: 0, scale: .75, duration: .5, stagger: .045 }, "<.28");

      gsap.utils.toArray<SVGPathElement>(".terrain-line, .terrain-route, .architecture-route, .trace-path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: .25 });
      });

      gsap.to(".terrain-node, .architecture-node, .topology-nodes circle, .system-node", { scale: 1.35, autoAlpha: .72, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: .09, from: "random" }, transformOrigin: "50% 50%" });
      gsap.to("[data-ambient]", { xPercent: 5, yPercent: -4, autoAlpha: .7, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 1.1 });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { autoAlpha: 0, y: 24, duration: .76, ease: "power3.out", scrollTrigger: { trigger: element, start: "clamp(top 88%)", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, { autoAlpha: 0, y: 17, duration: .58, ease: "power3.out", stagger: .07, scrollTrigger: { trigger: group, start: "clamp(top 88%)", once: true } });
      });
      gsap.from("[data-mosaic] > *", { autoAlpha: 0, y: 20, duration: .68, ease: "power3.out", stagger: .075, scrollTrigger: { trigger: "[data-mosaic]", start: "clamp(top 84%)", once: true } });
      gsap.fromTo("[data-timeline-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 72%", end: "bottom 35%", scrub: .65 } });

      gsap.from(".topology-edges line", { strokeDasharray: 420, strokeDashoffset: 420, duration: 1, stagger: .025, ease: "none", scrollTrigger: { trigger: "[data-transition-section]", start: "top 68%", end: "center center", scrub: .7 } });
      gsap.from(".topology-nodes circle", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%", duration: .55, stagger: .04, scrollTrigger: { trigger: "[data-transition-section]", start: "top 58%", once: true } });
    });

    media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current?.querySelector<HTMLElement>("[data-ownership-track]");
      const stage = root.current?.querySelector<HTMLElement>("[data-ownership-stage]");
      if (track && stage) {
        const horizontalDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        gsap.to(track, { x: () => -horizontalDistance(), ease: "none", scrollTrigger: { trigger: "[data-ownership-section]", start: "top top", end: () => `+=${Math.max(horizontalDistance(), 900)}`, scrub: .7, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      }

      gsap.to(".hero-terrain", { yPercent: 9, ease: "none", scrollTrigger: { trigger: "[data-hero-section]", start: "top top", end: "bottom top", scrub: .6 } });
      gsap.to("[data-architecture-art] .architecture-flow", { yPercent: -5, ease: "none", scrollTrigger: { trigger: "[data-architecture-art]", start: "top bottom", end: "bottom top", scrub: .65 } });
      gsap.to("[data-product-window]", { y: -18, ease: "none", scrollTrigger: { trigger: "[data-platform-section]", start: "top bottom", end: "bottom top", scrub: .65 } });
    });

    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
