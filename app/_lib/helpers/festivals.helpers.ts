import { festivalsData } from "@/_lib/constants/festivals.constants";
import type { FestivalSection } from "@/_types/festivals.types";
import { normalizeSlug, slugify } from "@/_utils/slug";

export type Festival = FestivalSection & {
  slug: string;
};

export function getFestivals(): Festival[] {
  return festivalsData.map((festival) => ({
    ...festival,
    slug: slugify(festival.title),
  }));
}

export function getFestivalBySlug(slug: string): Festival | undefined {
  const normalizedSlug = normalizeSlug(slug);

  return getFestivals().find((festival) => festival.slug === normalizedSlug);
}
