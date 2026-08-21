"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Maximize2, MapPin } from "lucide-react";
import InstagramLightboxModal, { GalleryItem } from "./InstagramLightboxModal";
import { poppins } from "@/_lib/fonts";

interface CapturedMemoriesGridProps {
  items: GalleryItem[];
}

export default function CapturedMemoriesGrid({
  items,
}: CapturedMemoriesGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Group items into 3 columns matching the exact mockup layout
  // Col 1: items[0] (top landscape), items[3] (bottom portrait)
  // Col 2: items[1] (top landscape), items[4] (bottom square/medium)
  // Col 3: items[2] (top square), items[5] (bottom square)

  const col1Items = [items[0], items[3]].filter(Boolean);
  const col2Items = [items[1], items[4]].filter(Boolean);
  const col3Items = [items[2], items[5]].filter(Boolean);

  const getItemIndex = (targetItem: GalleryItem) => {
    return items.findIndex((item) => item.id === targetItem.id);
  };

  const renderCard = (item: GalleryItem, aspectClass: string) => {
    const originalIndex = getItemIndex(item);

    return (
      <div
        key={item.id}
        onClick={() => setSelectedIndex(originalIndex)}
        className={`group relative w-full ${aspectClass} rounded-2xl overflow-hidden cursor-pointer bg-[#ECE4D8] border border-amber-900/10 shadow-md hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#E86A17]`}
        tabIndex={0}
        role="button"
        aria-label={`View photo: ${item.title || "Sacred Moment"}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedIndex(originalIndex);
          }
        }}
      >
        {/* Next.js Optimized Image */}
        <Image
          src={item.src}
          alt={item.alt || item.title || "Sacred Memory"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />

        {/* Hover Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white" />

        {/* Top Hover Badges */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Hover Caption & Social Metadata */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {item.location && (
            <p className="text-[11px] font-medium text-amber-300 flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-[#E86A17]" />
              <span>{item.location}</span>
            </p>
          )}

          {item.title && (
            <h4
              className={`${poppins.className} text-sm sm:text-base font-semibold leading-tight text-white mb-2 line-clamp-1`}
            >
              {item.title}
            </h4>
          )}

          <div className="flex items-center justify-between text-xs text-stone-200 border-t border-white/20 pt-2 mt-1">
            <div className="flex items-center gap-1 text-rose-300">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="font-medium text-white">
                {item.likes ? item.likes.toLocaleString() : "1.2k"}
              </span>
            </div>
            <span className="text-[11px] text-stone-300 font-medium">
              Click to expand
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Asymmetric Responsive 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
        {/* Column 1 (Left) */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {col1Items[0] && renderCard(col1Items[0], "aspect-16/10")}
          {col1Items[1] &&
            renderCard(col1Items[1], "aspect-3/4 sm:aspect-4/5 lg:aspect-3/4")}
        </div>

        {/* Column 2 (Middle) */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {col2Items[0] && renderCard(col2Items[0], "aspect-16/10")}
          {col2Items[1] &&
            renderCard(col2Items[1], "aspect-1/1 sm:aspect-4/3 lg:aspect-1/1")}
        </div>

        {/* Column 3 (Right) */}
        <div className="flex flex-col gap-5 lg:gap-6 md:col-span-2 lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            {col3Items[0] && renderCard(col3Items[0], "aspect-1/1")}
            {col3Items[1] && renderCard(col3Items[1], "aspect-1/1")}
          </div>
        </div>
      </div>

      {/* Instagram Lightbox Modal */}
      <InstagramLightboxModal
        isOpen={selectedIndex !== null}
        currentIndex={selectedIndex ?? 0}
        items={items}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </>
  );
}
