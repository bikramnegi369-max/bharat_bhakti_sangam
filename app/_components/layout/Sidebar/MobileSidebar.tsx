"use client";

import clsx from "clsx";
import { X, ShieldCheck } from "lucide-react";
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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* drawer */}
      <aside
        className={clsx(
          "absolute left-0 top-0 h-full bg-linear-to-b from-[#2d0403] via-[#370504] to-[#1e0202] text-white flex flex-col justify-between py-5 gap-4 transform transition-transform duration-300 z-50 shadow-2xl border-r border-amber-900/40",
          SIDEBAR_WIDTH,
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10">
          <SidebarLogo />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 w-full overflow-y-auto admin-sidebar-scrollbar">
          <div className="px-5 mb-2">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/60">
              Management Console
            </p>
          </div>
          <RecursiveNav items={NAV_ITEMS} onItemClick={onClose} />
        </nav>

        {/* Footer */}
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
    </div>
  );
};
