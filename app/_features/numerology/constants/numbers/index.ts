import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { NUMBER_1_CONFIG } from "./number1.config";
import { NUMBER_2_CONFIG } from "./number2.config";
import { NUMBER_3_CONFIG } from "./number3.config";
import { NUMBER_4_CONFIG } from "./number4.config";
import { NUMBER_5_CONFIG } from "./number5.config";
import { NUMBER_6_CONFIG } from "./number6.config";
import { NUMBER_7_CONFIG } from "./number7.config";
import { NUMBER_8_CONFIG } from "./number8.config";
import { NUMBER_9_CONFIG } from "./number9.config";

export const NUMEROLOGY_NUMBER_DETAILS: Record<string, NumerologyNumberDetailConfig> = {
  "number-1": NUMBER_1_CONFIG,
  "number-2": NUMBER_2_CONFIG,
  "number-3": NUMBER_3_CONFIG,
  "number-4": NUMBER_4_CONFIG,
  "number-5": NUMBER_5_CONFIG,
  "number-6": NUMBER_6_CONFIG,
  "number-7": NUMBER_7_CONFIG,
  "number-8": NUMBER_8_CONFIG,
  "number-9": NUMBER_9_CONFIG,
};

export function getNumberDetailBySlug(slug: string): NumerologyNumberDetailConfig | undefined {
  return NUMEROLOGY_NUMBER_DETAILS[slug];
}

export function getAllNumberDetailSlugs(): string[] {
  return Object.keys(NUMEROLOGY_NUMBER_DETAILS);
}
