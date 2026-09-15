import { Suspense } from "react";
import GallerySection from "./GallerySection";
import { getPublicGalleryItems } from "@/_features/gallery/services/gallery.service";
import { DEFAULT_GALLERY_ITEMS } from "@/_features/gallery/constants";

/**
 * Modern Sleek Shimmer Skeleton matching the exact 3-column asymmetric mosaic grid
 */
function HomeGallerySkeleton() {
  return (
    <section className="relative overflow-x-clip bg-[#FCFAF5] py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-[#E86A17]/10 rounded-full animate-pulse" />
            <div className="h-9 sm:h-12 w-64 sm:w-80 bg-[#3F0605]/10 rounded-xl animate-pulse" />
          </div>
          <div className="h-5 w-32 bg-stone-200 rounded-md animate-pulse" />
        </div>

        {/* 3-Column Asymmetric Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {/* Col 1 */}
          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="w-full aspect-16/10 rounded-2xl bg-stone-200/80 animate-pulse" />
            <div className="w-full aspect-3/4 sm:aspect-4/5 lg:aspect-3/4 rounded-2xl bg-stone-200/80 animate-pulse" />
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="w-full aspect-16/10 rounded-2xl bg-stone-200/80 animate-pulse" />
            <div className="w-full aspect-square sm:aspect-4/3 lg:aspect-square rounded-2xl bg-stone-200/80 animate-pulse" />
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-5 lg:gap-6 md:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
              <div className="w-full aspect-square rounded-2xl bg-stone-200/80 animate-pulse" />
              <div className="w-full aspect-square rounded-2xl bg-stone-200/80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Isolated Async Server Component: Fetches Top 6 gallery items with fault-tolerant fallback
 */
async function HomeGalleryFetcher() {
  let galleryItems = DEFAULT_GALLERY_ITEMS.slice(0, 6);

  try {
    const fetched = await getPublicGalleryItems(6);
    if (fetched && fetched.length > 0) {
      galleryItems = fetched;
    }
  } catch (error) {
    console.warn(
      "[HomeGalleryServerSection] Gallery API unreachable. Rendering curated fallback moments.",
      error instanceof Error ? error.message : error,
    );
  }

  return <GallerySection images={galleryItems} />;
}

/**
 * Production-grade Island Component with React Suspense Boundary
 */
export default function HomeGalleryServerSection() {
  return (
    <Suspense fallback={<HomeGallerySkeleton />}>
      <HomeGalleryFetcher />
    </Suspense>
  );
}
