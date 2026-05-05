// types.ts
import { EmblaOptionsType } from "embla-carousel";

export interface CarouselSlideData {
  id: string | number;
  render: () => React.ReactNode;
}

export interface CarouselProps {
  slides: CarouselSlideData[];
  options?: EmblaOptionsType;
  autoplay?: boolean;
  parallax?: boolean;
  className?: string;
}
