"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "flip-up"
  | "glow-reveal"
  | "stagger";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number; // 0 to 1
  rootMargin?: string;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 750,
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check for reduced motion preference (CSS media query in globals.css automatically overrides visibility)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Modern IntersectionObserver with GPU-efficient execution
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Map animations to classes
  const animationClass = {
    "fade-up": "scroll-reveal-fade-up",
    "fade-down": "scroll-reveal-fade-down",
    "fade-left": "scroll-reveal-fade-left",
    "fade-right": "scroll-reveal-fade-right",
    "scale-up": "scroll-reveal-scale-up",
    "blur-in": "scroll-reveal-blur-in",
    "flip-up": "scroll-reveal-flip-up",
    "glow-reveal": "scroll-reveal-glow-reveal",
    "stagger": "scroll-stagger-container",
  }[animation];

  const inlineStyles: React.CSSProperties = {
    ...style,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  const isStagger = animation === "stagger";

  return (
    <div
      ref={elementRef}
      style={isStagger ? style : inlineStyles}
      className={clsx(
        !isStagger && "scroll-reveal-base",
        animationClass,
        isVisible && (isStagger ? "scroll-stagger-visible" : "scroll-reveal-visible"),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
