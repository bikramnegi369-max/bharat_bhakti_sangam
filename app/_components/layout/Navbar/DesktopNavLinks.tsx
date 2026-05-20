"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS } from "@/_config/Navigation.config";
import { temples } from "@/_lib/constants/temples.constants";
import NavDropdown from "./NavDropdown";

export default function DesktopNavLinks() {
  const pathname = usePathname();

  // Transform temples into sub-menu items
  const templeSubItems = temples.map((temple) => ({
    label: temple.name,
    href: `/${temple.slug}`,
  }));

  return (
    <nav className="flex gap-6 relative items-center">
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");

        if (link.href === "/famous-temples") {
          return (
            <NavDropdown
              key={link.href}
              label={link.label}
              href={link.href}
              isActive={isActive}
              items={templeSubItems}
            />
          );
        }

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
                  : "text-white/80 hover:text-white",
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
