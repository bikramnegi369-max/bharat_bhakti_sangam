"use client";

import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/_components/ui/Button";
import {
  ALL_CALENDER_ENTRIES,
  CALENDER_ENTRY_BY_ID,
} from "@/_lib/constants/calender.constants";
import { CalenderEntryFormData } from "@/_schemas/calenderEntry.schema";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { useUI } from "@/providers/UIProvider";
import CreateCalenderEntryForm from "./CreateCalenderEntryForm";
import {
  addCalenderEntry,
  getCalenderEntryById,
  updateCalenderEntry,
} from "../services/calender.service";
import { normalizeCalenderEntryPayload } from "@/_lib/helpers/calender.helper";
import { CalenderEntryDetailView } from "./CalenderEntryDetailView";

type CreateCalenderEnrtyDrawerMode = "create" | "edit" | "view";

interface CreateCalenderEnrtyDrawerProps {
  mode?: CreateCalenderEnrtyDrawerMode;
  calenderEntryId?: string;
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
