import {
  RowData,
  Table,
  TableOptions,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableController } from "@/_types/Table.types";

export const useDataTable = <T extends RowData>(
  controller: TableController<T>,
  columns: TableOptions<T>["columns"],
): Table<T> => {
  // TanStack Table manages functions internally; passing the config directly
  // avoids wrapping an incompatible API in memoization.
  // eslint-disable-next-line react-hooks/incompatible-library
  return useReactTable<T>({
    data: controller.data?.items || [],
    columns,
    state: { sorting: controller.sorting },
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(controller.sorting)
          : updaterOrValue;

      controller.setSorting(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
  });
};
