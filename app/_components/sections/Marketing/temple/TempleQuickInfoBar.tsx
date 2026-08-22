import { poppins } from "@/_lib/fonts";
import { Calendar, Clock, Ticket, Award, MapPin } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";

interface TempleQuickInfoBarProps {
  temple: Temple;
}

export default function TempleQuickInfoBar({
  temple,
}: TempleQuickInfoBarProps) {
  const items = [
    {
      icon: Calendar,
      label: "Best Time",
      value: temple.bestTimeToVisit || "Oct - Mar",
    },
    {
      icon: Clock,
      label: "Timings",
      value: temple.timings || "Open Daily",
    },
    {
      icon: Ticket,
      label: "Entry Fee",
      value: temple.entryFee
        ? temple.entryFee.length > 25
          ? "Free / Pass"
          : temple.entryFee
        : "Free Darshan",
    },
    {
      icon: Award,
      label: "Significance",
      value: temple.significance || "Sacred Shrine",
    },
    {
      icon: MapPin,
      label: "Location",
      value: temple.location?.title?.replace(" Location", "") || "India",
    },
  ];

  return (
    <div className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FCFAF5] border border-amber-200/80 rounded-2xl shadow-xl shadow-stone-900/5 p-4 sm:p-5 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-amber-200/60">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 pt-3 sm:pt-0 ${
                  idx === 0 ? "pt-0" : ""
                } ${idx > 0 ? "sm:pl-4 lg:pl-5" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-300/60 flex items-center justify-center shrink-0 text-amber-700">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`${poppins.className} min-w-0 flex-1`}>
                  <p className="text-[11px] font-medium tracking-wide text-stone-500 uppercase mb-0.5">
                    {item.label}
                  </p>
                  <p
                    className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug wrap-break-word"
                    title={item.value}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
