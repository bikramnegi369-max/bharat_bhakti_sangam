"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className={clsx(
        "group relative flex items-center justify-center",
        "w-11 h-11 sm:w-12 sm:h-12",
        "rounded-full bg-white border border-[#740E0A]/20 shadow-[0_4px_16px_rgba(116,14,10,0.15)]",
        "text-[#740E0A] hover:bg-[#740E0A] hover:text-white",
        "transition-all duration-300 transform-gpu cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-[#740E0A]/40 focus:ring-offset-2",
        "hover:scale-105 active:scale-95",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
