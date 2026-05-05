import { useEffect, useCallback } from "react";
import { EmblaCarouselType } from "embla-carousel";

export function useParallax(
  emblaApi: EmblaCarouselType | undefined,
  enabled: boolean,
) {
  const applyParallax = useCallback((api: EmblaCarouselType) => {
    const progress = api.scrollProgress();
    const snaps = api.scrollSnapList();

    api.slideNodes().forEach((slide, i) => {
      const layer = slide.querySelector(".parallax") as HTMLElement | null;
      if (!layer) return;

      const diff = snaps[i] - progress;
      layer.style.transform = `translateX(${diff * -40}%)`;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi || !enabled) return;

    const handler = () => applyParallax(emblaApi);

    emblaApi.on("scroll", handler);
    emblaApi.on("reInit", handler);

    handler();

    return () => {
      emblaApi.off("scroll", handler);
      emblaApi.off("reInit", handler);
    };
  }, [emblaApi, enabled, applyParallax]);
}
