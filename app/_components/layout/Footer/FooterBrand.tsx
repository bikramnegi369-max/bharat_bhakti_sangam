import Image from "next/image";
import Link from "next/link";

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
          className="w-32.5 h-18.75 object-contain object-left"
        />
      </Link>

      <p className="text-sm md:text-[15px] font-normal leading-relaxed text-white/80 tracking-wide">
        {description}
      </p>
    </div>
  );
}
