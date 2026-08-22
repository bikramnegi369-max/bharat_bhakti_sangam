import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_IMPACT_METRICS } from "../constants/about.constants";

export function AboutImpactMetrics() {
  const metrics = ABOUT_IMPACT_METRICS;

  return (
    <section
      aria-label="Our Impact and Milestones"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Section Sub-Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span
            className={clsx(
              poppins.className,
              "text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C47D1C] block mb-2",
            )}
          >
            OUR IMPACT IN NUMBERS
          </span>
          <div className="w-12 h-0.5 bg-[#C47D1C]/40 mx-auto rounded-full" />
        </div>

        {/* 6-Column Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 sm:gap-x-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Metric Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#FCFAF5] text-[#C47D1C] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Big Metric Number */}
                <span
                  className={clsx(
                    playfair.className,
                    "text-[clamp(1.75rem,calc(1.35rem+1.4vw),2.5rem)] font-bold text-[#4A0E0A] leading-tight mb-1",
                  )}
                >
                  {metric.value}
                </span>

                {/* Metric Label */}
                <p
                  className={clsx(
                    poppins.className,
                    "text-[11px] sm:text-xs text-[#6B6B6B] font-medium leading-relaxed max-w-37.5",
                  )}
                >
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
