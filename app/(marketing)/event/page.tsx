import AboutArtistsDetailedSection from "@/_components/sections/Event/AboutArtistsDetailedSection";
import AboutArtistSection from "@/_components/sections/Event/AboutArtistSection";
import AboutEventSection from "@/_components/sections/Event/AboutEventSection";
import EventInfoSection from "@/_components/sections/Event/EventInfoSection";
import FAQSection from "@/_components/sections/Event/FAQSection";
import { SponsorSection } from "@/_components/sections/Event/SponsorSection";
import Hero from "@/_components/sections/Hero";

export default function EventPage() {
  return (
    <div>
      <Hero title="Midnight Krishna Kirtan" backgroundImage="/event.jpg" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
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
      <SponsorSection />
      <FAQSection />
      <AboutArtistsDetailedSection />
    </div>
  );
}
