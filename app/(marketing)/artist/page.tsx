import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import CreatorHero from "@/_components/sections/Marketing/Creator/CreatorHero";
import CreatorBenefitsGrid from "@/_components/sections/Marketing/Creator/CreatorBenefitsGrid";
import CreatorTimelineProcess from "@/_components/sections/Marketing/Creator/CreatorTimelineProcess";
import CreatorFAQSection from "@/_components/sections/Marketing/Creator/CreatorFAQSection";
import StayConnectedNewsletter from "@/_components/sections/Marketing/StayConnectedNewsletter";
import { submitArtistApplication } from "@/_features/artists/services/artistApplication.service";
import {
  artistHeroData,
  artistBenefitsData,
  artistProcessSteps,
  artistFaqs,
  artistContactInfo,
} from "./_config/artist.data";

// Lazy-load heavy client form component (Zod, React Hook Form, Cloudinary Upload)
const CreatorFormSection = dynamic(
  () =>
    import(
      "@/_components/sections/Marketing/Creator/CreatorFormSection"
    ),
  {
    loading: () => (
      <div className="w-full min-h-120 bg-secondary flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);

export const metadata: Metadata = createPageMetadataFromConfig("artist");

export default function ArtistPage() {
  return (
    <div className="w-full">
      <CreatorHero {...artistHeroData} />
      <CreatorBenefitsGrid
        title="WHY COLLABORATE WITH BHARAT BHAKTI SANGAM?"
        benefits={artistBenefitsData}
      />
      <CreatorFormSection
        sidebarTitle={"Your Talent Can\nInspire Millions"}
        sidebarDescription="Join Bharat Bhakti Sangam and let your art become a medium of devotion."
        sidebarQuote="Where talent meets devotion, memories are created for life."
        submitButtonText="Submit Artist Request"
        submittingButtonText="Submitting Application..."
        successTitle="Application Submitted!"
        successDescription="Thank you for applying to perform with Bharat Bhakti Sangam. Our artist curation team will review your application and connect with you shortly."
        onSubmit={submitArtistApplication}
      />
      <CreatorTimelineProcess
        title="APPLICATION PROCESS"
        steps={artistProcessSteps}
      />
      <CreatorFAQSection
        sectionTag="FREQUENTLY ASKED QUESTIONS"
        faqs={artistFaqs}
        contactInfo={artistContactInfo}
      />
      <StayConnectedNewsletter />
    </div>
  );
}
