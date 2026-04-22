import Image from "next/image";
import Link from "next/link";

type Props = {
  logoSrc: string;
  logoAlt: string;
  description: string;
};

export function FooterBrand({ logoSrc, logoAlt, description }: Props) {
  return (
    <div className="space-y-6 max-w-md">
      <Link href="/" className="block relative w-25 h-25">
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          className="object-contain"
          sizes="80px"
        />
      </Link>

      <p className="text-sm md:text-base leading-relaxed text-white/90">
        {description}
      </p>
    </div>
  );
}
