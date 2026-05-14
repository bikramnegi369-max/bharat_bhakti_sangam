"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(() => (isActive ? true : false));

  const handleToggle = () => {
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
          "transition-all duration-500 ease-in-out pl-4",
          isExpanded
            ? "max-h-500 opacity-100 py-2"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="space-y-2 border-l border-primary/20">
          {items.map((item) => {
            const isSubActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMenu}
                className={clsx(
                  "block py-1.5 text-[16px] transition-colors",
                  isSubActive
                    ? "text-primary font-bold"
                    : "text-para/80 hover:text-primary active:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
