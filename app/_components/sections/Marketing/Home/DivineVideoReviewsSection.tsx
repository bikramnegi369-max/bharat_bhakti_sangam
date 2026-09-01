"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import clsx from "clsx";
import VideoReviewModal, { DivineVideoReviewItem } from "./VideoReviewModal";

export interface DivineVideoReviewsSectionProps {
  eyebrow?: string;
  title?: string;
  items?: DivineVideoReviewItem[];
  className?: string;
  autoplayDelay?: number;
}

export const DEFAULT_DIVINE_REVIEWS: DivineVideoReviewItem[] = [
  {
    id: "review-1",
    title: "Mesmerizing Ganga Aarti & Ancient Temples",
    subtitle: "Divine Awakening",
    reviewerName: "Aarav & Priya Sharma",
    reviewerRole: "Devotees",
    location: "Varanasi Ghats",
    rating: 5,
    posterSrc: "/gallery/gallery_1.webp",
    videoSrc: "/hero-video.mp4",
    quote:
      "Singing bhajans by the sacred riverside at sunset was an intensely peaceful, heart-expanding experience.",
  },
  {
    id: "review-2",
    title: "Soulful Harmonium & Divine Rhythms",
    subtitle: "Sacred Harmonies",
    reviewerName: "Pandit Ramdas & Ensemble",
    reviewerRole: "Kirtan Artists",
    location: "Vrindavan Dham",
    rating: 5,
    posterSrc: "/about_mission.webp",
    videoSrc: "/hero-video.mp4",
    quote:
      "When the harmonium and tabla synchronize with thousands of voices chanting together, devotion becomes pure bliss.",
  },
  {
    id: "review-3",
    title: "Floating Diyas & Illuminated Ghats",
    subtitle: "Vibrant Community",
    reviewerName: "Sunita & Rajesh Verma",
    reviewerRole: "Family Attendees",
    location: "Haridwar Pilgrimage",
    rating: 5,
    posterSrc: "/festivals/holi/holi-1.webp",
    videoSrc: "/hero-video.mp4",
    quote:
      "The energy of the entire gathering celebrating sacred traditions together is something words cannot fully describe.",
  },
  {
    id: "review-4",
    title: "Transcendental Kirtan & Devotional Ecstasy",
    subtitle: "Spiritual Connection",
    reviewerName: "Vikram Malhotra",
    reviewerRole: "Youth Member",
    location: "Mathura",
    rating: 5,
    posterSrc: "/gallery/gallery_2.webp",
    videoSrc: "/hero-video.mp4",
    quote:
      "Bhajan clubbing brings the younger generation together in pure joy, high vibration, and authentic devotion.",
  },
  {
    id: "review-5",
    title: "Sacred Mahaprasad & Fellowship",
    subtitle: "Divine Blessings",
    reviewerName: "Meera Singhania",
    reviewerRole: "Devotee",
    location: "Puri Dham",
    rating: 5,
    posterSrc: "/gallery/gallery_3.webp",
    videoSrc: "/hero-video.mp4",
    quote:
      "Every detail from the music to the sanctified prasad radiates purity, care, and supreme positivity.",
  },
];

