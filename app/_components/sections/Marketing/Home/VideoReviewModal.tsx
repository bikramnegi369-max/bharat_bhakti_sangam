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

export default function VideoReviewModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: VideoReviewModalProps) {
  const currentItem = items[currentIndex];

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Divine Review Video Player"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/90 backdrop-blur-lg transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all cursor-pointer border border-[#D4AF37]/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Close video player"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation: Prev Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#E8C267] hover:text-white transition-all cursor-pointer border border-[#D4AF37]/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] -translate-y-1/2 top-1/2"
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
          className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#E8C267] hover:text-white transition-all cursor-pointer border border-[#D4AF37]/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] -translate-y-1/2 top-1/2"
          aria-label="Next video"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-linear-to-b from-[#250302] via-[#1A0302] to-[#120202] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col"
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
    </div>
  );
}
