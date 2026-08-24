"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { NAV_LINKS, TOP_NAV_LINKS } from "@/_config/Navigation.config";
import { routes } from "@/_config/Routes.config";
import { CTAButton } from "../../ui/CTAButton";
import { temples } from "@/_lib/constants/temples.constants";
import { FESTIVAL_DETAILS_CONFIG_REGISTRY } from "@/_config/festival-details.config";
import MobileDropdown from "./MobileDropdown";
import { LiveButton } from "../../ui/LiveButton";
import { useLiveStatus, type LiveEventData } from "@/_hooks/useLiveStatus";

export default function NavbarMobileMenu({
  event,
}: {
  event: LiveEventData | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isLive, liveStreamUrl } = useLiveStatus(event);
  const menuId = "mobile-navigation-menu";

  // Lock background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="xl:hidden flex gap-3 sm:gap-4 items-center">
        {isLive ? (
          <LiveButton href={liveStreamUrl} />
        ) : (
          pathname !== routes.booking && (
            <CTAButton
              href={routes.booking}
              label="Book Tickets"
              variant="orange"
              className="px-3! py-1.5! text-xs! rounded-full shadow-sm"
            />
          )
        )}

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <Menu size={28} />
        </button>
      </div>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id={menuId}
        className={clsx(
          "fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-white z-50 transition-transform duration-300 xl:hidden flex flex-col shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#FCFAF5]">
          <span className="font-semibold text-heading tracking-wide">Menu</span>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="text-heading p-1 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex-1 p-4 space-y-3 overflow-y-auto"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");

            if (link.href === "/famous-temples") {
              return (
                <MobileDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  isActive={isActive}
                  onCloseMenu={() => setIsOpen(false)}
                  items={temples.map((t) => ({
                    label: t.name,
                    href: `/${t.slug}`,
                  }))}
                />
              );
            }

            if (link.href === "/festivals") {
              return (
                <MobileDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  isActive={isActive}
                  onCloseMenu={() => setIsOpen(false)}
                  items={Object.values(FESTIVAL_DETAILS_CONFIG_REGISTRY).map(
                    (f) => ({
                      label: f.name,
                      href: `/${f.slug}`,
                    }),
                  )}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "block text-[15px] font-medium transition-colors py-0.5",
                  isActive
                    ? "text-orange font-semibold"
                    : "text-para hover:text-heading",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Utility Links (About, Feedback) */}
          {TOP_NAV_LINKS.filter(
            (topLink) =>
              !NAV_LINKS.some((navLink) => navLink.href === topLink.href),
          ).length > 0 && (
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              {TOP_NAV_LINKS.filter(
                (topLink) =>
                  !NAV_LINKS.some((navLink) => navLink.href === topLink.href),
              ).map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "block text-[14px] transition-colors",
                      isActive
                        ? "text-orange font-semibold"
                        : "text-para/70 hover:text-heading",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
