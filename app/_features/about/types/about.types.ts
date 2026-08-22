import type { ElementType } from "react";

export interface MilestoneItem {
  id: string;
  year?: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface ImpactMetricItem {
  id: string;
  value: string;
  label: string;
  icon: ElementType;
}

export interface OfferingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}
