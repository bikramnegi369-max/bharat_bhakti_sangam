"use client";

import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
};

export function FloatingCTA({ href, label, icon, className }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={clsx(
        "flex items-center gap-3 rounded-full px-4 py-3 shadow-lg",
        "bg-green-500 text-white",
        "hover:scale-105 active:scale-95 transition",
        className,
      )}
    >
      <span className="flex items-center justify-center">{icon}</span>

      <span className="text-sm font-medium hidden sm:block">{label}</span>
    </Link>
  );
}
