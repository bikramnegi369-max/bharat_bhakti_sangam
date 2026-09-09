import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { InfluencerColumns } from "./InfluencerColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getInfluencers } from "../services/influencer.service";
import { ALL_INFLUENCERS } from "@/_lib/constants/influencer.constants";
import { InfluencerRequest } from "@/_types/Influencer.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: InfluencerRequest) => React.ReactNode;
};

export const InfluencerTable = ({ filterAction, renderActions }: Props) => {
  const config = useMemo<TableConfig<InfluencerRequest>>(
    () => ({
      columns: InfluencerColumns,
      service: { getAll: getInfluencers },
      queryKeyPrefix: [ALL_INFLUENCERS],
      filters: [
        {
          type: "search",
          key: "search",
          placeholder: "Search influencers by name or email...",
        },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
