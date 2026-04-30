import type { Metadata } from "next";
import { createPageMetadata } from "@/_lib/seo";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <ReactQueryProvider>
      {children}
      <ToastContainer theme="dark" />
    </ReactQueryProvider>
  );
}
