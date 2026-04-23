"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/_types/Sidebar.types";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
  item: SidebarItem;
  depth?: number;
  onItemClick?: () => void;
}

const NavItem = ({ item, depth = 0, onItemClick }: NavItemProps) => {
  const pathname = usePathname();

  // Recursive function to check if this item or any of its children match the current path
  const isAnyChildActive = (node: SidebarItem): boolean => {
    if (node.href === pathname) return true;
    return !!node.children?.some((child) => isPathActive(child));
  };

  const isPathActive = (node: SidebarItem) => isAnyChildActive(node);

  const hasChildren = item.children && item.children.length > 0;
  const isActive = isPathActive(item);

  // Check if this specific item's link is exactly the current page
  const isExactActive = item.href === pathname;

  // State for toggling sub-menus
  const [isOpen, setIsOpen] = useState(isActive);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onItemClick?.();
    }
  };

  const content = (
    <div
      className={clsx(
        "group flex items-center justify-between px-3 py-2 cursor-pointer transition-all rounded-lg relative mb-1",
        isActive
          ? "bg-primary font-semibold shadow-sm shadow-primary/5"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80",
        depth > 0 && "pl-4 text-[13px]",
      )}
      onClick={handleToggle}
      role={hasChildren ? "button" : undefined}
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-current={isExactActive ? "page" : undefined}
    >
      <div className="flex items-center gap-3">
        {item.icon && (
          <span
            className={clsx(
              "shrink-0 transition-colors",
              isActive
                ? "text-primary"
                : "text-gray-400 group-hover:text-gray-500",
            )}
          >
            {item.icon}
          </span>
        )}
        <span className="truncate">{item.label}</span>
      </div>
      {hasChildren && (
        <ChevronDown
          className={clsx(
            "h-3.5 w-3.5 transition-transform duration-200 text-gray-400 group-hover:text-gray-600",
            isOpen && "rotate-180",
            isActive && "text-black!",
          )}
        />
      )}
    </div>
  );

  return (
    <li className="w-full list-none">
      {item.href ? <Link href={item.href}>{content}</Link> : content}

      {hasChildren && isOpen && (
        <ul className="flex flex-col relative ml-5 my-1 pb-1">
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const RecursiveNav = ({
  items,
  onItemClick,
}: {
  items: SidebarItem[];
  onItemClick?: () => void;
}) => {
  return (
    <ul className="flex flex-col w-full gap-1 px-2">
      {items.map((item) => (
        <NavItem key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </ul>
  );
};
