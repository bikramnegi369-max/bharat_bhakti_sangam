"use client";

import { AdminSidebar } from "@/_components/layout/Sidebar/AdminSidebar";
import { MobileSidebar } from "@/_components/layout/Sidebar/MobileSidebar";
import { AdminSessionGuard } from "@/_features/admin-auth/components/AdminSessionGuard";
import { AdminSessionPanel } from "@/_features/admin-auth/components/AdminSessionPanel";
import UIProvider from "@/providers/UIProvider";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <UIProvider>
      <AdminSessionGuard />
      <div className="flex h-dvh w-full overflow-hidden bg-gray-50">
        <AdminSidebar />
        <MobileSidebar open={open} onClose={() => setOpen(false)} />

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 shrink-0 border-b border-slate-200 bg-white">
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

          <main className="relative min-h-0 min-w-0 flex-1 overflow-auto bg-secondary p-4 lg:p-8">
            {children}
          </main>
          <div
            id="__main-overlay-root"
            className="pointer-events-none absolute inset-0"
          />
        </div>
      </div>
    </UIProvider>
  );
}
