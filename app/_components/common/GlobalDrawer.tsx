"use client";

import { useMountTransition } from "@/_hooks/useMountTransition";
import { lockBodyScroll, unlockBodyScroll } from "@/_utils/body-scroll-lock";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  animationMs?: number;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
  zIndex?: number;
  disableBackdrop?: boolean; // NEW
}

export default function GlobalDrawer({
  open,
  onClose,
  children,
  animationMs = 300,
  size = "md",
  width,
  zIndex = 40,
  disableBackdrop,
}: Props) {
  const { isMounted, isTransitioning } = useMountTransition(open, animationMs);

  /* -----------------------------------------
   * Scroll Lock
   * ----------------------------------------- */
  useEffect(() => {
    if (open) lockBodyScroll();

    return () => {
      const timeout = setTimeout(() => unlockBodyScroll(), animationMs);
      clearTimeout(timeout);
    };
  }, [open, animationMs]);

  /* -----------------------------------------
   * ESC Key (only for top drawer)
   * ----------------------------------------- */
  useEffect(() => {
    if (!open || !onClose) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const root = document.getElementById("__drawer-root");
  if (!root || !isMounted) return null;

  /* -----------------------------------------
   * WIDTH CALCULATION
   * ----------------------------------------- */
  const computedWidth =
    width ||
    (size === "sm"
      ? "300px"
      : size === "md"
        ? "400px"
        : size === "lg"
          ? "500px"
          : size === "xl"
            ? "80%"
            : size === "full"
              ? "100%"
              : "400px");

  return createPortal(
    <>
      {/* -------------- Backdrop -------------- */}
      <div
        onClick={disableBackdrop ? undefined : onClose}
        style={{ zIndex }}
        className={`
    absolute inset-0 bg-black/40 backdrop-blur-sm
    transition-opacity duration-${animationMs}
    ${isTransitioning ? "opacity-100" : "opacity-0"}
    ${disableBackdrop ? "pointer-events-none" : "pointer-events-auto"}   
  `}
      />

      {/* -------------- Drawer -------------- */}
      <aside
        style={{ width: computedWidth, zIndex: zIndex + 1 }}
        className={`
          absolute top-0 right-0 h-dvh bg-white shadow-xl
          transition-transform duration-${animationMs} ease-in-out
          transform-gpu will-change-transform
          ${isTransitioning ? "translate-x-0" : "translate-x-full"}
          pointer-events-auto
        `}
      >
        {onClose && (
          <button
            className="absolute top-0 -left-10.5 bg-primary cursor-pointer px-4 py-2 text-black rounded-l-full"
            onClick={onClose}
          >
            X
          </button>
        )}

        {children}
      </aside>
    </>,
    root,
  );
}
