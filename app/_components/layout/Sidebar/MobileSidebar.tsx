"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { SidebarLogo } from "./SidebarLogo";
import { SIDEBAR_WIDTH } from "@/_config/Sidebar.config";
import { NAV_ITEMS } from "@/_lib/constants/sidebar.constants";
import { RecursiveNav } from "@/_components/layout/Sidebar/RecursiveNav";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
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
          "absolute left-0 top-0 h-full bg-header-bg flex flex-col py-6 gap-6 transform transition-transform duration-300 z-50",
          SIDEBAR_WIDTH,
          open ? "translate-x-0" : "-translate-x-full",
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

        <nav className="w-full overflow-y-auto">
          <RecursiveNav items={NAV_ITEMS} onItemClick={onClose} />
        </nav>
      </aside>
    </div>
  );
};
