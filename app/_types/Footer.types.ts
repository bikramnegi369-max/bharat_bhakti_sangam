export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = {
  platform: "facebook" | "instagram" | "youtube" | "twitter" | "whatsapp";
  href: string;
  label: string;
  icon: string;
};


export type FooterNavSection = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type FooterContactInfo = {
  phone: string;
  phoneRaw: string;
  email: string;
  addressLines: string[];
  companyName: string;
  legalEntityName: string;
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
  quickLinks: FooterLink[];
  importantLinks: FooterLink[];
  contact: FooterContactInfo;
  cta: FooterCTAConfig;
  copyright: string;
  tagline: string;
};

