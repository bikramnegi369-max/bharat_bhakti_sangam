import type { Metadata } from "next";
import Hero from "@/_components/sections/Marketing/Hero";
import SanatanCalenderSection from "@/_components/sections/Marketing/SanatanCalender/SanatanCalenderSection";
import { routes } from "@/_config/Routes.config";
import { getSeoKeywords } from "@/_config/Seo.config";
import { siteConfig } from "@/_config/Site.config";
import { getSanatanCalenderMonths } from "@/_features/sanatan-calender/services/sanatan-calender.service";
import {
  getSanatanCalenderDescription,
  getSanatanCalenderFestivalCount,
  getSanatanCalenderYear,
} from "@/_lib/helpers/calender.helpers";
import { createPageMetadata, jsonLdScript } from "@/_lib/seo";

const HERO_IMAGE = "/event.webp";

export async function generateMetadata(): Promise<Metadata> {
  const months = await getSanatanCalenderMonths();
  const year = getSanatanCalenderYear(months);
  const totalFestivals = getSanatanCalenderFestivalCount(months);

  return createPageMetadata({
    title: `Sanatan Calender ${year}`,
    description: getSanatanCalenderDescription(year, totalFestivals),
    path: routes.sanatanCalender,
    keywords: getSeoKeywords("sanatanCalender", [
      `sanatan calender ${year}`,
      `monthly hindu calender ${year}`,
    ]),
  });
}

export default async function SanatanCalenderPage() {
  const months = await getSanatanCalenderMonths();
  const year = getSanatanCalenderYear(months);
  const totalFestivals = getSanatanCalenderFestivalCount(months);
  const allFestivals = months.flatMap((month) => month.festivals);
  const calendarJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Sanatan Calender ${year}`,
    description: getSanatanCalenderDescription(year, totalFestivals),
    url: `${siteConfig.url}${routes.sanatanCalender}`,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: totalFestivals,
      itemListElement: allFestivals.map((festival, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: festival.festival,
        startDate: festival.date,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(calendarJsonLd)}
      />
      <Hero backgroundImage={HERO_IMAGE} title={`Sanatan Calender ${year}`} />
      <SanatanCalenderSection months={months} />
    </>
  );
}
