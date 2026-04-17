"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { ContactDetails } from "@/_features/contact/components/ContactDetails";
import { ContactForm } from "@/_features/contact/components/ContactForm";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadataFromConfig("contact");

export function ContactPageClient() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden ">
      <Hero title="Contact Us" backgroundImage="/contact_hero.webp" />

      <div className="relative lg:-mt-40 z-10 flex items-center justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] ">
        <div className="w-full max-w-7xl space-y-8 lg:space-y-16">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
