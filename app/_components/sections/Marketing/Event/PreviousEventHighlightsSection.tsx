"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, ChevronRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import VideoReviewModal, {
  DivineVideoReviewItem,
} from "../Home/VideoReviewModal";

export interface PreviousEventHighlightItem {
  id: string | number;
  title?: string;
  subtitle?: string;
  posterSrc: string;
  videoSrc?: string;
  duration?: string;
  category?: string;
  location?: string;
}

export interface PreviousEventHighlightsSectionProps {
  /** Main section title (defaults to "Previous Event Highlights") */
  title?: string;
  /** View All target link href (defaults to "/gallery") */
  viewAllHref?: string;
  /** View All label text (defaults to "View All") */
  viewAllLabel?: string;
  /** Highlight items array */
  highlights?: PreviousEventHighlightItem[];
  /** Autoplay delay interval in ms (defaults to 5000, 0 to disable) */
  autoplayDelay?: number;
  /** Optional custom CSS classes */
  className?: string;
}

/** Default highlights matching the previous events reference image */
export const DEFAULT_PREVIOUS_EVENT_HIGHLIGHTS: PreviousEventHighlightItem[] = [
  {
    id: "highlight-1",
    title: "BBS Mahotsav Grand Celebration",
    subtitle: "Sacred Harmonies",
    posterSrc: "/gallery/gallery_1.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:45",
    category: "Mahotsav",
    location: "Varanasi Ghats, UP",
  },
  {
    id: "highlight-2",
    title: "Devotional Kirtan & Rasleela",
    subtitle: "Divine Awakening",
    posterSrc: "/gallery/gallery_2.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:12",
    category: "Kirtan",
    location: "Vrindavan, UP",
  },
  {
    id: "highlight-3",
    title: "Divine Evening Ganga Aarti",
    subtitle: "Vibrant Community",
    posterSrc: "/gallery/gallery_3.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:58",
    category: "Aarti",
    location: "Haridwar Ghats",
  },
  {
    id: "highlight-4",
    title: "Transcendental Bhajan Night",
    subtitle: "Spiritual Joy",
    posterSrc: "/festivals/holi/holi-1.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:30",
    category: "Devotion",
    location: "Mathura, UP",
  },
  {
    id: "highlight-5",
    title: "Classical Rhythms & Harmonium",
    subtitle: "Sacred Melodies",
    posterSrc: "/about_mission.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:50",
    category: "Music",
    location: "Ayodhya Dham",
  },
  {
    id: "highlight-6",
    title: "Sacred Fellowship & Prasad",
    subtitle: "Divine Blessings",
    posterSrc: "/event.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:05",
    category: "Blessings",
    location: "Gurugram, Haryana",
  },
];

