"use client";

import { DataTable } from "@/_components/common/table/DataTable";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { getAllEvents } from "../services/event.service";
import { EventColumns } from "./EventsColumnsDef";
import { Event } from "../types";
import { ALL_EVENTS } from "../services/constants";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: Event) => React.ReactNode;
};

export const EventsTable = ({ filterAction, renderActions }: Props) => {

  const config = useMemo<TableConfig<Event>>(
    () => ({
      columns: EventColumns,
      service: { getAll: getAllEvents },
      queryKeyPrefix: [ALL_EVENTS],
      filters: [
        { type: "search", key: "search", placeholder: "Search events" },
        { type: "date", key: "date", label: "Date" },
        { type: "time", key: "time", label: "Time" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
