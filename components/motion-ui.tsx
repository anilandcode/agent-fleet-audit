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

type MotionAnchorProps = Omit<HTMLMotionProps<"a">, "children"> & { children: ReactNode };

export function MotionAnchor({ children, className, ...props }: MotionAnchorProps) {
  return <m.a
    className={className}
    initial="idle"
    whileHover="hover"
    whileTap={{ scale: .975 }}
    variants={{ idle: { y: 0 }, hover: { y: -2 } }}
    transition={{ type: "spring", stiffness: 380, damping: 26 }}
    {...props}
  >{children}</m.a>;
}

type MotionCardProps = HTMLMotionProps<"article">;

export function MotionCard({ children, className, ...props }: MotionCardProps) {
  return <m.article
    data-motion-owned=""
    className={className}
    {...props}
  >{children}</m.article>;
}
