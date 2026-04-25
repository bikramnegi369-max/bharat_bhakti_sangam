"use client";

import { AdminSidebar } from "@/_components/layout/Sidebar/AdminSidebar";
import { MobileSidebar } from "@/_components/layout/Sidebar/MobileSidebar";
import { SidebarLogo } from "@/_components/layout/Sidebar/SidebarLogo";
import { AdminSessionPanel } from "@/_features/admin-auth/components/AdminSessionPanel";
import UIProvider from "@/providers/UIProvider";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <UIProvider>
      <div className="flex h-dvh bg-gray-50">
        <AdminSidebar />
        <MobileSidebar open={open} onClose={() => setOpen(false)} />

        <div className="flex flex-1 flex-col max-w-full relative">
          <header className="sticky border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="lg:hidden flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-md border border-slate-200 p-2 text-slate-700"
                    aria-label="Open mobile menu"
                  >
                    <Menu size={22} />
                  </button>
                </div>

                <div className="hidden lg:block">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Admin Workspace
                  </p>
                  <p className="text-xs text-slate-500">
                    Protected access with token rotation and route-level guards
                  </p>
                </div>
              </div>

              <AdminSessionPanel />
            </div>
          </header>

          <main className="flex-1 bg-secondary p-4 lg:p-8 relative overflow-auto">
            {children}
          </main>
          <div
            id="__main-overlay-root"
            className="absolute inset-0 pointer-events-none "
          />
        </div>
      </div>
    </UIProvider>
  );
}