export default function DivineVideoReviewsSection({
  eyebrow = "WHY YOU SHOULD BE HERE",
  title = "Experience the Divine",
  items = DEFAULT_DIVINE_REVIEWS,
  className,
  autoplayDelay = 5000,
}: DivineVideoReviewsSectionProps) {
  // Embla Carousel Hook with Autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      watchFocus: false,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 1024px)": { slidesToScroll: 1 },
      },
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Modal State for Video Lightbox
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

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

  const handleOpenVideo = (index: number) => {
    setActiveVideoIndex(index);
    setModalOpen(true);
  };

  return (
    <section
      aria-labelledby="experience-divine-heading"
      className={clsx(
        "relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 select-none",
        "bg-linear-to-b from-[#2E0403] via-[#3B0504] to-[#250302] text-white",
        className,
      )}
    >
      {/* Ambient background glow & sacred illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 sm:w-250 h-100 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(116,14,10,0.28)_45%,transparent_75%)] blur-3xl" />
        <div className="absolute -top-24 left-1/6 w-96 h-96 bg-primary/20 rounded-full blur-[110px]" />
        <div className="absolute -bottom-24 right-1/6 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching provided reference artwork */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          {/* Eyebrow with decorative golden rules */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 w-full max-w-lg mb-3">
            <span
              aria-hidden="true"
              className="h-px grow bg-linear-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/90"
            />
            <span
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.35em] text-[#E8C267] font-semibold uppercase px-2 drop-shadow-sm",
              )}
            >
              {eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="h-px grow bg-linear-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/90"
            />
          </div>

          {/* Display Heading */}
          <h2
            id="experience-divine-heading"
            className={clsx(
              playfair.className,
              "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-white tracking-tight leading-tight drop-shadow-md",
            )}
          >
            {title}
          </h2>

          {/* Distinctive Golden Underline Accent from reference image */}
          <div
            aria-hidden="true"
            className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.25 bg-linear-to-r from-[#D4AF37] via-[#F3D78A] to-[#D4AF37] rounded-full mt-4 shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Carousel Container */}
        <div className="relative group/slider">
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl"
          >
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y">
              {items.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      "min-w-0 pl-4 sm:pl-5 lg:pl-6",
                      // Responsive Breakpoint Sizing:
                      // Mobile: 85% width (peek next) or 100%
                      // Tablet (640px+): 50% (2 cards)
                      // Desktop (1024px+): 33.333% (3 cards as in reference design)
                      "flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]",
                    )}
                  >
                    <div
                      onClick={() => handleOpenVideo(index)}
                      className={clsx(
                        "group relative aspect-3/4 sm:aspect-4/5 lg:aspect-3/4 w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer",
                        "border border-[#D4AF37]/35 hover:border-[#D4AF37]/80",
                        "transition-all duration-500 ease-out",
                        "shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.2)]",
                        "hover:-translate-y-2",
                      )}
                    >
                      {/* Background Video Poster Image */}
                      <Image
                        src={item.posterSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        priority={index < 3}
                      />

                      {/* Subtle Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                      {/* Top Golden Sheen Line */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Center Glowing Gold Play Button (Reference Artwork Style) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          aria-label={`Play review video: ${item.title}`}
                          className={clsx(
                            "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center",
                            "bg-[#E8C267]/90 text-[#2E0403] group-hover:bg-[#F3D78A] group-hover:text-black",
                            "shadow-[0_0_25px_rgba(232,194,103,0.6)] group-hover:shadow-[0_0_35px_rgba(243,215,138,0.9)]",
                            "transition-all duration-300 ease-out transform group-hover:scale-115 cursor-pointer",
                          )}
                        >
                          <Play
                            className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1"
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>

                      {/* Bottom Caption / Devotee Preview Tag */}
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-left transform transition-transform duration-300">
                        {item.subtitle && (
                          <span
                            className={clsx(
                              poppins.className,
                              "inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-semibold tracking-wider text-[#E8C267] uppercase mb-1 drop-shadow-sm",
                            )}
                          >
                            <Sparkles className="w-3 h-3 text-[#E8C267]" />
                            {item.subtitle}
                          </span>
                        )}
                        <h3
                          className={clsx(
                            playfair.className,
                            "text-lg sm:text-xl font-medium text-white drop-shadow-md leading-snug line-clamp-1 group-hover:text-[#F3D78A] transition-colors",
                          )}
                        >
                          {item.title}
                        </h3>
                        {item.reviewerName && (
                          <p
                            className={clsx(
                              poppins.className,
                              "text-xs text-neutral-300/90 mt-1 font-light flex items-center gap-1.5",
                            )}
                          >
                            <span>{item.reviewerName}</span>
                            {item.location && (
                              <>
                                <span>•</span>
                                <span className="text-[#E8C267]">
                                  {item.location}
                                </span>
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls: Previous & Next Arrows */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous review slide"
            className={clsx(
              "absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
              "bg-[#250302]/85 hover:bg-[#3B0504] text-[#E8C267] hover:text-white",
              "border border-[#D4AF37]/40 hover:border-[#D4AF37]",
              "flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110",
              "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]",
            )}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next review slide"
            className={clsx(
              "absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
              "bg-[#250302]/85 hover:bg-[#3B0504] text-[#E8C267] hover:text-white",
              "border border-[#D4AF37]/40 hover:border-[#D4AF37]",
              "flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110",
              "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]",
            )}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={clsx(
                  "transition-all duration-300 rounded-full cursor-pointer focus:outline-none",
                  selectedIndex === idx
                    ? "w-8 h-2.5 bg-[#E8C267] shadow-[0_0_10px_rgba(232,194,103,0.8)]"
                    : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Lightbox */}
      <VideoReviewModal
        isOpen={modalOpen}
        currentIndex={activeVideoIndex}
        items={items}
        onClose={() => setModalOpen(false)}
        onNavigate={(newIdx) => setActiveVideoIndex(newIdx)}
      />
    </section>
  );
}
