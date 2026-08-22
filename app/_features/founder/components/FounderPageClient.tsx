"use client";

import React, { useState } from "react";
import { FounderHeroSection } from "./FounderHeroSection";
import { FounderMessageSection } from "./FounderMessageSection";
import { FounderTimelineSection } from "./FounderTimelineSection";
import { FounderBehindTheScenesSection } from "./FounderBehindTheScenesSection";
import { FounderDevotionVideoSection } from "./FounderDevotionVideoSection";
import { FounderCorePillarsSection } from "./FounderCorePillarsSection";
import { FounderMomentsSection } from "./FounderMomentsSection";
import { FounderMovementCardsSection } from "./FounderMovementCardsSection";
import { FounderQuestionsNewsletterSection } from "./FounderQuestionsNewsletterSection";
import { FounderVideoModal } from "./FounderVideoModal";

export function FounderPageClient() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    videoUrl: string;
  }>({
    isOpen: false,
    title: "",
    videoUrl: "/hero-video.mp4",
  });

  const handleOpenVideo = (item: { title: string; videoUrl?: string }) => {
    setModalState({
      isOpen: true,
      title: item.title,
      videoUrl: item.videoUrl || "/hero-video.mp4",
    });
  };

  const handleCloseVideo = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="w-full flex flex-col bg-[#FCFAF5]">
      {/* 1. Hero Section & Stat Bar */}
      <FounderHeroSection />

      {/* 2. My Message to You */}
      <FounderMessageSection />

      {/* 3. Our Journey So Far */}
      <FounderTimelineSection />

      {/* 4. Behind the Scenes — The Real Journey */}
      <FounderBehindTheScenesSection onSelectVideo={handleOpenVideo} />

      {/* 5. This is What Devotion Looks Like (Video Feature) */}
      <FounderDevotionVideoSection onWatchVideo={handleOpenVideo} />

      {/* 6. Core Pillars: Why Bhajan Clubbing / Vision 2030 / My Promise */}
      <FounderCorePillarsSection />

      {/* 7. Moments That Inspired Thousands */}
      <FounderMomentsSection onSelectMoment={handleOpenVideo} />

      {/* 8. Become Part of the Movement */}
      <FounderMovementCardsSection />

      {/* 9. Newsletter & Have Questions Banner */}
      <FounderQuestionsNewsletterSection />

      {/* Accessible Interactive Video Modal */}
      <FounderVideoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseVideo}
        title={modalState.title}
        videoUrl={modalState.videoUrl}
      />
    </div>
  );
}
