"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { NAV_LINKS } from "@/_config/Navigation.config";
import { routes } from "@/_config/Routes.config";
import { CTAButton } from "../../ui/CTAButton";
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
      <div className="lg:hidden flex gap-4 items-center">
        {isLive ? (
          <LiveButton href={liveStreamUrl} />
        ) : (
          pathname !== routes.booking && (
            <CTAButton
              href={routes.booking}
              label="Book Now"
              variant="primary"
              className="bg-transparent! border border-primary text-primary"
            />
          )
        )}

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white"
        >
          <Menu size={30} />
        </button>
      </div>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id={menuId}
        className={clsx(
          "fixed inset-y-0 right-0 w-64 bg-white z-50 transition-transform duration-300 lg:hidden flex flex-col shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="p-4 border-b border-heading flex justify-between items-center">
          <span className="font-semibold text-heading">Menu</span>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="text-heading"
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
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "block transition-colors",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-para hover:text-heading",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
