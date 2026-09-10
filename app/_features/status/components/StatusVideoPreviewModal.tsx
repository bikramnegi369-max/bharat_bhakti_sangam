"use client";

import { useState } from "react";
import GlobalModal from "@/_components/common/GlobalModal";
import { StatusItem } from "@/_types/Status.types";
import { X, Volume2, VolumeX, Download, Sparkles } from "lucide-react";

interface StatusVideoPreviewModalProps {
  status: StatusItem | null;
  onClose: () => void;
}

export default function StatusVideoPreviewModal({
  status,
  onClose,
}: StatusVideoPreviewModalProps) {
  const [isMuted, setIsMuted] = useState(false);

  if (!status) return null;

  return (
    <GlobalModal
      open={!!status}
      onClose={onClose}
      size="md"
      width="min(94vw, 500px)"
    >
      <div className="relative flex flex-col bg-stone-950 text-white overflow-hidden rounded-2xl border border-amber-900/40 shadow-2xl">
        {/* Header Close button */}
        <div className="absolute top-3 right-3 z-30">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* 9:16 Video Player Container */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden aspect-9/16 max-h-[65vh]">
          <video
            key={status._id}
            src={status.videoUrl}
            controls
            autoPlay
            playsInline
            muted={isMuted}
            preload="auto"
            className="w-full h-full object-contain bg-black"
          >
            <source src={status.videoUrl} type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-linear-to-b from-stone-950 to-[#1e0705] border-t border-white/10 space-y-3">
          {status.tags && status.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mb-1.5">
                <Sparkles size={12} />
                <span>Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {status.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 text-xs text-stone-400 border-t border-white/5">
            <span>{status.downloadsCount.toLocaleString()} downloads</span>
            <a
              href={status.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <Download size={13} />
              <span>Open raw video</span>
            </a>
          </div>
        </div>
      </div>
    </GlobalModal>
  );
}
