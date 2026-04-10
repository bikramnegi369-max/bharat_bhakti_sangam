"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { ContactForm } from "@/_features/contact/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden ">
      <Hero title="Contact Us" backgroundImage="/home_hero.jpg" />

      <div className="relative z-10 flex items-center justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="w-full max-w-7xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
