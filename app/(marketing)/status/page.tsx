import { Metadata } from "next";
import StatusHero from "@/_features/status/components/StatusHero";
import StatusGallery from "@/_features/status/components/StatusGallery";
import { getStatusList } from "@/_features/status/services/status.service";

export const metadata: Metadata = {
  title:
    "Bhakti Status Videos | Download 9:16 WhatsApp & Instagram Devotional Reels",
  description:
    "Explore and download high quality devotional bhakti status videos, mantras, aartis, bhajans, Shiva, Krishna, Ram and Hanuman vertical reels for social media status.",
  openGraph: {
    title: "Bhakti Status Videos | Bharat Bhakti Sangam",
    description:
      "Feel the devotion, share the divinity. Download 9:16 sacred devotional videos for WhatsApp & Instagram.",
    type: "website",
  },
};

export const revalidate = 60; // ISR cache revalidation every minute

export default async function BhaktiStatusPage() {
  const statusRes = await getStatusList({
    page: 1,
    limit: 10,
    sortBy: "latest",
  });

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
        <StatusGallery initialData={initialData} />
      </section>
    </div>
  );
}
