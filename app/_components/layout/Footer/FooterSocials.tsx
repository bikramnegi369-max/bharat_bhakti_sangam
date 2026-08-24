import Link from "next/link";
import Image from "next/image";
import { SocialLink } from "@/_types/Footer.types";

type Props = {
  socials: SocialLink[];
};

export function FooterSocials({ socials }: Props) {
  const getIcon = (platform: SocialLink["platform"], iconSrc?: string) => {
    if (iconSrc) {
      return (
        <div className="relative w-4.5 h-4.5">
          <Image
            src={iconSrc}
            alt=""
            fill
            aria-hidden="true"
            className="object-contain"
            sizes="18px"
          />
        </div>
      );
    }

    if (platform === "whatsapp") {
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 fill-[#25D366]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.078-1.782-.397-1.424-.59-2.348-2.029-2.42-2.124-.071-.095-.572-.76-.572-1.45 0-.69.362-1.03.49-1.169.13-.14.283-.175.378-.175.095 0 .19.002.273.006.09.005.21-.034.328.25.12.285.409.999.445 1.072.036.073.06.158.012.253-.048.095-.072.155-.143.238-.071.083-.15.185-.214.249-.071.071-.145.148-.062.29.083.143.371.612.796.99.547.487 1.009.638 1.152.71.143.071.226.06.31-.036.083-.095.357-.417.452-.56.095-.143.19-.119.321-.071.131.048.833.393.976.464.143.072.238.107.274.167.036.06.036.345-.108.75z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.077c-1.637 0-3.15-.499-4.41-1.353l-.316-.214-2.964.83.83-2.883-.223-.332A8.043 8.043 0 0 1 3.923 12C3.923 7.546 7.546 3.923 12 3.923c4.454 0 8.077 3.623 8.077 8.077 0 4.454-3.623 8.077-8.077 8.077z" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center gap-3 pt-2 flex-wrap">
      {socials.map((social) => (
        <Link
          key={social.platform}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-gold/50 shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95"
        >
          {getIcon(social.platform, social.icon)}
          <span className="sr-only">{social.label}</span>
        </Link>
      ))}
    </div>
  );
}


