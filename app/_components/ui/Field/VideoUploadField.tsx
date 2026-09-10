"use client";

import React, { useState, useRef } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { X, Loader2, Video, Film } from "lucide-react";

import clsx from "clsx";
import {
  uploadVideoToCloudinary,
  deleteFromCloudinary,
} from "@/_services/upload.service";
import { getLabelStyles } from "./Field.styles";

interface VideoUploadFieldProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> {
  name: Path<T>;
  control: Control<T, unknown, TTransformedValues>;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  helperText?: string;
  labelClassName?: string;
  maxSizeMB?: number;
}

export function VideoUploadField<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  name,
  control,
  label,
  error,
  required,
  className,
  helperText = "Upload MP4, MOV, or WebM (Max 50MB, 9:16 vertical recommended)",
  labelClassName,
  maxSizeMB = 50,
}: VideoUploadFieldProps<T, TTransformedValues>) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deleteData, setDeleteData] = useState<{
    token: string;
    cloudName: string;
  } | null>(null);
  const initialValueRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    field: { value, onChange },
  } = useController({ name, control });

  // Capture the initial value once it is available (handles edit mode async reset)
  if (
    initialValueRef.current === null &&
    typeof value === "string" &&
    value.trim() !== ""
  ) {
    initialValueRef.current = value;
  }

  const videoUrl = value as string | undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file (MP4, MOV, WebM).");
      return;
    }

    // 1. Delete ephemeral video uploaded in this session (ephemeral token)
    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    }
    // Note: If replacing an existing DB video, do NOT delete it from Cloudinary yet.
    // It should only be deleted after the update transaction is successfully submitted.

    try {
      setIsUploading(true);
      setProgress(0);

      const data = await uploadVideoToCloudinary(file, (p) => setProgress(p));

      onChange(data.secure_url);
      if (data.delete_token) {
        setDeleteData({ token: data.delete_token, cloudName: data.cloudName });
      }
    } catch (err) {
      console.error("Video upload error:", err);
      alert(err instanceof Error ? err.message : "Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Delete from Cloudinary using session delete token if uploaded in this session
    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    }
    // Note: Do NOT delete existing committed database asset here.
    // If the user cancels the form, the DB still references this file.
    // Cleanup of replaced/removed existing assets occurs after form submission.

    onChange("");
    setDeleteData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      <label
        className={getLabelStyles({
          error,
          className: labelClassName,
        })}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={clsx(
          "relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200 min-h-44 flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-50/50 hover:bg-slate-50",
          error
            ? "border-red-300 bg-red-50/10"
            : "border-slate-200 hover:border-primary",
          isUploading && "opacity-75 cursor-wait",
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/mp4,video/quicktime,video/webm"
          className="hidden"
        />

        {videoUrl ? (
          <div className="relative w-full flex flex-col items-center justify-center py-1">
            <div className="relative w-36 aspect-9/16 rounded-lg overflow-hidden shadow-md border border-slate-200 bg-black">
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-rose-600 text-white p-2 rounded-full shadow-lg hover:bg-rose-700 transition-colors cursor-pointer z-10"
              title="Remove Video"
            >
              <X size={16} />
            </button>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Click to replace video
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-500 py-6">
            {isUploading ? (
              <>
                <div className="relative flex items-center justify-center">
                  <Loader2 className="animate-spin text-primary" size={44} />
                  <span className="absolute text-xs font-bold text-primary">
                    {progress}%
                  </span>
                </div>
                <p className="text-sm font-medium animate-pulse text-primary">
                  Uploading video to Cloudinary...
                </p>
                <div className="w-48 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-amber-500/10 text-primary rounded-xl group-hover:scale-105 transition-transform duration-200">
                  <Video size={26} />
                </div>
                <div className="text-center px-4">
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                    Click to select status video
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    MP4, MOV or WebM (Max {maxSizeMB}MB)
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-amber-700 font-medium bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Film size={12} />
                  <span>9:16 Vertical Reel Recommended</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500 ml-1">{helperText}</p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500 ml-1 mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
