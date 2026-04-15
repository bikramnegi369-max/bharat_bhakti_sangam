import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";

export const metadata: Metadata = createPageMetadataFromConfig("sponsors");

export default function SponsorsPage() {
  return <div>Sponsors</div>;
}
