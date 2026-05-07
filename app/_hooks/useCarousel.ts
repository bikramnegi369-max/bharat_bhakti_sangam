"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { UseCarouselReturn } from "@/_types/Carousel.types";

const TWEEN_FACTOR_BASE = 0.2;
const AUTOPLAY_DELAY = 4000;

export function useCarousel(options?: EmblaOptionsType): UseCarouselReturn {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(options?.startIndex ?? 0);

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // -----------------------------
  // Parallax
  // -----------------------------
  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api
      .slideNodes()
      .map((slide) => slide.querySelector<HTMLElement>(".parallax__layer"));
  }, []);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (api: EmblaCarouselType, eventName?: string) => {
      const engine = api.internalEngine();
      const progress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScroll = eventName === "scroll";

      api.scrollSnapList().forEach((snap, snapIndex) => {
        let diff = snap - progress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex: number) => {
          if (isScroll && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) diff = snap - (1 + progress);
                if (sign === 1) diff = snap + (1 - progress);
              }
            });
          }

          const node = tweenNodes.current[slideIndex];
          if (!node) return;

          const translate = diff * (-1 * tweenFactor.current) * 100;
          node.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    [],
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  // -----------------------------
  // Autoplay
  // -----------------------------
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;

    stopAutoplay();

    autoplayRef.current = setInterval(() => {
      // always use latest api
      if (!emblaApi) return;

      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, AUTOPLAY_DELAY);
  }, [emblaApi, stopAutoplay]);

  // -----------------------------
  // Effects
  // -----------------------------
  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    // start autoplay
    startAutoplay();

    // correct events
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", (api) => tweenParallax(api, "scroll"));
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);
    emblaApi.on("reInit", () => {
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenParallax(emblaApi);
      onSelect(emblaApi);
    });

    return () => {
      stopAutoplay();
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [
    emblaApi,
    tweenParallax,
    setTweenNodes,
    setTweenFactor,
    startAutoplay,
    stopAutoplay,
    onSelect,
  ]);

  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return {
    emblaRef,
    selectedIndex,
    scrollSnaps,
    scrollTo,
    onMouseEnter: stopAutoplay,
    onMouseLeave: startAutoplay,
  };
}
