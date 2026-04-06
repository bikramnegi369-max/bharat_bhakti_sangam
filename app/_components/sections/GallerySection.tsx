"use client";

import { Cinzel } from "next/font/google";
import Image from "next/image";

type GalleryItem = {
  src: string;
  alt?: string;
};

type GallerySectionProps = {
  title?: string;
  highlightWord?: string;
  tags?: string[];
  images: GalleryItem[];
};

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function GallerySection({
  title = "Experience The Energy",
  highlightWord = "Energy",
  tags = ["Live Stage Highlight", "Audience Moment", "Devotional Vibe"],
  images,
}: GallerySectionProps) {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Heading */}
        <div className="text-center">
          <h2
            className={`text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold ${cinzel.className}`}
          >
            {title.split(highlightWord)[0]}
            <span className="text-primary">{highlightWord}</span>
          </h2>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 text-[clamp(0.625rem,calc(0.304rem+1.607vw),1.75rem)] text-para">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Dot */}
                <span className="w-[clamp(0.313rem,calc(0.134rem+0.893vw),0.938rem)] h-[clamp(0.313rem,calc(0.134rem+0.893vw),0.938rem)] bg-primary rounded-full" />

                {/* Text */}
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1  lg:grid-cols-3 gap-6 place-items-center">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg w-[clamp(15.875rem,calc(13rem+14.375vw),25.938rem)] lg:w-full h-[clamp(8.875rem,calc(7.268rem+8.036vw),14.5rem)] aspect-video border-3 border-primary"
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
                sizes="(max-width: 1024px) 90vw, 45vw"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Glow Layer */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
