"use client";

import { useState, useEffect } from "react";
import GlobalModal from "@/_components/common/GlobalModal";
import { StatusItem } from "@/_types/Status.types";
import {
  Download,
  Share2,
  Check,
  X,
  Sparkles,
  Loader2,
  Volume2,
  VolumeX,
  Heart,
} from "lucide-react";
import {
  incrementDownload,
  toggleLikeStatus,
} from "@/_features/status/services/status.service";
import { toast } from "react-toastify";
import clsx from "clsx";

const LIKED_STORAGE_KEY = "bbs_liked_status_ids";

interface StatusDownloadModalProps {
  status: StatusItem | null;
  onClose: () => void;
  onSelectTag?: (tag: string) => void;
  onStatusUpdated?: (updated: StatusItem) => void;
}

export default function StatusDownloadModal({
  status,
  onClose,
  onSelectTag,
  onStatusUpdated,
}: StatusDownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Like state with optimistic UI and localStorage persistence
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  // Download counter state for immediate zero-latency feedback
  const [downloadsCount, setDownloadsCount] = useState(0);

  // Synchronize state when modal opens for a status
  useEffect(() => {
    if (!status) return;
    const currentLikes = status.likes ?? status.likesCount ?? 0;
    setLikesCount(currentLikes);
    setDownloadsCount(status.downloadsCount ?? 0);

    try {
      const stored = localStorage.getItem(LIKED_STORAGE_KEY);
      const likedIds: string[] = stored ? JSON.parse(stored) : [];
      setIsLiked(likedIds.includes(status._id));
    } catch {
      setIsLiked(false);
    }
  }, [status?._id, status?.likes, status?.likesCount, status?.downloadsCount]);

  if (!status) return null;

  const handleToggleLike = async () => {
    const nextLiked = !isLiked;
    const nextCount = Math.max(0, likesCount + (nextLiked ? 1 : -1));

    // 1. Optimistic UI update
    setIsLiked(nextLiked);
    setLikesCount(nextCount);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 450);

    // 2. Persist in localStorage
    try {
      const stored = localStorage.getItem(LIKED_STORAGE_KEY);
      const likedIds: string[] = stored ? JSON.parse(stored) : [];
      let updatedIds: string[];
      if (nextLiked) {
        updatedIds = Array.from(new Set([...likedIds, status._id]));
      } else {
        updatedIds = likedIds.filter((id) => id !== status._id);
      }
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(updatedIds));
    } catch {
      // Ignore storage write issues
    }

    // 3. Notify parent gallery if callback provided
    if (onStatusUpdated) {
      onStatusUpdated({
        ...status,
        likes: nextCount,
        likesCount: nextCount,
      });
    }

    // 4. Server call with graceful rollback on error
    const action = nextLiked ? "like" : "unlike";
    const res = await toggleLikeStatus(status._id, action);
    if (!res.success) {
      // Rollback on failure
      setIsLiked(!nextLiked);
      setLikesCount(likesCount);
      toast.error("Could not update like. Please try again.");
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(10);

      // 1. Optimistically increment download count for zero-latency feedback
      const nextDownloads = downloadsCount + 1;
      setDownloadsCount(nextDownloads);

      if (onStatusUpdated) {
        onStatusUpdated({
          ...status,
          downloadsCount: nextDownloads,
          likes: likesCount,
          likesCount,
        });
      }

      // 2. Fire backend download tracking
      incrementDownload(status._id)
        .then((res) => {
          if (res.success && res.data?.downloadsCount !== undefined) {
            setDownloadsCount(res.data.downloadsCount);
            if (onStatusUpdated) {
              onStatusUpdated({
                ...status,
                downloadsCount: res.data.downloadsCount,
                likes: likesCount,
                likesCount,
              });
            }
          }
        })
        .catch(console.error);

      // 3. Fetch the video file as blob to force native browser save-as dialog
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

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/status?id=${status._id}`;
    }
    return `https://www.bharatbhaktisangam.com/status?id=${status._id}`;
  };

  const handleShareWhatsApp = async () => {
    const shareUrl = getShareUrl();
    const tagText = status.tags.length > 0 ? status.tags.map((t) => `#${t}`).join(" ") : "Bhakti";
    const shareTitle = `${tagText} Devotional Status Video`;
    const shareMessage = `Watch & download this sacred ${tagText} Status Video on Bharat Bhakti Sangam:\n${shareUrl}`;

    // Prefer native Web Share API on mobile (opens WhatsApp / Instagram directly)
    if (navigator.share && navigator.canShare?.({ title: shareTitle, url: shareUrl })) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Watch & download this sacred devotional video:`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return; // User closed share sheet
      }
    }

    // Fallback: direct WhatsApp API link with encoded text
    const text = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.info("Status link copied to clipboard!");
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

          {/* Floating Heart / Like Button on top right of video player */}
          <button
            type="button"
            onClick={handleToggleLike}
            aria-label={isLiked ? "Unlike video" : "Like video"}
            className={clsx(
              "absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer select-none",
              isLiked
                ? "bg-rose-950/80 border-rose-500/60 text-rose-400 shadow-md shadow-rose-950/50"
                : "bg-black/60 border-white/15 text-white/80 hover:text-white hover:bg-black/80",
              isLikeAnimating && "scale-115",
            )}
          >
            <Heart
              size={17}
              className={clsx(
                "transition-transform duration-300",
                isLiked ? "fill-rose-500 text-rose-500" : "fill-transparent",
                isLikeAnimating && "scale-125",
              )}
            />
            <span className="text-xs font-bold font-mono">
              {likesCount.toLocaleString()}
            </span>
          </button>

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

          {/* Download, Like & Share Actions */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2">
              {/* Primary Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="relative flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base text-white bg-linear-to-r from-[#85130E] via-[#A81E18] to-[#630B08] hover:brightness-110 active:scale-[0.99] shadow-lg shadow-red-950/50 transition-all border border-amber-500/30 cursor-pointer overflow-hidden disabled:opacity-75"
              >
                {isDownloading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-amber-300" />
                    <span>Preparing Download ({downloadProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} className="text-amber-300" />
                    <span className="flex items-center gap-1.5">
                      <span>Download Video</span>
                      <span className="text-xs font-normal text-amber-200/80">
                        ({downloadsCount.toLocaleString()})
                      </span>
                    </span>
                  </>
                )}
              </button>

              {/* Like Button (Icon with Count, mirrors Download button styling) */}
              <button
                type="button"
                onClick={handleToggleLike}
                aria-label={isLiked ? "Unlike status video" : "Like status video"}
                title={isLiked ? "Unlike" : "Like this status"}
                className={clsx(
                  "flex items-center justify-center gap-2 py-3.5 px-4.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer border select-none shrink-0 shadow-lg",
                  isLiked
                    ? "bg-linear-to-r from-rose-700 to-red-800 text-white border-rose-400/50 shadow-rose-950/50 scale-102"
                    : "bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white border-white/15 active:scale-95",
                )}
              >
                <Heart
                  size={19}
                  className={clsx(
                    "transition-transform duration-300",
                    isLiked
                      ? "fill-white text-white drop-shadow-sm"
                      : "text-rose-400 group-hover:scale-110",
                    isLikeAnimating && "scale-130 animate-pulse",
                  )}
                />
                <span className="font-semibold text-xs sm:text-sm">
                  {likesCount.toLocaleString()}
                </span>
              </button>
            </div>

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
                    <Share2 size={15} className="text-amber-300" />
                    <span>Copy Link</span>
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
