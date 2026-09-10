import Image from "next/image";
import { StatusItem } from "@/_types/Status.types";
import { createColumn } from "@/_utils/createColumn";
import { Download, Video } from "lucide-react";

const c = createColumn<StatusItem>();

export const getStatusColumns = (onPreview?: (status: StatusItem) => void) => [
  c("videoUrl", {
    header: "Video Preview",
    accessorFn: (row) => row.videoUrl,
    cell: (_value, row) => {
      const posterUrl =
        row.thumbnailUrl ||
        (row.videoUrl ? row.videoUrl.replace(/\.[^/.]+$/, ".jpg") : "");

      return (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onPreview?.(row)}
            className="relative w-12 h-16 rounded-lg overflow-hidden bg-stone-900 border border-slate-200 shrink-0 shadow-xs group cursor-pointer hover:border-amber-500 hover:ring-2 hover:ring-amber-500/30 transition-all text-left"
            title="Click to preview video"
          >
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={row.tags?.join(" ") || "Status thumbnail"}
                fill
                unoptimized
                sizes="48px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <video
                src={row.videoUrl}
                muted
                preload="metadata"
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 flex items-center justify-center transition-colors">
              <div className="w-6 h-6 rounded-full bg-white/90 group-hover:bg-white text-stone-900 flex items-center justify-center shadow-md transition-all group-hover:scale-110">
                <Video size={12} className="text-[#740E0A] fill-current" />
              </div>
            </div>
          </button>
        </div>
      );
    },
  }),
  c("tags", {
    header: "Search Tags",
    accessorFn: (row) => row.tags.join(", "),
    cell: (_value, row) => (
      <div className="flex flex-wrap gap-1.5 max-w-md">
        {row.tags && row.tags.length > 0 ? (
          row.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400 italic">No tags</span>
        )}
      </div>
    ),
  }),
  c("downloadsCount", {
    header: "Downloads",
    accessorFn: (row) => row.downloadsCount,
    cell: (_value, row) => (
      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
        <Download size={13} className="shrink-0" />
        <span>{row.downloadsCount.toLocaleString()} downloads</span>
      </div>
    ),
  }),
  c("createdAt", {
    header: "Created Date",
    accessorFn: (row) => row.createdAt,
    cell: (value) => {
      if (!value) return <span className="text-xs text-slate-400">-</span>;
      const date = new Date(value as string);
      return (
        <span className="text-xs text-slate-600">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  }),
];

export const StatusColumns = getStatusColumns();
