import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/_components/layout/Navbar/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const Footer = dynamic(() => import("@/_components/layout/Footer/Footer"));
const FloatingStack = dynamic(
  () => import("@/_components/common/Floating/FloatingStack"),
);

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingStack />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </>
  );
}
