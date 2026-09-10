import { Suspense } from "react";
import { Metadata } from "next";
import StatusHero from "@/_features/status/components/StatusHero";
import StatusGallery from "@/_features/status/components/StatusGallery";
import { getStatusList, getStatusById } from "@/_features/status/services/status.service";
import { siteConfig } from "@/_config/Site.config";
import { StatusItem } from "@/_types/Status.types";

interface StatusPageProps {
  searchParams: Promise<{ id?: string; tag?: string }>;
}

export async function generateMetadata({
  searchParams,
}: StatusPageProps): Promise<Metadata> {
  const { id } = await searchParams;

  // If a specific status video ID is shared (?id=...)
  if (id) {
    const res = await getStatusById(id);
    if (res.success && res.data) {
      const status = res.data;
      const tagList =
        status.tags?.length > 0 ? status.tags.map((t) => `#${t}`).join(" ") : "Bhakti";
      const title = `${tagList} Devotional Status Video | Bharat Bhakti Sangam`;
      const description = `Watch & download this sacred 9:16 vertical video for WhatsApp & Instagram status. Tags: ${status.tags.join(", ")}.`;
      const posterUrl =
        status.thumbnailUrl || status.videoUrl.replace(/\.[^/.]+$/, ".jpg");
      const shareUrl = `${siteConfig.url}/status?id=${status._id}`;

      return {
        title,
        description,
        alternates: {
          canonical: shareUrl,
        },
        openGraph: {
          title,
          description,
          url: shareUrl,
          siteName: siteConfig.name,
          type: "video.other",
          images: [
            {
              url: posterUrl,
              width: 720,
              height: 1280,
              alt: `${tagList} Devotional Status`,
            },
          ],
          videos: [
            {
              url: status.videoUrl,
              width: 720,
              height: 1280,
              type: "video/mp4",
            },
          ],
        },
        twitter: {
          card: "player",
          title,
          description,
          images: [posterUrl],
          players: [
            {
              playerUrl: shareUrl,
              streamUrl: status.videoUrl,
              width: 720,
              height: 1280,
            },
          ],
        },
      };
    }
  }

  // Default Gallery Open Graph
  return {
    title:
      "Bhakti Status Videos | Download 9:16 WhatsApp & Instagram Devotional Reels",
    description:
      "Explore and download high quality devotional bhakti status videos, mantras, aartis, bhajans, Shiva, Krishna, Ram and Hanuman vertical reels for social media status.",
    openGraph: {
      title: "Bhakti Status Videos | Bharat Bhakti Sangam",
      description:
        "Feel the devotion, share the divinity. Download 9:16 sacred devotional videos for WhatsApp & Instagram.",
      url: `${siteConfig.url}/status`,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/home_hero.webp`,
          width: 1200,
          height: 630,
          alt: "Bhakti Status Videos - Bharat Bhakti Sangam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bhakti Status Videos | Bharat Bhakti Sangam",
      description:
        "Feel the devotion, share the divinity. Download 9:16 sacred devotional videos for WhatsApp & Instagram.",
    },
  };
}

export const revalidate = 60; // ISR cache revalidation every minute

export default async function BhaktiStatusPage({ searchParams }: StatusPageProps) {
  const { id } = await searchParams;

  // Concurrently fetch the gallery list and the shared status if ?id= is present
  const [statusRes, sharedStatusRes] = await Promise.all([
    getStatusList({
      page: 1,
      limit: 10,
      sortBy: "latest",
    }),
    id ? getStatusById(id) : Promise.resolve(null),
  ]);

  const initialSelectedStatus: StatusItem | null =
    sharedStatusRes && sharedStatusRes.success && sharedStatusRes.data
      ? sharedStatusRes.data
      : null;

  const initialData =
    statusRes.success && statusRes.data
      ? statusRes.data
      : {
          items: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        };

  return (
    <div className="min-h-screen bg-[#FCFAF5] pb-24">
      {/* Top Hero Banner matching the mockup */}
      <StatusHero />

      {/* Main Content Area: Search, Sort, Centered Tags, and Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 relative z-20">
        <Suspense fallback={<div className="min-h-96" />}>
          <StatusGallery
            initialData={initialData}
            initialSelectedStatus={initialSelectedStatus}
          />
        </Suspense>
      </section>
    </div>
  );
}
