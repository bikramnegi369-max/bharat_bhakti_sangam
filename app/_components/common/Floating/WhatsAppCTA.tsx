"use client";

import { FLOATING_CONFIG } from "@/_lib/constants/floating.constants";
import clsx from "clsx";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppCTA() {
  if (!FLOATING_CONFIG.whatsapp.enabled) return null;

  const url = `https://wa.me/${FLOATING_CONFIG.whatsapp.number}?text=${encodeURIComponent(
    FLOATING_CONFIG.whatsapp.message,
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={clsx(
        "fixed z-50",
        "right-5 bottom-[calc(env(safe-area-inset-bottom)+16px)]",
        "flex items-center justify-center",
        "w-16 h-16 sm:w-20 sm:h-20",
        "rounded-full bg-[#25D366]",
        "shadow-xl",
        "transition-transform duration-200",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-green-300",
      )}
    >
      {/* Subtle single pulse */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />

      {/* Icon (proper spacing) */}
      <WhatsAppIcon className="w-7 h-7 sm:w-9 sm:h-9 text-white relative z-10" />
    </a>
  );
}
