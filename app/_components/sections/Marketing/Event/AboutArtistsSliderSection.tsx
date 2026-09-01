"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

export interface ArtistItem {
  _id?: string;
  name?: string;
  role?: string;
  ProfileImage?: string;
  about?: string;
  galleryImages?: string[];
  image?: string; // Fallback compatibility with Event model
}

export interface AboutArtistsSliderSectionProps {
  /** Optional custom section heading, defaults to "ABOUT ARTIST" */
  title?: string;
  /** Artists list directly populated from event.artists */
  artists?: ArtistItem[];
  /** Optional class overrides */
  className?: string;
  /** Autoplay delay interval in ms, default 5000 (0 to disable) */
  autoplayDelay?: number;
}

/** Fallback artist data accurately matching the design mockup when artists are not yet configured */
export const DEFAULT_EVENT_ARTISTS: ArtistItem[] = [
  {
    _id: "dance-india-1",
    name: "Dance India",
    role: "Dance Crew",
    ProfileImage: "/gallery/gallery_1.webp",
    galleryImages: ["/gallery/gallery_1.webp"],
    about:
      "A high-energy dance crew bringing powerful moves, modern beats, and cultural expressions together. Their performances light up the stage and create unforgettable moments for every audience.",
  },
  {
    _id: "dance-india-2",
    name: "Dance India",
    role: "Dance Crew",
    ProfileImage: "/gallery/gallery_2.webp",
    galleryImages: ["/gallery/gallery_2.webp"],
    about:
      "A high-energy dance crew bringing powerful moves, modern beats, and cultural expressions together. Their performances light up the stage and create unforgettable moments for every audience.",
  },
  {
    _id: "dance-india-3",
    name: "Dance India",
    role: "Dance Crew",
    ProfileImage: "/gallery/gallery_3.webp",
    galleryImages: ["/gallery/gallery_3.webp"],
    about:
      "A high-energy dance crew bringing powerful moves, modern beats, and cultural expressions together. Their performances light up the stage and create unforgettable moments for every audience.",
  },
  {
    _id: "dance-india-4",
    name: "Sachet-Parampara",
    role: "Devotional Duo",
    ProfileImage: "/artists/sachet_parampara/image1.png",
    galleryImages: ["/artists/sachet_parampara/image1.png"],
    about:
      "A powerful musical duo known for blending traditional bhajans with contemporary beats. Their devotional melodies connect deeply across generations.",
  },
  {
    _id: "dance-india-5",
    name: "Hansraj Raghuwanshi",
    role: "Folk & Bhajan Artist",
    ProfileImage: "/artists/hansraj_raghuwanshi/image1.png",
    galleryImages: ["/artists/hansraj_raghuwanshi/image1.png"],
    about:
      "Famous for energetic Shiva bhajans, bringing high-energy folk and spiritual vibrations that light up the stage and leave an indelible impression.",
  },
];

/**
 * Resolves the display image URL from artist API data safely
 */
function resolveArtistImage(artist: ArtistItem, fallbackIdx: number): string {
  if (artist.ProfileImage && artist.ProfileImage.trim()) {
    return artist.ProfileImage.trim();
  }
  if (
    artist.galleryImages &&
    artist.galleryImages.length > 0 &&
    artist.galleryImages[0]?.trim()
  ) {
    return artist.galleryImages[0].trim();
  }
  if (artist.image && artist.image.trim()) {
    return artist.image.trim();
  }
  // Safe curated fallback
  const fallbacks = [
    "/gallery/gallery_1.webp",
    "/gallery/gallery_2.webp",
    "/gallery/gallery_3.webp",
  ];
  return fallbacks[fallbackIdx % fallbacks.length];
}

