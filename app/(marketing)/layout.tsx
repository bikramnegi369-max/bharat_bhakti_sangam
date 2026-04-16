import Navbar from "@/_components/layout/Navbar";
import Footer from "@/_components/layout/Footer/Footer";
import { FloatingStack } from "@/_components/common/Floating/FloatingStack";

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
