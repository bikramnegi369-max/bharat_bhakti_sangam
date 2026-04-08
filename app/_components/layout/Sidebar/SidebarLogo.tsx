import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import logo from "../../../../public/logo.png";

export function SidebarLogo({
  className,
  preload = false,
}: {
  className?: string;
  preload?: boolean;
}) {
  return (
    <Link
      href="/admin"
      className={clsx("inline-flex items-center justify-center", className)}
      aria-label="Go to admin dashboard"
    >
      <Image
        src={logo}
        alt="Bharat Bhakti Sangam Logo"
        width={140}
        height={52}
        preload={preload}
        className="cursor-pointer h-[clamp(3.75rem,calc(3.036rem+3.571vw),6.25rem)] w-[clamp(3.75rem,calc(3.036rem+3.571vw),6.25rem)] object-contain"
      />
    </Link>
  );
}
