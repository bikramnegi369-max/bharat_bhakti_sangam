import { Suspense } from "react";
import DivineVideoReviewsSection from "./DivineVideoReviewsSection";
import { getPublicVideoReviews } from "@/_features/video-reviews/services/video-reviews.service";
import { DEFAULT_VIDEO_REVIEWS } from "@/_features/video-reviews/constants";

/**
 * Modern Skeleton Loader matching the carousel layout
 */
function DivineVideoReviewsSkeleton() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-linear-to-b from-[#2E0403] via-[#3B0504] to-[#250302]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 space-y-3">
          <div className="h-4 w-40 bg-amber-400/20 rounded-full animate-pulse" />
          <div className="h-10 sm:h-12 w-72 sm:w-96 bg-amber-200/10 rounded-xl animate-pulse" />
          <div className="w-20 h-1 bg-amber-400/30 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="aspect-3/4 rounded-2xl bg-amber-950/40 border border-amber-900/30 animate-pulse" />
          <div className="aspect-3/4 rounded-2xl bg-amber-950/40 border border-amber-900/30 animate-pulse hidden sm:block" />
          <div className="aspect-3/4 rounded-2xl bg-amber-950/40 border border-amber-900/30 animate-pulse hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

/**
 * Isolated Async Server Component: Fetches live video reviews with fallback
 */
async function DivineVideoReviewsFetcher() {
  let reviews = DEFAULT_VIDEO_REVIEWS;

  try {
    const fetched = await getPublicVideoReviews();
    if (fetched && fetched.length > 0) {
      reviews = fetched;
    }
  } catch (error) {
    console.warn(
      "[HomeVideoReviewsServerSection] Video Reviews API unreachable. Rendering curated fallback moments.",
      error instanceof Error ? error.message : error,
    );
  }

  return <DivineVideoReviewsSection items={reviews} />;
}

/**
 * Production-grade Island Component with React Suspense Boundary
 */
export default function HomeVideoReviewsServerSection() {
  return (
    <Suspense fallback={<DivineVideoReviewsSkeleton />}>
      <DivineVideoReviewsFetcher />
    </Suspense>
  );
}
