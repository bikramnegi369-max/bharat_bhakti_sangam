"use client";

import { useCarousel } from "@/_hooks/useCarousel";
import { CarouselProps } from "@/_types/Carousel.types";
import clsx from "clsx";

export function Carousel({
  slides,
  options,
  autoplay = true,
  parallax = true,
  className,
}: CarouselProps) {
  const { emblaRef } = useCarousel(options, autoplay, parallax);

  return (
    <div className={clsx("embla overflow-hidden", className)} ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="embla__slide flex-[0_0_100%] min-w-0 relative"
          >
            {slide.node}
          </div>
        ))}
      </div>
    </div>
  );
}
