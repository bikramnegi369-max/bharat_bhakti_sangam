import MissionSection from "@/_components/sections/About/MissionSection";
import ValuesSection from "@/_components/sections/About/ValuesSection";
import Hero from "@/_components/sections/Hero";

export default function AboutPage() {
  return (
    <>
      <Hero title="About Us" backgroundImage="/about_hero.jpg" />
      <MissionSection />
      <ValuesSection />
    </>
  );
}
