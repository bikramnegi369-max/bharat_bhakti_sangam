import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import InfluencerHero from "@/_components/sections/Marketing/Influencer/InfluencerHero";

export const metadata: Metadata = createPageMetadataFromConfig("influencer");

export default function InfluencerPage() {
  return (
    <div className="w-full">
      <InfluencerHero />
    </div>
  );
}
