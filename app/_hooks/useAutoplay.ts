import Autoplay from "embla-carousel-autoplay";

export function useAutoplay(enabled: boolean) {
  if (!enabled) return [];

  return [
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  ];
}
