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

export default function InstagramLightboxModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: InstagramLightboxModalProps) {
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
      aria-label="Photo Gallery Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-all cursor-pointer border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-50 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-all cursor-pointer border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 -translate-y-1/2 top-1/2"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Next Navigation Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-50 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-all cursor-pointer border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 -translate-y-1/2 top-1/2"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Modal Card Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#1A1211] border border-[#522323]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        {/* Left Side: Photo Frame */}
        <div className="relative flex-1 bg-black/60 min-h-75 sm:min-h-105 lg:min-h-140 flex items-center justify-center overflow-hidden group">
          <Image
            src={currentItem.src}
            alt={currentItem.alt || currentItem.title || "Sacred Moment"}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
          />

          {/* Mobile Image Counter Badge */}
          <div className="absolute top-4 left-4 lg:hidden px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-medium">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Right Side: Instagram-style Sidebar Details */}
        <div className="w-full lg:w-95 xl:w-105 flex flex-col bg-[#211716] border-t lg:border-t-0 lg:border-l border-[#3D2523] text-stone-200">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#3D2523] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 p-0.5 bg-[#370504]">
                <Image
                  src="/logo.png"
                  alt="Bharat Bhakti Sangam"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h4
                  className={`${poppins.className} font-semibold text-sm text-amber-100 flex items-center gap-1.5`}
                >
                  Bharat Bhakti Sangam
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                </h4>
                {currentItem.location && (
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#E86A17]" />
                    <span>{currentItem.location}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Body Caption & Content */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto custom-scrollbar space-y-4 text-xs sm:text-sm">
            {currentItem.title && (
              <h3
                className={`${playfair.className} text-xl font-normal text-amber-200 leading-snug`}
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
              <div className="inline-block px-3 py-1 rounded-full bg-[#740E0A]/30 border border-[#740E0A]/60 text-amber-300 text-xs font-medium">
                #{currentItem.category.replace(/\s+/g, "")}
              </div>
            )}

            {currentItem.date && (
              <div className="flex items-center gap-1.5 text-stone-400 text-xs pt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentItem.date}</span>
              </div>
            )}
          </div>

          {/* Footer Actions & Engagement */}
          <div className="p-4 sm:p-5 border-t border-[#3D2523] bg-[#1A1211]/80 space-y-3">
            <div className="flex items-center justify-between text-stone-300">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-rose-400 transition-colors group cursor-pointer"
                >
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-stone-200">
                    {currentItem.likes
                      ? currentItem.likes.toLocaleString()
                      : "1,248"}
                  </span>
                </button>
                <div className="flex items-center gap-1.5 text-stone-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-medium">
                    {currentItem.commentsCount || "84"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="hover:text-amber-400 transition-colors cursor-pointer"
                title="Share photo"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-[#3D2523]/50">
              <span>
                Photo {currentIndex + 1} of {items.length}
              </span>
              <span>Use &larr; &rarr; keys to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
