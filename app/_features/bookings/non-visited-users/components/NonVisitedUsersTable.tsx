import { DataTable } from "@/_components/common/table/DataTable";
import { NON_VISITED_USERS } from "@/_lib/constants/eventBookings.constants";
import { NonVisitedUser } from "@/_types/NonVisitedUser.types";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { getNonVisitedUsers } from "../services/nonVisitedUsers.service";
import { NonVisitedUsersColumns } from "./NonVisitedUsersColumnsDef";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: NonVisitedUser) => React.ReactNode;
};

export const NonVisitedUsersTable = ({
  filterAction,
  renderActions,
}: Props) => {
  const config = useMemo<TableConfig<NonVisitedUser>>(
    () => ({
      columns: NonVisitedUsersColumns,
      service: { getAll: getNonVisitedUsers },
      queryKeyPrefix: [NON_VISITED_USERS],
      filters: [
        {
          type: "search",
          key: "search",
          placeholder: "Search non visited users",
        },
      ],
      filterAction,
      renderActions,
      exportOptions: {
        fileName: "NON_VISITED_USERS",
        sheetName: "NON_VISITED_USERS",
      },
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
