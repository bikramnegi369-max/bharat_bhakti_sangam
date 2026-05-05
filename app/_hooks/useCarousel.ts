"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useAutoplay } from "./useAutoplay";
import { useParallax } from "./useParallax";

export function useCarousel(
  options?: EmblaOptionsType,
  autoplay = true,
  parallax = true,
) {
  const plugins = useAutoplay(autoplay);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      duration: 25,
      ...options,
    },
    plugins,
  );

  useParallax(emblaApi, parallax);

  return { emblaRef, emblaApi };
}
