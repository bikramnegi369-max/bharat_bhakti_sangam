"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, ChevronRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import VideoReviewModal, { DivineVideoReviewItem } from "./VideoReviewModal";
import { footerConfig } from "@/_config/Footer.config";
import { SocialLink } from "@/_types/Footer.types";

export interface InstaHighlightItem {
  id: string | number;
  title?: string;
  subtitle?: string;
  posterSrc: string;
  videoSrc?: string;
  duration?: string;
  category?: string;
}

export interface InstaHighlightsSectionProps {
  titlePrefix?: string;
  titleSuffix?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  highlights?: InstaHighlightItem[];
  socials?: SocialLink[];
  autoplayDelay?: number;
  className?: string;
}

export const DEFAULT_INSTA_HIGHLIGHTS: InstaHighlightItem[] = [
  {
    id: "highlight-1",
    title: "BBS Mahotsav Grand Celebration",
    subtitle: "Sacred Harmonies",
    posterSrc: "/gallery/gallery_1.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:45",
    category: "Mahotsav",
  },
  {
    id: "highlight-2",
    title: "Devotional Kirtan Ecstasy",
    subtitle: "Divine Awakening",
    posterSrc: "/gallery/gallery_2.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:12",
    category: "Kirtan",
  },
  {
    id: "highlight-3",
    title: "Mesmerizing Ghat Aarti",
    subtitle: "Vibrant Community",
    posterSrc: "/gallery/gallery_3.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:58",
    category: "Aarti",
  },
  {
    id: "highlight-4",
    title: "Transcendental Bhajan Night",
    subtitle: "Spiritual Joy",
    posterSrc: "/festivals/holi/holi-1.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:30",
    category: "Devotion",
  },
  {
    id: "highlight-5",
    title: "Classical Rhythms & Harmonium",
    subtitle: "Sacred Melodies",
    posterSrc: "/about_mission.webp",
    videoSrc: "/hero-video.mp4",
    duration: "0:50",
    category: "Music",
  },
  {
    id: "highlight-6",
    title: "Sacred Fellowship & Prasad",
    subtitle: "Divine Blessings",
    posterSrc: "/event.webp",
    videoSrc: "/hero-video.mp4",
    duration: "1:05",
    category: "Blessings",
  },
];

