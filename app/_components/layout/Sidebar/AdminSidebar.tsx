"use client";

import clsx from "clsx";
import { SidebarLogo } from "./SidebarLogo";
import { SIDEBAR_WIDTH } from "@/_config/Sidebar.config";
import { NAV_ITEMS } from "@/_lib/constants/sidebar.constants";
import { RecursiveNav } from "@/_components/layout/Sidebar/RecursiveNav";

export function AdminSidebar() {
  return (
    <aside
      className={clsx(
        "hidden shrink-0 self-stretch overflow-y-auto border-r border-gray-100 bg-header-bg py-6 lg:flex lg:flex-col lg:gap-6",
        SIDEBAR_WIDTH,
      )}
    >
      <div className="px-6">
        <SidebarLogo />
      </div>

      <nav className="w-full">
        <RecursiveNav items={NAV_ITEMS} />
      </nav>
    </aside>
  );
}
