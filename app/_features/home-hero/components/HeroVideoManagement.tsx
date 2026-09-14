"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Video,
  Play,
  ExternalLink,
  Sparkles,
  Film,
} from "lucide-react";
import { VideoUploadField } from "@/_components/ui/Field/VideoUploadField";
import { HeroVideoConfig } from "@/_types/HeroVideo.types";
import {
  HeroVideoFormData,
  HeroVideoSchema,
} from "@/_schemas/HeroVideo.schema";
import { updateHeroVideo } from "../services/hero-video.service";
import { extractPublicIdFromUrl } from "@/_lib/helpers";
import { deleteAssetByPublicId } from "@/_services/cloudinary.service";

interface HeroVideoManagementProps {
  initialConfig: HeroVideoConfig;
}

export default function HeroVideoManagement({
  initialConfig,
}: HeroVideoManagementProps) {
  const [config, setConfig] = useState<HeroVideoConfig>(initialConfig);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<HeroVideoFormData>({
    resolver: zodResolver(HeroVideoSchema),
    defaultValues: {
      videoUrl: initialConfig.videoUrl || "",
    },
  });

  const watchedVideoUrl = useWatch({
    control,
    name: "videoUrl",
  });
  const activeVideoSrc = watchedVideoUrl || config.videoUrl;

  const onSubmit = async (data: HeroVideoFormData) => {
    try {
      const oldVideoUrl = config.videoUrl;

      const result = await toast.promise(
        (async () => {
          const res = await updateHeroVideo({
            videoUrl: data.videoUrl,
          });

          if (!res.success || !res.data) {
            throw new Error(res.error || "Failed to update home hero video.");
          }

          // Transaction succeeded in backend: clean up previous Cloudinary video
          if (
            oldVideoUrl &&
            oldVideoUrl !== "/hero-video.mp4" &&
            oldVideoUrl !== data.videoUrl
          ) {
            const oldPublicId = extractPublicIdFromUrl(oldVideoUrl);
            if (oldPublicId) {
              deleteAssetByPublicId(oldPublicId, "video").catch((err) =>
                console.error("Failed to delete previous video from Cloudinary:", err),
              );
            }
          }

          return res.data;
        })(),
        {
          pending: "Updating hero video...",
          success: "Home hero video successfully updated!",
          error: "Failed to update hero video.",
        },
      );

      setConfig(result);
      reset({
        videoUrl: result.videoUrl,
      });
    } catch (err) {
      console.error("Hero video update error:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Page Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#2d0403] via-[#450705] to-[#1e0202] p-6 lg:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles size={14} />
              <span>Homepage Hero Video</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-serif">
              Home Hero Video Management
            </h1>
            <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
              Upload and set the hero video featured at the top of the Bharat Bhakti Sangam homepage.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-xs font-semibold text-white border border-white/15 backdrop-blur-xs transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ExternalLink size={15} className="text-amber-400" />
              <span>View Live Home</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Left preview, Right upload form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Video Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <Film size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Live Hero Video Preview
                </h2>
                <p className="text-xs text-stone-500">
                  Current video URL rendered on homepage
                </p>
              </div>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-stone-800 shadow-inner group">
              <video
                key={activeVideoSrc}
                src={activeVideoSrc}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlayingPreview(true)}
                onPause={() => setIsPlayingPreview(false)}
              >
                <source src={activeVideoSrc} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>

              {!isPlayingPreview && (
                <div className="pointer-events-none absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Meta Details Card */}
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2 text-xs">
              <span className="font-medium text-stone-500 block">
                Active Video URL
              </span>
              <p className="font-mono text-[11px] text-stone-700 break-all bg-white p-2.5 rounded-lg border border-stone-200">
                {activeVideoSrc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Video Upload & Submit Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 lg:p-8 space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h2 className="text-lg font-bold text-stone-900">
                Upload New Hero Video
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Upload a video to update the home hero video on the backend.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Video Upload Field */}
              <div className="space-y-1.5">
                <VideoUploadField
                  name="videoUrl"
                  control={control}
                  label="Hero Video File"
                  helperText="Upload 16:9 widescreen MP4, MOV, or WebM video (Max 50MB)"
                  aspectRatio="16/9"
                  selectText="Click to select hero video"
                  badgeText="16:9 Widescreen Landscape Recommended"
                  error={errors.videoUrl?.message}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    reset({
                      videoUrl: config.videoUrl,
                    })
                  }
                  disabled={!isDirty || isSubmitting}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || (!isDirty && config.videoUrl === watchedVideoUrl)}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-linear-to-r from-[#740E0A] to-[#9A3412] hover:brightness-110 active:scale-98 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Video size={16} />
                      <span>Save Hero Video</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
