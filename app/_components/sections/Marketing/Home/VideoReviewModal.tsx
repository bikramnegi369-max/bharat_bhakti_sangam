"use client";

import React, { useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Sparkles,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import clsx from "clsx";

import { lockBodyScroll, unlockBodyScroll } from "@/_utils/body-scroll-lock";

import { createPortal } from "react-dom";

export interface DivineVideoReviewItem {
  id: string | number;
  title: string;
  subtitle?: string;
  reviewerName?: string;
  reviewerRole?: string;
  location?: string;
  rating?: number;
  posterSrc: string;
  videoSrc?: string;
  quote?: string;
}

interface VideoReviewModalProps {
  isOpen: boolean;
  currentIndex: number;
  items: DivineVideoReviewItem[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const emptySubscribe = () => () => {};

export default function VideoReviewModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: VideoReviewModalProps) {
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
      aria-label="Divine Review Video Player"
      className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in select-none overscroll-none"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-60 p-2.5 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 text-white/90 hover:text-white transition-all cursor-pointer border border-[#D4AF37]/40 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Close video player"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation: Prev Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="hidden sm:flex absolute left-3 md:left-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-[#E8C267] hover:text-white transition-all cursor-pointer border border-[#D4AF37]/40 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] -translate-y-1/2 top-1/2 items-center justify-center"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Navigation: Next Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="hidden sm:flex absolute right-3 md:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-[#E8C267] hover:text-white transition-all cursor-pointer border border-[#D4AF37]/40 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] -translate-y-1/2 top-1/2 items-center justify-center"
          aria-label="Next video"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-3xl lg:max-w-4xl max-h-[88vh] bg-linear-to-b from-[#250302] via-[#1A0302] to-[#120202] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col overscroll-contain my-auto"
      >
        {/* Video Player Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#D4AF37]/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#E8C267]" />
            <span
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold tracking-wider text-[#E8C267] uppercase",
              )}
            >
              {currentItem.subtitle || "Divine Experience"}
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-medium">
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
          {currentItem.videoSrc ? (
            <video
              key={currentItem.id}
              src={currentItem.videoSrc}
              controls
              autoPlay
              playsInline
              poster={currentItem.posterSrc}
              className="w-full h-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-300">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mb-3">
                <Play className="w-8 h-8 text-[#E8C267] fill-[#E8C267]/40 ml-1" />
              </div>
              <p className="text-sm font-medium text-white">
                Video preview not available
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Please attach a valid videoSrc source.
              </p>
            </div>
          )}
        </div>

        {/* Video Footer Metadata */}
        <div className="p-5 sm:p-6 bg-linear-to-t from-black/60 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3
                className={clsx(
                  playfair.className,
                  "text-lg sm:text-xl font-medium text-white",
                )}
              >
                {currentItem.title}
              </h3>
              {currentItem.reviewerName && (
                <p
                  className={clsx(
                    poppins.className,
                    "text-xs sm:text-sm text-[#E8C267] font-medium mt-0.5",
                  )}
                >
                  {currentItem.reviewerName}
                  {currentItem.location && ` • ${currentItem.location}`}
                </p>
              )}
            </div>

            {currentItem.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: currentItem.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#E8C267] text-[#E8C267]"
                  />
                ))}
              </div>
            )}
          </div>

          {currentItem.quote && (
            <p
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm text-neutral-300/90 italic mt-3 line-clamp-2",
              )}
            >
              &ldquo;{currentItem.quote}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
