"use client";

import clsx from "clsx";
import { SidebarLogo } from "./SidebarLogo";
import { SIDEBAR_WIDTH } from "@/_config/Sidebar.config";
import { NAV_ITEMS } from "@/_lib/constants/sidebar.constants";
import { RecursiveNav } from "@/_components/layout/Sidebar/RecursiveNav";
import { ShieldCheck } from "lucide-react";

export function AdminSidebar() {
  return (
    <aside
      className={clsx(
        "hidden shrink-0 self-stretch bg-linear-to-b from-[#2d0403] via-[#370504] to-[#1e0202] text-white py-5 lg:flex lg:flex-col lg:justify-between border-r border-amber-900/30 shadow-2xl relative z-20 select-none",
        SIDEBAR_WIDTH,
      )}
    >
      {/* Brand Header */}
      <div className="flex flex-col gap-4 px-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <SidebarLogo />
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-400/20 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 w-full overflow-y-auto py-3 admin-sidebar-scrollbar">
        <div className="px-5 mb-2">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/60">
            Management Console
          </p>
        </div>
        <RecursiveNav items={NAV_ITEMS} />
      </nav>

      {/* Footer System Info */}
      <div className="px-5 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-stone-300">
          <ShieldCheck size={16} className="text-amber-400 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-white truncate text-[12px]">
              Bharat Bhakti Sangam
            </p>
            <p className="text-[10px] text-stone-400 truncate">
              v1.2.0 • Admin Portal
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
