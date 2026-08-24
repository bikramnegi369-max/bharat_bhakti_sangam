"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Quote, Sparkles, CheckCircle2, Bookmark } from "lucide-react";
import { TimelineNodeItem } from "../types/sanatana.types";

interface SanatanaTimelineCardProps {
  node: TimelineNodeItem;
  isLeftOnDesktop: boolean;
  nodeIndex: number;
}

export function SanatanaTimelineCard({
  node,
  isLeftOnDesktop,
  nodeIndex,
}: SanatanaTimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    const currentEl = cardRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full flex flex-col lg:flex-row items-center justify-between transition-all duration-700 ease-out ${
        isLeftOnDesktop ? "lg:flex-row-reverse" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* 
        Empty spacer column on opposite side on desktop (>=1024px) 
        Takes up exact 42% width so there is a wide 16% central channel
      */}
      <div className="hidden lg:block lg:w-[42%]" />

      {/* 
        DESKTOP (>=1024px) Central Node Connector sitting on center vertical spine
      */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-4 z-30 flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center p-1 rounded-2xl bg-[#FAF7F2] shadow-xs">
          {/* Era Text Pill */}
          <div className="mb-2 px-3.5 py-1 rounded-full bg-[#3F0605] border-2 border-[#D4AF37] shadow-md flex items-center justify-center whitespace-nowrap">
            <span
              className={`${poppins.className} text-[10px] lg:text-[11px] font-bold text-[#FCD34D] tracking-wider uppercase text-center leading-none`}
            >
              {node.periodBadge}
            </span>
          </div>

          {/* Number Circle Badge */}
          <div
            className={`relative w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#740E0A] flex items-center justify-center shadow-lg shadow-[#740E0A]/35 transition-transform duration-500 ${
              isVisible ? "scale-100" : "scale-75"
            }`}
          >
            <div className="w-7.5 h-7.5 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center shadow-inner">
              <span
                className={`${playfair.className} text-xs font-extrabold text-[#740E0A]`}
              >
                {nodeIndex + 1}
              </span>
            </div>
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/60 animate-ping opacity-30" />
          </div>
        </div>
      </div>

      {/* 
        Horizontal golden bridge connector line linking the central spine to the card (desktop >=1024px)
      */}
      <div
        className={`hidden lg:block absolute top-16 z-20 w-[8%] h-0.5 bg-linear-to-r ${
          isLeftOnDesktop
            ? "left-[42%] from-transparent to-[#D4AF37]"
            : "right-[42%] from-[#D4AF37] to-transparent"
        }`}
      />

      {/* 
        MOBILE ONLY (<1024px) Central Node Connector on the middle spine line above card
      */}
      <div className="flex lg:hidden flex-col items-center justify-center mb-4 z-30 pointer-events-none">
        <div className="flex flex-col items-center p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-md">
          {/* Era Text Pill */}
          <div className="mb-1.5 px-3 py-1 rounded-full bg-[#3F0605] border border-[#D4AF37] shadow-xs">
            <span
              className={`${poppins.className} text-[10px] sm:text-xs font-bold text-[#FCD34D] tracking-wider uppercase leading-none`}
            >
              {node.periodBadge}
            </span>
          </div>

          {/* Number Circle Badge */}
          <div className="w-8 h-8 rounded-full bg-[#740E0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
            <span
              className={`${playfair.className} text-xs font-bold text-[#FCD34D]`}
            >
              {nodeIndex + 1}
            </span>
          </div>
        </div>
      </div>

      {/* 
        Timeline Card Body:
        Full width on mobile (<1024px) with crisp framing, and 42% width on desktop.
      */}
      <div className="w-full lg:w-[42%]">
        <div className="group relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-[#D4AF37]/45 hover:border-[#D4AF37] p-4 sm:p-6 lg:p-7 shadow-xl shadow-[#3F0605]/5 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/25 hover:-translate-y-1">
          {/* Card Top Image Header */}
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/30 mb-4 sm:mb-5 bg-[#3F0605]">
            <Image
              src={node.imageUrl}
              alt={node.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Warm Vignette Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#3F0605]/75 via-transparent to-black/20" />

            {/* Floating Category Pill */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#D4AF37]/50 text-[#740E0A] text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-xs">
              <Bookmark className="w-3 h-3 text-[#740E0A]" />
              <span className={poppins.className}>{node.category}</span>
            </div>

            {/* Floating Significance Badge */}
            {node.significanceTag && (
              <div className="absolute bottom-3 right-3 px-2.5 sm:px-3 py-1 rounded-full bg-[#740E0A]/95 backdrop-blur-xs text-[#FCD34D] text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-xs">
                <span className={poppins.className}>
                  {node.significanceTag}
                </span>
              </div>
            )}
          </div>

          {/* Node Sanskrit & Main Title */}
          <div className="flex flex-col mb-3">
            {node.sanskritTitle && (
              <span
                className={`${poppins.className} text-[11px] sm:text-xs font-semibold text-[#C49A45] tracking-widest uppercase mb-1 flex items-center gap-1.5`}
              >
                <Sparkles className="w-3 h-3 text-[#C49A45]" />
                {node.sanskritTitle}
              </span>
            )}
            <h3
              className={`${playfair.className} text-lg sm:text-xl lg:text-2xl font-bold text-[#3F0605] leading-snug group-hover:text-[#740E0A] transition-colors`}
            >
              {node.title}
            </h3>
          </div>

          {/* Core Description */}
          <p
            className={`${poppins.className} text-xs sm:text-sm text-[#5c5c5c] leading-relaxed mb-4 font-normal`}
          >
            {node.description}
          </p>

          {/* Sacred Scripture Quote Block if available */}
          {node.scriptureQuote && (
            <div className="relative p-3 sm:p-4 rounded-xl bg-[#FFF9E6]/80 border-l-3 border-[#D4AF37] mb-4 shadow-2xs">
              <div className="flex items-start gap-2">
                <Quote className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#C49A45] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <p
                    className={`${playfair.className} text-xs sm:text-sm font-semibold text-[#3F0605] italic leading-snug`}
                  >
                    &ldquo;{node.scriptureQuote.verse}&rdquo;
                  </p>
                  <span
                    className={`${poppins.className} text-[10px] sm:text-[11px] text-[#740E0A] font-semibold mt-1`}
                  >
                    — {node.scriptureQuote.source}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Key Principles / Pillars Tags */}
          {node.keyPillars && node.keyPillars.length > 0 && (
            <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-wrap gap-1.5 sm:gap-2">
              {node.keyPillars.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#D4AF37]/30 text-[10px] sm:text-[11px] text-[#3F0605] font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#740E0A] shrink-0" />
                  <span className={poppins.className}>{pillar}</span>
                </div>
              ))}
            </div>
          )}

          {/* Deity / Significance Footer Info */}
          {node.featuredDeityOrAvatar && (
            <div className="mt-3 pt-2.5 flex items-center justify-between text-[11px] text-[#5c5c5c]">
              <span className={`${poppins.className} font-medium`}>
                Central Divine Focus:
              </span>
              <span
                className={`${poppins.className} font-semibold text-[#740E0A]`}
              >
                {node.featuredDeityOrAvatar}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
