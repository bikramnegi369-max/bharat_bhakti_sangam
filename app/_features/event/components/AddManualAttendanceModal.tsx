"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { ManualAttendanceFormData } from "@/_schemas/Event.schemas";
import { addManualAttendance } from "../services/event.service";
import { ALL_EVENTS } from "../services/constants";
import AddManualAttendanceForm from "./AddManualAttendanceForm";

interface AddManualAttendanceModalProps {
  eventId: string;
}

export default function AddManualAttendanceModal({
  eventId,
}: AddManualAttendanceModalProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useUI();

  const handleFormSubmit = async (data: ManualAttendanceFormData) => {
    try {
      await toast.promise(
        (async () => {
          const result = await addManualAttendance(eventId, data);

          if (!result.success) {
            throw new Error(
              result.error || "Failed to add manual attendance.",
            );
          }

          return result;
        })(),
        {
          pending: "Adding manual attendance...",
          success: "Manual attendance added successfully!",
          error: "Failed to add manual attendance.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_EVENTS]),
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting manual attendance form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white rounded-xl min-h-96">
      <h2 className="h-12 bg-black text-primary text-2xl font-semibold flex items-center p-8">
        Add Manual Attendance
      </h2>

      <div className="flex-1 overflow-y-auto">
        <AddManualAttendanceForm handleSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
