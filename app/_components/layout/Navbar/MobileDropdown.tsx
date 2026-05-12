"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import clsx from "clsx";

interface MobileDropdownProps {
  label: string;
  href: string;
  isActive: boolean;
  items: { label: string; href: string }[];
  onCloseMenu: () => void;
}

export default function MobileDropdown({
  label,
  href,
  isActive,
  items,
  onCloseMenu,
}: MobileDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search
  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : items;

  // Reset search when collapsing
  const handleToggle = () => {
    if (isExpanded) {
      setSearchQuery(""); // Reset search when collapsing
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between group">
        <Link
          href={href}
          onClick={onCloseMenu}
          className={clsx(
            "flex-1 transition-colors",
            isActive
              ? "text-primary font-semibold"
              : "text-para group-hover:text-heading",
          )}
        >
          {label}
        </Link>

        <button
          type="button"
          onClick={handleToggle}
          className="pl-4 py-1 text-para/50 hover:text-primary transition-colors"
          aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
        >
          <ChevronDown
            size={20}
            className={clsx(
              "transition-transform duration-300",
              isExpanded && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        className={clsx(
          "transition-all duration-300 ease-in-out pl-4",
          isExpanded
            ? "max-h-full opacity-100 py-2"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        {/* Search bar - only shows if >15 temples */}
        {items.length > 15 && (
          <div className="mb-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-para/40" />
            <input
              type="text"
              placeholder={`Search ${items.length} temples...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-primary/20 bg-white focus:border-primary outline-none text-heading placeholder:text-para/40"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Scrollable list with max height */}
        <div
          className={clsx(
            "space-y-2 border-l border-primary/20",
            items.length > 10 && "max-h-[50vh] overflow-y-auto pr-2",
          )}
        >
          {filteredItems.length === 0 ? (
            <div className="py-4 text-center text-para/60 text-sm">
              No temples found
            </div>
          ) : (
            filteredItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMenu}
                className="block py-1.5 text-[16px] text-para/80 hover:text-primary active:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))
          )}
        </div>

        {/* Quick stats footer */}
        {items.length > 15 && filteredItems.length === items.length && (
          <div className="mt-2 pt-2 text-xs text-para/40 border-t border-primary/10">
            {items.length} temples
            {items.length > 10 && " • Scroll for more"}
          </div>
        )}
      </div>
    </div>
  );
}
