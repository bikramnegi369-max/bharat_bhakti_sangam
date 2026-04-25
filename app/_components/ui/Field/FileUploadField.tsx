"use client";

import React, { useState, useRef } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import clsx from "clsx";
import {
  uploadImageToCloudinary,
  deleteFromCloudinary,
} from "@/_services/upload.service";
import { deleteImageByPublicId } from "@/_services/cloudinary.service";
import Image from "next/image";
import { getLabelStyles } from "./Field.styles";
import { extractPublicIdFromUrl } from "@/_lib/helpers";

interface FileUploadFieldProps<
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
}

export function FileUploadField<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  name,
  control,
  label,
  error,
  required,
  className,
  helperText,
  labelClassName,
}: FileUploadFieldProps<T, TTransformedValues>) {
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

  // Capture the initial value once it is available (for Edit Mode)
  if (initialValueRef.current === null && value) {
    initialValueRef.current = value as string;
  }

  // The value is expected to be the secure_url string
  const previewUrl = value as string | undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    //  Client-side Validation (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // 1. Delete image uploaded in this session (ephemeral token)
    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    }
    // 2. Or delete initial image if we are replacing it for the first time
    else if (value && value === initialValueRef.current) {
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
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Delete from Cloudinary using session token
    if (deleteData) {
      deleteFromCloudinary(deleteData.token, deleteData.cloudName).catch(
        console.error,
      );
    }
    // Or delete initial data via backend if no session token exists
    else if (value && value === initialValueRef.current) {
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
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={clsx(
          "relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200 min-h-48 flex flex-col items-center justify-center p-4",
          error
            ? "border-red-300 "
            : "border-slate-200 hover:border-primary hover:bg-slate-50",
          isUploading && "opacity-70 cursor-wait",
        )}
      >
        <label
          className={getLabelStyles({
            error,
            className: labelClassName,
          })}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={previewUrl}
              alt="Preview"
              width={400}
              height={300}
              unoptimized // Cloudinary handles its own resizing/optimization
              className="max-h-48 w-auto rounded-lg shadow-sm object-contain bg-slate-100"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-500">
            {isUploading ? (
              <>
                <div className="relative flex items-center justify-center">
                  <Loader2 className="animate-spin text-primary" size={40} />
                  <span className="absolute text-[10px] font-bold text-primary">
                    {progress}%
                  </span>
                </div>
                <p className="text-sm animate-pulse">
                  Uploading to Cloudinary...
                </p>
              </>
            ) : (
              <>
                <div className="p-4 bg-slate-100 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Upload size={28} />
                </div>
                <div className="text-center">
                  <p className="font-medium text-slate-700">
                    Click to upload image
                  </p>
                  <p className="text-xs">PNG, JPG or WebP (max 5MB)</p>
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
          <span className="w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
