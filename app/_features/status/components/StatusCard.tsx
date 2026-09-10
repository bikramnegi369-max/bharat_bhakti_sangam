"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { StatusItem } from "@/_types/Status.types";
import { Play, Download } from "lucide-react";
import clsx from "clsx";

interface StatusCardProps {
  status: StatusItem;
  onOpenModal: (status: StatusItem) => void;
  priority?: boolean;
}

export default function StatusCard({
  status,
  onOpenModal,
  priority = false,
}: StatusCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user gesture
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const [isImageError, setIsImageError] = useState(false);

  const posterUrl =
    status.thumbnailUrl || status.videoUrl.replace(/\.[^/.]+$/, ".jpg");

  return (
    <div
      onClick={() => onOpenModal(status)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col w-full aspect-9/16 rounded-2xl overflow-hidden bg-stone-900 border border-amber-900/20 shadow-md hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 cursor-pointer transform-gpu hover:-translate-y-1.5 select-none"
    >
      {/* Poster Image (Visible when not hovering/playing) */}
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-500 z-1",
          isHovered && isVideoLoaded
            ? "opacity-0 pointer-events-none"
            : "opacity-100",
        )}
      >
        {!isImageError && posterUrl.startsWith("http") && !posterUrl.includes("helloworld.com") ? (
          <Image
            src={posterUrl}
            alt={status.tags.join(" ") || "Bhakti status video poster"}
            fill
            unoptimized
            priority={priority}
            onError={() => setIsImageError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-b from-[#2b0808] via-[#1a0505] to-black flex items-center justify-center p-4 text-center">
            <div className="flex flex-col items-center gap-2 opacity-60">
              <span className="text-2xl font-serif text-amber-500/80 font-bold">ॐ</span>
              <span className="text-xs text-amber-200/70 font-medium">Bhakti Status</span>
            </div>
          </div>
        )}

        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* Video Element (Plays preview silently on hover) */}
      <video
        ref={videoRef}
        src={status.videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        className={clsx(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-2",
          isHovered && isVideoLoaded
            ? "opacity-100"
            : "opacity-0 pointer-events-none",
        )}
      >
        <source src={status.videoUrl} type="video/mp4" />
      </video>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 z-3 flex items-center justify-center pointer-events-none">
        <div
          className={clsx(
            "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl",
            isHovered
              ? "bg-amber-500/90 text-white scale-110"
              : "bg-black/45 text-white/90 group-hover:scale-105 border border-white/20",
          )}
        >
          <Play size={22} className="ml-0.5 fill-current" />
        </div>
      </div>

      {/* Bottom Content Bar: Tags & Downloads Count */}
      <div className="absolute bottom-0 inset-x-0 z-3 p-3.5 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/70 to-transparent pt-12 pointer-events-none">
        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {status.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-semibold tracking-wider text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-md backdrop-blur-xs"
            >
              #{tag}
            </span>
          ))}
          {status.tags.length > 3 && (
            <span className="text-[10px] text-stone-300 bg-white/10 px-1.5 py-0.5 rounded-md">
              +{status.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action / Download Stat bar */}
        <div className="flex items-center justify-between text-xs text-white/80 pt-1 border-t border-white/10">
          <span className="flex items-center gap-1 text-[11px] font-medium text-stone-300">
            <Download size={12} className="text-amber-400" />
            {status.downloadsCount.toLocaleString()} downloads
          </span>
          <span className="text-[11px] text-amber-300 font-semibold group-hover:translate-x-0.5 transition-transform">
            Download &gt;
          </span>
        </div>
      </div>
    </div>
  );
}
