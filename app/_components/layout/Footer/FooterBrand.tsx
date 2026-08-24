import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/_lib/fonts";

type Props = {
  logoSrc: string;
  logoAlt: string;
  description: string;
};

export function FooterBrand({ logoSrc, logoAlt, description }: Props) {
  return (
    <div className="space-y-4 max-w-sm">
      <Link
        href="/"
        className="inline-block transition-transform duration-300 hover:scale-105"
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={130}
          height={75}
          priority
          style={{ width: "auto", height: "auto" }}
          className="max-h-[75px] object-contain object-left"
        />
      </Link>

      <p className="text-sm md:text-[15px] font-normal leading-relaxed text-white/80 tracking-wide">
        {description}
      </p>
    </div>
  );
}


