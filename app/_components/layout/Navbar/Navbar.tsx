import Link from "next/link";
import Image from "next/image";
import { routes } from "@/_config/Routes.config";
import MobileMenu from "./NavbarMobileMenu";
import MarqueeBar from "./NavbarMarquee";
import NavbarDesktopActions from "./NavbarDesktopActions";

export default function Navbar() {
  return (
    <>
      <header className="h-[clamp(3.75rem,calc(3.304rem+2.232vw),5.313rem)] flex items-center justify-between p-4 lg:px-[clamp(2rem,calc(-2.923rem+7.692vw),4rem)] border-b sticky top-0 z-50 bg-header-bg">
        <Link href={routes.home} aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="Bharat Bhakti Sangam Logo"
            width={168}
            height={168}
            priority
            fetchPriority="high"
            className="cursor-pointer h-[clamp(4.375rem,calc(4.196rem+0.893vw),5rem)] w-[clamp(4.375rem,calc(4.196rem+0.893vw),5rem)] object-contain"
          />
        </Link>

        <NavbarDesktopActions />
        <MobileMenu />
      </header>

      <MarqueeBar />
    </>
  );
}
