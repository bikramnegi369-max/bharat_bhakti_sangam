"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
          onClick={() => setIsExpanded(!isExpanded)}
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
          "overflow-hidden transition-all duration-300 ease-in-out pl-4 space-y-2 border-l border-primary/20",
          isExpanded ? "max-h-125 opacity-100 py-2" : "max-h-0 opacity-0",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMenu}
            className="block py-1.5 text-[16px] text-para/80 hover:text-primary active:text-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
