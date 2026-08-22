import React from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface CreatorProcessStep {
  stepNumber: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CreatorTimelineProcessProps {
  title?: string;
  steps: CreatorProcessStep[];
  className?: string;
}

export default function CreatorTimelineProcess({
  title = "APPLICATION PROCESS",
  steps,
  className,
}: CreatorTimelineProcessProps) {
  return (
    <section
      aria-labelledby="creator-application-process-heading"
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
            id="creator-application-process-heading"
            className={clsx(
              playfair.className,
              "text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-heading",
            )}
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="h-px w-10 sm:w-16 md:w-20 lg:w-24 bg-linear-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]"
          />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop & Tablet-landscape (1024px+) Horizontal Dashed Connector Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0 border-t-2 border-dashed border-[#F3DEB2] z-0"
          />

          {/* Steps Grid: Vertical stack on mobile (<640px), 2/3 cols on tablet (640px-1023px), 5 cols from 1024px+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-8 md:gap-10 lg:gap-4 xl:gap-6 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.stepNumber}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Circular Icon with Step Badge */}
                  <div className="relative mb-5 sm:mb-6">
                    {/* Circle Node Container */}
                    <div
                      className={clsx(
                        "w-20 h-20 sm:w-20 sm:h-20 lg:w-19 lg:h-19 xl:w-20 xl:h-20",
                        "rounded-full bg-[#FFF9F6] border border-[#FCD9D1] shadow-xs",
                        "flex items-center justify-center transition-all duration-300",
                        "group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-md",
                      )}
                    >
                      <Icon
                        className="w-7 h-7 sm:w-7 sm:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-primary transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Step Number Circle Badge */}
                    <div
                      className={clsx(
                        "absolute -bottom-1 left-1/2 -translate-x-1/2",
                        "w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#740E0A] text-white",
                        "flex items-center justify-center text-[10px] sm:text-xs font-semibold shadow-xs",
                        "ring-2 ring-[#FDFCF8] select-none",
                        poppins.className,
                      )}
                      aria-label={`Step ${step.stepNumber}`}
                    >
                      {step.stepNumber}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={clsx(
                      poppins.className,
                      "text-sm sm:text-[0.925rem] lg:text-sm xl:text-base font-bold text-heading mb-1.5 sm:mb-2 leading-snug tracking-tight",
                    )}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[0.8125rem] lg:text-xs xl:text-sm text-para font-normal leading-relaxed max-w-56 sm:max-w-60 lg:max-w-48 xl:max-w-54 mx-auto",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
