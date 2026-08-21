import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import CapturedMemoriesGrid from "./CapturedMemoriesGrid";
import { GalleryItem } from "./InstagramLightboxModal";

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    src: "/gallery/gallery_1.webp",
    alt: "Sacred Temple River Reflection at Sunset",
    title: "Golden Hour Aarti at River Ghat",
    category: "Sacred Moments",
    location: "Varanasi Ghats, Uttar Pradesh",
    date: "Aug 2026",
    likes: 1842,
    commentsCount: 142,
    caption:
      "A serene reflection of ancient temples along the holy river as evening prayers begin.",
  },
  {
    id: "2",
    src: "/gallery/gallery_2.webp",
    alt: "Devotees gathering for Bhajan & Kirtan",
    title: "Devotional Kirtan Assembly",
    category: "Bhajan Clubbing",
    location: "Vrindavan, Uttar Pradesh",
    date: "Jul 2026",
    likes: 2450,
    commentsCount: 189,
    caption:
      "Chanting in unison, feeling the transcendent energy of group kirtan and divine music.",
  },
  {
    id: "3",
    src: "/gallery/gallery_3.webp",
    alt: "Sacred Mahaprasad Offering with Steaming Aroma",
    title: "Divine Mahaprasad Offering",
    category: "Prasad & Blessings",
    location: "Puri, Odisha",
    date: "Aug 2026",
    likes: 3120,
    commentsCount: 205,
    caption:
      "Warm, sacred prasad prepared with utmost devotion and offered with love to the divine.",
  },
  {
    id: "4",
    src: "/festivals/holi/holi-1.webp",
    alt: "Illuminated Ghat Aarti Celebration",
    title: "Illuminated Evening Ganga Aarti",
    category: "Sacred Moments",
    location: "Haridwar, Uttarakhand",
    date: "Jun 2026",
    likes: 1980,
    commentsCount: 96,
    caption:
      "Thousands of diyas floating down the river, lighting up the spiritual heart of Bharat.",
  },
  {
    id: "5",
    src: "/about_mission.webp",
    alt: "Traditional Musicians playing Harmonium and Tabla",
    title: "Classical Ragas & Devotional Chants",
    category: "Kirtan Artists",
    location: "Mathura, Uttar Pradesh",
    date: "Jul 2026",
    likes: 1540,
    commentsCount: 78,
    caption:
      "Master musicians bringing soul to sacred verses with harmonium and rhythmic tabla beats.",
  },
  {
    id: "6",
    src: "/event.webp",
    alt: "Traditional Pooja Thali with Diya and Incense",
    title: "Sacred Puja Thali & Diya",
    category: "Pooja Heritage",
    location: "Ayodhya, Uttar Pradesh",
    date: "Aug 2026",
    likes: 2890,
    commentsCount: 164,
    caption:
      "Fragrant flowers, burning camphor, and glowing diyas prepared for auspicious morning puja.",
  },
];

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
  const displayItems = images && images.length >= 6 ? images : DEFAULT_GALLERY_ITEMS;

  return (
    <section className="relative overflow-x-clip bg-[#FCFAF5] py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Decorative Bottom-Left Mandala Graphic (mandala_2.webp) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 sm:-bottom-24 md:-bottom-32 -left-16 sm:-left-24 md:-left-32 w-72 sm:w-96 md:w-120 lg:w-144 aspect-square opacity-40 select-none z-0"
      >
        <Image
          src="/mandala_2.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, (max-width: 1024px) 480px, 576px"
          className="object-contain object-left-bottom"
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
