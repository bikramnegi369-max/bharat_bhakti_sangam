"use client";

import clsx from "clsx";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { EllipsisVertical } from "lucide-react";
import { ReactNode, useState } from "react";

export type ActionMenuItem = {
  key: string;
  label: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger";
  closeOnSelect?: boolean;
};

interface ActionMenuProps {
  items: ActionMenuItem[];
  trigger?: ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  placement?: "bottom-start" | "bottom-end";
  ariaLabel?: string;
}

export default function ActionMenu({
  items,
  trigger,
  triggerClassName,
  menuClassName,
  itemClassName,
  placement = "bottom-end",
  ariaLabel = "Open actions menu",
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 12 }), shift({ padding: 12 })],
  });
  const { setReference, setFloating } = refs;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: "menu" }),
  ]);

  return (
    <>
      <button
        type="button"
        ref={setReference}
        className={clsx(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer",
          triggerClassName,
        )}
        aria-label={ariaLabel}
        {...getReferenceProps()}
      >
        {trigger ?? <EllipsisVertical size={18} />}
      </button>

      {open && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={floatingStyles}
            className={clsx(
              "z-140 min-w-40 rounded-xl border border-black/10 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.16)]",
              menuClassName,
            )}
            {...getFloatingProps()}
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) {
                      return;
                    }

                    item.onClick();

                    if (item.closeOnSelect !== false) {
                      setOpen(false);
                    }
                  }}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors border cursor-pointer",
                    item.variant === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-slate-700 hover:bg-slate-100",
                    item.disabled && "cursor-not-allowed opacity-50",
                    itemClassName,
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 text-current">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
