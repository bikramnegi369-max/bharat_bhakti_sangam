"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Phone, Mail, MessageSquare, ArrowRight, Minus, Plus } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface InfluencerFAQItem {
  id?: string | number;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface InfluencerContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface InfluencerFAQProps {
  sectionTag?: string;
  helpTitle?: string;
  helpSubtitle?: string;
  contactInfo?: InfluencerContactInfo;
  faqs?: InfluencerFAQItem[];
  className?: string;
  /**
   * If true, only one accordion item is open at a time (accordion behavior).
   * If false, multiple accordion items can be open simultaneously.
   */
  singleAccordion?: boolean;
}

const DEFAULT_CONTACT_INFO: InfluencerContactInfo = {
  phone: "+91 8796086743",
  email: "contact@bharatbhaktisangam.com",
  whatsapp: "+91 8796086743",
  ctaText: "Contact Our Team",
  ctaHref: "/contact",
};

const DEFAULT_FAQS: InfluencerFAQItem[] = [
  {
    id: 1,
    question: "Who can apply for artist collaboration?",
    answer:
      "We welcome all kinds of devotional artists including singers, musicians, dancers, speakers and spiritual performers. Both individual and group applications are accepted.",
  },
  {
    id: 2,
    question: "Can groups or teams apply?",
    answer:
      "Yes, musical groups, choir teams, dance troupes, and devotional ensembles are fully eligible to apply. Please provide collective links and sample recordings in your submission.",
  },
  {
    id: 3,
    question: "Is there any registration or application fee?",
    answer:
      "No, there is absolutely zero registration or application fee. Applying and collaborating with Bharat Bhakti Sangam is completely free for all artists.",
  },
  {
    id: 4,
    question: "How long does the approval process take?",
    answer:
      "Our curation committee reviews applications thoroughly. You will typically receive an update via email or WhatsApp within 3 to 5 business days.",
  },
  {
    id: 5,
    question: "How will I know if my application is selected?",
    answer:
      "Once your profile is reviewed and shortlisted, our onboarding team will reach out via official email and phone to discuss upcoming event dates and arrangements.",
  },
  {
    id: 6,
    question: "Can I update my application after submitting?",
    answer:
      "Yes, if you need to update portfolio links, contact details, or performance videos, simply reach out to contact@bharatbhaktisangam.com with your application details.",
  },
];

