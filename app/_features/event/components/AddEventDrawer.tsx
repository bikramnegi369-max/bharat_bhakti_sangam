"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { EventFormData } from "@/_schemas/Event.schemas";
import AddEventForm from "./AddEventForm";
import { getBookingTypes } from "@/_features/bookings/services/booking.service";
import { BookingCategory } from "@/_types/Booking.types";
import { getSponsors } from "@/_features/sponsors/services/sponsors.service";
import { getArtists } from "@/_features/artists/services/artists.service";
import { getEventCategories } from "@/_features/event-categories/services/eventCategroies.service";
import { getVenues } from "@/_features/event-venue/services/eventVenue.service";
import { Venue } from "@/_types/Venue.types";
import { Sponsor } from "@/_types/Sponsors.types";
import { Artist } from "@/_types/Artists.types";
import { EventCategory } from "@/_types/EventCategories.types";
import { toast } from "react-toastify";
import { addEvent } from "../services/event.service";
import { useUI } from "@/providers/UIProvider";
import { ALL_EVENTS } from "../services/constants";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";

export default function AddEventDrawer() {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<{
    bookingTypes: BookingCategory[];
    sponsors: Sponsor[];
    artists: Artist[];
    categories: EventCategory[];
    venues: Venue[];
  }>({
    bookingTypes: [],
    sponsors: [],
    artists: [],
    categories: [],
    venues: [],
  });

  useEffect(() => {
    async function fetchAllOptions() {
      try {
        const [bookingRes, sponsorRes, artistRes, categoryRes, venueRes] =
          await Promise.all([
            getBookingTypes(),
            getSponsors(),
            getArtists(),
            getEventCategories(),
            getVenues(),
          ]);

        setOptions({
          bookingTypes: bookingRes.data || [],
          sponsors: sponsorRes.data || [],
          artists: artistRes.data || [],
          categories: categoryRes.data || [],
          venues: venueRes.data || [],
        });
      } catch (error) {
        console.error("Failed to fetch event options:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllOptions();
  }, []);

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      await toast.promise(
        (async () => {
          const result = await addEvent(data);

          if (!result.success) {
            throw new Error(result.error || "Failed to create event.");
          }

          return result;
        })(),
        {
          pending: "Creating new event...",
          success: "Event created successfully!",
          error: "Failed to create event.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_EVENTS]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden">
      <h2 className="h-12 bg-black text-primary text-xl flex items-center p-8">
        Add New Event
      </h2>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            Loading event settings...
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddEventForm handleSubmit={handleFormSubmit} {...options} />
        </div>
      )}
    </div>
  );
}
