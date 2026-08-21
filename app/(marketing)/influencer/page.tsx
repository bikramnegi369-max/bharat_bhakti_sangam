import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import InfluencerHero from "@/_components/sections/Marketing/Influencer/InfluencerHero";
import InfluencerWhyCollaborate from "@/_components/sections/Marketing/Influencer/InfluencerWhyCollaborate";
import InfluencerFormSection from "@/_components/sections/Marketing/Influencer/InfluencerFormSection";
import InfluencerApplicationProcess from "@/_components/sections/Marketing/Influencer/InfluencerApplicationProcess";

export const metadata: Metadata = createPageMetadataFromConfig("influencer");

export default function InfluencerPage() {
  return (
    <div className="w-full">
      <InfluencerHero />
      <InfluencerWhyCollaborate />
      <InfluencerFormSection />
      <InfluencerApplicationProcess />
    </div>
  );
}
