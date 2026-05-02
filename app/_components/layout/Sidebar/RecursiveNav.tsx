"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/_types/Sidebar.types";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
  item: SidebarItem;
  depth?: number;
  onItemClick?: () => void;
  openItemId: string | null;
  onToggle: (id: string | null) => void;
}

const NavItem = ({
  item,
  depth = 0,
  onItemClick,
  openItemId,
  onToggle,
}: NavItemProps) => {
  const pathname = usePathname();

  const isAnyChildActive = (node: SidebarItem): boolean => {
    if (node.href === pathname) return true;
    return !!node.children?.some((child) => isPathActive(child));
  };

  const isPathActive = (node: SidebarItem) => isAnyChildActive(node);

  const hasChildren = item.children && item.children.length > 0;
  const isActive = isPathActive(item);
  const isExactActive = item.href === pathname;
  const isOpen = hasChildren && openItemId === item.id;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      onToggle(openItemId === item.id ? null : item.id);
    } else {
      onItemClick?.();
    }
  };

  const content = (
    <div
      className={clsx(
        "group flex items-center justify-between px-3.5 py-2 cursor-pointer transition-all rounded-lg relative mb-1",
        depth === 0 &&
          isActive &&
          "bg-primary font-semibold shadow-sm shadow-primary/5",
        depth === 0 && isExactActive && "text-black",
        depth === 0 &&
          !isActive &&
          "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80",
        depth > 0 && isExactActive && "text-primary font-bold",
        depth > 0 &&
          !isExactActive &&
          "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80",
        depth > 0 && "pl-6 text-[14px]",
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
              depth === 0 && isActive && "text-white",
              depth > 0 && isExactActive && "text-primary",
              depth === 0 &&
                !isActive &&
                "text-gray-400 group-hover:text-gray-500",
              depth > 0 &&
                !isExactActive &&
                "text-gray-400 group-hover:text-gray-500",
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
            "h-3.5 w-3.5 transition-transform duration-200",
            depth === 0 && isActive
              ? "text-black"
              : "text-gray-400 group-hover:text-gray-600",
            isOpen && "rotate-180",
          )}
        />
      )}
    </div>
  );

  return (
    <li className="w-full list-none">
      {item.href ? <Link href={item.href}>{content}</Link> : content}

      {hasChildren && isOpen && (
        <div className="ml-5 my-1 pb-1">
          <RecursiveNav
            items={item.children!}
            onItemClick={onItemClick}
            depth={depth + 1}
          />
        </div>
      )}
    </li>
  );
};

const getActiveItemId = (
  items: SidebarItem[],
  pathname: string,
): string | null => {
  const isPathActive = (node: SidebarItem): boolean =>
    node.href === pathname || !!node.children?.some(isPathActive);

  const activeItem = items.find(isPathActive);
  return activeItem?.id ?? null;
};

export const RecursiveNav = ({
  items,
  onItemClick,
  depth = 0,
}: {
  items: SidebarItem[];
  onItemClick?: () => void;
  depth?: number;
}) => {
  const pathname = usePathname();
  const initialOpenItemId = useMemo(
    () => getActiveItemId(items, pathname),
    [items, pathname],
  );
  const [openItemId, setOpenItemId] = useState<string | null>(
    initialOpenItemId,
  );

  useEffect(() => {
    setOpenItemId(initialOpenItemId);
  }, [initialOpenItemId]);

  return (
    <ul className="flex flex-col w-full gap-1 px-4">
      {items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          depth={depth}
          onItemClick={onItemClick}
          openItemId={openItemId}
          onToggle={setOpenItemId}
        />
      ))}
    </ul>
  );
};
