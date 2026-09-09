"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/_types/Sidebar.types";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

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
        "group relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 select-none",
        // Top-level styling
        depth === 0 &&
          isExactActive &&
          "bg-white/15 text-white font-semibold shadow-inner border-l-[3px] border-amber-400 pl-3.5",
        depth === 0 &&
          !isExactActive &&
          isActive &&
          "bg-white/10 text-white font-medium border-l-[3px] border-amber-400/60 pl-3.5",
        depth === 0 &&
          !isActive &&
          "text-stone-300 hover:text-white hover:bg-white/8 hover:translate-x-0.5",
        // Sub-level (children) styling
        depth > 0 &&
          isExactActive &&
          "bg-amber-400/15 text-amber-300 font-semibold shadow-xs",
        depth > 0 &&
          !isExactActive &&
          "text-stone-400 hover:text-stone-100 hover:bg-white/5",
        depth > 0 && "py-2 px-3 text-[13.5px]",
      )}
      onClick={handleToggle}
      role={hasChildren ? "button" : undefined}
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-current={isExactActive ? "page" : undefined}
    >
      <div className="flex items-center gap-3 min-w-0">
        {item.icon ? (
          <span
            className={clsx(
              "shrink-0 transition-colors duration-200",
              depth === 0 && isExactActive && "text-amber-400",
              depth === 0 && !isExactActive && isActive && "text-amber-300/90",
              depth === 0 &&
                !isActive &&
                "text-stone-400 group-hover:text-amber-300/80",
              depth > 0 && isExactActive && "text-amber-400",
              depth > 0 && !isExactActive && "text-stone-400 group-hover:text-stone-200",
            )}
          >
            {item.icon}
          </span>
        ) : depth > 0 ? (
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full shrink-0 transition-all",
              isExactActive ? "bg-amber-400 scale-125" : "bg-stone-500 group-hover:bg-stone-300",
            )}
          />
        ) : null}
        <span className="truncate tracking-wide">{item.label}</span>
      </div>

      {hasChildren && (
        <ChevronRight
          className={clsx(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isActive ? "text-amber-300" : "text-stone-400 group-hover:text-stone-200",
            isOpen && "rotate-90",
          )}
        />
      )}
    </div>
  );

  return (
    <li className="w-full list-none mb-1">
      {item.href ? (
        <Link href={item.href} className="block w-full">
          {content}
        </Link>
      ) : (
        content
      )}

      {hasChildren && isOpen && (
        <div className="ml-5 pl-3 mt-1.5 mb-2 border-l border-white/10 space-y-1">
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
    <ul className={clsx("flex flex-col w-full gap-0.5", depth === 0 && "px-3")}>
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
