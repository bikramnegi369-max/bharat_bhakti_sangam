"use client";

import { DataTable } from "@/_components/common/table/DataTable";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { eventService } from "../services/event.api";
import { EventColumns } from "./EventsColumnsDef";
import { Event } from "../types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: Event) => React.ReactNode;
};

export const EventsTable = ({ filterAction, renderActions }: Props) => {
  const config = useMemo<TableConfig<Event, string>>(
    () => ({
      columns: EventColumns,
      service: eventService,
      filters: [
        { type: "search", key: "search", placeholder: "Search events" },
        { type: "date", key: "date" },
        { type: "time", key: "time" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
