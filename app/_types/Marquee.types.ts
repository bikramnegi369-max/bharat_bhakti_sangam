import { ReactNode } from "react";

export type MarqueeDirection = "left" | "right";

export interface MarqueeItem {
  id: string;
  content: ReactNode;
}

export interface MarqueeProps {
  items: MarqueeItem[];

  /**
   * Pixels per second
   * Higher = faster
   */
  speed?: number;

  /**
   * Space between items
   */
  gap?: number;

  /**
   * Scroll direction
   */
  direction?: MarqueeDirection;

  /**
   * Pause on desktop hover
   */
  pauseOnHover?: boolean;

  /**
   * Pause on mobile touch
   */
  pauseOnTouch?: boolean;

  /**
   * Root wrapper class
   */
  className?: string;

  /**
   * Moving track class
   */
  trackClassName?: string;
}
