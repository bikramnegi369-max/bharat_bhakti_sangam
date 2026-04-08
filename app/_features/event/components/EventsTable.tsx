// features/events/components/EventsTable.tsx

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/event.api";
import { DataTable } from "@/_components/common/table/DataTable";
import { Event } from "../types";
import { EventColumns } from "./EventsColumnsDef";
import { TableConfig } from "@/_types/table.types";

export const EventsTable = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: eventService.delete!,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table"] });
    },
  });

  const config: TableConfig<Event, string> = {
    data: [],
    columns: EventColumns,
    service: eventService,
    filters: [{ type: "search", key: "search", placeholder: "Search events" }],
    renderActions: (row) => (
      <div className="flex gap-2">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ),
  };

  return <DataTable config={config} />;
};
