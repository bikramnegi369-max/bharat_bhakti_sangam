import type { Metadata } from "next";
import { createPageMetadata } from "@/_lib/seo";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Secure admin dashboard for Bharat Bhakti Sangam.",
  path: "/admin",
  noIndex: true,
});

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
