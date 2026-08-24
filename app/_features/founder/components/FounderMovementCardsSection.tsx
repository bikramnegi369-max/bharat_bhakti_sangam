"use client";

import React from "react";
import Link from "next/link";
import { playfair, poppins } from "@/_lib/fonts";
import { MOVEMENT_ACTION_CARDS } from "../constants/founder.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FounderMovementCardsSection() {
  const cards = MOVEMENT_ACTION_CARDS;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "volunteer":
        // 3 people / group icon in warm bronze/amber
        return (
          <svg
            className="w-12 h-12 text-[#C06A26]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Center person */}
            <circle cx="24" cy="14" r="5" />
            <path d="M16 34c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            {/* Left person */}
            <circle cx="12" cy="18" r="3.5" />
            <path d="M6 34c0-3.3 2.7-6 6-6 1.4 0 2.7.5 3.7 1.4" />
            {/* Right person */}
            <circle cx="36" cy="18" r="3.5" />
            <path d="M42 34c0-3.3-2.7-6-6-6-1.4 0-2.7.5-3.7 1.4" />
          </svg>
        );
      case "partner":
        // Handshake icon
        return (
          <svg
            className="w-12 h-12 text-[#C06A26]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 20l7-7a4 4 0 0 1 5.6 0l4.4 4.4" />
            <path d="M40 20l-7-7a4 4 0 0 0-5.6 0l-4.4 4.4" />
            <path d="M14 26l4.5 4.5a3 3 0 0 0 4.2 0l7.3-7.3" />
            <path d="M20 32l3 3a3 3 0 0 0 4.2 0l3.8-3.8" />
            <path d="M26 38l2 2a3 3 0 0 0 4.2 0l1.8-1.8" />
          </svg>
        );
      case "influencer":
        // Person singing / musical note influencer
        return (
          <svg
            className="w-12 h-12 text-[#C06A26]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="20" cy="14" r="5.5" />
            <path d="M10 34c0-5.5 4.5-10 10-10h4c3.2 0 6.1 1.5 7.9 3.9" />
            {/* Musical note */}
            <path d="M38 18v12a3 3 0 1 1-3-3h3V18l6-3v6" />
          </svg>
        );
      case "sponsor":
        // Heart ribbon / medal / sponsor badge
        return (
          <svg
            className="w-12 h-12 text-[#C06A26]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 18.5c-2.8-5-8.8-6.2-12.5-2.5-3.8 3.8-2.5 9.8 2.5 14.5L24 40l10-9.5c5-4.7 6.3-10.7 2.5-14.5-3.7-3.7-9.7-2.5-12.5 2.5z" />
            <path d="M19 33l-5 11 10-4 10 4-5-11" />
          </svg>
        );
      case "community":
        // Headset / connecting broadcast user
        return (
          <svg
            className="w-12 h-12 text-[#C06A26]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="16" cy="18" r="4.5" />
            <path d="M9 36c0-4.2 3.5-7.5 7.5-7.5h1.5c2.4 0 4.6 1.1 6 2.8" />
            {/* Broadcast wave rings */}
            <path d="M27 15a7 7 0 0 1 0 10" />
            <path d="M32 11a13 13 0 0 1 0 18" />
            <path d="M37 7a19 19 0 0 1 0 26" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.18em] text-[#6B1410] uppercase mb-3`}
            >
              BECOME PART OF THE MOVEMENT
            </h2>
            <p
              className={`${poppins.className} text-xs sm:text-sm md:text-[15px] text-[#717171] italic font-normal tracking-wide max-w-2xl mx-auto`}
            >
              This movement grows with you. Be a part of something bigger than
              yourself.
            </p>
          </div>
        </ScrollReveal>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {cards.map((card, index) => (
            <ScrollReveal
              key={card.id}
              animation="fade-up"
              duration={700}
              delay={index * 80}
              className="h-full"
            >
              <div className="group bg-white rounded-xl p-6 sm:p-7 border border-[#E5E0D8] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(107,20,16,0.08)] hover:border-[#D1C7BA] transition-all duration-300 flex flex-col justify-between text-center h-full">
                {/* Top Content */}
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className="h-16 flex items-center justify-center mb-3 transform group-hover:scale-105 transition-transform duration-300">
                    {renderIcon(card.iconName)}
                  </div>

                  {/* Title */}
                  <h3
                    className={`${poppins.className} text-xs sm:text-[13px] font-bold text-[#55100D] tracking-[0.08em] uppercase min-h-9.5 flex items-center justify-center text-center`}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${poppins.className} text-[11px] sm:text-xs text-[#737373] font-normal leading-relaxed mt-2.5 max-w-47.5 min-h-12 flex items-center justify-center`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-7 w-full">
                  <Link
                    href={card.ctaHref}
                    className={`${poppins.className} block w-full py-2.5 px-3 rounded-xs bg-[#680F0B] hover:bg-[#520A07] text-white text-[11px] font-bold uppercase tracking-[0.14em] shadow-xs transition-all duration-200 hover:shadow-md text-center active:scale-[0.98]`}
                  >
                    {card.ctaLabel}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
