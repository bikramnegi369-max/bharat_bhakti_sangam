import {
  FESTIVAL_DETAILS_CONFIG_REGISTRY,
  getFestivalDetail,
} from "@/_config/festival-details.config";
import type { Festival, FestivalDetailData } from "@/_types/festivals.types";
import { normalizeSlug, slugify } from "@/_utils/slug";

export type { Festival };

export function getFestivals(): Festival[] {
  return Object.values(FESTIVAL_DETAILS_CONFIG_REGISTRY).map((fest) => ({
    title: fest.name,
    description: fest.listingCard.shortDescription,
    images: [fest.heroImage, fest.featuredOverviewImage || fest.heroImage],
    slug: fest.slug,
    dateBadge: fest.dateBadge,
    season: fest.listingCard.season,
    significance: fest.listingCard.significance,
    region: fest.listingCard.region,
  }));
}

export function getFestivalBySlug(slug: string): Festival | undefined {
  const normalizedSlug = normalizeSlug(slug);
  return getFestivals().find((festival) => festival.slug === normalizedSlug);
}

export function getFullFestivalDetailBySlug(
  slug: string,
): FestivalDetailData | null {
  return getFestivalDetail(slug);
}
