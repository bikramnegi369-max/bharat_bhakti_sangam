import Hero from "@/_components/sections/Marketing/Hero";
import { PolicySectionRenderer } from "@/_components/sections/Marketing/PolicySectionRenderer";
import { TERMS_CONTENT } from "@/_lib/constants/termsAndConditions.constants";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { Metadata } from "next";

export const metadata: Metadata =
  createPageMetadataFromConfig("termsAndConditions");

export default function TermsAndConditionsPage() {
  return (
    <>
      <Hero title="Terms & Conditions" backgroundImage="/policy_hero.webp" />
      <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-secondary">
        <div className="container mx-auto px-[clamp(1.875rem,calc(1.518rem+1.786vw),3.125rem)] max-w-7xl">
          <div className="space-y-12">
            {TERMS_CONTENT.map((section, index) => (
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
