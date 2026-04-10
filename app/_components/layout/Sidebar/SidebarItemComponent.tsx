import { ITEM_HEIGHT, ITEM_WIDTH } from "@/_config/Sidebar.config";
import { SidebarItem } from "@/_types/Sidebar.types";
import clsx from "clsx";
import Link from "next/link";

export function SidebarItemComponent({
  item,
  active,
}: {
  item: SidebarItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={clsx(
        "flex items-center justify-center rounded-md  text-sm font-medium transition-all",
        ITEM_WIDTH,
        ITEM_HEIGHT,
        active
          ? "border-2 border-primary text-primary "
          : "bg-primary  hover:bg-primary/80",
      )}
    >
      {item.label}
    </Link>
  );
}
