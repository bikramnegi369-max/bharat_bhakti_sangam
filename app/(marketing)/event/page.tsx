import AboutArtistsDetailedSection from "@/_components/sections/Marketing/Event/AboutArtistsDetailedSection";
import AboutArtistSection from "@/_components/sections/Marketing/Event/AboutArtistSection";
import AboutEventSection from "@/_components/sections/Marketing/Event/AboutEventSection";
import EventInfoSection from "@/_components/sections/Marketing/Event/EventInfoSection";
import FAQSection from "@/_components/sections/Marketing/Event/FAQSection";
import { SponsorSection } from "@/_components/sections/Marketing/Event/SponsorSection";
import Hero from "@/_components/sections/Marketing/Hero";

export default function EventPage() {
  return (
    <div>
      {/* Preload the hero image */}
      <link rel="preload" as="image" href="/event.jpg" fetchPriority="high" />
      <Hero title="Midnight Krishna Kirtan" backgroundImage="/event.jpg" />
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="flex flex-col gap-6 h-full lg:col-span-2">
            <AboutEventSection />
            <AboutArtistSection />
          </div>

          {/* RIGHT */}
          <div className="w-full h-full flex justify-center">
            <EventInfoSection />
          </div>
        </div>
      </div>
      <SponsorSection />
      <FAQSection />
      <AboutArtistsDetailedSection />
    </div>
  );
}
