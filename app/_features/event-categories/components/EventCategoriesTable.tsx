import { DataTable } from "@/_components/common/table/DataTable";
import { ALL_CATEGORIES } from "@/_lib/constants/eventCategories.constants";
import { getEventCategories } from "../services/eventCategories.service";
import { EventCategoriesColumns } from "./EventCategoriesColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { useMemo } from "react";
import { EventCategory } from "@/_types/EventCategories.types";

type Props = {
  filterAction?: React.ReactNode;
  renderActions?: (row: EventCategory) => React.ReactNode;
};

export const EventsCategoriesTable = ({
  filterAction,
  renderActions,
}: Props) => {
  const config = useMemo<TableConfig<EventCategory>>(
    () => ({
      columns: EventCategoriesColumns,
      service: { getAll: getEventCategories },
      queryKeyPrefix: [ALL_CATEGORIES],
      filters: [
        { type: "search", key: "search", placeholder: "Search categories" },
      ],
      filterAction,
      renderActions,
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
};
