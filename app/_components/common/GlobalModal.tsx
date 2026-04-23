"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationMs?: number;
  zIndex?: number;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
}

export default function GlobalModal({
  open,
  onClose,
  children,
  animationMs = 250,
  zIndex = 200,
  size = "full",
  width,
}: Props) {
  /* -----------------------------------------
   * Scroll lock
   * ----------------------------------------- */
  useEffect(() => {
    const main_content = document.getElementById("__main-content");
    if (!main_content) return;
    const prev = main_content?.style.overflow;

    if (open) main_content.style.overflow = "hidden";
    return () => {
      main_content.style.overflow = prev;
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

  const root = document.getElementById("__modal-root");
  if (!root) return null;

  // Stop event propagation when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }; // Prevent clicks inside modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /* -----------------------------------------
   * WIDTH CALCULATION
   * ----------------------------------------- */
  const computedWidth =
    width ||
    (size === "sm"
      ? "300px"
      : size === "md"
      ? "500px"
      : size === "lg"
      ? "700px"
      : size === "xl"
      ? "900px"
      : size === "full"
      ? "80%"
      : "400px");

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{ zIndex }}
        className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm 
          transition-opacity duration-${animationMs}
          ${open ? "opacity-100" : "opacity-0 "}
          pointer-events-${open ? "auto" : "none"}
        `}
      />

      {/* Modal container */}
      <div
        onClick={onClose}
        style={{ zIndex: zIndex + 1 }}
        className={` 
          absolute inset-0 flex items-center justify-center 
          transition-all duration-${animationMs}
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 "}
        `}
      >
        <div
          onClick={handleModalClick}
          style={{
            width: computedWidth,
            maxHeight: "calc(100vh - 4rem)",
          }}
          className=" bg-white rounded-md pointer-events-auto  shadow-xl flex flex-col"
        >
          {children}
        </div>
      </div>
    </>,
    root
  );
}
