import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { EventVolunteerColumns } from "./EventVolunteerColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getVolunteers } from "../services/volunteers.service";
import { ALL_VOLUNTEERS } from "@/_lib/constants/volunteers.constants";
import { Volunteer } from "@/_types/Volunteer.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: Volunteer) => React.ReactNode;
};

export const EventVolunteersTable = ({
  filterAction,
  renderActions,
}: Props) => {
  const config = useMemo<TableConfig<Volunteer>>(
    () => ({
      columns: EventVolunteerColumns,
      service: { getAll: getVolunteers },
      queryKeyPrefix: [ALL_VOLUNTEERS],
      filters: [
        { type: "search", key: "search", placeholder: "Search volunteers" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
