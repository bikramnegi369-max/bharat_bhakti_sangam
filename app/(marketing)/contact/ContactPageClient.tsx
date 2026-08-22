"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { ContactConversationSection } from "@/_features/contact/components/ContactConversationSection";
import { ContactOfficeSection } from "@/_features/contact/components/ContactOfficeSection";
import StayConnectedNewsletter from "@/_components/sections/Marketing/StayConnectedNewsletter";

export function ContactPageClient() {
  return (
    <div className="w-full bg-[#FAF8F5]/60 min-h-screen">
      {/* Hero Header Banner */}
      <Hero title="Contact Us" backgroundImage="/contact_hero.webp" />

      {/* Main Conversation & Contact Form Section */}
      <ContactConversationSection />

      {/* Visit Our Office & Location Map Section */}
      <ContactOfficeSection />

      {/* Newsletter Subscription Banner */}
      <StayConnectedNewsletter />
    </div>
  );
}
