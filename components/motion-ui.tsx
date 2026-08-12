"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user" transition={{ duration: .24, ease: [.22, 1, .36, 1] }}>
      {children}
    </MotionConfig>
  </LazyMotion>;
}

type MotionAnchorProps = Omit<HTMLMotionProps<"a">, "children"> & { arrow?: string; children: ReactNode };

export function MotionAnchor({ children, className, arrow, ...props }: MotionAnchorProps) {
  return <m.a
    className={className}
    initial="idle"
    whileHover="hover"
    whileTap={{ scale: .975 }}
    variants={{ idle: { y: 0 }, hover: { y: -2 } }}
    transition={{ type: "spring", stiffness: 380, damping: 26 }}
    {...props}
  >{children}{arrow && <m.b aria-hidden="true" variants={{ idle: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}>{arrow}</m.b>}</m.a>;
}

type MotionCardProps = HTMLMotionProps<"article">;

export function MotionCard({ children, className, ...props }: MotionCardProps) {
  return <m.article
    data-motion-owned=""
    className={className}
    whileHover={{ y: -5, scale: 1.006 }}
    whileTap={{ scale: .995 }}
    transition={{ type: "spring", stiffness: 260, damping: 28 }}
    {...props}
  >{children}</m.article>;
}
