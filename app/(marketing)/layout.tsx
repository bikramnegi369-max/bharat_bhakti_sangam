import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/_components/layout/Navbar/Navbar";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { MetaPixel } from "@/_components/analytics/MetaPixel";

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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <MetaPixel />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingStack />
    </>
  );
}
