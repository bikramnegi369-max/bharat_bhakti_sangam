"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoReviewFormData,
  VideoReviewSchema,
} from "../schemas/video-review.schema";
import { VideoReviewItem } from "../types";
import { VideoUploadField } from "@/_components/ui/Field/VideoUploadField";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import {
  X,
  Sparkles,
  Film,
  MapPin,
  User,
  Star,
  PlaySquare,
} from "lucide-react";
import { poppins } from "@/_lib/fonts";

interface VideoReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VideoReviewFormData) => Promise<void>;
  initialData?: VideoReviewItem | null;
  isSubmitting?: boolean;
}

export default function VideoReviewFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: VideoReviewFormModalProps) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VideoReviewFormData>({
    resolver: zodResolver(VideoReviewSchema),
    defaultValues: {
      title: initialData?.title || "",
      reviewerName: initialData?.reviewerName || "",
      location: initialData?.location || "",
      rating: initialData?.rating ?? 5,
      highlightVideoSrc: initialData?.highlightVideoSrc || "",
      videoSrc: initialData?.videoSrc || "",
      posterSrc: initialData?.posterSrc || "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title || "",
        reviewerName: initialData?.reviewerName || "",
        location: initialData?.location || "",
        rating: initialData?.rating ?? 5,
        highlightVideoSrc: initialData?.highlightVideoSrc || "",
        videoSrc: initialData?.videoSrc || "",
        posterSrc: initialData?.posterSrc || "",
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in select-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-review-form-title"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-[#2d0403] via-[#3a0605] to-[#250303] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <Film size={20} />
            </div>
            <div>
              <h2
                id="video-review-form-title"
                className={`${poppins.className} text-lg font-bold text-white leading-tight`}
              >
                {isEditing ? "Edit Video Review" : "Add New Video Review"}
              </h2>
              <p className="text-xs text-amber-200/70">
                Displays on Home Page (Experience the Divine carousel)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar"
        >
          {/* 1. Highlight Video for Autoplay Loop Card */}
          <div>
            <VideoUploadField
              name="highlightVideoSrc"
              control={control}
              label="Highlight Video (Looping Card Preview)"
              helperText="Short video clip that autoplays in a loop on the review card (MP4/WebM, max 50MB)."
              aspectRatio="9/16"
              selectText="Select highlight preview video"
              badgeText="9:16 Vertical Loop Preview"
              error={errors.highlightVideoSrc?.message}
              required
            />
          </div>

          {/* 2. Full Video for Lightbox Modal Playback */}
          <div>
            <VideoUploadField
              name="videoSrc"
              control={control}
              label="Full Review Video (Modal Playback)"
              helperText="The complete high-definition video review played when a devotee clicks the card."
              aspectRatio="9/16"
              selectText="Select full review video"
              badgeText="9:16 Vertical Full Video"
              error={errors.videoSrc?.message}
              required
            />
          </div>

          {/* 3. Poster Image (Optional) */}
          <div>
            <FileUploadField
              name="posterSrc"
              control={control}
              label="Poster Image (Optional)"
              helperText="Optional custom thumbnail. If left blank, Cloudinary automatically generates the poster image from the video."
              error={errors.posterSrc?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                <span>Review Title *</span>
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g. Mesmerizing Ganga Aarti & Ancient Temples"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600 text-sm transition"
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Reviewer Name (Optional - Displays "Anonymous" if empty) */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-[#E86A17]" />
                <span>Reviewer Name (Optional)</span>
              </label>
              <input
                type="text"
                {...register("reviewerName")}
                placeholder="Leave blank to show as Anonymous"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E86A17]/40 focus:border-[#E86A17] text-sm transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                If omitted or empty, card will show <strong>Anonymous</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-500" />
                <span>Location *</span>
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="e.g. Varanasi Ghats, UP"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition"
              />
              {errors.location && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Star size={14} className="text-amber-500" />
                <span>Rating * (1 - 5 Stars)</span>
              </label>
              <select
                {...register("rating", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition bg-white"
              >
                <option value={5}>5 Stars ★★★★★ (Supreme Devotion)</option>
                <option value={4}>4 Stars ★★★★☆ (Wonderful Experience)</option>
                <option value={3}>3 Stars ★★★☆☆ (Good Experience)</option>
                <option value={2}>2 Stars ★★☆☆☆ (Fair)</option>
                <option value={1}>1 Star ★☆☆☆☆</option>
              </select>
              {errors.rating && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] text-white text-sm font-semibold shadow-md hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <PlaySquare size={16} />
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Review"
                  : "Save Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
