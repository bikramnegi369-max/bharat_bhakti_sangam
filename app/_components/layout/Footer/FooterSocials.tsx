import Link from "next/link";
import Image from "next/image";
import { SocialLink } from "@/_types/Footer.types";

type Props = {
  socials: SocialLink[];
};

export function FooterSocials({ socials }: Props) {
  return (
    <div className="flex items-center gap-5 pt-2">
      {socials.map((social) => (
        <Link
          key={social.platform}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="group"
        >
          <div className="relative w-6 h-6 transition-transform group-hover:scale-110">
            <Image
              src={social.icon}
              alt=""
              fill
              aria-hidden="true"
              className="object-contain"
              sizes="24px"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
