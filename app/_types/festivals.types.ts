export type FestivalSection = {
  title: string;
  description: string;
  images: string[];
  descriptionAnchor?: "left" | "right"; // default to "left"
  alts?: string[];
};
