import { useMemo } from "react";
import { Venue } from "@/_types/Venue.types";
import { EventVenuesColumns } from "./EventVenuesColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getVenues } from "../services/eventVenue.service";
import { ALL_VENUES } from "@/_lib/constants/eventVenue.constants";
import { DataTable } from "@/_components/common/table/DataTable";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: Venue) => React.ReactNode;
};

export const EventVenuesTable = ({ filterAction, renderActions }: Props) => {
  const config = useMemo<TableConfig<Venue>>(
    () => ({
      columns: EventVenuesColumns,
      service: { getAll: getVenues },
      queryKeyPrefix: [ALL_VENUES],
      filters: [
        { type: "search", key: "search", placeholder: "Search venues" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
