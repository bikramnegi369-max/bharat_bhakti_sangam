import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import InfluencerHero from "@/_components/sections/Marketing/Influencer/InfluencerHero";
import InfluencerWhyCollaborate from "@/_components/sections/Marketing/Influencer/InfluencerWhyCollaborate";
import InfluencerApplicationProcess from "@/_components/sections/Marketing/Influencer/InfluencerApplicationProcess";
import InfluencerFAQ from "@/_components/sections/Marketing/Influencer/InfluencerFAQ";

// Lazy-load heavy client component (Zod, React Hook Form, Cloudinary Upload)
const InfluencerFormSection = dynamic(
  () =>
    import("@/_components/sections/Marketing/Influencer/InfluencerFormSection"),
  {
    loading: () => (
      <div className="w-full min-h-120 bg-secondary flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);

export const metadata: Metadata = createPageMetadataFromConfig("influencer");

export default function InfluencerPage() {
  return (
    <div className="w-full">
      <InfluencerHero />
      <InfluencerWhyCollaborate />
      <InfluencerFormSection />
      <InfluencerApplicationProcess />
      <InfluencerFAQ />
    </div>
  );
}
