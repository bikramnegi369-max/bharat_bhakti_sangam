import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { routes } from "@/_config/Routes.config";

const MobileMenu = dynamic(() => import("./NavbarMobileMenu"));
const MarqueeBar = dynamic(() => import("./NavbarMarquee"));
const NavbarDesktopActions = dynamic(() => import("./NavbarDesktopActions"));

export default function Navbar() {
  return (
    <>
      <header className="h-[clamp(3.75rem,calc(3.304rem+2.232vw),5.313rem)] flex items-center justify-between p-4 lg:px-8 border-b sticky top-0 z-50 bg-header-bg">
        <Link href={routes.home} aria-label="Go to homepage">
          <Image
            src="/logo.webp"
            alt="Bharat Bhakti Sangam Logo"
            width={168}
            height={168}
            priority
            fetchPriority="high"
            className="cursor-pointer h-[clamp(3.438rem,calc(2.991rem+2.232vw),5rem)] w-[clamp(3.438rem,calc(2.991rem+2.232vw),5rem)] object-contain"
          />
        </Link>

        <NavbarDesktopActions />
        <MobileMenu />
      </header>

      <MarqueeBar />
    </>
  );
}
