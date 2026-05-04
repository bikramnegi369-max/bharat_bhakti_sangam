import { Temple } from "@/_types/Temples.types";
import { temples } from "../constants/temples.constants";

export function getTempleBySlug(slug: string): Temple | undefined {
  return temples.find((t) => t.slug === slug);
}
