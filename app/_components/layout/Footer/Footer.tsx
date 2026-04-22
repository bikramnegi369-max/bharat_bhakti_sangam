import { FooterBrand } from "./FooterBrand";
import { FooterSocials } from "./FooterSocials";
import { FooterNav } from "./FooterNav";
import { FooterBottom } from "./FooterBottom";
import { FooterInteractiveArea } from "./FooterInteractiveArea";
import { footerConfig } from "@/_config/Footer.config";

type FooterProps = {
  config?: typeof footerConfig;
};

export default function Footer({ config = footerConfig }: FooterProps) {
  return (
    <footer className="bg-[#2B1400] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <FooterBrand
              logoSrc={config.logoSrc}
              logoAlt={config.logoAlt}
              description={config.description}
            />
            <FooterSocials socials={config.socials} />
          </div>

          <div className="flex justify-start lg:justify-center lg:mt-5">
            <FooterNav
              navSections={config.navSections}
              legalLinks={config.legalLinks}
            />
          </div>

          <FooterInteractiveArea cta={config.cta} />
        </div>

        <FooterBottom copyright={config.copyright} />
      </div>
    </footer>
  );
}
