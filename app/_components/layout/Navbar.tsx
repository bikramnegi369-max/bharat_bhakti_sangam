"use client";

import { NAV_LINKS } from "@/_config/navigation";
import { routes } from "@/_config/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* HEADER */}
      <header className="h-[clamp(5rem,calc(4.554rem+2.232vw),6.563rem)] flex items-center justify-between  p-4 border-b sticky top-0 z-50 bg-header-bg">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Bharat Bhakti Sangam Logo"
          width={168}
          height={168}
          priority
          className="cursor-pointer h-[clamp(3.75rem,calc(3.036rem+3.571vw),6.25rem)] w-[clamp(3.75rem,calc(3.036rem+3.571vw),6.25rem)] object-contain"
          onClick={() => router.push(routes.home)}
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 relative mr-4">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1 group"
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

                {/* UNDERLINE */}
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

        {/* Mobile Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Menu size={30} />
        </button>
      </header>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DRAWER MENU */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-heading flex justify-between items-center">
          <span className="font-semibold text-heading">Menu</span>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="p-4 space-y-3">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block ${
                  isActive ? "text-primary font-semibold" : "text-para"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
