import { playfair, poppins } from "@/_lib/fonts";
import { Plane, Home, UserCheck, CalendarDays } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";

interface TemplePlanYourVisitProps {
  temple: Temple;
}

export default function TemplePlanYourVisit({
  temple,
}: TemplePlanYourVisitProps) {
  const guide = temple.travelGuide;
  if (!guide) return null;

  const cards = [
    {
      icon: Plane,
      title: "How to Reach",
      description: guide.howToReach,
    },
    {
      icon: Home,
      title: "Stay & Food",
      description: guide.stayAndFood,
    },
    {
      icon: UserCheck,
      title: "Dress Code",
      description: guide.dressCode,
    },
    {
      icon: CalendarDays,
      title: "Best Time to Visit",
      description: guide.bestTimeToVisit,
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60"
      aria-labelledby="plan-visit-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span
            className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1.5`}
          >
            07 PILGRIMAGE LOGISTICS
          </span>
          <h2
            id="plan-visit-heading"
            className={`${playfair.className} text-2xl sm:text-4xl font-bold text-primary leading-tight`}
          >
            Plan Your Visit
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-3" />
        </div>

        {/* 4-Card Travel Logistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-amber-400/80 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mb-4 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`${playfair.className} text-lg font-bold text-stone-900 mb-2`}
                >
                  {card.title}
                </h3>
                <p
                  className={`${poppins.className} text-stone-600 text-xs sm:text-sm leading-relaxed flex-1`}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
