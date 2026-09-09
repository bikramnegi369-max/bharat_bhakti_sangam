"use client";

import Link from "next/link";
import { Mail, Phone, Sparkles, ArrowRight, Radio } from "lucide-react";
import { Marquee } from "../../ui/Marquee/Marquee";
import { LiveEventData, useLiveStatus } from "@/_hooks/useLiveStatus";

export default function NavbarMarqueeBar({
  event,
}: {
  event: LiveEventData | null;
}) {
  const { isLive, liveStreamUrl } = useLiveStatus(event);

  if (!isLive) {
    return null;
  }

  return (
    <aside
      aria-label="Announcements and Quick Contact"
      className="relative z-40 w-full bg-linear-to-r from-[#2a0302] via-[#3a0605] to-[#2a0302] text-white/90 border-b border-gold/20 shadow-xs backdrop-blur-xs select-none"
    >
      <Marquee
        speed={32}
        gap={0}
        fadeEdges={true}
        className="py-1.5 sm:py-2 text-[11.5px] sm:text-xs tracking-wide"
        items={[
          {
            id: "tagline-item",
            content: (
              <div className="flex items-center px-6 sm:px-8">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-linear-to-r from-gold/15 via-orange/10 to-gold/15 border border-gold/30 text-amber-100 shadow-xs">
                  <span className="text-gold font-serif font-bold text-sm leading-none drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                    ॐ
                  </span>
                  <span className="italic font-medium tracking-wider text-white/95 text-[11.5px] sm:text-[12.5px]">
                    Where Devotion Becomes Celebration
                  </span>
                </div>

                <div className="mx-6 flex items-center gap-1 text-gold/40">
                  <Sparkles className="w-3 h-3 text-gold/60" />
                </div>
              </div>
            ),
          },
          {
            id: "contact-phone-item",
            content: (
              <div className="flex items-center px-6 sm:px-8">
                <a
                  href="tel:+918796086743"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors duration-150 py-0.5"
                >
                  <span className="p-1 rounded-full bg-white/5 border border-white/10 text-gold shrink-0">
                    <Phone className="w-3 h-3" />
                  </span>
                  <span className="text-white/60 font-medium">Helpline:</span>
                  <span className="font-semibold tracking-wider text-white hover:underline">
                    +91 8796086743
                  </span>
                </a>

                <div className="mx-6 flex items-center gap-1 text-gold/40">
                  <Sparkles className="w-3 h-3 text-gold/60" />
                </div>
              </div>
            ),
          },
          {
            id: "contact-email-item",
            content: (
              <div className="flex items-center px-6 sm:px-8">
                <a
                  href="mailto:contact@bharatbhaktisangam.com"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors duration-150 py-0.5"
                >
                  <span className="p-1 rounded-full bg-white/5 border border-white/10 text-gold shrink-0">
                    <Mail className="w-3 h-3" />
                  </span>
                  <span className="text-white/60 font-medium">Inquiries:</span>
                  <span className="font-semibold text-white hover:underline lowercase">
                    contact@bharatbhaktisangam.com
                  </span>
                </a>

                <div className="mx-6 flex items-center gap-1 text-gold/40">
                  <Sparkles className="w-3 h-3 text-gold/60" />
                </div>
              </div>
            ),
          },
          {
            id: "live-stream-item",
            content: (
              <div className="flex items-center px-6 sm:px-8">
                <Link
                  href={liveStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white transition-all duration-200"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <Radio className="w-3 h-3 text-red-400" />
                  <span className="font-semibold uppercase tracking-wider text-[10.5px] sm:text-[11px] text-white">
                    Event Live Now
                  </span>
                  <ArrowRight className="w-3 h-3 text-red-400" />
                </Link>

                <div className="mx-6 flex items-center gap-1 text-gold/40">
                  <Sparkles className="w-3 h-3 text-gold/60" />
                </div>
              </div>
            ),
          },
        ]}
      />
    </aside>
  );
}
