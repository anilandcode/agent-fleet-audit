"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LandingMotion({ children }: Readonly<{ children: React.ReactNode }>) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-kicker], [data-hero-title], [data-hero-copy], [data-hero-actions]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.1,
      });
      gsap.from("[data-hero-art]", {
        autoAlpha: 0,
        scale: 1.035,
        x: 24,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.12,
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
    });

    return () => media.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
