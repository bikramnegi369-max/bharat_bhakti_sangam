import type { Metadata } from "next";
import MissionSection from "@/_components/sections/Marketing/About/MissionSection";
import ValuesSection from "@/_components/sections/Marketing/About/ValuesSection";
import Hero from "@/_components/sections/Marketing/Hero";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import StorySection from "@/_components/sections/Marketing/About/StorySection";

export const metadata: Metadata = createPageMetadataFromConfig("about");

export default function AboutPage() {
  return (
    <>
      <Hero title="About Us" backgroundImage="/about_hero.webp" />
      <StorySection />
      <MissionSection />
      <ValuesSection />
    </>
  );
}
