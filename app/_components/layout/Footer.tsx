"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { routes } from "@/_config/routes";

type SocialLink = {
  href: string;
  label: string;
};

type FooterProps = {
  logoSrc?: string;
  description?: string;
  socialLinks?: {
    facebook?: SocialLink;
    instagram?: SocialLink;
    youtube?: SocialLink;
  };
};

export default function Footer({
  logoSrc = "/logo.png",
  description = "India’s First Devotional Clubbing Experience. Where devotion transforms into celebration and music becomes meditation.",
  socialLinks = {
    facebook: { href: "#", label: "Facebook" },
    instagram: { href: "#", label: "Instagram" },
    youtube: { href: "#", label: "YouTube" },
  },
}: FooterProps) {
  const router = useRouter();
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-12">
        <div className="flex flex-col items-center text-center gap-3 lg:gap-6">
          {/* Logo */}
          <div className="relative w-[clamp(4.375rem,calc(1.232rem+15.714vw),15.375rem)] h-[clamp(4.375rem,calc(1.232rem+15.714vw),15.375rem)] aspect-auto cursor-pointer">
            <Image
              src={logoSrc}
              alt="Bhajan Clubbing Logo"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain"
              onClick={() => router.push(routes.home)}
            />
          </div>

          {/* Description */}
          <p className=" text-[clamp(0.438rem,calc(0.295rem+0.714vw),0.938rem)] md:text-base text-[#E6E6E6] leading-relaxed">
            {description}
          </p>

          {/* CTA */}

          <Button variant="primary" onClick={() => router.push("/booking")}>
            Book Now
          </Button>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-2">
            {socialLinks.facebook && (
              <Link
                href={socialLinks.facebook.href}
                aria-label={socialLinks.facebook.label}
                target="_blank"
                className="group"
              >
                <div className="w-5 h-5 text-gray-400 transition group-hover:scale-110 relative">
                  <Image
                    src={"/social_media/facebook_logo.png"}
                    alt="facebook logo"
                    fill
                    priority={false}
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    loading="lazy"
                  />
                </div>
              </Link>
            )}

            {socialLinks.instagram && (
              <Link
                href={socialLinks.instagram.href}
                aria-label={socialLinks.instagram.label}
                target="_blank"
                className="group"
              >
                <div className="w-5 h-5 text-gray-400 transition group-hover:scale-110 relative">
                  <Image
                    src={"/social_media/instagram_logo.png"}
                    alt="instagram logo"
                    fill
                    priority={false}
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    loading="lazy"
                  />
                </div>
              </Link>
            )}

            {socialLinks.youtube && (
              <Link
                href={socialLinks.youtube.href}
                aria-label={socialLinks.youtube.label}
                target="_blank"
                className="group"
              >
                <div className="w-5 h-5 text-gray-400 transition group-hover:scale-110 relative">
                  <Image
                    src={"/social_media/youtube_logo.png"}
                    alt="youtube logo"
                    fill
                    priority={false}
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    loading="lazy"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BhajanClubbing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
