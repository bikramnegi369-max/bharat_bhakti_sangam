import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { getStatusColumns } from "./StatusColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getStatusList } from "@/_services/status.service";
import { ALL_STATUSES } from "@/_lib/constants/status.constants";
import { StatusItem } from "@/_types/Status.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: StatusItem) => React.ReactNode;
  onPreviewStatus?: (status: StatusItem) => void;
};

export const StatusTable = ({
  filterAction,
  renderActions,
  onPreviewStatus,
}: Props) => {
  const config = useMemo<TableConfig<StatusItem>>(
    () => ({
      columns: getStatusColumns(onPreviewStatus),
      service: {
        getAll: async (params) => {
          const res = await getStatusList(params);
          return {
            success: res.success,
            data: res.data,
            error: res.error,
          };
        },
      },
      queryKeyPrefix: [ALL_STATUSES],
      filters: [
        { type: "search", key: "search", placeholder: "Search by tag (e.g. shiva, krishna)" },
      ],
      filterAction,
      renderActions,
      onPreviewStatus,
    }),
    [filterAction, renderActions, onPreviewStatus],
  );

  return <DataTable config={config} />;
};
