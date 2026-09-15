import { Suspense } from "react";
import EventGallerySliderSection from "./EventGallerySliderSection";
import { getPublicGalleryItems } from "@/_features/gallery/services/gallery.service";
import { DEFAULT_GALLERY_ITEMS } from "@/_features/gallery/constants";

/**
 * Modern Sleek Shimmer Skeleton matching the Event Gallery Carousel
 */
function EventGallerySkeleton() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-[#140D0C]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar Skeleton */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14 space-y-3">
          <div className="h-4 w-32 bg-amber-500/10 rounded-full animate-pulse" />
          <div className="h-9 sm:h-12 w-64 sm:w-80 bg-white/10 rounded-xl animate-pulse" />
        </div>

        {/* Carousel Slider Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full aspect-16/10 rounded-2xl bg-white/5 animate-pulse" />
          <div className="w-full aspect-16/10 rounded-2xl bg-white/5 animate-pulse hidden sm:block" />
          <div className="w-full aspect-16/10 rounded-2xl bg-white/5 animate-pulse hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

/**
 * Isolated Async Server Component: Fetches Top 10 gallery items with fault-tolerant fallback
 */
async function EventGalleryFetcher() {
  let galleryItems = DEFAULT_GALLERY_ITEMS.slice(0, 10);

  try {
    const fetched = await getPublicGalleryItems(10);
    if (fetched && fetched.length > 0) {
      galleryItems = fetched;
    }
  } catch (error) {
    console.warn(
      "[EventGalleryServerSection] Event Gallery API unreachable. Rendering curated fallback moments.",
      error instanceof Error ? error.message : error,
    );
  }

  return <EventGallerySliderSection images={galleryItems} />;
}

/**
 * Production-grade Island Component with React Suspense Boundary
 */
export default function EventGalleryServerSection() {
  return (
    <Suspense fallback={<EventGallerySkeleton />}>
      <EventGalleryFetcher />
    </Suspense>
  );
}
