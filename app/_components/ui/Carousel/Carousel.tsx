"use client";

import { CarouselSlideData } from "@/_types/Carousel.types";
import CarouselSlide from "./CarouselSlide";
import { useCarousel } from "@/_hooks/useCarousel";
import { useMemo } from "react";

type Props = {
  slides: CarouselSlideData[];
};

export default function Carousel({ slides }: Props) {
  const {
    emblaRef,
    scrollSnaps,
    selectedIndex,
    scrollTo,
    onMouseEnter,
    onMouseLeave,
  } = useCarousel({ loop: true });

  const renderedSlides = useMemo(
    () =>
      slides.map((slide, index) => (
        <div
          key={slide.id}
          className="flex-[0_0_100%] min-w-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
        >
          <CarouselSlide
            src={slide.src}
            alt={slide.alt}
            priority={index === 0}
          />
        </div>
      )),
    [slides],
  );

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Carousel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="overflow-hidden"
        ref={emblaRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollTo(selectedIndex + 1);
          if (e.key === "ArrowLeft") scrollTo(selectedIndex - 1);
        }}
      >
        <div className="flex">{renderedSlides}</div>
      </div>

      {/* DOTS */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition ${
              index === selectedIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