export default function InstaHighlightsSection({
  titlePrefix = "INSTA",
  titleSuffix = "Highlights",
  viewAllHref = "/gallery",
  viewAllLabel = "View All",
  highlights = DEFAULT_INSTA_HIGHLIGHTS,
  socials = footerConfig.socials,
  autoplayDelay = 5500,
  className,
}: InstaHighlightsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
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
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Lightbox Modal state
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

  // Transform highlights to DivineVideoReviewItem structure for the production modal
  const modalVideoItems: DivineVideoReviewItem[] = highlights.map((h) => ({
    id: h.id,
    title: h.title || "Instagram Highlight",
    subtitle: h.subtitle || "Bharat Bhakti Sangam",
    posterSrc: h.posterSrc,
    videoSrc: h.videoSrc || "/hero-video.mp4",
    reviewerName: "Bharat Bhakti Sangam",
    reviewerRole: "Official Highlight",
    location: "BBS Mahotsav",
    rating: 5,
  }));

  return (
    <section
      aria-labelledby="insta-highlights-heading"
      className={clsx(
        "relative w-full overflow-hidden py-14 sm:py-20 md:py-24",
        className,
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 border-b border-[#740E0A]/10 pb-4 sm:pb-6">
          {/* Main Title with Divine Crimson Underline */}
          <div className="relative">
            <h2
              id="insta-highlights-heading"
              className={clsx(
                playfair.className,
                "text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#6D1510] tracking-tight flex items-baseline gap-2",
              )}
            >
              <span className="bg-linear-to-r from-[#6D1510] via-[#851610] to-[#B31D12] bg-clip-text text-transparent">
                {titlePrefix}
              </span>
              <span className="font-normal text-[#5A100B]">{titleSuffix}</span>
            </h2>
            {/* Custom Crimson & Gold Gradient Underline Bar */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 sm:-bottom-6 left-0 w-20 sm:w-24 md:w-28 h-1 sm:h-1.25 bg-linear-to-r from-[#740E0A] via-[#B31D12] to-[#D4AF37] rounded-full z-10 shadow-[0_2px_8px_rgba(116,14,10,0.3)]"
            />
          </div>

          {/* View All Action Link */}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className={clsx(
                poppins.className,
                "inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#740E0A] hover:text-[#9B1D0E] transition-all group cursor-pointer",
              )}
            >
              <span className="tracking-wide">{viewAllLabel}</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-linear-to-tr from-[#740E0A] to-[#A3180F] group-hover:from-[#9B1D0E] group-hover:to-[#D4AF37] text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-sm group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </Link>
          )}
        </div>

        {/* Social Media Circular Badges Row with Brand Accent Colors & Micro-Glow */}
        {socials && socials.length > 0 && (
          <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-7 mb-8 sm:mb-11 flex-wrap">
            <span
              className={clsx(
                poppins.className,
                "text-xs font-semibold uppercase tracking-wider text-stone-500 mr-1 hidden sm:inline-block",
              )}
            >
              Follow Us:
            </span>
            {socials.map((social) => {
              const platform = social.platform.toLowerCase();
              return (
                <a
                  key={social.platform}
                  href={social.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  className={clsx(
                    "group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center",
                    "bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
                    "transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-105 active:scale-95",
                    "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A]/40",
                    platform === "instagram" &&
                      "hover:border-[#E1306C]/70 hover:bg-linear-to-tr hover:from-[#fd5949]/15 hover:via-[#d6249f]/10 hover:to-[#285AEB]/10 hover:shadow-[0_6px_20px_rgba(225,48,108,0.25)]",
                    platform === "youtube" &&
                      "hover:border-red-500/70 hover:bg-red-500/10 hover:shadow-[0_6px_20px_rgba(255,0,0,0.25)]",
                    platform === "facebook" &&
                      "hover:border-blue-500/70 hover:bg-blue-500/10 hover:shadow-[0_6px_20px_rgba(24,119,242,0.25)]",
                    platform === "twitter" &&
                      "hover:border-stone-800 hover:bg-stone-900 hover:text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]",
                  )}
                >
                  {platform === "instagram" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-stone-700 transition-colors duration-300 group-hover:text-[#E1306C]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ) : platform === "youtube" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-stone-700 transition-colors duration-300 group-hover:fill-[#FF0000]"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ) : platform === "facebook" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-stone-700 transition-colors duration-300 group-hover:fill-[#1877F2]"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ) : platform === "twitter" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4.5 h-4.5 fill-stone-700 transition-colors duration-300 group-hover:fill-white"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    <div className="relative w-5 h-5">
                      <Image
                        src={social.icon}
                        alt={social.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* Slider Carousel Container */}
        <div className="relative group/slider">
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y py-2">
              {highlights.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(
                      "min-w-0 pl-4 sm:pl-5 lg:pl-6",
                      // Responsiveness:
                      // <640px: 84% card width with peek
                      // 640px - 1023px: 50% (2 cards)
                      // 1024px+ (Desktop): Exactly 33.333% (3 cards as in reference design)
                      "flex-[0_0_84%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]",
                    )}
                  >
                    <div
                      onClick={() => handleOpenHighlight(index)}
                      className={clsx(
                        "group relative aspect-9/16 sm:aspect-9/15.5 lg:aspect-9/15 w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer",
                        "bg-stone-950 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(116,14,10,0.28)]",
                        "border border-stone-200/90 hover:border-[#D4AF37]/80",
                        "transition-all duration-500 ease-out transform-gpu hover:-translate-y-2",
                      )}
                    >
                      {/* Highlight Poster Image */}
                      <Image
                        src={item.posterSrc}
                        alt={item.title || "Instagram Highlight video"}
                        fill
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        priority={index < 3}
                      />

                      {/* Multi-layer ambient luxury gradients */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/35 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-linear-to-tr from-[#740E0A]/30 via-transparent to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Top Subtle Category / Duration Pill */}
                      {item.category && (
                        <div className="absolute top-4 left-4 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            className={clsx(
                              poppins.className,
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-amber-200 text-[11px] font-semibold tracking-wide shadow-md",
                            )}
                          >
                            <Sparkles className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            {item.category}
                          </span>
                        </div>
                      )}

                      {/* Center Divine Gold & Pearl Translucent Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          aria-label={`Play highlight: ${item.title || "Video"}`}
                          className={clsx(
                            "relative w-15 h-15 sm:w-17 sm:h-17 rounded-full flex items-center justify-center",
                            "bg-white/85 hover:bg-white text-stone-900 group-hover:text-[#740E0A]",
                            "backdrop-blur-md border-2 border-white/80 group-hover:border-[#D4AF37]",
                            "shadow-[0_8px_25px_rgba(0,0,0,0.35)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]",
                            "transition-all duration-300 ease-out transform group-hover:scale-115 cursor-pointer",
                          )}
                        >
                          <Play
                            className="w-6 h-6 sm:w-7 sm:h-7 fill-[#740E0A] text-[#740E0A] ml-1 transition-transform group-hover:scale-105"
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>

                      {/* Bottom Title overlay on hover */}
                      {item.title && (
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-left transform translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
                          {item.subtitle && (
                            <p
                              className={clsx(
                                poppins.className,
                                "text-[11px] sm:text-xs font-semibold text-amber-300 drop-shadow-sm uppercase tracking-wider mb-1 flex items-center gap-1.5",
                              )}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                              {item.subtitle}
                            </p>
                          )}
                          <h3
                            className={clsx(
                              playfair.className,
                              "text-base sm:text-lg lg:text-xl font-semibold text-white drop-shadow-lg leading-snug line-clamp-2",
                            )}
                          >
                            {item.title}
                          </h3>
                        </div>
                      )}

                      {/* Bottom-Right Glassmorphic Instagram Reels Badge */}
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center text-amber-200 group-hover:text-white group-hover:bg-linear-to-tr group-hover:from-[#fd5949] group-hover:to-[#d6249f] group-hover:border-white/50 transition-all duration-300 shadow-md">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots matching reference */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-12">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={clsx(
                  "transition-all duration-300 rounded-full cursor-pointer focus:outline-none",
                  selectedIndex === idx
                    ? "w-8 sm:w-10 h-2.5 bg-linear-to-r from-[#740E0A] via-[#D4AF37] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)]"
                    : "w-2.5 h-2.5 bg-stone-300 hover:bg-[#740E0A]/40",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Production Video Player Modal */}
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
