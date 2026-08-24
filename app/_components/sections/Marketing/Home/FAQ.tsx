"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDown, HelpCircle } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { FAQItem } from "@/_types/FAQ.types";
import { homeFAQS } from "@/_lib/constants/home.constants";

import ScrollReveal from "@/_components/common/ScrollReveal";

export interface FAQProps {
  title?: string;
  items?: FAQItem[];
  helpTitle?: string;
  helpSubtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  defaultOpenIndex?: number | null;
  /**
   * If true, only one accordion item is open at a time.
   * If false, multiple accordion items can be open simultaneously.
   */
  singleAccordion?: boolean;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  items = homeFAQS,
  helpTitle = "Have Questions?",
  helpSubtitle = "We're here to help you!",
  ctaText = "Ask Question",
  ctaHref = "/contact",
  className,
  defaultOpenIndex = 0,
  singleAccordion = true,
}: FAQProps) {
  // Controlled accordion state to support seamless smooth height transitions and single/multi modes
  const [openIndexes, setOpenIndexes] = useState<number[]>(() =>
    defaultOpenIndex !== null &&
    defaultOpenIndex !== undefined &&
    defaultOpenIndex >= 0
      ? [defaultOpenIndex]
      : [],
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const isAlreadyOpen = prev.includes(index);
      if (singleAccordion) {
        return isAlreadyOpen ? [] : [index];
      }
      return isAlreadyOpen ? prev.filter((i) => i !== index) : [...prev, index];
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-main-heading"
      className={clsx(
        "relative w-full py-[clamp(3rem,calc(2rem+3.5vw),6rem)] bg-[#FCFAF5] overflow-hidden",
        className,
      )}
    >
      <div className="relative max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Main Grid: 2 columns on lg (1024px+), balanced 55/45 or 7/5 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* Left Column: Title + FAQ Accordion List (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {title && (
              <ScrollReveal animation="fade-right" duration={750} threshold={0.15}>
                <h2
                  id="faq-main-heading"
                  className={clsx(
                    playfair.className,
                    "text-[#740E0A] font-medium tracking-tight text-[clamp(1.85rem,calc(1.4rem+1.8vw),2.75rem)] leading-tight mb-6 sm:mb-8",
                  )}
                >
                  {title}
                </h2>
              </ScrollReveal>
            )}

            {/* Accordion Item List with Staggered Cascade */}
            <div className="flex flex-col">
              {items.map((item, idx) => {
                const isOpen = openIndexes.includes(idx);
                const isLast = idx === items.length - 1;

                return (
                  <ScrollReveal
                    key={`${item.title}-${idx}`}
                    animation="fade-up"
                    delay={idx * 60}
                    duration={650}
                    threshold={0.08}
                  >
                    <div
                      className={clsx(
                        "transition-colors duration-200",
                        // Clean subtle horizontal divider line
                        !isLast && "border-b border-[#F3E7D7]",
                      )}
                    >
                      <h3>
                        <button
                          type="button"
                          id={`faq-btn-${idx}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-content-${idx}`}
                          onClick={() => toggleIndex(idx)}
                          className={clsx(
                            "w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded-lg",
                          )}
                        >
                          <span
                            className={clsx(
                              poppins.className,
                              "text-[#740E0A] font-semibold text-[clamp(0.95rem,calc(0.88rem+0.3vw),1.125rem)] leading-snug transition-colors duration-200 group-hover:text-[#520B08]",
                            )}
                          >
                            {item.title}
                          </span>

                          <span
                            className={clsx(
                              "flex shrink-0 items-center justify-center text-[#740E0A] transition-transform duration-300 ease-out",
                              isOpen && "rotate-180",
                            )}
                            aria-hidden="true"
                          >
                            <ChevronDown className="w-5 h-5 stroke-[2.25]" />
                          </span>
                        </button>
                      </h3>

                      {/* Collapsible Content with CSS Grid transition for silky smooth expansion */}
                      <div
                        id={`faq-content-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        className={clsx(
                          "grid transition-all duration-300 ease-in-out",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mb-5"
                            : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div
                            className={clsx(
                              poppins.className,
                              "text-para text-[clamp(0.875rem,calc(0.82rem+0.2vw),1rem)] leading-relaxed font-normal pt-1",
                            )}
                          >
                            {item.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Warm Peach/Gold Glow "Have Questions?" Card (5 cols on lg) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end lg:sticky lg:top-24">
            <ScrollReveal
              animation="glow-reveal"
              delay={150}
              duration={850}
              threshold={0.15}
              className="w-full"
            >
              <div
                className={clsx(
                  "relative w-full max-w-md lg:max-w-none rounded-3xl sm:rounded-4xl p-8 sm:p-10 md:p-12",
                  "flex flex-col items-center justify-center text-center overflow-hidden",
                  // Soft elegant warm radial gradient backdrop matching the design
                  "bg-[radial-gradient(ellipse_at_center,#FFF2DF_0%,#FDE8CE_55%,#F7DAC0_100%)]",
                  "border border-[#F4DCB9]/60 shadow-[0_12px_36px_rgba(116,14,10,0.06)]",
                )}
              >
                {/* Inner ambient glow highlights */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 bg-white/40 rounded-full blur-2xl select-none"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 bg-[#E86A17]/10 rounded-full blur-2xl select-none"
                />

                {/* Top Circular Question / Help Icon */}
                <div className="relative z-10 mb-6 sm:mb-8 flex items-center justify-center">
                  <div className="w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-[2.5px] border-[#740E0A] text-[#740E0A] bg-transparent shadow-xs transition-transform duration-300 hover:scale-105">
                    <HelpCircle className="w-8 h-8 stroke-[2.25]" />
                  </div>
                </div>

                {/* Card Headline */}
                <h3
                  className={clsx(
                    playfair.className,
                    "relative z-10 text-[#740E0A] font-medium text-[clamp(1.75rem,calc(1.45rem+1.2vw),2.35rem)] tracking-tight leading-snug mb-3",
                  )}
                >
                  {helpTitle}
                </h3>

                {/* Card Subtitle */}
                <p
                  className={clsx(
                    poppins.className,
                    "relative z-10 text-[#7C6A5A] text-[clamp(0.95rem,calc(0.9rem+0.2vw),1.05rem)] leading-normal font-normal mb-8 sm:mb-9",
                  )}
                >
                  {helpSubtitle}
                </p>

                {/* Primary Call to Action Button */}
                <Link
                  href={ctaHref}
                  className={clsx(
                    poppins.className,
                    "relative z-10 inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-3.5 rounded-2xl sm:rounded-3xl",
                    "bg-[#740E0A] text-white font-medium text-[15px] sm:text-[16px] tracking-wide",
                    "shadow-[0_4px_16px_rgba(116,14,10,0.25)] transition-all duration-200 cursor-pointer",
                    "hover:bg-[#5C0A07] hover:shadow-[0_6px_22px_rgba(116,14,10,0.35)] hover:-translate-y-0.5",
                    "active:scale-95 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#740E0A] focus-visible:ring-offset-2",
                  )}
                >
                  {ctaText}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