export default function AboutArtistsSliderSection({
  title = "ABOUT ARTIST",
  artists,
  className,
  autoplayDelay = 5000,
}: AboutArtistsSliderSectionProps) {
  // Normalize and clean artist items
  const cleanArtists =
    artists && artists.length > 0
      ? artists.filter(
          (a) => (a.name && a.name.trim()) || (a.about && a.about.trim()),
        )
      : DEFAULT_EVENT_ARTISTS;

  const displayArtists =
    cleanArtists.length > 0 ? cleanArtists : DEFAULT_EVENT_ARTISTS;

  // We only activate carousel looping/sliding if there is more than 1 item
  const canSlide = displayArtists.length > 1;

  // Embla Carousel Setup with Autoplay
  const plugins =
    autoplayDelay > 0 && canSlide
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement,
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

  return (
    <section
      aria-labelledby="about-artists-slider-heading"
      className={clsx(
        "w-full py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-[#FAF8F5] relative overflow-hidden",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Heading - Exact Typography: Playfair, Maroon/Burgundy #740E0A, Uppercase */}
        <ScrollReveal animation="fade-down" duration={750} threshold={0.15} className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            id="about-artists-slider-heading"
            className={clsx(
              playfair.className,
              "text-[clamp(1.75rem,calc(1.286rem+2.321vw),2.75rem)] font-bold text-[#740E0A] tracking-[0.18em] uppercase leading-tight",
            )}
          >
            {title}
          </h2>
        </ScrollReveal>

        {/* Carousel / Slider Container with side navigation arrows */}
        <ScrollReveal animation="fade-left" duration={800} delay={80} threshold={0.1} className="relative group/artist-slider">
          {/* Left Arrow Button */}
          {canSlide && (
            <button
              type="button"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous artist slide"
              className={clsx(
                "absolute -left-2 sm:-left-4 lg:-left-7 top-1/2 -translate-y-1/2 z-20",
                "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center",
                "bg-white border border-stone-200 shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
                "text-[#D4AF37] hover:text-[#740E0A] hover:border-[#D4AF37]/60 hover:shadow-[0_6px_20px_rgba(212,175,55,0.25)]",
                "transition-all duration-300 transform hover:scale-105 active:scale-95",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A]/30 disabled:opacity-40 disabled:pointer-events-none",
              )}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 stroke-[2.5]" />
            </button>
          )}

          {/* Carousel Viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing px-1 py-2"
          >
            <div className="flex -ml-5 sm:-ml-6 lg:-ml-7 xl:-ml-8 touch-pan-y">
              {displayArtists.map((artist, idx) => {
                const imgSrc = resolveArtistImage(artist, idx);
                const artistName = artist.name?.trim() || "Dance India";
                const artistAbout =
                  artist.about?.trim() ||
                  "A high-energy dance crew bringing powerful moves, modern beats, and cultural expressions together. Their performances light up the stage and create unforgettable moments for every audience.";

                return (
                  <div
                    key={artist._id || `artist-${idx}`}
                    className={clsx(
                      "min-w-0 pl-5 sm:pl-6 lg:pl-7 xl:pl-8 shrink-0",
                      // Responsive Columns:
                      // < 640px: 1 slide (88% width so peek works) or full 100%
                      // 640px - 1023px (tablets): 2 slides (50%)
                      // 1024px+ (Desktop): exactly 3 slides (33.333333%) as per design
                      "flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]",
                    )}
                  >
                    {/* White Card Container */}
                    <article
                      className={clsx(
                        "h-full flex flex-col rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-4 lg:p-4.5",
                        "border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-stone-300",
                        "transition-all duration-300 transform-gpu hover:-translate-y-1.5 group/card",
                      )}
                    >
                      {/* Top Image Container inside white card with smooth rounded corners */}
                      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-stone-100 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
                        <Image
                          src={imgSrc}
                          alt={`${artistName} stage performance`}
                          fill
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                          priority={idx < 3}
                        />

                        {/* Subtle inner ring overlay */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl sm:rounded-2xl pointer-events-none" />
                      </div>

                      {/* Card Content (Title & Description) inside White Card */}
                      <div className="pt-4 sm:pt-5 pb-2 px-1 flex flex-col grow text-left">
                        <h3
                          className={clsx(
                            playfair.className,
                            "text-xl sm:text-2xl font-bold text-[#740E0A] tracking-tight leading-snug transition-colors duration-300 group-hover/card:text-[#9A3412]",
                          )}
                        >
                          {artistName}
                        </h3>

                        <p
                          className={clsx(
                            poppins.className,
                            "mt-2.5 sm:mt-3 text-xs sm:text-[0.835rem] text-[#555555] font-normal leading-relaxed tracking-normal line-clamp-4",
                          )}
                        >
                          {artistAbout}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          {canSlide && (
            <button
              type="button"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next artist slide"
              className={clsx(
                "absolute -right-2 sm:-right-4 lg:-right-7 top-1/2 -translate-y-1/2 z-20",
                "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center",
                "bg-white border border-stone-200 shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
                "text-[#D4AF37] hover:text-[#740E0A] hover:border-[#D4AF37]/60 hover:shadow-[0_6px_20px_rgba(212,175,55,0.25)]",
                "transition-all duration-300 transform hover:scale-105 active:scale-95",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#740E0A]/30 disabled:opacity-40 disabled:pointer-events-none",
              )}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 stroke-[2.5]" />
            </button>
          )}
        </ScrollReveal>

        {/* Carousel Pagination Dots (Mobile & Tablet enhancement) */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 lg:mt-10">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={clsx(
                  "transition-all duration-300 rounded-full cursor-pointer focus:outline-none",
                  selectedIndex === idx
                    ? "w-7 h-2 bg-[#740E0A] shadow-sm"
                    : "w-2 h-2 bg-stone-300 hover:bg-[#740E0A]/40",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
