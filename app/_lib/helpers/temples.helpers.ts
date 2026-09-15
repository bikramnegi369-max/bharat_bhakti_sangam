import { Temple } from "@/_types/Temples.types";
import { allTemples } from "@/_config/temples";

/**
 * Finds a temple by its unique slug.
 * Since all temples in app/_config/temples are already fully enriched,
 * this returns the complete Temple model directly.
 */
export function getTempleBySlug(slug: string): Temple | undefined {
  return allTemples.find((t) => t.slug === slug);
}

/**
 * Direct alias for backward-compatibility.
 */
export function getTempleFullDetailBySlug(slug: string): Temple | undefined {
  return getTempleBySlug(slug);
}

/**
 * Returns all temples.
 */
export function getAllNormalizedTemples(): Temple[] {
  return allTemples;
}
