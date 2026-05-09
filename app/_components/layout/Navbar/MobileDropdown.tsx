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
    <div className="space-y-1">
      <div className="flex w-full items-center justify-between py-1">
        <Link
          href={href}
          onClick={onCloseMenu}
          className={clsx(
            "flex-1 py-1 transition-colors text-[18px]",
            isActive ? "text-primary font-semibold" : "text-para",
          )}
        >
          {label}
        </Link>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-para/50 hover:text-primary transition-colors"
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
          isExpanded ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0",
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
