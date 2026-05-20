import type { MetadataRoute } from "next";
import { siteConfig } from "@/_config/Site.config";
import { getAbsoluteEventImageUrl } from "@/_lib/helpers";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { temples } from "@/_lib/constants/temples.constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    images?: string[];
    lastModified?: Date;
  }> = [
    {
      path: "/",
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${siteConfig.url}/about_hero.jpg`],
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
    {
      path: "/feedback",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/privacy-policy",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/terms-and-conditions",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const event = await getLatestEvent();
    const eventLastModified = Number.isNaN(Date.parse(event.date))
      ? new Date()
      : new Date(event.date);
    const eventImage = getAbsoluteEventImageUrl(event);

    // Insert /event at index 1 to match requested order
    publicRoutes.splice(1, 0, {
      path: "/event",
      changeFrequency: "weekly",
      priority: 0.8,
      images: [eventImage],
      lastModified: eventLastModified,
    });

    // Insert /booking at index 5 (after feedback) to match requested order
    publicRoutes.splice(5, 0, {
      path: "/booking",
      changeFrequency: "weekly",
      priority: 0.8,
      images: [eventImage],
      lastModified: eventLastModified,
    });
  } catch (error) {
    console.error("[sitemap] Failed to load latest event", error);
  }

  return [
    ...publicRoutes.map(
      ({ path, changeFrequency, priority, images, lastModified }) => ({
        url: `${siteConfig.url}${path}`,
        lastModified: lastModified ?? new Date(),
        changeFrequency,
        priority,
        images,
      }),
    ),
    ...temples.map((temple) => ({
      url: `${siteConfig.url}/${temple.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${siteConfig.url}${temple.heroImage}`],
    })),
  ];
}
