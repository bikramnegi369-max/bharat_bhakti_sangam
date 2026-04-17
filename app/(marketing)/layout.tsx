import dynamic from "next/dynamic";
import Navbar from "@/_components/layout/Navbar";

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
    </>
  );
}
