import Hero from "@/_components/sections/Marketing/Hero";
import TempleBreadcrumb from "@/_components/sections/Marketing/temple/TempleBreadcrumb";
import TempleFeaturesSection from "@/_components/sections/Marketing/temple/TempleFeaturesSection";
import TempleHistorySection from "@/_components/sections/Marketing/temple/TempleHistorySection";
import TempleIntroCard from "@/_components/sections/Marketing/temple/TempleIntroCard";
import TempleLocationSection from "@/_components/sections/Marketing/temple/TempleLocationSection";
import TempleVisitorInfo from "@/_components/sections/Marketing/temple/TempleVisitorInfo";
import { temples } from "@/_lib/constants/temples.constants";
import { getTempleBySlug } from "@/_lib/helpers/temples.helpers";
import { createPageMetadata } from "@/_lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return temples.map((temple) => ({ slug: temple.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const temple = getTempleBySlug(slug);

  if (!temple) {
    return { title: "Temple Not Found" };
  }

  const metaDescription = temple.description.slice(0, 160);
  const metadata = createPageMetadata({
    title: temple.name,
    description: metaDescription,
    path: `/famous-temples/${slug}`,
    image: temple.heroImage,
    keywords: [
      temple.name,
      "Famous Temples of India",
      "Hindu Temples",
      "Spiritual Sites",
      "Indian Heritage",
    ],
  });

  return {
    ...metadata,
    other: {
      ...metadata.other,
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

export default async function TempleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temple = getTempleBySlug(slug);

  if (!temple) {
    notFound();
  }

  return (
    <>
      <Hero title={temple.name} backgroundImage={temple.heroImage} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TempleBreadcrumb templeName={temple.name} />

        <TempleIntroCard
          name={temple.name}
          description={temple.description}
          descriptionImages={temple.descriptionImages}
        />

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

        <TempleVisitorInfo
          bestTimeToVisit={temple.bestTimeToVisit}
          timings={temple.timings}
          entryFee={temple.entryFee}
        />

        <div className="pb-14 pt-2">
          <Link
            href="/famous-temples"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors duration-150 hover:text-amber-700"
          >
            Back to All Temples
          </Link>
        </div>
      </div>
    </>
  );
}
