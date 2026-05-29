import Link from "next/link";
import Hero from "@/_components/sections/Marketing/Hero";
import type { Temple } from "@/_types/Temples.types";
import TempleBreadcrumb from "./TempleBreadcrumb";
import TempleFeaturesSection from "./TempleFeaturesSection";
import TempleHistorySection from "./TempleHistorySection";
import TempleIntroCard from "./TempleIntroCard";
import TempleLocationSection from "./TempleLocationSection";
import TempleVisitorInfo from "./TempleVisitorInfo";

export function TempleDetail({ temple }: { temple: Temple }) {
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
