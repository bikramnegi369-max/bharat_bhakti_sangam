import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_JOURNEY_MILESTONES } from "../constants/about.constants";

export function AboutJourneyTimeline() {
  const milestones = ABOUT_JOURNEY_MILESTONES;

  return (
    <section
      id="journey"
      aria-label="Our Journey So Far"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2
            className={clsx(
              playfair.className,
              "text-[clamp(1.75rem,calc(1.25rem+1.8vw),2.625rem)] font-bold tracking-tight text-[#C47D1C] uppercase mb-2",
            )}
          >
            OUR JOURNEY SO FAR
          </h2>
          <div className="w-16 h-0.5 bg-[#C47D1C]/40 mx-auto rounded-full" />
        </div>

        {/* Milestones Container */}
        <div className="relative">
          {/* Connecting Line behind milestones (visible on lg screens) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-linear-to-r from-transparent via-[#E0CDA9] to-transparent z-0"
          />

          {/* 6-Column Milestone Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 sm:gap-x-6 relative z-10">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Outer Golden Circle Badge */}
                  <div
                    className={clsx(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5",
                      "bg-[#FCFAF5] border-2 border-[#C47D1C] shadow-sm",
                      "transition-all duration-300 group-hover:scale-110 group-hover:border-[#740E0A] group-hover:shadow-md",
                    )}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#740E0A] stroke-[1.8] transition-colors duration-300 group-hover:text-[#C47D1C]" />
                  </div>

                  {/* Title */}
                  <h3
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] font-bold tracking-wide uppercase text-[#590B08] mb-1.5 min-h-9 flex items-center justify-center",
                    )}
                  >
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={clsx(
                      poppins.className,
                      "text-[11px] sm:text-xs text-[#6B6B6B] leading-relaxed max-w-42.5",
                    )}
                  >
                    {milestone.description}
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
