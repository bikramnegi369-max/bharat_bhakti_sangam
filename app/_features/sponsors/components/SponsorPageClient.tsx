"use client";

import React, { useState, useCallback } from "react";
import { SponsorOpportunity } from "../types/sponsors.types";
import { SponsorHeroSection } from "./SponsorHeroSection";
import { SponsorWhyPartnerSection } from "./SponsorWhyPartnerSection";
import { SponsorOpportunitiesSection } from "./SponsorOpportunitiesSection";
import { SponsorBenefitsSection } from "./SponsorBenefitsSection";
import { SponsorCustomCollabSection } from "./SponsorCustomCollabSection";
import { SponsorEnquirySection } from "./SponsorEnquirySection";

export function SponsorPageClient() {
  const [selectedOpportunityTitle, setSelectedOpportunityTitle] = useState<string>("");

  // Smooth scroll utility helper
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // 1. Hero CTA: "Become a Sponsor" -> scrolls to sponsorship enquiry form
  const handleBecomeSponsorClick = useCallback(() => {
    scrollToId("sponsorship-form");
  }, [scrollToId]);

  // 2. Hero CTA: "Explore opportunities" -> scrolls to sponsorship opportunities section
  const handleExploreOpportunitiesClick = useCallback(() => {
    scrollToId("sponsorship-opportunities");
  }, [scrollToId]);

  // 3. Opportunity card click -> auto-selects opportunity in the form dropdown and scrolls to form
  const handleSelectOpportunity = useCallback(
    (opportunity: SponsorOpportunity) => {
      setSelectedOpportunityTitle(opportunity.title);
      scrollToId("sponsorship-form");
    },
    [scrollToId],
  );

  // 4. "Have something else in mind" -> "Let's Discuss" CTA -> scrolls to enquiry form with Custom Partnership selected
  const handleLetsDiscussClick = useCallback(() => {
    setSelectedOpportunityTitle("Custom Partnership");
    scrollToId("sponsorship-form");
  }, [scrollToId]);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <SponsorHeroSection
        onBecomeSponsorClick={handleBecomeSponsorClick}
        onExploreOpportunitiesClick={handleExploreOpportunitiesClick}
      />

      {/* 2. Why Partner With BBS? */}
      <SponsorWhyPartnerSection />

      {/* 3. Sponsorship Opportunities */}
      <SponsorOpportunitiesSection
        onSelectOpportunity={handleSelectOpportunity}
      />

      {/* 4. Brand Visibility & Benefits */}
      <SponsorBenefitsSection />

      {/* 5. Have Something Else in Mind? */}
      <SponsorCustomCollabSection
        onLetsDiscussClick={handleLetsDiscussClick}
      />

      {/* 6. Sponsorship Enquiry Form & Let's Create Meaningful Vision */}
      <SponsorEnquirySection
        selectedOpportunityTitle={selectedOpportunityTitle}
        onOpportunityTitleChange={setSelectedOpportunityTitle}
      />
    </div>
  );
}
