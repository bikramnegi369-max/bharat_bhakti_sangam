import { Temple } from "@/_types/Temples.types";
import { temples } from "../constants/temples.constants";
import { getNormalizedTempleDetail } from "@/_config/temple-details.config";

export function getTempleBySlug(slug: string): Temple | undefined {
  return temples.find((t) => t.slug === slug);
}

export function getTempleFullDetailBySlug(slug: string): Temple | undefined {
  const temple = getTempleBySlug(slug);
  if (!temple) return undefined;
  return getNormalizedTempleDetail(temple);
}

export function getAllNormalizedTemples(): Temple[] {
  return temples.map((temple) => getNormalizedTempleDetail(temple));
}


