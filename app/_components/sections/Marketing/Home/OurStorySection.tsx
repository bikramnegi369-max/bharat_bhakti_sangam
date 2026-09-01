"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Music,
  Flame,
  Landmark,
  Users,
  Play,
  X,
  ArrowRight,
} from "lucide-react";

import ScrollReveal from "@/_components/common/ScrollReveal";
import { lockBodyScroll, unlockBodyScroll } from "@/_utils/body-scroll-lock";
import { createPortal } from "react-dom";

export interface StoryFeatureItem {
  id?: string | number;
  icon: React.ElementType;
  text: string;
}

export interface OurStorySectionProps {
  eyebrow?: string;
  titlePrefix?: string;
  highlightedWord?: string;
  titleSuffix?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  videoSrc?: string;
  posterSrc?: string;
  features?: StoryFeatureItem[];
  className?: string;
}

const DEFAULT_FEATURES: StoryFeatureItem[] = [
  {
    id: 1,
    icon: Music,
    text: "Soulful music & cultural performances by leading spiritual artists.",
  },
  {
    id: 2,
    icon: Flame,
    text: "Connect with devotion and positive energy in a sacred atmosphere.",
  },
  {
    id: 3,
    icon: Landmark,
    text: "Celebrating our rich heritage and traditions through modern art forms.",
  },
  {
    id: 4,
    icon: Users,
    text: "Bringing thousands of people together in a shared spiritual journey.",
  },
];

const emptySubscribe = () => () => {};

export default function OurStorySection({
  eyebrow = "OUR STORY",
  titlePrefix = "Where",
  highlightedWord = "Devotion",
  titleSuffix = "Meets Celebration",
  description = "Bharat Bhakti Sangam is more than a concert — it's a movement redefining how India experiences spirituality. From interactive kirtan sessions to soul-stirring live performances, every event creates a powerful connection between music, energy, and devotion.",
  ctaText = "Know more about us",
  ctaHref = "/about",
  videoSrc = "/hero-video.mp4",
  posterSrc = "/welcome.webp",
  features = DEFAULT_FEATURES,
  className,
}: OurStorySectionProps) {
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!isPlayingModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPlayingModal(false);
      }
    };

    lockBodyScroll();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlayingModal]);

  return (
    <section
      aria-labelledby="our-story-heading"
      className={clsx(
        "relative w-full py-[clamp(3rem,calc(2rem+4vw),6rem)] overflow-hidden",
        className,
      )}
    >
      {/* Background Decorative Mandala Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 opacity-30 select-none z-0 animate-float"
      >
        <Image
          src="/mandala.webp"
          alt=""
          fill
          sizes="384px"
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* ========================================================================= */}
          {/* COLUMN 1: Story Text & Action (4 Cols) */}
          {/* ========================================================================= */}
          <ScrollReveal
            animation="fade-right"
            duration={850}
            threshold={0.15}
            className="lg:col-span-4 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.2em] font-semibold text-primary mb-3 sm:mb-4">
              {eyebrow}
            </span>

            {/* Heading */}
            <h2
              id="our-story-heading"
              className={clsx(
                playfair.className,
                "text-[clamp(2.25rem,3.2vw,3.5rem)] text-heading font-medium leading-[1.15] tracking-tight",
              )}
            >
              {titlePrefix}{" "}
              <span className="italic font-normal text-primary">
                {highlightedWord}
              </span>
              <br />
              {titleSuffix}
            </h2>

            {/* Description */}
            <p
              className={clsx(
                poppins.className,
                "mt-5 sm:mt-6 text-[clamp(0.938rem,1.05vw,1.05rem)] text-para leading-relaxed sm:leading-loose font-normal",
              )}
            >
              {description}
            </p>

            {/* CTA Button */}
            <div className="mt-7 sm:mt-9">
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-[15px] font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* COLUMN 2: Central Video Showcase Card (4 Cols) */}
          {/* ========================================================================= */}
          <ScrollReveal
            animation="scale-up"
            delay={120}
            duration={900}
            threshold={0.15}
            className="lg:col-span-4 flex justify-center py-2 lg:py-0"
          >
            <div
              className="relative w-full max-w-85 sm:max-w-95 lg:max-w-none aspect-3/4 sm:aspect-4/5 lg:aspect-9/13 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] group cursor-pointer border border-amber-950/10 bg-neutral-900"
              onClick={() => setIsPlayingModal(true)}
              role="button"
              tabIndex={0}
              aria-label="Play story video"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsPlayingModal(true);
                }
              }}
            >
              {/* Poster Image */}
              <Image
                src={posterSrc}
                alt="Bharat Bhakti Sangam Story Video"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />

              {/* Ambient Shadow & Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Central Glowing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Wave Ring */}
                  <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />

                  {/* Play Button Disc */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F7BD53E5] text-stone-900 flex items-center justify-center shadow-[0_10px_25px_rgba(234,179,78,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F7BD53E5]">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-stone-900 translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Subtle Bottom Badge */}
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="inline-block px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium tracking-wide">
                  Watch Our Journey
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* COLUMN 3: Right Feature Cards (4 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-4.5 w-full">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <ScrollReveal
                  key={feature.id ?? idx}
                  animation="fade-left"
                  delay={idx * 100 + 100}
                  duration={750}
                  threshold={0.1}
                >
                  <div
                    className="group relative flex items-center gap-4.5 p-4 sm:p-5 rounded-2xl border border-neutral-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(116,14,10,0.08)] hover:border-amber-200/60 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Icon Container */}
                    <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50/80 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange group-hover:text-primary transition-colors duration-300" />
                    </div>

                    {/* Feature Text */}
                    <p
                      className={clsx(
                        poppins.className,
                        "text-[13.5px] sm:text-[14.5px] text-neutral-700 group-hover:text-neutral-900 leading-snug font-normal transition-colors duration-200",
                      )}
                    >
                      {feature.text}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* Lightbox / Video Modal */}
      {/* ========================================================================= */}
      {isPlayingModal &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Story Video Player"
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 select-none overscroll-none"
            onClick={() => setIsPlayingModal(false)}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsPlayingModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-60"
              aria-label="Close video player"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Container */}
            <div
              className="relative w-full max-w-3xl lg:max-w-4xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-auto overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                poster={posterSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
