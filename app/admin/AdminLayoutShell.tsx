"use client";

import { AdminSidebar } from "@/_components/layout/Sidebar/AdminSidebar";
import { MobileSidebar } from "@/_components/layout/Sidebar/MobileSidebar";
import { SidebarLogo } from "@/_components/layout/Sidebar/SidebarLogo";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <MobileSidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-header-bg">
          <SidebarLogo preload />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-white"
            aria-label="Open mobile menu"
          >
            <Menu size={30} />
          </button>
        </div>

        <ReactQueryProvider>
          <main className="flex-1 p-4 lg:p-8 bg-secondary">{children}</main>
        </ReactQueryProvider>
      </div>
    </div>
  );
}
