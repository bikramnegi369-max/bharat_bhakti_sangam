import MissionSection from "@/_components/sections/About/MissionSection";
import ValuesSection from "@/_components/sections/About/ValuesSection";
import Hero from "@/_components/sections/Hero";

export default function AboutPage() {
  return (
    <>
      {/* Preload the hero image */}
      <link
        rel="preload"
        as="image"
        href="/about_hero.jpg"
        fetchPriority="high"
      />
      <Hero title="About Us" backgroundImage="/about_hero.jpg" />
      <MissionSection />
      <ValuesSection />
    </>
  );
}
