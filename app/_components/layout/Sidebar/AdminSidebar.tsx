"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SidebarItemComponent } from "./SidebarItemComponent";
import { SidebarLogo } from "./SidebarLogo";
import { SIDEBAR_WIDTH } from "@/_config/Sidebar.config";
import { NAV_ITEMS } from "@/_lib/constants";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "hidden lg:flex flex-col items-center py-6 gap-6 bg-header-bg h-screen sticky top-0",
        SIDEBAR_WIDTH,
      )}
    >
      <SidebarLogo />

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
  );
}
