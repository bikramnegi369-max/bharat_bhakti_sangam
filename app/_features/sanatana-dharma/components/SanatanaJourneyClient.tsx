"use client";

import React from "react";
import Image from "next/image";
import { SanatanaHeroSection } from "./SanatanaHeroSection";
import { SanatanaTimelineSection } from "./SanatanaTimelineSection";

export function SanatanaJourneyClient() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 
        Full-page continuous background texture using /sanatana_bg.webp
        Repeated & layered seamlessly from the top of the hero down through the entire timeline
      */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none opacity-90">
        <Image
          src="/sanatana_bg.webp"
          alt="Sanātana Dharma Sacred Golden Cosmic Texture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Soft Warm Ambient Scrim Overlay to ensure maximum contrast & readability */}
        <div className="absolute inset-0 bg-[#FAF7F2]/45 backdrop-blur-[0.5px]" />
      </div>

      {/* 1. Hero Section with Om Altar & Vedic Statistics */}
      <div className="relative z-10">
        <SanatanaHeroSection />
      </div>

      {/* 2. Interactive Chronological Timeline */}
      <div className="relative z-10">
        <SanatanaTimelineSection />
      </div>
    </main>
  );
}
