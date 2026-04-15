import Card from "@/_components/ui/Card";
import { Brain, Music, UsersRound } from "lucide-react";
import { Cinzel } from "next/font/google";

const cards = [
  {
    icon: Brain,
    title: "Spiritual Connection",
    description:
      "Traditional bhajans and sacred chants that connect the soul to divine consciousness.",
  },
  {
    icon: Music,
    title: "Live Experience",
    description:
      "Live concert atmosphere with professional sound, immersive lighting.",
  },
  {
    icon: UsersRound,
    title: "Community & Positivity",
    description:
      "A space where families gather together to experience positivity.",
  },
];

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function ExperienceSection() {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold ${cinzel.className}`}
          >
            Where <span className="text-primary">Devotion</span> Meets{" "}
            <span className="text-primary">Celebration</span>
          </h2>

          <p className="mt-4 text-gray-600 text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)]">
            Bhajan Clubbing is more than a concert — it’s a movement redefining
            how India experiences spirituality. From interactive kirtan sessions
            and live devotional band performances to electronic bhakti festivals
            and Bharat Bhakti Sangam gatherings, every event creates a powerful
            connection between music, energy, and devotion.
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
