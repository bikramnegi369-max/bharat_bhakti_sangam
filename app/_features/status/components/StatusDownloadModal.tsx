"use client";

import { useState } from "react";
import GlobalModal from "@/_components/common/GlobalModal";
import { StatusItem } from "@/_types/Status.types";
import {
  Download,
  Share2,
  Check,
  X,
  Sparkles,
  Loader2,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { incrementDownload } from "@/_services/status.service";
import { toast } from "react-toastify";

interface StatusDownloadModalProps {
  status: StatusItem | null;
  onClose: () => void;
  onSelectTag?: (tag: string) => void;
}

export default function StatusDownloadModal({
  status,
  onClose,
  onSelectTag,
}: StatusDownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!status) return null;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(10);

      // Trigger download tracking
      incrementDownload(status._id).catch(console.error);

      // Fetch the video file as blob to force native browser save-as dialog
      const response = await fetch(status.videoUrl);
      if (!response.ok) {
        throw new Error("Unable to download video directly");
      }

      setDownloadProgress(50);
      const blob = await response.blob();
      setDownloadProgress(85);

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const tagSlug = status.tags[0] || "bhakti";
      link.download = `${tagSlug}-bhakti-status-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      setDownloadProgress(100);

      toast.success("Bhakti Status video downloaded successfully!");
    } catch {
      // Fallback: direct window open if cross-origin fetch is restricted
      const link = document.createElement("a");
      link.href = status.videoUrl;
      link.target = "_blank";
      link.download = `bhakti-status-${Date.now()}.mp4`;
      link.click();
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 600);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Watch and download this divine Bhakti Status on Bharat Bhakti Sangam:\n${window.location.href}`,
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(status.videoUrl);
    setCopied(true);
    toast.info("Video link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlobalModal
      open={!!status}
      onClose={onClose}
      size="md"
      width="min(94vw, 540px)"
    >
      <div className="relative flex flex-col bg-stone-950 text-white overflow-hidden rounded-2xl border border-amber-900/40">
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

        {/* Video Player Section */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden aspect-9/16 max-h-[62vh]">
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

          {/* Quick Sound Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        {/* Info and Actions Section */}
        <div className="p-4 sm:p-5 space-y-4 bg-linear-to-b from-stone-950 to-[#1e0705]">
          {/* Tags list */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
              <Sparkles size={13} />
              <span>Devotional Tags</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {status.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onSelectTag?.(tag);
                    onClose();
                  }}
                  className="text-xs px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 font-medium hover:bg-amber-800/60 transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Download & Share Actions */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="relative w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-linear-to-r from-[#85130E] via-[#A81E18] to-[#630B08] hover:brightness-110 active:scale-[0.99] shadow-lg shadow-red-950/50 transition-all border border-amber-500/30 cursor-pointer overflow-hidden disabled:opacity-75"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-amber-300" />
                  <span>Preparing Download ({downloadProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download size={18} className="text-amber-300" />
                  <span>Download Video For Status</span>
                </>
              )}
            </button>

            {/* Social Share / WhatsApp button */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/30 transition-colors cursor-pointer"
              >
                <Share2 size={15} />
                <span>Share WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white/90 hover:text-white border border-white/15 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Play size={15} className="text-amber-300" />
                    <span>Copy Video URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </GlobalModal>
  );
}
