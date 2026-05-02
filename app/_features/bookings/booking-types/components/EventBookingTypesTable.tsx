import { DataTable } from "@/_components/common/table/DataTable";
import { ALL_BOOKING_TYPES } from "@/_lib/constants/eventBookingTypes.constants";
import { getEventBookingTypes } from "../services/eventBookingTypes.service";
import { EventBookingTypesColumns } from "./EventBookingTypesColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { EventBookingType } from "@/_types/EventBookingType.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: EventBookingType) => React.ReactNode;
};

export const EventBookingTypesTable = ({
  filterAction,
  renderActions,
}: Props) => {
  const config = useMemo<TableConfig<EventBookingType>>(
    () => ({
      columns: EventBookingTypesColumns,
      service: { getAll: getEventBookingTypes },
      queryKeyPrefix: [ALL_BOOKING_TYPES],
      filters: [
        { type: "search", key: "search", placeholder: "Search booking types" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
