"use client";

import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@/_components/ui/Button";
import {
  ALL_CALENDER_ENTRIES,
  CALENDER_ENTRY_BY_ID,
} from "@/_lib/constants/calender.constants";
import {
  CalenderEntryFormData,
} from "@/_schemas/calenderEntry.schema";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { useUI } from "@/providers/UIProvider";
import CreateCalenderEntryForm from "./CreateCalenderEntryForm";
import {
  addCalenderEntry,
  getCalenderEntryById,
  updateCalenderEntry,
} from "../services/calender.service";
import { formatCalenderEntryDate, normalizeCalenderEntryPayload } from "@/_lib/helpers/calender.helper";

type CreateCalenderEnrtyDrawerMode = "create" | "edit" | "view";

interface CreateCalenderEnrtyDrawerProps {
  mode?: CreateCalenderEnrtyDrawerMode;
  calenderEntryId?: string;
}

const sectionCardStyles =
  "rounded-2xl border border-black/10 bg-white p-5 shadow-sm";

function renderDetailItem(label: string, value: string) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm text-slate-700">{value}</p>
    </div>
  );
}

function CalenderEntryDetailView({ entry }: { entry: CalenderEntry }) {
  return (
    <div className="flex-1 space-y-8 overflow-y-auto bg-[#FFF9ED] p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-5 py-4">
            <p className="text-sm font-semibold text-slate-900">
              Festival Preview
            </p>
          </div>

          {entry.image ? (
            <div className="relative aspect-16/10 bg-slate-100">
              <Image
                src={entry.image}
                alt={entry.festival || "Festival image"}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-16/10 items-center justify-center bg-slate-50 text-sm text-slate-500">
              No image available
            </div>
          )}
        </section>

        <section className={sectionCardStyles}>
          <p className="text-sm font-semibold text-slate-900">Entry Details</p>

          <div className="mt-5 space-y-5">
            {renderDetailItem("Festival", entry.festival || "N/A")}
            {renderDetailItem("Month", entry.month || "N/A")}
            {renderDetailItem("Day", entry.day || "N/A")}
            {renderDetailItem("Date", formatCalenderEntryDate(entry.date))}
            {renderDetailItem("Entry ID", entry._id || "N/A")}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function CreateCalenderEnrtyDrawer({
  mode = "create",
  calenderEntryId,
}: CreateCalenderEnrtyDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isCreateMode = mode === "create";
  const isEditMode = mode === "edit";
  const shouldFetchEntry = !isCreateMode && Boolean(calenderEntryId);
  const missingEntryId = !isCreateMode && !calenderEntryId;

  const title = useMemo(() => {
    if (mode === "view") {
      return "View Calender Entry";
    }

    return isEditMode ? "Edit Calender Entry" : "Add New Calender Entry";
  }, [isEditMode, mode]);

  const {
    data: entryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [CALENDER_ENTRY_BY_ID, calenderEntryId],
    queryFn: async () => {
      if (!calenderEntryId) {
        throw new Error("Calender entry ID is required");
      }

      const response = await getCalenderEntryById(calenderEntryId);

      if (!response.success || !response.data) {
        throw new Error(
          response.error || "Failed to load calender entry details.",
        );
      }

      return response.data;
    },
    enabled: shouldFetchEntry,
  });

  const handleFormSubmit = async (data: CalenderEntryFormData) => {
    try {
      const payload = normalizeCalenderEntryPayload(data);

      await toast.promise(
        (async () => {
          const result =
            isEditMode && calenderEntryId
              ? await updateCalenderEntry(calenderEntryId, payload)
              : await addCalenderEntry(payload);

          if (!result.success) {
            throw new Error(
              result.error ||
                (isEditMode
                  ? "Failed to update calender entry."
                  : "Failed to create calender entry."),
            );
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating calender entry..."
            : "Creating calender entry...",
          success: isEditMode
            ? "Calender entry updated successfully!"
            : "Calender entry created successfully!",
          error: isEditMode
            ? "Failed to update calender entry."
            : "Failed to create calender entry.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_CALENDER_ENTRIES]),
      });

      closeDrawer();
    } catch (submitError) {
      console.error("Error submitting calender entry form:", submitError);
    }
  };

  const resolvedError = missingEntryId
    ? new Error("Calender entry ID is required")
    : (error as Error | null);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white min-h-96">
      <div className="border-b border-black/10 bg-black px-8 py-6 text-primary">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary/70">
          {mode === "view" ? "Calender Entry Overview" : "Calender Entry Form"}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-primary">{title}</h2>
      </div>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            {mode === "view"
              ? "Loading calender entry..."
              : "Loading calender entry details..."}
          </p>
        </div>
      ) : resolvedError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-base font-medium text-red-600">
            {resolvedError.message}
          </p>
          <Button type="button" variant="secondary" onClick={closeDrawer}>
            Close
          </Button>
        </div>
      ) : mode === "view" && entryData ? (
        <>
          <CalenderEntryDetailView entry={entryData} />

          <div className="border-t border-black/10 bg-white px-8 py-4">
            <div className="flex justify-end">
              <Button type="button" variant="secondary" onClick={closeDrawer}>
                Close
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <CreateCalenderEntryForm
            handleSubmit={handleFormSubmit}
            initialData={entryData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
