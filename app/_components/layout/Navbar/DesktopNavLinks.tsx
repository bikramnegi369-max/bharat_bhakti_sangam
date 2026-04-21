"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS } from "@/_config/Navigation.config";

export default function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 relative items-center">
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative pb-1 group"
            scroll={true}
          >
            <span
              className={clsx(
                "transition-colors text-[20px]",
                isActive
                  ? "text-primary font-semibold"
                  : "text-para hover:text-heading",
              )}
            >
              {link.label}
            </span>

            <span
              className={clsx(
                "absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
