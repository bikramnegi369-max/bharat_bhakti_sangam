"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS } from "@/_config/Navigation.config";
import { temples } from "@/_lib/constants/temples.constants";
import { FESTIVAL_DETAILS_CONFIG_REGISTRY } from "@/_config/festival-details.config";
import NavDropdown from "./NavDropdown";

export default function DesktopNavLinks() {
  const pathname = usePathname();

  // Transform temples into sub-menu items
  const templeSubItems = temples.map((temple) => ({
    label: temple.name,
    href: `/${temple.slug}`,
  }));

  // Transform festivals into sub-menu items
  const festivalSubItems = Object.values(FESTIVAL_DETAILS_CONFIG_REGISTRY).map(
    (festival) => ({
      label: festival.name,
      href: `/${festival.slug}`,
    }),
  );

  return (
    <nav className="flex gap-2 xl:gap-2.5 2xl:gap-4.5 relative items-center">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(link.href + "/");

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

        if (link.href === "/festivals") {
          return (
            <NavDropdown
              key={link.href}
              label={link.label}
              href={link.href}
              isActive={isActive}
              items={festivalSubItems}
            />
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative pb-1 group shrink-0"
            scroll={true}
          >
            <span
              className={clsx(
                "transition-colors text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-medium whitespace-nowrap",
                isActive
                  ? "text-orange"
                  : "text-white/85 hover:text-white",
              )}
            >
              {link.label}
            </span>

            <span
              className={clsx(
                "absolute left-0 bottom-0 h-0.5 bg-orange transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
