import { Suspense } from "react";
import VideoHero, { type VideoHeroProps } from "@/_components/sections/Marketing/VideoHero";
import { getHeroVideo } from "@/_features/home-hero/services/hero-video.service";

/**
 * Sleek Hero Skeleton matching the exact layout viewport of VideoHero
 * Prevents Layout Shift (CLS = 0) and shows a subtle dark pulse.
 */
function VideoHeroSkeleton() {
  return (
    <section
      aria-label="Loading hero video"
      className="relative w-full h-[calc(100svh-var(--header-total-offset,5.5rem))] min-h-[calc(100svh-var(--header-total-offset,5.5rem))] flex flex-col justify-between items-center bg-black overflow-hidden"
    >
      {/* Ambient background shimmer */}
      <div className="absolute inset-0 z-0 bg-neutral-950 animate-pulse">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 bg-[radial-gradient(ellipse_at_center,rgba(236,90,5,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Subtle loader shimmer overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/80" />

      {/* Placeholder spacer */}
      <div className="my-auto" />

      {/* Scroll indicator placeholder */}
      <div className="relative z-30 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 shrink-0">
        <div className="h-4 w-28 bg-white/10 rounded-full animate-pulse" />
      </div>
    </section>
  );
}

/**
 * Isolated Async Fetcher for Hero Video
 * Catches any potential network hiccups or backend latency without blocking the page.
 */
async function VideoHeroFetcher(props: Omit<VideoHeroProps, "src"> & { fallbackSrc?: string }) {
  const { fallbackSrc = "/hero-video.mp4", ...restProps } = props;
  let videoSrc = fallbackSrc;

  try {
    const res = await getHeroVideo();
    if (res?.data?.videoUrl) {
      videoSrc = res.data.videoUrl;
    }
  } catch (error) {
    console.warn(
      "[VideoHeroServerSection] Hero video fetch failed or timed out. Falling back to default asset.",
      error instanceof Error ? error.message : error,
    );
  }

  return <VideoHero src={videoSrc} {...restProps} />;
}

/**
 * Production-grade Server Component Island for Hero Video
 * Streams immediately into the DOM inside React Suspense boundary.
 */
export default function VideoHeroServerSection(
  props: Omit<VideoHeroProps, "src"> & { fallbackSrc?: string },
) {
  return (
    <Suspense fallback={<VideoHeroSkeleton />}>
      <VideoHeroFetcher {...props} />
    </Suspense>
  );
}
