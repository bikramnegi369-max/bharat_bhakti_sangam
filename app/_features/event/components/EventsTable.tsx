// features/events/components/EventsTable.tsx

"use client";

import { useMemo } from "react";
import { eventService } from "../services/event.api";
import { DataTable } from "@/_components/common/table/DataTable";
import { Event } from "../types";
import { EventColumns } from "./EventsColumnsDef";
import { TableConfig } from "@/_types/table.types";

export const EventsTable = () => {
  const config = useMemo<TableConfig<Event, string>>(
    () => ({
      columns: EventColumns,
      service: eventService,
      filters: [
        { type: "search", key: "search", placeholder: "Search events" },
        { type: "date", key: "date" },
        { type: "time", key: "time" },
      ],
      filterAction: (
        <button className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black">
          Add Event
        </button>
      ),
      renderActions: () => (
        <div className="flex gap-2">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ),
    }),
    [],
  );

  return <DataTable config={config} />;
};
