import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import CapturedMemoriesGrid from "./CapturedMemoriesGrid";
import { GalleryItem } from "./InstagramLightboxModal";

import { DEFAULT_GALLERY_ITEMS } from "@/_features/gallery/constants";

export interface GallerySectionProps {
  subtitle?: string;
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  images?: GalleryItem[];
}

export default function GallerySection({
  subtitle = "SACRED MOMENTS",
  title = "Captured Memories",
  viewAllHref = "/gallery",
  viewAllLabel = "View Full Gallery",
  images,
}: GallerySectionProps) {
  const displayItems =
    images && images.length > 0
      ? images.slice(0, 6)
      : DEFAULT_GALLERY_ITEMS.slice(0, 6);

  return (
    <section className="relative overflow-x-clip bg-[#FCFAF5] py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Decorative Bottom-Left Mandala Graphic (mandala_2.webp) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 sm:-bottom-24 md:-bottom-32 -left-16 sm:-left-24 md:-left-32 w-72 sm:w-96 md:w-120 lg:w-xl aspect-square opacity-40 select-none z-0"
      >
        <Image
          src="/mandala_2.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, (max-width: 1024px) 480px, 576px"
          className="object-contain object-bottom-left"
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="text-left">
            <span
              className={`${poppins.className} block text-xs sm:text-sm font-semibold tracking-widest text-[#E86A17] uppercase mb-1.5`}
            >
              {subtitle}
            </span>
            <h2
              className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-medium text-[#3F0605] tracking-tight leading-tight`}
            >
              {title}
            </h2>
          </div>

          {/* Top-Right "View Full Gallery" CTA */}
          <Link
            href={viewAllHref}
            className={`${poppins.className} group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E86A17] hover:text-[#740E0A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E86A17]/40 rounded-lg px-1 py-0.5`}
          >
            <span>{viewAllLabel}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Gallery Grid & Lightbox Layer */}
        <CapturedMemoriesGrid items={displayItems} />
      </div>
    </section>
  );
}
