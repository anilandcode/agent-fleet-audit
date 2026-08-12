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
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from("[data-hero-kicker], [data-hero-title], [data-hero-copy], [data-hero-actions]", {
          autoAlpha: 0,
          y: 22,
          duration: 0.82,
          stagger: 0.1,
        })
        .from("[data-hero-art]", { autoAlpha: 0, scale: 1.035, x: 28, duration: 1.22 }, "<0.12")
        .from("[data-hero-art] .system-tag, [data-hero-art] .system-node", {
          autoAlpha: 0,
          scale: .8,
          duration: .54,
          stagger: .06,
        }, "<0.42");

      gsap.utils.toArray<SVGPathElement>(".trace-path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0,
          duration: 1.45,
          ease: "power2.inOut",
          delay: .35,
        });
      });

      gsap.to("[data-core], [data-platform-core]", {
        scale: 1.045,
        autoAlpha: .82,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 50%",
      });

      gsap.to("[data-ambient]", {
        xPercent: 6,
        yPercent: -5,
        autoAlpha: .72,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 1.2, from: "random" },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 22,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          y: 18,
          duration: 0.58,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      gsap.fromTo("[data-timeline-line]", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-timeline]", start: "top 72%", end: "bottom 34%", scrub: .65 },
      });
    });

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to("[data-hero-art]", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero-section]", start: "top top", end: "bottom top", scrub: 0.55 },
      });
      gsap.to("[data-platform-art]", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: "[data-platform-section]", start: "top bottom", end: "bottom top", scrub: 0.65 },
      });
      gsap.utils.toArray<HTMLElement>("[data-story-stack] .story-card").forEach((card, index) => {
        gsap.to(card, {
          y: index === 0 ? -28 : index === 1 ? -16 : 12,
          ease: "none",
          scrollTrigger: { trigger: "[data-story-section]", start: "top bottom", end: "bottom top", scrub: .8 },
        });
      });
    });

    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });

    return () => { active = false; media.revert(); };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
