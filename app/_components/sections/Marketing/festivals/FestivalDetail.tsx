import Link from "next/link";
import Hero from "@/_components/sections/Marketing/Hero";
import FestivalSection from "./festivalSection";
import type { Festival } from "@/_lib/helpers/festivals.helpers";

export function FestivalDetail({ festival }: { festival: Festival }) {
  const heroImage = festival.images[0] ?? "/ogDefault.png";

  return (
    <main>
      <Hero title={festival.title} backgroundImage={heroImage} />
      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <FestivalSection
          title={festival.title}
          description={festival.description}
          images={festival.images}
          descriptionAnchor={festival.descriptionAnchor}
          alts={festival.alts}
        />

        <div className="border-t border-amber-200 pb-14 pt-6">
          <Link
            href="/festivals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors duration-150 hover:text-amber-700"
          >
            Back to All Festivals
          </Link>
        </div>
      </article>
    </main>
  );
}
