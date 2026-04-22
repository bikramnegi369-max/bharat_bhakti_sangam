"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import clsx from "clsx";

import { NAV_LINKS } from "@/_config/Navigation.config";
import { routes } from "@/_config/Routes.config";
import { CTAButton } from "../../ui/CTAButton";

export default function NavbarMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header Actions */}
      <div className="lg:hidden flex gap-4 items-center">
        {pathname !== routes.booking && (
          <CTAButton
            href={routes.booking}
            label="Book Now"
            variant="primary"
            className="bg-transparent! border border-primary text-primary"
          />
        )}

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white"
        >
          <Menu size={30} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        {/* Top Bar */}
        <div className="p-4 border-b border-heading flex justify-between items-center">
          <span className="font-semibold text-heading">Menu</span>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="text-heading text-xl"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-3">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
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
