"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { routes } from "@/_config/Routes.config";
import { CTAButton } from "@/_components/ui/CTAButton";

const MobileMenu = dynamic(() => import("./NavbarMobileMenu"));

const MarqueeBar = dynamic(() => import("./NavbarMarquee"));

const DesktopNavLinks = dynamic(() => import("./DesktopNavLinks"));

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <header className="h-[clamp(3.75rem,calc(3.304rem+2.232vw),5.313rem)] flex items-center justify-between p-4 lg:px-8 border-b sticky top-0 z-50 bg-header-bg">
        {/* Logo */}
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

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <DesktopNavLinks />

          {pathname !== routes.booking && (
            <CTAButton
              href={routes.booking}
              label="Book Now"
              variant="primary"
              className="w-45! h-9.5! py-0! text-[clamp(0.5rem,calc(0.25rem+1.25vw),1.375rem)]!"
            />
          )}
        </div>

        {/* Mobile */}
        <MobileMenu />
      </header>

      <MarqueeBar />
    </>
  );
}
