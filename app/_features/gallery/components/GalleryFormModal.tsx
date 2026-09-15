"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GalleryItemFormData,
  GalleryItemSchema,
} from "../schemas/gallery.schema";
import { GalleryItem } from "../types";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import {
  X,
  Sparkles,
  Image as ImageIcon,
  MapPin,
  User,
  Tag,
  Calendar,
  Heart,
  MessageCircle,
} from "lucide-react";
import { poppins } from "@/_lib/fonts";

interface GalleryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GalleryItemFormData) => Promise<void>;
  initialData?: GalleryItem | null;
  isSubmitting?: boolean;
}

export default function GalleryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: GalleryFormModalProps) {
  const isEditing = Boolean(initialData);

  // Ensure date is in YYYY-MM-DD for HTML5 date picker if valid
  const formatInputDate = (d?: string) => {
    if (!d) return "";
    const parsed = new Date(d);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
    return d;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GalleryItemFormData>({
    resolver: zodResolver(GalleryItemSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || initialData?.src || "",
      title: initialData?.title || "",
      artistName: initialData?.artistName || "",
      category: initialData?.category || "",
      location: initialData?.location || "",
      date: formatInputDate(initialData?.date),
      likes: initialData?.likes ?? undefined,
      commentsCount: initialData?.commentsCount ?? undefined,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        imageUrl: initialData?.imageUrl || initialData?.src || "",
        title: initialData?.title || "",
        artistName: initialData?.artistName || "",
        category: initialData?.category || "",
        location: initialData?.location || "",
        date: formatInputDate(initialData?.date),
        likes: initialData?.likes ?? undefined,
        commentsCount: initialData?.commentsCount ?? undefined,
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in select-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-form-title"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-[#2d0403] via-[#3a0605] to-[#250303] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <ImageIcon size={20} />
            </div>
            <div>
              <h2
                id="gallery-form-title"
                className={`${poppins.className} text-lg font-bold text-white leading-tight`}
              >
                {isEditing ? "Edit Gallery Photo" : "Add New Gallery Photo"}
              </h2>
              <p className="text-xs text-amber-200/70">
                Displays on Home (Captured Memories) & Event (Event Gallery)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
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
          {/* Image Upload Field */}
          <div>
            <FileUploadField
              name="imageUrl"
              control={control}
              label="Gallery Image Photo"
              helperText="Upload a high-resolution photo (Max 5MB, JPG/WebP/PNG)."
              error={errors.imageUrl?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                <span>Photo Title *</span>
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g. Golden Hour Aarti at River Ghat"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600 text-sm transition"
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Artist Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-[#E86A17]" />
                <span>Artist Name *</span>
              </label>
              <input
                type="text"
                {...register("artistName")}
                placeholder="e.g. Pt. Ramkishan & Vrindavan Choir"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E86A17]/40 focus:border-[#E86A17] text-sm transition"
              />
              {errors.artistName && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.artistName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Tag size={14} className="text-slate-500" />
                <span>Category *</span>
              </label>
              <input
                type="text"
                {...register("category")}
                placeholder="e.g. Sacred Moments"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition"
              />
              {errors.category && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

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

            {/* Date with native HTML5 date picker & formatted storage */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-500" />
                <span>Event Date *</span>
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition bg-white"
              />
              {errors.date && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          {/* Social Engagement Stats (Likes & Comments Count) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Likes */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Heart size={14} className="text-rose-500" />
                <span>Likes *</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("likes", { valueAsNumber: true })}
                placeholder="e.g. 1850"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition"
              />
              {errors.likes && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.likes.message}
                </p>
              )}
            </div>

            {/* Comments Count */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MessageCircle size={14} className="text-blue-500" />
                <span>Comments Count *</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("commentsCount", { valueAsNumber: true })}
                placeholder="e.g. 142"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-sm transition"
              />
              {errors.commentsCount && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.commentsCount.message}
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
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] text-white text-sm font-semibold shadow-md hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Photo"
                  : "Add to Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
