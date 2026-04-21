"use client";

import { NAV_LINKS } from "@/_config/Navigation.config";
import { routes } from "@/_config/Routes.config";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Mail, Menu, Phone, Ticket } from "lucide-react";
import { Marquee } from "../ui/Marquee/Marquee";
import { CTAButton } from "../ui/CTAButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* HEADER */}
      <header className="h-[clamp(3.75rem,calc(3.304rem+2.232vw),5.313rem)] flex items-center justify-between  p-4 lg:px-8 border-b sticky top-0 z-50 bg-header-bg">
        {/* Logo */}
        <Image
          src="/logo.webp"
          alt="Bharat Bhakti Sangam Logo"
          width={168}
          height={168}
          preload
          className="cursor-pointer h-[clamp(3.438rem,calc(2.991rem+2.232vw),5rem)] w-[clamp(3.438rem,calc(2.991rem+2.232vw),5rem)] object-contain"
          onClick={() => router.push(routes.home)}
        />

        {/* CTA BUTTON SHOW ON MOBILE */}
        {/* {pathname !== "/booking" && (
          <CTAButton
            href={routes.booking}
            label={"Book Now"}
            variant="primary"
            className="lg:hidden"
          />
        )} */}

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 relative items-center">
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
          {/* CTA BUTTON SHOW ON DESKTOP */}
          {pathname !== "/booking" && (
            <CTAButton
              href={routes.booking}
              label={"Book Now"}
              variant="primary"
              className="hidden lg:block w-45! h-9.5! py-0! text-[clamp(0.5rem,calc(0.25rem+1.25vw),1.375rem)]!"
            />
          )}
        </nav>

        {/* Mobile Button */}
        <div className="lg:hidden flex gap-4 items-center">
          {pathname !== "/booking" && (
            <CTAButton
              href={routes.booking}
              label={"Book Now"}
              variant="primary"
              className="lg:hidden bg-transparent! border border-primary text-primary"
            />
          )}
          <button
            className=" text-white"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu size={30} />
          </button>
        </div>
      </header>

      {/* Marquee */}
      <Marquee
        speed={25}
        gap={48}
        className="py-1"
        items={[
          {
            id: "1",
            content: (
              <div className="flex items-center gap-6">
                <span>Contact Us : </span>
                <span className="flex gap-2 items-center">
                  <Phone className="w-3 h-3" />
                  +91 8796086743
                </span>
                <span className="flex gap-2 items-center">
                  <Mail className="w-3 h-3" />
                  contact@bharatbhaktisangam.com
                </span>
              </div>
            ),
          },
          {
            id: "2",
            content: (
              <div className="flex items-center">
                <span className="flex gap-2 items-center">
                  <Ticket className="w-4 h-4" />
                  Book your tickets now
                </span>
              </div>
            ),
          },
        ]}
      />

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
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            ✕
          </button>
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
