"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Heart, MessageCircle, Camera } from "lucide-react";
import { poppins } from "@/_lib/fonts";
import { ABOUT_GALLERY_PHOTOS } from "../constants/about.constants";
import InstagramLightboxModal, {
  GalleryItem,
} from "@/_components/sections/Marketing/Home/InstagramLightboxModal";

export function AboutGalleryGridSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Transform photos into GalleryItem objects for the modal
  const galleryItems: GalleryItem[] = ABOUT_GALLERY_PHOTOS.map(
    (photo, idx) => ({
      id: photo.id,
      src: photo.src,
      alt: photo.alt,
      title: photo.caption,
      caption: `${photo.caption} - Experiencing the divine bliss and musical devotion at Bharat Bhakti Sangam.`,
      likes: 1200 + idx * 145,
      commentsCount: 38 + idx * 9,
      location: "Bharat Bhakti Sangam",
      category: "Bhakti Gathering",
    }),
  );

  return (
    <section
      aria-label="Gallery of Devotional Moments"
      className="relative w-full py-14 sm:py-18 lg:py-24 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Section Sub-Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span
            className={clsx(
              poppins.className,
              "text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C47D1C] block mb-2",
            )}
          >
            JOURNEY THROUGH MOMENTS
          </span>
          <div className="w-12 h-0.5 bg-[#C47D1C]/40 mx-auto rounded-full" />
        </div>

        {/* Instagram-style Media Grid (Clean 3-column / 4-column feed) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-10 sm:mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.title || "Sacred Moment"}`}
              className={clsx(
                "group relative w-full aspect-square overflow-hidden cursor-pointer",
                "bg-[#EFE7DA] border border-[#EADBCA]/50",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-[#C47D1C]",
              )}
            >
              {/* Photo Image */}
              <Image
                src={item.src}
                alt={item.alt || "Devotional moment"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-108"
              />

              {/* Instagram Hover Dark Overlay with Likes & Comments */}
              <div
                className={clsx(
                  "absolute inset-0 bg-black/55 backdrop-blur-[2px]",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  "flex items-center justify-center gap-4 sm:gap-6 text-white select-none",
                )}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>{item.likes?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>{item.commentsCount}</span>
                </div>
              </div>

              {/* Subtle Camera Icon in top corner on hover */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/80">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Photos CTA (Directs to Instagram Profile) */}
        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/bharatbhaktisangam"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              poppins.className,
              "px-8 py-3 rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase text-white inline-flex items-center gap-2",
              "bg-[#211B18] hover:bg-[#382F2A] shadow-md",
              "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211B18] focus-visible:ring-offset-2",
            )}
          >
            <span>View More on Instagram</span>
          </a>
        </div>
      </div>

      {/* Full Screen Instagram Lightbox Modal */}
      <InstagramLightboxModal
        isOpen={selectedIndex !== null}
        currentIndex={selectedIndex ?? 0}
        items={galleryItems}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </section>
  );
}
