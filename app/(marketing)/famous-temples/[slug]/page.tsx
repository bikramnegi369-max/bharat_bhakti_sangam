import Hero from "@/_components/sections/Marketing/Hero";
import TempleBreadcrumb from "@/_components/sections/Marketing/temple/TempleBreadcrumb";
import TempleFeaturesSection from "@/_components/sections/Marketing/temple/TempleFeaturesSection";
import TempleHistorySection from "@/_components/sections/Marketing/temple/TempleHistorySection";
import TempleIntroCard from "@/_components/sections/Marketing/temple/TempleIntroCard";
import TempleLocationSection from "@/_components/sections/Marketing/temple/TempleLocationSection";
import TempleVisitorInfo from "@/_components/sections/Marketing/temple/TempleVisitorInfo";
import { temples } from "@/_lib/constants/temples.constants";
import { getTempleBySlug } from "@/_lib/helpers/temples.helpers";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── SSG: pre-render every temple page at build time ──────────────────────────
export function generateStaticParams() {
  return temples.map((t) => ({ slug: t.slug }));
}

// ── Per-page metadata (SEO + Open Graph) ─────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const temple = getTempleBySlug(slug);
  if (!temple) return { title: "Temple Not Found" };

  // Trim description to 160 chars for meta tag best practice
  const metaDescription = temple.description.slice(0, 160);

  return {
    title: `${temple.name} | Famous Temples of India`,
    description: metaDescription,
    keywords: [
      temple.name,
      "Famous Temples of India",
      "Hindu Temples",
      "Spiritual Sites",
      "Indian Heritage",
    ],
    alternates: {
      canonical: `/famous-temples/${slug}`,
    },
    openGraph: {
      title: temple.name,
      description: metaDescription,
      url: `/famous-temples/${slug}`,
      type: "article",
      images: [
        {
          url: temple.heroImage,
          width: 1200,
          height: 630,
          alt: temple.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${temple.name} | Famous Temples of India`,
      description: metaDescription,
      images: [temple.heroImage],
    },
    // JSON-LD for Google rich results (TouristAttraction schema)
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: temple.name,
        description: metaDescription,
        image: temple.heroImage,
        touristType: "Religious tourism",
      }),
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function TempleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temple = getTempleBySlug(slug);

  // Triggers Next.js not-found boundary → renders not-found.tsx
  if (!temple) notFound();

  return (
    <>
      {/* ────────────────────────────────────────────────────────────────────
          Full-bleed hero — reuses your existing Hero component.
          `priority` is handled inside Hero (fetchPriority="high") → max LCP.
      ──────────────────────────────────────────────────────────────────── */}
      <Hero title={temple.name} backgroundImage={temple.heroImage} />

      {/* ────────────────────────────────────────────────────────────────────
          Constrained content wrapper.
          px-4/px-6 on mobile, centred max-width on desktop.
          Sections handle their own top border / vertical rhythm.
      ──────────────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accessible breadcrumb */}
        <TempleBreadcrumb templeName={temple.name} />

        {/* Amber intro card + description images */}
        <TempleIntroCard
          name={temple.name}
          description={temple.description}
          descriptionImages={temple.descriptionImages}
        />

        {/* ── Three content sections ──────────────────────────────────────
            Features  → text left  / images right  (desktop)
            Location  → images left / text right   (desktop)
            History   → text left  / images right  (desktop)
            All three stack vertically on mobile.
        ─────────────────────────────────────────────────────────────── */}
        <TempleFeaturesSection
          title={temple.features.title}
          featuresList={temple.features.featuresList}
          featuresImages={temple.features.featuresImages}
        />

        <TempleLocationSection
          title={temple.location.title}
          description={temple.location.description}
          locationImages={temple.location.locationImages}
        />

        <TempleHistorySection
          title={temple.history.title}
          description={temple.history.description}
          historyImages={temple.history.historyImages}
        />

        {/* Visitor info: best time, timings, entry fee */}
        <TempleVisitorInfo
          bestTimeToVisit={temple.bestTimeToVisit}
          timings={temple.timings}
          entryFee={temple.entryFee}
        />

        {/* Back navigation */}
        <div className="pb-14 pt-2">
          <Link
            href="/famous-temples"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-150"
          >
            ← Back to All Temples
          </Link>
        </div>
      </main>
    </>
  );
}
