import type { Metadata } from "next";
import { createPageMetadata } from "@/_lib/seo";
import { AdminLayoutShell } from "./AdminLayoutShell";

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Admin dashboard for Bharat Bhakti Sangam.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
