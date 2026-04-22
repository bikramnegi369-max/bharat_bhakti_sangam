"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

import { MarqueeItem } from "./MarqueeItem";

import { MarqueeProps } from "@/_types/Marquee.types";

import {
  duplicateItems,
  getAnimationDirection,
  getDurationSeconds,
  getRepeatCount,
} from "@/_utils/marquee.utils";

export function Marquee({
  items,
  speed = 80,
  gap = 32,
  direction = "left",
  pauseOnHover = true,
  pauseOnTouch = true,
  className,
  trackClassName,
}: MarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const measureRef = useRef<HTMLDivElement>(null);

  const [paused, setPaused] = useState(false);

  const [repeatCount, setRepeatCount] = useState(2);

  const [contentWidth, setContentWidth] = useState(0);

  const [reduceMotion, setReduceMotion] = useState(false);

  /**
   * Reduced motion accessibility
   */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduceMotion(media.matches);

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  /**
   * Auto measure width
   * Fill container fully
   */
  useEffect(() => {
    const calculate = () => {
      const containerWidth = wrapperRef.current?.offsetWidth ?? 0;

      const singleWidth = measureRef.current?.scrollWidth ?? 0;

      setContentWidth(singleWidth);

      setRepeatCount(getRepeatCount(containerWidth, singleWidth));
    };

    calculate();

    const observer = new ResizeObserver(calculate);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    window.addEventListener("resize", calculate);

    return () => {
      observer.disconnect();

      window.removeEventListener("resize", calculate);
    };
  }, [items, gap]);

  /**
   * Duplicate for perfect loop
   */
  const renderedItems = useMemo(() => {
    return duplicateItems(items, repeatCount);
  }, [items, repeatCount]);

  /**
   * Dynamic duration
   */
  const duration = getDurationSeconds(contentWidth, speed);

  /**
   * Reduced motion mode
   */
  if (reduceMotion) {
    return (
      <div
        className={clsx(
          "overflow-x-auto bg-primary text-white w-full",
          className,
        )}
      >
        <div className="flex py-2" style={{ gap }}>
          {items.map((item) => (
            <MarqueeItem key={item.id}>{item.content}</MarqueeItem>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={clsx("relative overflow-hidden bg-primary w-full", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => pauseOnTouch && setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Hidden width measurement */}
      <div
        ref={measureRef}
        className="
          absolute
          invisible
          pointer-events-none
          flex
        "
        style={{ gap }}
      >
        {items.map((item) => (
          <MarqueeItem key={item.id}>{item.content}</MarqueeItem>
        ))}
      </div>

      {/* Moving track */}
      <div
        className={clsx("flex w-max marquee-track", trackClassName)}
        style={{
          gap,
          animationDuration: `${duration}s`,
          animationDirection: getAnimationDirection(direction),
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {renderedItems.map((item, index) => (
          <MarqueeItem key={`${item.id}-${index}`}>{item.content}</MarqueeItem>
        ))}
      </div>
    </div>
  );
}
