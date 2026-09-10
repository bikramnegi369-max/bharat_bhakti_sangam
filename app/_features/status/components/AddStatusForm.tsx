"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoUploadField } from "@/_components/ui/Field/VideoUploadField";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import { FormTagsField } from "@/_components/ui/Field/FormTagsField";
import { useUI } from "@/providers/UIProvider";
import { StatusItem } from "@/_types/Status.types";
import { StatusFormData, StatusSchema } from "@/_schemas/Status.schema";
import { Sparkles } from "lucide-react";

interface AddStatusFormProps {
  initialData?: StatusItem;
  handleSubmit: (data: StatusFormData) => void;
  isEditMode: boolean;
}

const SUGGESTED_TAGS = [
  "shiva",
  "krishna",
  "ram",
  "hanuman",
  "aarti",
  "mantras",
  "festivals",
  "diwali",
  "holi",
  "kedarnath",
  "ayodhya",
  "vrindavan",
];

export default function AddStatusForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddStatusFormProps) {
  const { closeDrawer } = useUI();

  const {
    handleSubmit: handleSubmitForm,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StatusFormData>({
    resolver: zodResolver(StatusSchema),
    mode: "onTouched",
    defaultValues: {
      videoUrl: "",
      thumbnailUrl: "",
      tags: [],
    },
  });

  const currentTags = useWatch({ control, name: "tags" }) || [];

  useEffect(() => {
    if (initialData) {
      reset({
        videoUrl: initialData.videoUrl || "",
        thumbnailUrl: initialData.thumbnailUrl || "",
        tags: initialData.tags || [],
      });
    }
  }, [initialData, reset]);

  const handleAddQuickTag = (tag: string) => {
    const formatted = tag.toLowerCase();
    if (!currentTags.includes(formatted)) {
      setValue("tags", [...currentTags, formatted], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm(handleSubmit)}
      className="flex flex-col h-full"
    >
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-6 p-5 sm:p-6">
        {/* Video Upload Field */}
        <VideoUploadField
          name="videoUrl"
          control={control}
          label="Status Video File"
          error={errors.videoUrl?.message}
          required
        />

        {/* Thumbnail Image Upload (Optional - Cloudinary auto-generates poster if omitted) */}
        <FileUploadField
          name="thumbnailUrl"
          control={control}
          label="Custom Video Poster / Thumbnail (Optional)"
          helperText="Upload custom 9:16 poster cover. If left blank, Cloudinary generates a frame poster automatically."
          error={errors.thumbnailUrl?.message}
        />

        {/* Tags Input with presets */}
        <div className="space-y-2.5">
          <FormTagsField
            name="tags"
            control={control}
            label="Search & Filter Tags"
            placeholder="Type tag name and press Enter (e.g. shiva, aarti, kedarnath)..."
            error={errors.tags?.message}
            required
          />

          {/* Suggested Quick Tags */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
              <Sparkles size={13} className="text-amber-600 shrink-0" />
              <span>Click to quickly add popular tags:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.map((t) => {
                const isSelected = currentTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleAddQuickTag(t)}
                    disabled={isSelected}
                    className={`text-[11.5px] px-2.5 py-0.5 rounded-full font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-600 text-white opacity-80"
                        : "bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 hover:border-amber-300"
                    }`}
                  >
                    #{t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Clean Sticky Footer with Compact Proportional Buttons */}
      <div className="bg-stone-50/95 backdrop-blur-xs border-t border-stone-200 px-5 sm:px-6 py-3.5 flex items-center justify-end gap-3 shrink-0">
        <button
          type="button"
          onClick={closeDrawer}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-linear-to-r from-[#740E0A] to-[#9A3412] hover:brightness-110 active:scale-95 shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{isEditMode ? "Update Status" : "Upload & Publish"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
