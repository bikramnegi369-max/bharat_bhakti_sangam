import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveCanonicalSlug } from "@/_features/canonical-slugs/resolveCanonicalSlug";
import { getLatestBlogPostSlugs } from "@/_features/blog/services/wordpress.service";
import { getFestivals } from "@/_lib/helpers/festivals.helpers";
import { temples } from "@/_lib/constants/temples.constants";

export const revalidate = 300;
export const dynamicParams = true;

type CanonicalSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const staticSlugs = [
    ...temples.map((temple) => temple.slug),
    ...getFestivals().map((festival) => festival.slug),
  ];

  try {
    const blogSlugs = await getLatestBlogPostSlugs();

    return [...new Set([...staticSlugs, ...blogSlugs])].map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("[canonical-slug] Failed to load blog slugs", error);

    return [...new Set(staticSlugs)].map((slug) => ({ slug }));
  }
}

export async function generateMetadata({
  params,
}: CanonicalSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await resolveCanonicalSlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return page.metadata;
}

export default async function CanonicalSlugPage({
  params,
}: CanonicalSlugPageProps) {
  const { slug } = await params;
  const page = await resolveCanonicalSlug(slug);

  if (!page) {
    notFound();
  }

  return page.render();
}
