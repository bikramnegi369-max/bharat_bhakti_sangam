"use client";

import React, { useState, useRef } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import {
  uploadImageToCloudinary,
  deleteFromCloudinary,
} from "@/_services/upload.service";
import { deleteImageByPublicId } from "@/_services/cloudinary.service";
import { extractPublicIdFromUrl } from "@/_lib/helpers";
import { poppins } from "@/_lib/fonts";

export interface ProfilePictureUploadProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> {
  name: Path<T>;
  control: Control<T, unknown, TTransformedValues>;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function ProfilePictureUpload<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  name,
  control,
  label = "Profile Picture",
  error,
  required = true,
  className,
}: ProfilePictureUploadProps<T, TTransformedValues>) {
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

  if (initialValueRef.current === null && value) {
    initialValueRef.current = value as string;
  }

  const previewUrl = value as string | undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    } else if (value && value === initialValueRef.current) {
      const publicId = extractPublicIdFromUrl(value as string);
      if (publicId) {
        deleteImageByPublicId(publicId).catch(console.error);
      }
    }

    try {
      setIsUploading(true);
      setProgress(0);

      const data = await uploadImageToCloudinary(file, (p) => setProgress(p));
      onChange(data.secure_url);
      if (data.delete_token) {
        setDeleteData({ token: data.delete_token, cloudName: data.cloudName });
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    } else if (value && value === initialValueRef.current) {
      const publicId = extractPublicIdFromUrl(value as string);
      if (publicId) {
        deleteImageByPublicId(publicId).catch(console.error);
      }
    }

    onChange("");
    setDeleteData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className={clsx("flex flex-col w-full h-full justify-between", className)}
    >
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isUploading) fileInputRef.current?.click();
          }
        }}
        className={clsx(
          "relative group cursor-pointer border border-dashed rounded-xl sm:rounded-2xl transition-all duration-200",
          "w-full h-full min-h-42.5 sm:min-h-46.25 md:min-h-50 flex flex-col items-center justify-center p-4 sm:p-5 bg-stone-50/60 hover:bg-stone-50",
          error
            ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
            : "border-stone-300 hover:border-primary/50 hover:shadow-xs",
          isUploading && "opacity-75 cursor-wait",
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          aria-label="Upload profile picture"
        />

        {previewUrl ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-1">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-sm">
              <Image
                src={previewUrl}
                alt="Profile Preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition-colors focus:outline-none cursor-pointer"
              title="Remove profile picture"
            >
              <X size={13} />
            </button>
            <span
              className={clsx(
                poppins.className,
                "text-[11px] text-stone-500 font-medium mt-2",
              )}
            >
              Click to change photo
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-2.5">
            <div
              className={clsx(
                poppins.className,
                "text-[11.5px] sm:text-xs md:text-sm font-semibold text-stone-800 tracking-tight",
              )}
            >
              {label} {required && <span className="text-stone-700">*</span>}
            </div>

            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-1 sm:py-2">
                <div className="relative flex items-center justify-center">
                  <Loader2 className="animate-spin text-primary" size={32} />
                  <span className="absolute text-[9px] font-bold text-primary">
                    {progress}%
                  </span>
                </div>
                <p
                  className={clsx(
                    poppins.className,
                    "text-[11px] text-stone-500 font-medium animate-pulse",
                  )}
                >
                  Uploading to Cloudinary...
                </p>
              </div>
            ) : (
              <>
                {/* Circular Upload Icon Pill */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-stone-200/90 bg-white flex items-center justify-center text-stone-500 group-hover:text-primary group-hover:border-primary/40 shadow-2xs transition-all duration-200 group-hover:scale-105">
                  <Upload size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-[11px] sm:text-xs font-medium text-stone-600",
                    )}
                  >
                    Upload Photo
                  </p>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-[10px] sm:text-[10.5px] text-stone-400 mt-0.5",
                    )}
                  >
                    JPG, PNG (Max. 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-500 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
