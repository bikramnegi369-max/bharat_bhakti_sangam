"use client";

import clsx from "clsx";
import {
  FileImage,
  FileText,
  Presentation,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getMessageStyles } from "@/_components/ui/Field/Field.styles";
import { EMAIL_ATTACHMENT_ACCEPTED_EXTENSIONS } from "../constants";
import {
  dedupeAttachmentFiles,
  formatBytes,
  getAttachmentExtensionLabel,
  getAttachmentPreviewKind,
  validateAttachmentFiles,
} from "../helpers";

type EmailAttachmentsFieldProps = {
  value?: File[];
  onChange: (files: File[]) => void;
  label: string;
  error?: string;
  helperText?: string;
};

type AttachmentPreviewCardProps = {
  file: File;
  onRemove: () => void;
};

function AttachmentPreviewCard({ file, onRemove }: AttachmentPreviewCardProps) {
  const kind = getAttachmentPreviewKind(file);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let url: string | null = null;
    let rafHandle: number | null = null;

    if (kind === "image" || kind === "pdf") {
      url = URL.createObjectURL(file);
      const currentUrl = url;

      // Use requestAnimationFrame to defer the state update.
      // This fixes the "cascading renders" warning in React 19.
      rafHandle = requestAnimationFrame(() => {
        if (isMounted) setPreviewUrl(currentUrl);
      });
    } else {
      rafHandle = requestAnimationFrame(() => {
        if (isMounted) setPreviewUrl(null);
      });
    }

    return () => {
      isMounted = false;
      if (rafHandle !== null) cancelAnimationFrame(rafHandle);
      if (url) {
        // Delay revocation significantly to prevent "broken" images during
        // development-mode remounts or fast navigation.
        setTimeout(() => URL.revokeObjectURL(url!), 1000);
      }
    };
  }, [file, kind]);

  const renderVisual = () => {
    if (kind === "image" && previewUrl) {
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={previewUrl}
          src={previewUrl}
          alt={file.name}
          className="h-full w-full rounded-2xl object-cover"
          loading="eager"
          decoding="sync"
        />
      );
    }

    if (kind === "pdf" && previewUrl) {
      return (
        <object
          key={previewUrl}
          data={previewUrl}
          type="application/pdf"
          className="h-full w-full rounded-2xl bg-slate-50"
          aria-label={`Preview of ${file.name}`}
        >
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <FileText size={28} />
          </div>
        </object>
      );
    }

    const icon =
      kind === "presentation" ? (
        <Presentation size={30} />
      ) : kind === "word" || kind === "pdf" ? (
        <FileText size={30} />
      ) : (
        <FileImage size={30} />
      );

    const accentClassName =
      kind === "presentation"
        ? "bg-amber-50 text-amber-700"
        : kind === "word"
          ? "bg-blue-50 text-blue-700"
          : kind === "pdf"
            ? "bg-red-50 text-red-700"
            : "bg-slate-100 text-slate-700";

    return (
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-slate-200",
          accentClassName,
        )}
      >
        {icon}
      </div>
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="relative h-36 overflow-hidden rounded-2xl bg-slate-50">
        {renderVisual()}
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-black cursor-pointer"
          aria-label={`Remove ${file.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-2 text-sm font-semibold text-slate-900">
            {file.name}
          </p>
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-slate-600">
            {getAttachmentExtensionLabel(file.name)}
          </span>
        </div>

        <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
      </div>
    </div>
  );
}

export function EmailAttachmentsField({
  value,
  onChange,
  label,
  error,
  helperText,
}: EmailAttachmentsFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const combinedError = selectionError || error;
  const attachments = value ?? [];
  const totalSize = attachments.reduce((sum, file) => sum + file.size, 0);

  const handleFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const nextFiles = dedupeAttachmentFiles([
      ...attachments,
      ...Array.from(files),
    ]);
    const validationError = validateAttachmentFiles(nextFiles);

    if (validationError) {
      setSelectionError(validationError);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    setSelectionError(null);
    onChange(nextFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const nextFiles = attachments.filter(
      (_, currentIndex) => currentIndex !== index,
    );

    setSelectionError(null);
    onChange(nextFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={clsx(
          "rounded-4xl border-2 border-dashed bg-slate-50 p-6 transition cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10"
            : combinedError
              ? "border-red-300"
              : "border-slate-200 hover:border-primary/70 hover:bg-white",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={EMAIL_ATTACHMENT_ACCEPTED_EXTENSIONS}
          onChange={(event) => handleFiles(event.target.files)}
          className="hidden"
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-primary">
              <Upload size={24} />
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900">
                Drop attachments here or click to browse
              </p>
              <p className="text-sm text-slate-500">
                Supports images, PDF, Word, and PowerPoint files.
              </p>
              <p className="text-xs text-slate-400">
                Images and PDFs show a visual preview. Office files show a file
                card preview.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">
              {attachments.length} attachment
              {attachments.length === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-slate-500">
              {formatBytes(totalSize)} selected
            </p>
          </div>
        </div>
      </div>

      {helperText && !combinedError ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}

      {combinedError ? (
        <p className={getMessageStyles({ error: combinedError })}>
          {combinedError}
        </p>
      ) : null}

      {attachments.length > 0 ? (
        <div className="mt-2 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {attachments.map((file, index) => (
            <AttachmentPreviewCard
              key={`${file.name}-${file.size}-${file.lastModified}`}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
