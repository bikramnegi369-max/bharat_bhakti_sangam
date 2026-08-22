import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { AboutPageClient } from "@/_features/about/components/AboutPageClient";

export const metadata: Metadata = createPageMetadataFromConfig("about");

export default function AboutPage() {
  return <AboutPageClient />;
}

