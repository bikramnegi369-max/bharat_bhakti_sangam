"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { EventFormData, EventFormInput } from "@/_schemas/Event.schemas";
import AddEventForm from "./AddEventForm";
import { getBookingTypes } from "@/_features/bookings/services/booking.service";
import { getSponsors } from "@/_features/sponsors/services/sponsors.service";
import { getArtists } from "@/_features/artists/services/artists.service";
import { getEventCategories } from "@/_features/event-categories/services/eventCategroies.service";
import { getVenues } from "@/_features/event-venue/services/eventVenue.service";
import { toast } from "react-toastify";
import { addEvent, getEventById, updateEvent } from "../services/event.service";
import { useUI } from "@/providers/UIProvider";
import { ALL_EVENTS } from "../services/constants";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  EventFormOptions,
  mapEventDetailToFormInput,
} from "../helpers/eventForm.helpers";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<EventFormOptions>({
    bookingTypes: [],
    sponsors: [],
    artists: [],
    categories: [],
    venues: [],
  });
  const [initialData, setInitialData] = useState<EventFormInput | undefined>();

  useEffect(() => {
    let isCancelled = false;

    async function fetchDrawerData() {
      setIsLoading(true);
      setError(null);

      try {
        const [
          bookingRes,
          sponsorRes,
          artistRes,
          categoryRes,
          venueRes,
          eventRes,
        ] = await Promise.all([
          getBookingTypes(),
          getSponsors(),
          getArtists(),
          getEventCategories(),
          getVenues(),
          isEditMode && eventId ? getEventById(eventId) : Promise.resolve(null),
        ]);

        const optionResponses = [
          bookingRes,
          sponsorRes,
          artistRes,
          categoryRes,
          venueRes,
        ];

        if (optionResponses.some((response) => !response.success)) {
          throw new Error(getOptionsErrorMessage(optionResponses));
        }

        const resolvedOptions: EventFormOptions = {
          bookingTypes: bookingRes.data || [],
          sponsors: sponsorRes.data || [],
          artists: artistRes.data || [],
          categories: categoryRes.data || [],
          venues: venueRes.data || [],
        };

        if (isCancelled) {
          return;
        }

        setOptions(resolvedOptions);

        if (isEditMode) {
          if (!eventId) {
            throw new Error("Event id is required for edit mode.");
          }

          if (!eventRes?.success || !eventRes.data) {
            throw new Error(eventRes?.error || "Failed to load event details.");
          }

          if (isCancelled) {
            return;
          }

          setInitialData(mapEventDetailToFormInput(eventRes.data, resolvedOptions));
          return;
        }

        setInitialData(undefined);
      } catch (error) {
        console.error("Failed to load event drawer data:", error);

        if (!isCancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load event drawer data.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchDrawerData();

    return () => {
      isCancelled = true;
    };
  }, [eventId, isEditMode]);

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
      <h2 className="h-12 bg-black text-primary text-xl flex items-center p-8">
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
          <p className="text-base font-medium text-red-600">{error}</p>
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
            {...options}
          />
        </div>
      )}
    </div>
  );
}