export default function InfluencerFAQ({
  sectionTag = "FREQUENTLY ASKED QUESTIONS",
  helpTitle = "Need Help?",
  helpSubtitle = "We're here for you",
  contactInfo = DEFAULT_CONTACT_INFO,
  faqs = DEFAULT_FAQS,
  className,
  singleAccordion = true,
}: InfluencerFAQProps) {
  // First item open by default as shown in the design
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const isAlreadyOpen = prev.includes(index);
      if (singleAccordion) {
        return isAlreadyOpen ? [] : [index];
      }
      return isAlreadyOpen ? prev.filter((i) => i !== index) : [...prev, index];
    });
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="influencer-faq-heading"
      className={clsx(
        "relative w-full overflow-hidden bg-[#FDFCF8] py-14 sm:py-16 md:py-20 lg:py-24",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header with decorative golden side lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
          <div
            aria-hidden="true"
            className="h-px w-10 sm:w-16 md:w-20 lg:w-24 bg-linear-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]"
          />
          <h2
            id="influencer-faq-heading"
            className={clsx(
              playfair.className,
              "text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-heading",
            )}
          >
            {sectionTag}
          </h2>
          <div
            aria-hidden="true"
            className="h-px w-10 sm:w-16 md:w-20 lg:w-24 bg-linear-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]"
          />
        </div>

        {/* 2-Column Responsive Layout: Need Help Card on left, FAQ Accordions on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          {/* Left Column: Need Help Card (4 cols on lg, 3.5 cols on xl) */}
          <aside className="w-full lg:col-span-4 lg:sticky lg:top-24 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none bg-white rounded-3xl p-6 sm:p-8 xl:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#F3EDE2]/80 flex flex-col justify-between">
              <div>
                {/* Need Help Title */}
                <h3
                  className={clsx(
                    playfair.className,
                    "text-2xl sm:text-3xl font-bold text-[#740E0A] tracking-tight mb-2",
                  )}
                >
                  {helpTitle}
                </h3>
                <p
                  className={clsx(
                    poppins.className,
                    "text-xs sm:text-sm text-para font-normal mb-8",
                  )}
                >
                  {helpSubtitle}
                </p>

                {/* Contact Items List */}
                <div className="space-y-6 sm:space-y-7 mb-8 sm:mb-10">
                  {/* CALL US */}
                  {contactInfo.phone && (
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-2.5 rounded-full bg-[#FFF9F6] text-[#740E0A] flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={clsx(
                            poppins.className,
                            "text-[10px] sm:text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider",
                          )}
                        >
                          CALL US
                        </span>
                        <a
                          href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                          className={clsx(
                            poppins.className,
                            "text-xs sm:text-sm font-semibold text-[#302D2D] hover:text-[#740E0A] transition-colors",
                          )}
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* EMAIL US */}
                  {contactInfo.email && (
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-2.5 rounded-full bg-[#FFF9F6] text-[#740E0A] flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={clsx(
                            poppins.className,
                            "text-[10px] sm:text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider",
                          )}
                        >
                          EMAIL US
                        </span>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className={clsx(
                            poppins.className,
                            "text-xs sm:text-sm font-semibold text-[#302D2D] hover:text-[#740E0A] transition-colors break-all",
                          )}
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* WHATSAPP */}
                  {contactInfo.whatsapp && (
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-2.5 rounded-full bg-[#FFF9F6] text-[#740E0A] flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={clsx(
                            poppins.className,
                            "text-[10px] sm:text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider",
                          )}
                        >
                          WHATSAPP
                        </span>
                        <a
                          href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={clsx(
                            poppins.className,
                            "text-xs sm:text-sm font-semibold text-[#302D2D] hover:text-[#740E0A] transition-colors",
                          )}
                        >
                          {contactInfo.whatsapp}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Button */}
              {contactInfo.ctaText && (
                <Link
                  href={contactInfo.ctaHref || "/contact"}
                  className={clsx(
                    poppins.className,
                    "w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-[#520B08] hover:bg-[#740E0A] text-white",
                    "font-semibold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md",
                    "flex items-center justify-center gap-2 group transition-all duration-200 active:scale-[0.98] text-center",
                  )}
                >
                  <span>{contactInfo.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </aside>

          {/* Right Column: FAQ Accordions (8 cols on lg) */}
          <div className="w-full lg:col-span-8 flex flex-col space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);

              return (
                <div
                  key={faq.id ?? idx}
                  className={clsx(
                    "relative overflow-hidden rounded-2xl bg-white transition-all duration-300",
                    "border border-[#F3EDE2]/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#E8DEC8]",
                    isOpen && "shadow-[0_4px_16px_rgba(0,0,0,0.04)]",
                  )}
                >
                  {/* Left saffron/orange active accent bar */}
                  <div
                    aria-hidden="true"
                    className={clsx(
                      "absolute top-0 bottom-0 left-0 w-1.25 sm:w-1.5 bg-[#E86A17] transition-opacity duration-300",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  />

                  {/* Accordion Trigger Header */}
                  <h3>
                    <button
                      type="button"
                      id={`influencer-faq-btn-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`influencer-faq-content-${idx}`}
                      onClick={() => toggleIndex(idx)}
                      className={clsx(
                        "w-full flex items-center justify-between gap-4 py-4 sm:py-5 px-5 sm:px-7 text-left cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset",
                        isOpen && "pl-6 sm:pl-8", // gentle offset to accommodate left orange bar
                      )}
                    >
                      <span
                        className={clsx(
                          poppins.className,
                          "font-bold text-xs sm:text-[0.925rem] lg:text-sm xl:text-[0.975rem] leading-snug transition-colors duration-200",
                          isOpen ? "text-[#740E0A]" : "text-[#740E0A] hover:text-[#520B08]",
                        )}
                      >
                        {faq.question}
                      </span>

                      {/* Plus/Minus Indicator */}
                      <span
                        className={clsx(
                          "shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300",
                          isOpen ? "text-[#E86A17]" : "text-[#E86A17] hover:scale-110",
                        )}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-5 h-5 stroke-[2.5]" />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* Collapsible Answer Body */}
                  <div
                    id={`influencer-faq-content-${idx}`}
                    role="region"
                    aria-labelledby={`influencer-faq-btn-${idx}`}
                    className={clsx(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={clsx(
                          poppins.className,
                          "text-xs sm:text-[0.835rem] lg:text-xs xl:text-sm text-para font-normal leading-relaxed",
                          "px-5 sm:px-7 pb-5 pt-1",
                          isOpen && "pl-6 sm:pl-8",
                        )}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
