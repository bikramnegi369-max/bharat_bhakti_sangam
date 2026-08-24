import { FooterBrand } from "./FooterBrand";
import { FooterSocials } from "./FooterSocials";
import { FooterNav } from "./FooterNav";
import { FooterBottom } from "./FooterBottom";
import { FooterInteractiveArea } from "./FooterInteractiveArea";
import { footerConfig } from "@/_config/Footer.config";
import { FooterCompanyDetails } from "./FooterCompanyDetails";

type FooterProps = {
  config?: typeof footerConfig;
};

export default function Footer({ config = footerConfig }: FooterProps) {
  return (
    <footer className="relative bg-[#200806] text-white overflow-hidden border-t border-[#740E0A]/40">
      {/* Subtle top devotional ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-primary/20 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Main Grid: Tailored for 1024px (`lg:`) and larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* Brand & Socials Column (1024px: 4 cols, XL: 4 cols) */}
          <div className="space-y-6 lg:col-span-4 flex flex-col justify-between">
            <FooterBrand
              logoSrc={config.logoSrc}
              logoAlt={config.logoAlt}
              description={config.description}
            />
            <FooterSocials socials={config.socials} />
          </div>

          {/* Navigation Links Column: Quick & Important Links (1024px: 5 cols, XL: 5 cols) */}
          <div className="lg:col-span-5">
            <FooterNav
              quickLinks={config.quickLinks}
              importantLinks={config.importantLinks}
            />
          </div>

          {/* Contact Details Column (1024px: 3 cols, XL: 3 cols) */}
          <div className="lg:col-span-3">
            <FooterCompanyDetails contact={config.contact} />
          </div>
        </div>

        {/* Secondary Interactive & Subscription Row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-white tracking-wide">
              Experience the Devotional Energy
            </h3>
            <p className="text-sm text-white/70">
              Join thousands experiencing modern bhajans, kirtans, and divine celebrations across India.
            </p>
          </div>
          <div className="w-full">
            <FooterInteractiveArea cta={config.cta} />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Sacred Tagline */}
        <FooterBottom 
          copyright={config.copyright} 
          tagline={config.tagline} 
        />
      </div>
    </footer>
  );
}

