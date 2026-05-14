"use client";

import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { EventFormData } from "@/_schemas/Event.schemas";
import AddEventForm from "./AddEventForm";
import { getSponsors } from "@/_features/sponsors/services/sponsors.service";
import { getArtists } from "@/_features/artists/services/artists.service";
import { getEventCategories } from "@/_features/event-categories/services/eventCategories.service";
import { getVenues } from "@/_features/event-venue/services/eventVenue.service";
import { toast } from "react-toastify";
import { addEvent, getEventById, updateEvent } from "../services/event.service";
import { useUI } from "@/providers/UIProvider";
import { ALL_EVENTS, EVENT_BY_ID } from "../services/constants";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  EventFormOptions,
  mapEventDetailToFormInput,
} from "../helpers/eventForm.helpers";
import { getEventBookingTypes } from "@/_features/bookings/booking-types/services/eventBookingTypes.service";

interface AddEventDrawerProps {
  mode?: "create" | "edit";
  eventId?: string;
}

function getOptionsErrorMessage(
  responses: Array<{ success: boolean; error?: string }>,
) {
  return (
    responses.find((response) => !response.success)?.error ||
    "Failed to load event settings."
  );
}

export default function AddEventDrawer({
  mode = "create",
  eventId,
}: AddEventDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: optionsData,
    isLoading: isOptionsLoading,
    error: optionsError,
  } = useQuery({
    queryKey: ["event-form-options"],
    queryFn: async () => {
      const [bookingRes, sponsorRes, artistRes, categoryRes, venueRes] =
        await Promise.all([
          getEventBookingTypes(),
          getSponsors(),
          getArtists(),
          getEventCategories(),
          getVenues(),
        ]);

      const responses = [
        bookingRes,
        sponsorRes,
        artistRes,
        categoryRes,
        venueRes,
      ];
      if (responses.some((res) => !res.success)) {
        throw new Error(getOptionsErrorMessage(responses));
      }

      return {
        bookingTypes: bookingRes.data?.items || [],
        sponsors: sponsorRes.data || [],
        artists: artistRes.data?.items || [],
        categories: categoryRes.data?.items || [],
        venues: venueRes.data?.items || [],
      };
    },
  });

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useQuery({
    queryKey: [EVENT_BY_ID, eventId],
    queryFn: async () => {
      if (!eventId) throw new Error("Event ID is required");
      const res = await getEventById(eventId);
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to load event details");
      }
      return res.data;
    },
    enabled: isEditMode && !!eventId,
  });

  const initialData = useMemo(() => {
    if (isEditMode && eventData && optionsData) {
      return mapEventDetailToFormInput(eventData, optionsData);
    }
    return undefined;
  }, [isEditMode, eventData, optionsData]);

  const isLoading = isOptionsLoading || (isEditMode && isEventLoading);
  const error = (optionsError || eventError) as Error | null;

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && eventId
              ? await updateEvent(eventId, data)
              : await addEvent(data);

          if (!result.success) {
            throw new Error(
              result.error ||
                (isEditMode
                  ? "Failed to update event."
                  : "Failed to create event."),
            );
          }

          return result;
        })(),
        {
          pending: isEditMode ? "Updating event..." : "Creating new event...",
          success: isEditMode
            ? "Event updated successfully!"
            : "Event created successfully!",
          error: isEditMode
            ? "Failed to update event."
            : "Failed to create event.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_EVENTS]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error submitting event form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden">
      <h2 className="h-12 bg-black text-primary text-2xl font-semibold flex items-center p-8">
        {isEditMode ? "Edit Event" : "Add New Event"}
      </h2>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode
              ? "Loading event details..."
              : "Loading event settings..."}
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-base font-medium text-red-600">{error.message}</p>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-black"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddEventForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditOrDuplicateMode={isEditMode}
            submitLabel={isEditMode ? "Update Event" : "Submit"}
            {...(optionsData as EventFormOptions)}
          />
        </div>
      )}
    </div>
  );
}
