"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import clsx from "clsx";

interface LiveButtonProps {
  href: string;
  className?: string;
}

export function LiveButton({ href, className }: LiveButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group relative flex items-center gap-2 overflow-hidden rounded-full",
        "bg-gradient-to-r from-red-600 to-red-700",
        "px-5 py-2",
        "text-white transition-all duration-300 ease-out",
        "hover:from-red-700 hover:to-red-800 hover:scale-105 active:scale-95",
        "shadow-xl shadow-red-700/30",
        className,
      )}
    >
      {/* Pulsing Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
      </span>

      <span className="text-sm font-bold tracking-wider uppercase">Live</span>

      <div className="flex items-center border-l border-white/30 pl-2 ml-1">
        <Play
          size={14}
          fill="currentColor"
          className="group-hover:translate-x-0.5 transition-transform duration-200"
        />
      </div>
    </Link>
  );
}
