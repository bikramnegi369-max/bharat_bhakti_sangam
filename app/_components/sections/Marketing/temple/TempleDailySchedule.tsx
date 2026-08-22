import { playfair, poppins } from "@/_lib/fonts";
import { Sun, BookOpen, Gift, Star, Moon, Sparkles } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";

interface TempleDailyScheduleProps {
  temple: Temple;
}

// Icon mapper matching temple schedule rituals
function getScheduleIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (
    t.includes("prakash") ||
    t.includes("morning") ||
    t.includes("mangala") ||
    t.includes("dwaraphita")
  ) {
    return <Sun className="w-5 h-5 text-[#8B2500]" />;
  }
  if (
    t.includes("anand") ||
    t.includes("bhog") ||
    t.includes("abhishek") ||
    t.includes("geeta") ||
    t.includes("gita") ||
    t.includes("book")
  ) {
    return <BookOpen className="w-5 h-5 text-[#8B2500]" />;
  }
  if (
    t.includes("langar") ||
    t.includes("meal") ||
    t.includes("prasad") ||
    t.includes("sarva")
  ) {
    return <Gift className="w-5 h-5 text-[#8B2500]" />;
  }
  if (
    t.includes("palki") ||
    t.includes("sandhya") ||
    t.includes("evening") ||
    t.includes("aarti") ||
    t.includes("shringar")
  ) {
    return <Star className="w-5 h-5 text-[#8B2500]" />;
  }
  if (
    t.includes("sukhasan") ||
    t.includes("shayan") ||
    t.includes("night") ||
    t.includes("closing")
  ) {
    return <Moon className="w-5 h-5 text-[#8B2500]" />;
  }
  const fallbackIcons = [Sun, BookOpen, Gift, Star, Moon, Sparkles];
  const IconComponent = fallbackIcons[index % fallbackIcons.length];
  return <IconComponent className="w-5 h-5 text-[#8B2500]" />;
}

export default function TempleDailySchedule({
  temple,
}: TempleDailyScheduleProps) {
  const schedules = temple.schedules || [];
  // Split into left and right columns
  const half = Math.ceil(schedules.length / 2);
  const leftColumn = schedules.slice(0, half);
  const rightColumn = schedules.slice(half);

  return (
    <section
      className="py-16 sm:py-20 bg-[#FFFDF9]"
      aria-labelledby="schedule-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Centered Gold Bar */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-0.5 bg-amber-400/80" />
          <h2
            id="schedule-heading"
            className={`${playfair.className} text-2xl sm:text-4xl lg:text-[40px] font-bold text-primary tracking-wide text-center`}
          >
            Timings &amp; Daily Schedule
          </h2>
        </div>

        {/* 2-Column Schedule Card with Vertical Divider */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200/80">
            {/* Left Column */}
            <div className="divide-y divide-stone-200/80">
              {leftColumn.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 hover:bg-amber-50/20 transition-colors gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">
                      {getScheduleIcon(item.title, idx)}
                    </span>
                    <span
                      className={`${poppins.className} text-xs sm:text-sm font-medium text-stone-800 wrap-break-word`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`${poppins.className} text-xs sm:text-sm font-bold text-stone-900 shrink-0 sm:text-right pl-8 sm:pl-0 tracking-tight`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="divide-y divide-stone-200/80">
              {rightColumn.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 hover:bg-amber-50/20 transition-colors gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">
                      {getScheduleIcon(item.title, half + idx)}
                    </span>
                    <span
                      className={`${poppins.className} text-xs sm:text-sm font-medium text-stone-800 wrap-break-word`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`${poppins.className} text-xs sm:text-sm font-bold text-stone-900 shrink-0 sm:text-right pl-8 sm:pl-0 tracking-tight`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Cream Note Container matching Mockup */}
          <div className="bg-[#FCFAF5] border-t border-stone-200 px-4 sm:px-6 py-3.5 flex items-start sm:items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#E86A17] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <span className="text-[10px] font-bold italic">i</span>
            </div>
            <p
              className={`${poppins.className} text-xs text-stone-700 leading-relaxed`}
            >
              <span className="font-bold text-stone-800">Note: </span>
              {temple.scheduleNote ||
                "Timings may change on special occasions and festivals."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
