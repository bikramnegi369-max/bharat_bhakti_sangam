import Hero from "@/_components/sections/Marketing/Hero";
import { PolicySectionRenderer } from "@/_components/sections/Marketing/PolicySectionRenderer";
import { POLICY_CONTENT } from "@/_lib/constants/privacyPolicy.constants";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadataFromConfig("privacyPolicy");

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero title="Privacy Policy" backgroundImage="/policy_hero.webp" />
      <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-secondary">
        <div className="container mx-auto px-[clamp(1.875rem,calc(1.518rem+1.786vw),3.125rem)] max-w-7xl">
          <p className="text-[clamp(0.813rem,calc(0.426rem+1.932vw),1.875rem)] font-semibold text-heading mb-14 leading-relaxed text-center">
            At Bharat Bhakti Sangam (an initiative of Bharat Bhakti Ventures
            Private Limited), we value your devotion and your privacy. This
            policy outlines how we handle your data when you book tickets for
            our events, join our &quot;Bhajan Clubbing&quot; sessions, or
            interact with our digital platforms.
          </p>

          <div className="space-y-12">
            {POLICY_CONTENT.map((section, index) => (
              <PolicySectionRenderer key={index} {...section} />
            ))}
          </div>

          <div className="mt-16 pt-8 border-t text-sm text-gray-500 italic">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </section>
    </>
  );
}
