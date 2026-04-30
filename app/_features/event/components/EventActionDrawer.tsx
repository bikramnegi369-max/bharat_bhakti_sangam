"use client";

import { Button } from "@/_components/ui/Button";
import {
  formatEventDate,
  getEventVenueAddress,
  getEventVenueName,
} from "@/_lib/helpers";
import { Event } from "@/_features/event/types";
import clsx from "clsx";
import Image from "next/image";
import { useUI } from "@/providers/UIProvider";

type EventActionDrawerMode = "view" | "edit";

interface EventActionDrawerProps {
  event: Event;
  mode: EventActionDrawerMode;
}

const badgeStyles =
  "inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-700";

const sectionCardStyles =
  "rounded-2xl border border-black/10 bg-white p-5 shadow-sm";

const imageCardStyles =
  "overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm";

function formatDateTime(value?: string) {
  if (!value) {
    return "N/A";
  }

  const parsedValue = new Date(value);

  if (Number.isNaN(parsedValue.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(parsedValue);
}

function renderTagList(items?: string[]) {
  if (!items?.length) {
    return <p className="text-sm text-slate-500">No items available</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={badgeStyles}>
          {item}
        </span>
      ))}
    </div>
  );
}

function renderImageCard(label: string, image?: string) {
  return (
    <div className={imageCardStyles}>
      <div className="border-b border-black/10 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">{label}</p>
      </div>

      {image ? (
        <div className="relative aspect-video bg-slate-100">
          <Image
            src={image}
            alt={label}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video] items-center justify-center bg-slate-50 text-sm text-slate-500">
          No image available
        </div>
      )}
    </div>
  );
}

export default function EventActionDrawer({
  event,
  mode,
}: EventActionDrawerProps) {
  const { closeDrawer } = useUI();
  const artists = event.artists
    ?.map((artist) => artist.name)
    .filter((artistName): artistName is string => Boolean(artistName));
  const bookingTypes = Array.isArray(event.bookingType)
    ? event.bookingType.map((item) => `${item.name} - Rs. ${item.price}`)
    : event.bookingType
      ? [`${event.bookingType.name} - Rs. ${event.bookingType.price}`]
      : [];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#FFF9ED]">
      <div className="border-b border-black/10 bg-black px-8 py-6 text-primary">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary/70">
          {mode === "view" ? "View Event" : "Edit Event"}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-primary">
            {event.eventName}
          </h2>
          <span
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-medium",
              event.isActive
                ? "border-[#00941A] bg-[#CAFFD3] text-[#006B12]"
                : "border-[#6B7280] bg-[#E5E7EB] text-[#374151]",
            )}
          >
            {event.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Overview</p>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Description
                </p>
                <p className="mt-2 leading-6">{event.description || "N/A"}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Date
                  </p>
                  <p className="mt-2">{formatEventDate(event.date) || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Time
                  </p>
                  <p className="mt-2">{event.time || "N/A"}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">
              Venue and Capacity
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Venue
                </p>
                <p className="mt-2">{getEventVenueName(event)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Address
                </p>
                <p className="mt-2">{getEventVenueAddress(event) || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total Capacity
                </p>
                <p className="mt-2">{event.maxSeats ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Available Tickets
                </p>
                <p className="mt-2">{event.availableTickets ?? "N/A"}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Categories</p>
            <div className="mt-4">{renderTagList(event.categories)}</div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Sponsors</p>
            <div className="mt-4">{renderTagList(event.sponsors)}</div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Artists</p>
            <div className="mt-4">{renderTagList(artists)}</div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">
              Booking Types
            </p>
            <div className="mt-4">{renderTagList(bookingTypes)}</div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Tabs</p>
            <div className="mt-4">{renderTagList(event.tabs)}</div>
          </section>

          <section className={sectionCardStyles}>
            <p className="text-sm font-semibold text-slate-900">Hashtags</p>
            <div className="mt-4">{renderTagList(event.hashTags)}</div>
          </section>
        </div>

        <section className={sectionCardStyles}>
          <p className="text-sm font-semibold text-slate-900">Metadata</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Created At
              </p>
              <p className="mt-2">{formatDateTime(event.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Updated At
              </p>
              <p className="mt-2">{formatDateTime(event.updatedAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Booked Seats
              </p>
              <p className="mt-2">{event.bookedSeats ?? "N/A"}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-sm font-semibold text-slate-900">Banners</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {renderImageCard("Home Banner", event.homeBanner)}
            {renderImageCard("Event Banner", event.eventBanner)}
            {renderImageCard("OpenGraph Image", event.ogImage)}
          </div>
        </section>
      </div>

      <div className="border-t border-black/10 bg-white px-8 py-4">
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={closeDrawer}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
