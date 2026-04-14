import Hero from "@/_components/sections/Marketing/Hero";
import { bookingConfig } from "@/_config/booking.config";
import { FeedbackForm } from "@/_features/feedback/components/FeedbackForm";

export default function FeedbackPage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <link
        rel="preload"
        as="image"
        href="/home_hero.jpg"
        fetchPriority="high"
      />

      {/* Hero */}
      <Hero
        title="Midnight Krishna Kirtan"
        location="ISKCON Temple Hall | Hare Krishna Land, Juhu, Mumbai 400049"
        date={bookingConfig.eventDate}
        backgroundImage="/home_hero.jpg"
      />

      {/* Content */}
      <div className="relative lg:-mt-40 z-10 flex items-center justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Form Section */}
        <div className="w-full max-w-7xl">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
