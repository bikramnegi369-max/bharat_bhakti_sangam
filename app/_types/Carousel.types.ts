import { EmblaOptionsType } from "embla-carousel";

export type CarouselSlideData = {
  id: number;
  src: string;
  alt?: string;
};

export interface CarouselProps {
  slides: CarouselSlideData[];
  options?: EmblaOptionsType;
  autoplay?: boolean;
  parallax?: boolean;
  className?: string;
}

export type UseCarouselReturn = {
  emblaRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
