import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { EventQueryColumns } from "./EventQueryColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getEventQueries } from "../services/eventQuery.service";
import { ALL_EVENT_QUERIES } from "@/_lib/constants/eventQuery.constants";
import { EventQuery } from "@/_types/EventQuery.types";

export const EventQueryTable = () => {
  const config = useMemo<TableConfig<EventQuery>>(
    () => ({
      columns: EventQueryColumns,
      service: { getAll: getEventQueries },
      queryKeyPrefix: [ALL_EVENT_QUERIES],
      filters: [
        { type: "search", key: "search", placeholder: "Search queries" },
      ],
    }),
    [],
  );

  return <DataTable config={config} />;
};
