import { CreateColumnOptions } from "@/_types/Table.types";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export const createColumn = <T>() => {
  return <V = unknown>(
    id: string,
    options: Omit<CreateColumnOptions<T>, "accessorFn" | "cell"> & {
      accessorFn: (row: T) => V;
      cell?: (value: V, row: T) => ReactNode;
    },
  ): ColumnDef<T, V> => {
    return {
      id,
      header: options.header,
      accessorFn: options.accessorFn,
      enableSorting: options.enableSorting ?? true,
      size: options.size,
      minSize: options.minSize,
      meta: {
        width: options.width,
        minWidth: options.minWidth,
        maxWidth: options.maxWidth,
        headerClassName: options.headerClassName,
        cellClassName: options.cellClassName,
      },

      cell: (ctx) => {
        const value = ctx.getValue();
        const row = ctx.row.original;

        return options.cell
          ? options.cell(value, row)
          : ((value ?? "N/A") as ReactNode);
      },
    };
  };
};
