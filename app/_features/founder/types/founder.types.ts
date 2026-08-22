import React from "react";

export interface FounderStat {
  id: string;
  iconName: "users" | "calendar" | "heart" | "shield";
  value: string;
  label: string;
  sublabel?: string;
}

export interface FounderMilestone {
  year?: string;
  title: string;
  description: string;
  iconName: "idea" | "volunteers" | "music" | "location" | "energy" | "movement" | "spark" | "hands" | "globe" | "fire" | "temple";
}

export interface BehindTheScenesItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
}

export interface CorePillarItem {
  id: string;
  title: string;
  type: "features" | "vision" | "promise";
  iconName: "music" | "lotus" | "heart";
  features?: {
    iconName: "music" | "om" | "users";
    title: string;
    description: string;
  }[];
  content?: string;
  quote?: string;
  signature?: string;
}

export interface DevotionalMoment {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
  iconType: "play" | "heart" | "star";
  videoUrl?: string;
}

export interface MovementActionCard {
  id: string;
  title: string;
  description: string;
  iconName: "volunteer" | "partner" | "influencer" | "sponsor" | "community" | "users" | "mic" | "collaborate";
  ctaLabel: string;
  ctaHref: string;
}
