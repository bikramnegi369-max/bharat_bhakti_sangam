"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useRole,
  useDismiss,
  useInteractions,
  FloatingPortal,
  safePolygon,
} from "@floating-ui/react";
import { ChevronDown, ArrowUpRight, Search } from "lucide-react";
import clsx from "clsx";

interface NavDropdownProps {
  label: string;
  href: string;
  isActive: boolean;
  items: { label: string; href: string }[];
}

export default function NavDropdown({
  label,
  href,
  isActive,
  items,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [floatingEl, setFloatingEl] = useState<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(16), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "fixed",
    elements: { reference: referenceEl, floating: floatingEl },
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
    delay: { open: 80, close: 120 },
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  // Filter items based on search
  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : items;

  // ✨ Fixed: Reset search when dropdown closes via onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchQuery(""); // Reset search when closing
    }
    setIsOpen(open);
  };

  return (
    <>
      <div className="relative">
        {/* Trigger */}
        <Link
          href={href}
          ref={setReferenceEl}
          {...getReferenceProps()}
          className="flex items-center gap-1 cursor-pointer group pb-1 outline-hidden"
        >
          <span
            className={clsx(
              "transition-colors duration-200 text-[20px] tracking-tight",
              isActive
                ? "text-primary font-semibold"
                : "text-white/80 group-hover:text-white",
            )}
          >
            {label}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={2.5}
            className={clsx(
              "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mt-0.5",
              isOpen && "rotate-180",
              isActive
                ? "text-primary"
                : "text-white/60 group-hover:text-white",
            )}
          />
          <span
            className={clsx(
              "absolute left-0 bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out",
              isActive ? "w-full" : "w-0 group-hover:w-full",
            )}
          />
        </Link>

        {/* Floating panel */}
        <FloatingPortal>
          <div
            ref={setFloatingEl}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              "z-100",
              "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none",
            )}
          >
            {/* Arrow pointer */}
            <div
              className={clsx(
                "absolute -top-1.75 left-5 w-3 h-3 rotate-45 border-l border-t border-primary bg-header-bg transition-opacity duration-200",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Panel */}
            <div
              className={clsx(
                "relative min-w-60 rounded-xl overflow-hidden",
                "bg-header-bg backdrop-blur-xl",
                "border border-white/10",
                "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]",
                isOpen && "nav-dropdown-open",
              )}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {/* Search bar (only shows if >15 items) */}
              {items.length > 15 && (
                <div className="px-3 pt-3 pb-2 sticky top-0 bg-header-bg/95 backdrop-blur-sm z-10 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder={`Search ${items.length} temples...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 outline-none text-white/80 placeholder:text-white/30 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}

              {/* Fixed max-height with scroll */}
              <div
                ref={scrollContainerRef}
                className={clsx(
                  "overflow-y-auto",
                  items.length > 8 ? "max-h-[70vh]" : "",
                  "custom-scrollbar",
                )}
                style={
                  items.length > 8 ? { maxHeight: "min(70vh, 500px)" } : {}
                }
              >
                <div className="py-2" key={isOpen ? "open" : "closed"}>
                  {filteredItems.length === 0 ? (
                    <div className="px-4 py-8 text-center text-white/40 text-sm">
                      No temples found
                    </div>
                  ) : (
                    filteredItems.map((item, i) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleOpenChange(false)}
                        style={isOpen ? { animationDelay: `${i * 35}ms` } : {}}
                        className={clsx(
                          "nav-dropdown-item group/item",
                          "flex items-center justify-between",
                          "mx-2 px-3 py-2.5 rounded-lg",
                          "text-[14.5px] font-medium text-white/70",
                          "hover:text-white hover:bg-white/8",
                          "transition-colors duration-150",
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-primary/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 shrink-0" />
                          {item.label}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 group-hover/item:opacity-60 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-150 shrink-0"
                        />
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Item count footer (only if >20 items) */}
              {items.length > 20 && filteredItems.length === items.length && (
                <div className="px-4 py-2 text-center text-white/30 text-xs border-t border-white/10 bg-white/5">
                  {items.length} temples • Scroll for more
                </div>
              )}

              {/* Bottom shimmer line */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </FloatingPortal>
      </div>
    </>
  );
}
