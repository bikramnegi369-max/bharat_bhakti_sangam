import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = createPageMetadataFromConfig("contact");

export default function ContactPage() {
  return <ContactPageClient />;
}
