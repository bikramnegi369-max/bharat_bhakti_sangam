import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { TableConfig } from "@/_types/Table.types";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { ALL_CALENDER_ENTRIES } from "@/_lib/constants/calender.constants";
import { getCalenderEntries } from "../services/calender.service";
import { CalenderEntryColumns } from "./CalenderEntryColumnsDef";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: CalenderEntry) => React.ReactNode;
};

export const CalenderEntryTable = ({
  filterAction,
  renderActions,
}: Props) => {
  const config = useMemo<TableConfig<CalenderEntry>>(
    () => ({
      columns: CalenderEntryColumns,
      service: { getAll: getCalenderEntries },
      queryKeyPrefix: [ALL_CALENDER_ENTRIES],
      filters: [
        {
          type: "search",
          key: "search",
          placeholder: "Search calender entries",
        },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
