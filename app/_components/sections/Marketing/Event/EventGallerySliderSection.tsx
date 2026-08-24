"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import clsx from "clsx";
import { playfair } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import InstagramLightboxModal, {
  GalleryItem,
} from "../Home/InstagramLightboxModal";

export interface EventGalleryImageItem {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  location?: string;
  date?: string;
  likes?: number;
  commentsCount?: number;
  caption?: string;
}

export interface EventGallerySliderSectionProps {
  /** Section heading title, defaults to "EVENT GALLERY" */
  title?: string;
  /** Array of gallery images */
  images?: EventGalleryImageItem[];
  /** Autoplay interval in milliseconds (default: 5000, 0 to disable) */
  autoplayDelay?: number;
  /** Optional custom CSS classes */
  className?: string;
}

/** Curated event gallery images matching the provided reference screenshot */
export const DEFAULT_EVENT_GALLERY_IMAGES: EventGalleryImageItem[] = [
  {
    id: "gallery-1",
    src: "/gallery/gallery_1.webp",
    alt: "Grand Temple Stage and Devotee Gathering",
    title: "Grand Evening Celebration",
    category: "Mahotsav",
    location: "Varanasi Ghats, Uttar Pradesh",
    date: "Aug 2026",
    caption:
      "A grand spiritual gathering with divine aarti and thousands of devotees celebrating together.",
  },
  {
    id: "gallery-2",
    src: "/gallery/gallery_2.webp",
    alt: "Master musicians performing harmonium and tabla kirtan",
    title: "Classical Bhajan & Kirtan",
    category: "Bhajan Clubbing",
    location: "Vrindavan, Uttar Pradesh",
    date: "Jul 2026",
    caption:
      "Soulful devotional melodies played with traditional harmonium and rhythmic tabla beats.",
  },
  {
    id: "gallery-3",
    src: "/gallery/gallery_3.webp",
    alt: "Classical Devotional Dance Performance on Stage",
    title: "Sacred Cultural Dance",
    category: "Cultural",
    location: "Puri, Odisha",
    date: "Aug 2026",
    caption:
      "Vibrant cultural dance performances expressing classical devotion and timeless storytelling.",
  },
  {
    id: "gallery-4",
    src: "/festivals/holi/holi-1.webp",
    alt: "Mesmerizing Ganga Aarti along the Sacred Ghats",
    title: "Holy River Ghat Aarti",
    category: "Sacred Moments",
    location: "Haridwar, Uttarakhand",
    date: "Jun 2026",
    caption:
      "Thousands of illuminated diyas and priests conducting the sacred evening river aarti.",
  },
  {
    id: "gallery-5",
    src: "/event.webp",
    alt: "Illuminated Temple Heritage under Evening Sky",
    title: "Illuminated Temple Sanctum",
    category: "Heritage",
    location: "Ayodhya, Uttar Pradesh",
    date: "Aug 2026",
    caption:
      "Spiritual illumination and divine atmosphere across the sacred temple grounds.",
  },
  {
    id: "gallery-6",
    src: "/about_mission.webp",
    alt: "Devotees uniting in divine prayer and chants",
    title: "Divine Satsang Harmony",
    category: "Devotion",
    location: "Mathura, Uttar Pradesh",
    date: "Jul 2026",
    caption:
      "Devotees coming together in unity, meditation, and sacred chants.",
  },
];

