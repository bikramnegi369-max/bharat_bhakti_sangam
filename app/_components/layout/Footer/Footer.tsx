"use client";

import { FooterBrand } from "./FooterBrand";
import { FooterSocials } from "./FooterSocials";
import { FooterNav } from "./FooterNav";
import { FooterCTA } from "./FooterCTA";
import { FooterBottom } from "./FooterBottom";
import { SubscribeForm } from "../../../_features/subscription/components/SubscribeForm";
import { footerConfig } from "@/_config/Footer.config";
import { usePathname } from "next/navigation";

type FooterProps = {
  config?: typeof footerConfig;
};

export default function Footer({ config = footerConfig }: FooterProps) {
  const pathname = usePathname();
  return (
    <footer className="bg-[#2B1400] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-10">
        {/* Top Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div className="space-y-6">
            <FooterBrand
              logoSrc={config.logoSrc}
              logoAlt={config.logoAlt}
              description={config.description}
            />
            <FooterSocials socials={config.socials} />
          </div>

          {/* Center */}
          <div className="flex justify-start lg:justify-center lg:mt-5">
            <FooterNav
              navSections={config.navSections}
              legalLinks={config.legalLinks}
            />
          </div>

          {/* Right */}
          {pathname !== "/booking" && (
            <div className="flex flex-col gap-10 justify-start lg:items-end lg:mt-5">
              <FooterCTA
                label={config.cta.label}
                href={config.cta.href}
                className="w-45! h-9.5! py-0! text-2xl!"
              />
              <SubscribeForm className="w-full max-w-sm lg:text-right" />
            </div>
          )}
        </div>

        {/* Bottom */}
        <FooterBottom copyright={config.copyright} />
      </div>
    </footer>
  );
}
