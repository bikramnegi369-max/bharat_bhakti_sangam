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
        "hidden lg:flex flex-col items-center py-6 gap-6 bg-header-bg h-screen sticky top-0 border-r border-gray-100",
        "hidden lg:flex flex-col py-6 gap-6 bg-header-bg h-screen sticky top-0 border-r border-gray-100",
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
