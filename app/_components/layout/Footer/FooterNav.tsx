import { FooterLink, FooterNavSection } from "@/_types/Footer.types";
import Link from "next/link";

type Props = {
  navSections: FooterNavSection[];
  legalLinks: FooterLink[];
};

export function FooterNav({ navSections, legalLinks }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-8">
      {/* Main Nav */}
      <div className="space-y-4">
        {navSections[0]?.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-white/90 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Legal */}
      <div className="space-y-4">
        {legalLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-white/90 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
