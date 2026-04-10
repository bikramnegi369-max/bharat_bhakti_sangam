"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItemComponent } from "./SidebarItemComponent";
import { SidebarLogo } from "./SidebarLogo";
import { SIDEBAR_WIDTH } from "@/_config/Sidebar.config";
import { NAV_ITEMS } from "@/_lib/constants";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* drawer */}
      <aside
        className={clsx(
          "absolute right-0 top-0 h-full bg-header-bg flex flex-col py-6 gap-6 transform transition-transform duration-300 z-50",
          SIDEBAR_WIDTH,
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5">
          <SidebarLogo />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-primary_light transition-colors hover:bg-primary_light/10"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 w-full items-center">
          {NAV_ITEMS.map((item) => (
            <SidebarItemComponent
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};
