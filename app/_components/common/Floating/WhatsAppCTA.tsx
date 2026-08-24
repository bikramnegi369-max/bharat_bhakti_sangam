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
        "relative",
        "flex items-center justify-center",
        "w-14 h-14 sm:w-16 sm:h-16",
        "rounded-full bg-[#25D366]",
        "shadow-[0_4px_16px_rgba(37,211,102,0.35)]",
        "transition-transform duration-200",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-green-300",
      )}
    >
      {/* Subtle single pulse */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />

      {/* Icon (proper spacing) */}
      <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white relative z-10" />
    </a>
  );
}
