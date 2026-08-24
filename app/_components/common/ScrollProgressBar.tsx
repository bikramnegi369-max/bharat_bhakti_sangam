"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface ScrollProgressBarProps {
  className?: string;
  height?: number; // in pixels
}

export function ScrollProgressBar({
  className,
  height = 3,
}: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress =
            totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;

          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] pointer-events-none w-full bg-transparent overflow-hidden",
        className,
      )}
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full bg-linear-to-r from-[#D4AF37] via-[#FFD089] to-[#EC5A05] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(212,175,55,0.7)]"
        style={{
          width: `${scrollProgress}%`,
          willChange: "width",
        }}
      />
    </div>
  );
}

export default ScrollProgressBar;
