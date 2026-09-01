"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

import { lockBodyScroll, unlockBodyScroll } from "@/_utils/body-scroll-lock";

import { createPortal } from "react-dom";

export interface GalleryItem {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  location?: string;
  date?: string;
  likes?: number;
  commentsCount?: number;
  caption?: string;
}

interface InstagramLightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const emptySubscribe = () => () => {};

export default function InstagramLightboxModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: InstagramLightboxModalProps) {
  const currentItem = items[currentIndex];
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchStartY, setTouchStartY] = React.useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    },
    [isOpen, currentIndex, items.length, onClose, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;

    lockBodyScroll();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem || !mounted) return null;

  const handlePrev = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Ensure horizontal swipe is dominant and above threshold (40px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Photo Gallery Modal"
      className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300 animate-in fade-in select-none overscroll-none"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Top Floating Close & Action Bar for Mobile and Desktop */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-60 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 text-white/95 transition-all cursor-pointer border border-white/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Prev Navigation Arrow (Hidden on small mobile screens where swipe is active, visible on md+) */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="hidden md:flex absolute left-3 lg:left-5 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 active:scale-95 text-white/90 hover:text-white transition-all cursor-pointer border border-white/15 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 -translate-y-1/2 top-1/2 items-center justify-center"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Next Navigation Arrow (Hidden on small mobile screens where swipe is active, visible on md+) */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="hidden md:flex absolute right-3 lg:right-5 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 active:scale-95 text-white/90 hover:text-white transition-all cursor-pointer border border-white/15 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 -translate-y-1/2 top-1/2 items-center justify-center"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Modal Card Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-5xl max-h-[90vh] sm:max-h-[86vh] bg-[#1A1211] border border-[#522323]/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto overscroll-contain"
      >
        {/* Left Side: Photo Frame */}
        <div className="relative flex-1 bg-black/70 h-[38vh] min-h-55 sm:min-h-90 lg:h-auto lg:min-h-130 flex items-center justify-center overflow-hidden group touch-pan-y">
          <Image
            src={currentItem.src}
            alt={currentItem.alt || currentItem.title || "Sacred Moment"}
            fill
            className="object-contain p-1 sm:p-2"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
          />

          {/* Mobile Image Counter Badge */}
          <div className="absolute top-3 left-3 lg:hidden px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-medium">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Mobile Quick-Tap Navigation Overlay buttons */}
          {items.length > 1 && (
            <div className="flex md:hidden absolute inset-0 pointer-events-none justify-between items-center px-2">
              <button
                type="button"
                onClick={handlePrev}
                className="pointer-events-auto p-2 rounded-full bg-black/40 text-white/80 active:bg-black/80"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full bg-black/40 text-white/80 active:bg-black/80"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Instagram-style Sidebar Details */}
        <div className="w-full lg:w-96 xl:w-105 flex flex-col bg-[#211716] border-t lg:border-t-0 lg:border-l border-[#3D2523] text-stone-200 max-h-[46vh] sm:max-h-[48vh] lg:max-h-none">
          {/* Header Bar */}
          <div className="p-3.5 sm:p-5 border-b border-[#3D2523] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-amber-500/40 p-0.5 bg-[#370504] shrink-0">
                <Image
                  src="/logo.png"
                  alt="Bharat Bhakti Sangam"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4
                  className={`${poppins.className} font-semibold text-xs sm:text-sm text-amber-100 flex items-center gap-1.5 truncate`}
                >
                  Bharat Bhakti Sangam
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 shrink-0" />
                </h4>
                {currentItem.location && (
                  <p className="text-[11px] sm:text-xs text-stone-400 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#E86A17] shrink-0" />
                    <span className="truncate">{currentItem.location}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Body Caption & Content */}
          <div className="p-3.5 sm:p-5 flex-1 overflow-y-auto custom-scrollbar space-y-3 sm:space-y-4 text-xs sm:text-sm">
            {currentItem.title && (
              <h3
                className={`${playfair.className} text-lg sm:text-xl font-normal text-amber-200 leading-snug`}
              >
                {currentItem.title}
              </h3>
            )}

            <p
              className={`${poppins.className} text-stone-300 leading-relaxed font-normal`}
            >
              {currentItem.caption ||
                "Experiencing the divine vibration of devotional kirtan, sacred melodies, and spiritual togetherness at Bharat Bhakti Sangam."}
            </p>

            {currentItem.category && (
              <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#740E0A]/30 border border-[#740E0A]/60 text-amber-300 text-[11px] sm:text-xs font-medium">
                #{currentItem.category.replace(/\s+/g, "")}
              </div>
            )}

            {currentItem.date && (
              <div className="flex items-center gap-1.5 text-stone-400 text-[11px] sm:text-xs pt-1 sm:pt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentItem.date}</span>
              </div>
            )}
          </div>

          {/* Footer Actions & Engagement */}
          <div className="p-3.5 sm:p-5 border-t border-[#3D2523] bg-[#1A1211]/80 space-y-2.5 sm:space-y-3 shrink-0">
            <div className="flex items-center justify-between text-stone-300">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-rose-400 active:scale-95 transition-all group cursor-pointer"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-stone-200">
                    {currentItem.likes
                      ? currentItem.likes.toLocaleString()
                      : "1,248"}
                  </span>
                </button>
                <div className="flex items-center gap-1.5 text-stone-400">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs font-medium">
                    {currentItem.commentsCount || "84"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="hover:text-amber-400 active:scale-95 transition-all cursor-pointer"
                title="Share photo"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-[#3D2523]/50">
              <span>
                Photo {currentIndex + 1} of {items.length}
              </span>
              <span>Use &larr; &rarr; keys or swipe to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
