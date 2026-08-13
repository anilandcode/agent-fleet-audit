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

    media.add({
      allowMotion: "(prefers-reduced-motion: no-preference)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { allowMotion } = context.conditions as { allowMotion: boolean; reduceMotion: boolean };
      if (!allowMotion) {
        gsap.set("[data-reveal], [data-stagger] > *, [data-mosaic] > *, [data-architecture-board] > *, [data-header-progress]", { clearProps: "all" });
        gsap.set("[data-timeline-line]", { scaleY: 1, transformOrigin: "top" });
        return;
      }

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.from("[data-hero-art]", { autoAlpha: 0, scale: 1.012, duration: 1.1 })
        .from("[data-hero-kicker], [data-hero-title], [data-hero-copy], [data-hero-actions]", { autoAlpha: 0, y: 20, duration: .75, stagger: .09 }, "<.12")
        .from("[data-capability-rail] > *", { autoAlpha: 0, y: 8, duration: .45, stagger: .045 }, "<.18");

      gsap.utils.toArray<SVGPathElement>(".architecture-route").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: .25 });
      });

      gsap.to(".architecture-node", { scale: 1.35, autoAlpha: .72, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: .09, from: "random" }, transformOrigin: "50% 50%" });
      gsap.to("[data-ambient]", { xPercent: 5, yPercent: -4, autoAlpha: .7, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 1.1 });
      gsap.fromTo("[data-header-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-site-canvas]", start: "top top", end: "bottom bottom", scrub: .2 } });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { autoAlpha: 0, y: 24, duration: .76, ease: "power3.out", scrollTrigger: { trigger: element, start: "clamp(top 88%)", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = Array.from(group.children).filter((child) => !child.hasAttribute("data-motion-owned"));
        gsap.from(children, { autoAlpha: 0, y: 17, duration: .58, ease: "power3.out", stagger: .07, scrollTrigger: { trigger: group, start: "clamp(top 88%)", once: true } });
      });
      gsap.from("[data-mosaic] > *", { autoAlpha: 0, y: 20, duration: .68, ease: "power3.out", stagger: .075, scrollTrigger: { trigger: "[data-mosaic]", start: "clamp(top 84%)", once: true } });
      gsap.from("[data-architecture-board] .architecture-panel", { autoAlpha: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: "[data-architecture-board]", start: "top 76%", once: true } });
      gsap.fromTo("[data-timeline-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 72%", end: "bottom 35%", scrub: .65 } });
      gsap.from(".transition-quantum", { autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: "[data-transition-section]", start: "top 62%", once: true } });
      gsap.from("[data-owned-topology] .owned-tag", { autoAlpha: 0, scale: .88, duration: .55, stagger: .06, scrollTrigger: { trigger: "[data-owned-topology]", start: "top 70%", once: true } });
      gsap.from(".brand-scene picture", { autoAlpha: 0, duration: .95, stagger: .08, scrollTrigger: { trigger: ".brand-world", start: "top 76%", once: true } });
    });

    media.add({
      desktop: "(min-width: 900px)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      const { desktop, allowMotion } = context.conditions as { desktop: boolean; allowMotion: boolean };
      if (!desktop || !allowMotion) return;

      const track = root.current?.querySelector<HTMLElement>("[data-ownership-track]");
      const stage = root.current?.querySelector<HTMLElement>("[data-ownership-stage]");
      if (track && stage) {
        const horizontalDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        gsap.to(track, {
          x: () => -horizontalDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-ownership-section]",
            start: "top top",
            end: () => `+=${Math.max(horizontalDistance(), 720)}`,
            scrub: .7,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

    });

    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => { active = false; media.revert(); };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
