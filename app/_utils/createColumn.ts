import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export const createColumn = <T>() => {
  return <V = unknown>(
    id: string,
    options: {
      header: string;
      accessorFn: (row: T) => V;
      cell?: (value: V, row: T) => ReactNode;
      enableSorting?: boolean;
      size?: number;
      minSize?: number;
    },
  ): ColumnDef<T, V> => {
    return {
      id,
      header: options.header,
      accessorFn: options.accessorFn,
      enableSorting: options.enableSorting ?? true,
      size: options.size,
      minSize: options.minSize,

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