export default function EventGallerySliderSection({
  title = "EVENT GALLERY",
  images = DEFAULT_EVENT_GALLERY_IMAGES,
  autoplayDelay = 4500,
  className,
}: EventGallerySliderSectionProps) {
  const displayImages =
    images && images.length > 0 ? images : DEFAULT_EVENT_GALLERY_IMAGES;
  const canSlide = displayImages.length > 1;

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Embla Carousel Setup with optional Autoplay
  const plugins =
    autoplayDelay > 0 && canSlide
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]
      : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: canSlide,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    plugins,
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(!canSlide);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(!canSlide);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Convert items to GalleryItem type expected by modal
  const modalItems: GalleryItem[] = displayImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.title || "Event Gallery Photo",
    category: img.category || "Event Gallery",
    location: img.location || "Bharat Bhakti Sangam",
    date: img.date || "2026",
    caption: img.caption,
  }));

  return (
    <section
      aria-labelledby="event-gallery-heading"
      className={clsx(
        "w-full py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] relative overflow-hidden",
        className,
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative gold filigree dashes matching the reference image */}
        <ScrollReveal animation="fade-down" duration={750} threshold={0.15}>
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6 sm:mb-8 md:mb-10">
            {/* Left Decorative Gold Wing Graphic */}
            <div
              aria-hidden="true"
              className="flex items-center gap-1 sm:gap-1.5 text-[#D4AF37] select-none"
            >
              <span className="w-4 sm:w-6 md:w-8 h-[1.5px] bg-linear-to-r from-transparent to-[#D4AF37]" />
              <span className="inline-block w-1.5 h-3 border border-[#D4AF37] rounded-[1px]" />
              <span className="w-2 sm:w-3.5 h-[1.5px] bg-[#D4AF37]" />
            </div>

            <h2
              id="event-gallery-heading"
              className={clsx(
                playfair.className,
                "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#740E0A] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-center leading-none",
              )}
            >
              {title}
            </h2>

            {/* Right Decorative Gold Wing Graphic */}
            <div
              aria-hidden="true"
              className="flex items-center gap-1 sm:gap-1.5 text-[#D4AF37] select-none"
            >
              <span className="w-2 sm:w-3.5 h-[1.5px] bg-[#D4AF37]" />
              <span className="inline-block w-1.5 h-3 border border-[#D4AF37] rounded-[1px]" />
              <span className="w-4 sm:w-6 md:w-8 h-[1.5px] bg-linear-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Container with smooth slide from right */}
        <ScrollReveal animation="fade-right" duration={800} delay={80} threshold={0.1} className="relative group/gallery-slider">
          {/* Left Navigation Chevron Button */}
          {canSlide && (
            <button
              type="button"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous gallery image"
              className={clsx(
                "absolute -left-2 sm:-left-3 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20",
                "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center",
                "bg-white/95 backdrop-blur-sm border border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
                "text-[#E86A17] hover:text-[#740E0A] hover:border-[#D4AF37]/60 hover:shadow-[0_6px_20px_rgba(232,106,23,0.25)]",
                "transition-all duration-300 transform hover:scale-105 active:scale-95",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A]/30 disabled:opacity-30 disabled:pointer-events-none",
              )}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          )}

          {/* Carousel Viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing px-1 py-2"
          >
            <div className="flex -ml-3 sm:-ml-4 md:-ml-5 lg:-ml-6 touch-pan-y">
              {displayImages.map((img, idx) => (
                <div
                  key={img.id || `gallery-item-${idx}`}
                  className={clsx(
                    "min-w-0 pl-3 sm:pl-4 md:pl-5 lg:pl-6 shrink-0",
                    // Responsive column breakdown:
                    // Mobile (< 640px): 75% slide peek
                    // Tablet portrait (640px - 767px): 2 slides (50%)
                    // Tablet landscape (768px - 1023px): 3 slides (33.333%)
                    // Desktop / 1024px+ : exactly 5 slides (20%) matching reference layout
                    "flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_33.333333%] lg:flex-[0_0_20%]",
                  )}
                >
                  <div
                    onClick={() => openLightbox(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(idx);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View photo ${idx + 1}: ${img.alt || img.title || "Gallery image"}`}
                    className={clsx(
                      "group relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden",
                      "bg-stone-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-stone-200/60",
                      "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] hover:border-[#D4AF37]/50",
                      "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:ring-offset-2",
                    )}
                  >
                    {/* Image with Next.js optimization */}
                    <Image
                      src={img.src}
                      alt={img.alt || `Event photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                      loading={idx < 5 ? "eager" : "lazy"}
                    />

                    {/* Subtle gradient vignette at bottom */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Expand icon hover preview badge */}
                    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Chevron Button */}
          {canSlide && (
            <button
              type="button"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next gallery image"
              className={clsx(
                "absolute -right-2 sm:-right-3 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20",
                "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center",
                "bg-white/95 backdrop-blur-sm border border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
                "text-[#E86A17] hover:text-[#740E0A] hover:border-[#D4AF37]/60 hover:shadow-[0_6px_20px_rgba(232,106,23,0.25)]",
                "transition-all duration-300 transform hover:scale-105 active:scale-95",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A]/30 disabled:opacity-30 disabled:pointer-events-none",
              )}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          )}
        </ScrollReveal>

        {/* Carousel Pagination Dots matching the design */}
        {scrollSnaps.length > 1 && (
          <div
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
            role="tablist"
            aria-label="Event gallery slide pagination"
          >
            {scrollSnaps.map((_, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className={clsx(
                    "transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#740E0A]/40",
                    isActive
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#740E0A] scale-110 shadow-sm"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-stone-300 hover:bg-stone-400 opacity-60 hover:opacity-100",
                  )}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal on Image Click */}
      <InstagramLightboxModal
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        items={modalItems}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
