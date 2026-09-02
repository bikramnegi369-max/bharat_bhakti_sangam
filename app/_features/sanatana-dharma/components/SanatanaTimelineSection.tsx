"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { SANATANA_EPOCHS_DATA } from "../constants/sanatana.constants";
import { SanatanaEpochKey } from "../types/sanatana.types";
import { SanatanaFilterBar } from "./SanatanaFilterBar";
import { SanatanaEpochHeader } from "./SanatanaEpochHeader";
import { SanatanaTimelineCard } from "./SanatanaTimelineCard";

export function SanatanaTimelineSection() {
  const [activeEpoch, setActiveEpoch] = useState<SanatanaEpochKey>("all");

  const handleSelectEpoch = (epochId: SanatanaEpochKey) => {
    setActiveEpoch(epochId);

    // Smooth scroll gently to timeline anchor when switching filters
    const el = document.getElementById("sanatana-timeline-anchor");
    if (el) {
      const navOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const filteredEpochs = useMemo(() => {
    if (activeEpoch === "all") {
      return SANATANA_EPOCHS_DATA;
    }
    return SANATANA_EPOCHS_DATA.filter((epoch) => epoch.id === activeEpoch);
  }, [activeEpoch]);

  let globalNodeCounter = 0;

  return (
    <section
      id="sanatana-timeline-anchor"
      className="relative w-full py-10 sm:py-14 lg:py-24 overflow-hidden"
    >
      {/* Section Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-6 sm:w-12 h-0.5 bg-[#C49A45]" />
            <span
              className={`${poppins.className} text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C49A45] uppercase`}
            >
              CHATURYUGA & SACRED CONTINUUM
            </span>
            <span className="w-6 sm:w-12 h-0.5 bg-[#C49A45]" />
          </div>

          <h2
            className={`${playfair.className} text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3F0605] tracking-tight uppercase leading-tight`}
          >
            THE TIMELINE OF{" "}
            <span className="text-[#740E0A]">ETERNAL DHARMA</span>
          </h2>

          <p
            className={`${poppins.className} text-xs sm:text-sm lg:text-base text-[#5c5c5c] mt-2 sm:mt-4 max-w-2xl font-normal leading-relaxed`}
          >
            Witness the divine manifestations, cosmic revolutions, and timeless
            teachings that continue to guide seekers across millennia.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mb-10 sm:mb-14 sticky top-24 sm:top-28 lg:top-32 z-40">
          <SanatanaFilterBar
            activeEpoch={activeEpoch}
            onSelectEpoch={handleSelectEpoch}
          />
        </div>

        {/* Vertical Timeline Axis Container */}
        <div className="relative w-full">
          {/* Continuous Glowing Golden Vertical Spine Line (Centered on ALL devices including mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-linear-to-b from-[#D4AF37] via-[#740E0A] to-[#D4AF37] rounded-full shadow-sm z-0 pointer-events-none" />

          {/* Render Epochs and Their Nodes */}
          <div className="relative z-10 space-y-12 sm:space-y-16 lg:space-y-20">
            {filteredEpochs.map((epoch) => (
              <div
                key={`${activeEpoch}-${epoch.id}`}
                className="relative w-full"
              >
                {/* Epoch Capsule Divider */}
                <SanatanaEpochHeader epoch={epoch} />

                {/* Nodes in this Epoch */}
                <div className="space-y-12 sm:space-y-16 lg:space-y-20 mt-8 sm:mt-12">
                  {epoch.nodes.map((node) => {
                    const currentIndex = globalNodeCounter++;
                    const isLeft = currentIndex % 2 === 0;

                    return (
                      <SanatanaTimelineCard
                        key={`${activeEpoch}-${node.id}`}
                        node={node}
                        isLeftOnDesktop={isLeft}
                        nodeIndex={currentIndex}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Terminal Cap Mandala Ornament */}
          <div className="relative flex flex-col items-center justify-center pt-12 sm:pt-16 lg:pt-20 z-20">
            <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#740E0A] border-4 border-[#D4AF37] flex items-center justify-center shadow-xl shadow-[#740E0A]/40 animate-glow">
              <span
                className={`${playfair.className} text-lg sm:text-xl text-[#FCD34D] font-bold`}
              >
                ॐ
              </span>
            </div>
            <span
              className={`${playfair.className} text-xs sm:text-sm lg:text-base font-bold text-[#3F0605] mt-2.5 uppercase tracking-wider`}
            >
              सनातन धर्मो विजयते तराम्
            </span>
            <span
              className={`${poppins.className} text-[11px] sm:text-xs text-[#740E0A] font-medium mt-0.5`}
            >
              The Eternal Truth Triumphs Forever
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
