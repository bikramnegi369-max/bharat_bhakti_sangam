export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = {
  platform: "facebook" | "instagram" | "youtube";
  href: string;
  label: string;
  icon: string;
};

export type FooterNavSection = {
  id: string;
  links: FooterLink[];
};

export type FooterCTAConfig = {
  label: string;
  href: string;
};

export type FooterConfig = {
  logoSrc: string;
  logoAlt: string;
  description: string;
  socials: SocialLink[];
  navSections: FooterNavSection[];
  legalLinks: FooterLink[];
  cta: FooterCTAConfig;
  copyright: string;
};
