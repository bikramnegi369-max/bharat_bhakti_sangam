"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { lockBodyScroll, unlockBodyScroll } from "@/_utils/body-scroll-lock";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationMs?: number;
  zIndex?: number;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
}

const emptySubscribe = () => () => {};

export default function GlobalModal({
  open,
  onClose,
  children,
  animationMs = 250,
  zIndex = 200,
  size = "full",
  width,
}: Props) {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  /* -----------------------------------------
   * Bulletproof Scroll lock
   * ----------------------------------------- */
  useEffect(() => {
    if (!open) return;

    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [open]);

  /* -----------------------------------------
   * Escape close
   * ----------------------------------------- */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const root =
    typeof document !== "undefined"
      ? document.getElementById("__modal-root") || document.body
      : null;
  if (!root) return null;

  // Stop event propagation when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /* -----------------------------------------
   * WIDTH CALCULATION
   * ----------------------------------------- */
  const computedWidth =
    width ||
    (size === "sm"
      ? "360px"
      : size === "md"
      ? "520px"
      : size === "lg"
      ? "720px"
      : size === "xl"
      ? "920px"
      : size === "full"
      ? "min(92vw, 1100px)"
      : "520px");

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      style={{ zIndex }}
      className={`
        fixed inset-0 flex items-center justify-center p-3 sm:p-5 md:p-6
        transition-all duration-${animationMs} select-none overscroll-none
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={handleBackdropClick}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-${animationMs}
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Modal container card */}
      <div
        onClick={handleModalClick}
        style={{
          width: computedWidth,
          maxHeight: "min(90vh, calc(100svh - 3rem))",
        }}
        className={` 
          relative bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
          transition-all duration-${animationMs} my-auto overscroll-contain
          ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}
        `}
      >
        {children}
      </div>
    </div>,
    root,
  );
}

