import { DataTable } from "@/_components/common/table/DataTable";
import { ALL_BOOKINGS } from "@/_lib/constants/eventBookings.constants";
import { getEventBookings } from "../services/eventBookings.service";
import { EventBookingColumns } from "./EventBookingColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { EventBooking } from "@/_types/EventBooking.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: EventBooking) => React.ReactNode;
};

export const EventBookingTable = ({ filterAction, renderActions }: Props) => {
  const config = useMemo<TableConfig<EventBooking>>(
    () => ({
      columns: EventBookingColumns,
      service: { getAll: getEventBookings },
      queryKeyPrefix: [ALL_BOOKINGS],
      filters: [
        { type: "search", key: "search", placeholder: "Search bookings" },
      ],
      filterAction,
      renderActions,
      exportOptions: {
        fileName: "All_BOOKINGS",
        sheetName: "All_BOOKINGS",
      },
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
