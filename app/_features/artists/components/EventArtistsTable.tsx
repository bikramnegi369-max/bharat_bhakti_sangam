import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { EventArtistsColumns } from "./EventArtistsColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getArtists } from "../services/artists.service";
import { ALL_ARTISTS } from "@/_lib/constants/artists.constants";
import { Artist } from "@/_types/Artists.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: Artist) => React.ReactNode;
};

export const EventArtistsTable = ({ filterAction, renderActions }: Props) => {
  const config = useMemo<TableConfig<Artist>>(
    () => ({
      columns: EventArtistsColumns,
      service: { getAll: getArtists },
      queryKeyPrefix: [ALL_ARTISTS],
      filters: [
        { type: "search", key: "search", placeholder: "Search artists" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