export default function PreviousEventHighlightsSection({
  title = "Previous Event Highlights",
  viewAllHref = "/gallery",
  viewAllLabel = "View All",
  highlights = DEFAULT_PREVIOUS_EVENT_HIGHLIGHTS,
  autoplayDelay = 5000,
  className,
}: PreviousEventHighlightsSectionProps) {
  const displayItems =
    highlights && highlights.length > 0
      ? highlights
      : DEFAULT_PREVIOUS_EVENT_HIGHLIGHTS;
  const canSlide = displayItems.length > 1;

  // Embla Carousel configuration with auto-sliding
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Video review modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleOpenHighlight = (index: number) => {
    setActiveHighlightIndex(index);
    setModalOpen(true);
  };

  // Transform highlights to VideoReviewModal item format
  const modalVideoItems: DivineVideoReviewItem[] = displayItems.map((h) => ({
    id: h.id,
    title: h.title || "Previous Event Highlight",
    subtitle: h.subtitle || "Bharat Bhakti Sangam",
    posterSrc: h.posterSrc,
    videoSrc: h.videoSrc || "/hero-video.mp4",
    reviewerName: "Bharat Bhakti Sangam",
    reviewerRole: "Event Highlight",
    location: h.location || "BBS Mahotsav",
    rating: 5,
  }));

  return (
    <section
      aria-labelledby="previous-event-highlights-heading"
      className={clsx(
        "relative w-full py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] overflow-hidden",
        className,
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title with decorative underline and View All CTA */}
        <ScrollReveal animation="fade-right" duration={750} threshold={0.15} className="flex items-end justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
          {/* Title with solid accent underline matching the reference design */}
          <div className="relative inline-block">
            <h2
              id="previous-event-highlights-heading"
              className={clsx(
                playfair.className,
                "text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium text-[#740E0A] tracking-tight leading-tight",
              )}
            >
              {title}
            </h2>
            {/* Dark Red Solid Underline Bar */}
            <div
              aria-hidden="true"
              className="mt-2.5 sm:mt-3 w-16 sm:w-20 md:w-24 h-1 sm:h-1.25 bg-[#740E0A] rounded-full"
            />
          </div>

          {/* View All Button */}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className={clsx(
                poppins.className,
                "inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#740E0A] hover:text-[#9B1D0E] transition-all duration-300 group cursor-pointer shrink-0 pb-1",
              )}
            >
              <span className="tracking-normal">{viewAllLabel}</span>
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#740E0A] group-hover:bg-[#9B1D0E] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm">
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </Link>
          )}
        </ScrollReveal>

        {/* Carousel Slider with smooth fade-up entrance */}
        <ScrollReveal animation="fade-up" duration={800} delay={60} threshold={0.1} className="relative group/slider">
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing px-0.5 py-2"
          >
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y">
              {displayItems.map((item, index) => (
                <div
                  key={item.id || `highlight-${index}`}
                  className={clsx(
                    "min-w-0 pl-4 sm:pl-5 lg:pl-6 shrink-0",
                    // Responsive column breakdown:
                    // Mobile (< 640px): 82% slide peek
                    // Tablet (640px - 1023px): 50% (2 cards)
                    // Desktop / 1024px+ : exactly 33.333% (3 vertical cards matching reference)
                    "flex-[0_0_82%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]",
                  )}
                >
                  <div
                    onClick={() => handleOpenHighlight(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenHighlight(index);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Watch highlight: ${item.title || `Event highlight ${index + 1}`}`}
                    className={clsx(
                      "group relative aspect-9/16 sm:aspect-9/15.5 lg:aspect-9/15 w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer",
                      "bg-stone-900 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_36px_rgba(116,14,10,0.22)]",
                      "border border-stone-200/80 hover:border-[#D4AF37]/70",
                      "transition-all duration-500 ease-out transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:ring-offset-2",
                    )}
                  >
                    {/* Background Poster Image */}
                    <Image
                      src={item.posterSrc}
                      alt={item.title || "Previous event highlight poster"}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index < 3}
                    />

                    {/* Subtle Overlay Gradients */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/25 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-linear-to-tr from-[#740E0A]/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Center Translucent Glass Play Button matching reference */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={clsx(
                          "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center",
                          "bg-white/80 group-hover:bg-white text-stone-900",
                          "backdrop-blur-md border border-white/70 group-hover:border-[#D4AF37]/80",
                          "shadow-[0_4px_20px_rgba(0,0,0,0.25)] group-hover:shadow-[0_0_24px_rgba(255,255,255,0.7)]",
                          "transition-all duration-300 ease-out transform group-hover:scale-110",
                        )}
                      >
                        <Play
                          className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white ml-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Bottom Right Glass Badge / Pill matching the image */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                      <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md sm:rounded-lg bg-white/90 backdrop-blur-md shadow-md border border-white/60 flex items-center justify-center">
                        <div className="w-5 h-2.5 sm:w-6 sm:h-3 rounded-xs bg-stone-300/80" />
                      </div>
                    </div>

                    {/* Optional Item Category Pill on top left */}
                    {item.category && (
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          className={clsx(
                            poppins.className,
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide shadow-md",
                          )}
                        >
                          <Sparkles className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Pagination Dots matching the design */}
        {scrollSnaps.length > 1 && (
          <div
            className="flex items-center justify-center gap-2 mt-7 sm:mt-10"
            role="tablist"
            aria-label="Previous event highlights slide navigation"
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
                    "transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#740E0A]/40 cursor-pointer",
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

      {/* Production Video Player Lightbox Modal */}
      <VideoReviewModal
        isOpen={modalOpen}
        currentIndex={activeHighlightIndex}
        items={modalVideoItems}
        onClose={() => setModalOpen(false)}
        onNavigate={(newIdx) => setActiveHighlightIndex(newIdx)}
      />
    </section>
  );
}
