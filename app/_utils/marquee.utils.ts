/// =============================
/// FILE: marquee.utils.ts
/// =============================

import { MarqueeDirection, MarqueeItem } from "@/_types/Marquee.types";

/**
 * Duplicate items for seamless loop
 */
export function duplicateItems(
  items: MarqueeItem[],
  repeat = 2,
): MarqueeItem[] {
  return Array.from({ length: repeat }, () => items).flat();
}

/**
 * Convert px/sec into seconds
 */
export function getDurationSeconds(
  contentWidth: number,
  speed: number,
) {
  if (!contentWidth || speed <= 0) return 20;

  return contentWidth / speed;
}

/**
 * Determine enough repetitions to fill width
 */
export function getRepeatCount(
  containerWidth: number,
  contentWidth: number,
) {
  if (!containerWidth || !contentWidth) return 2;

  return Math.max(
    2,
    Math.ceil((containerWidth * 2) / contentWidth) + 1,
  );
}

/**
 * CSS animation direction
 */
export function getAnimationDirection(
  direction: MarqueeDirection,
) {
  return direction === "left" ? "normal" : "reverse";
}