import { FooterLink } from "@/_types/Footer.types";
import Link from "next/link";
import { playfair } from "@/_lib/fonts";

type Props = {
  quickLinks: FooterLink[];
  importantLinks: FooterLink[];
};

export function FooterNav({ quickLinks, importantLinks }: Props) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-10 w-full">
      {/* Quick Links Column */}
      <div className="space-y-4">
        <h4
          className={`${playfair.className} text-lg md:text-xl font-semibold tracking-wide text-white border-b border-white/10 pb-2 inline-block w-full`}
        >
          Quick Links
        </h4>
        <ul className="space-y-2.5">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group flex items-center text-sm md:text-[15px] text-white/80 hover:text-gold transition-all duration-200"
                scroll={true}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Important Links Column */}
      <div className="space-y-4">
        <h4
          className={`${playfair.className} text-lg md:text-xl font-semibold tracking-wide text-white border-b border-white/10 pb-2 inline-block w-full`}
        >
          Important Links
        </h4>
        <ul className="space-y-2.5">
          {importantLinks.map((link) => (
            <li key={link.label}>
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center text-sm md:text-[15px] text-white/80 hover:text-gold transition-all duration-200"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

