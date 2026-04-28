import { FooterBrand } from "./FooterBrand";
import { FooterSocials } from "./FooterSocials";
import { FooterNav } from "./FooterNav";
import { FooterBottom } from "./FooterBottom";
import { FooterInteractiveArea } from "./FooterInteractiveArea";
import { footerConfig } from "@/_config/Footer.config";
import FooterCompanyDetails from "./FooterCompanyDetails";

type FooterProps = {
  config?: typeof footerConfig;
};

export default function Footer({ config = footerConfig }: FooterProps) {
  return (
    <footer className="bg-[#2B1400] text-white">
      <div className=" mx-auto px-6 md:px-[clamp(2rem,calc(-2.923rem+7.692vw),4rem)] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
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
          <FooterCompanyDetails />
        </div>

        <FooterBottom copyright={config.copyright} />
      </div>
    </footer>
  );
}
