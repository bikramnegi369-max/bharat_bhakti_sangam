import Card from "@/_components/ui/Card";
import {
  Brain,
  CalendarCheck,
  HeartPulse,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import { Cinzel } from "next/font/google";

const cards = [
  {
    icon: Brain,
    title: "Spiritual Roots, Modern Soul",
    description:
      "We respect the spiritual essence of bhajans while presenting them in a modern way.",
  },
  {
    icon: Music,
    title: "Multi-Sensory Experiences",
    description:
      "We create events that engage all senses — music, lights, and energy.",
  },
  {
    icon: HeartPulse,
    title: "Rhythm with Purpose",
    description:
      "Every beat and rhythm is designed to uplift, not distract from devotion.",
  },
  {
    icon: Sparkles,
    title: "Seamless & Premium",
    description:
      "From sound to venue, we ensure a premium and seamless experience.",
  },
  {
    icon: Users,
    title: "Devotion Reimagined",
    description:
      "We make devotion accessible and relevant for today's generation.",
  },
  {
    icon: CalendarCheck,
    title: "Hassle-Free Journey",
    description:
      "We keep everything easy — from booking to attending the event.",
  },
];

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function ValuesSection() {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold ${cinzel.className}`}
          >
            Our <span className="text-primary">Values</span>
          </h2>

          <p className="mt-4 text-gray-600 text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)]">
            The principles that guide every experience we create.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 justify-center items-stretch px-[clamp(3rem,calc(0.857rem+10.714vw),6rem)] lg:px-0">
          {cards.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              className="hover:-translate-y-1 hover:shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
