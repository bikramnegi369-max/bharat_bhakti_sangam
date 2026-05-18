import type { CSSProperties } from "react";
import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: CSSProperties["width"];
    minWidth?: CSSProperties["minWidth"];
    maxWidth?: CSSProperties["maxWidth"];
    headerClassName?: string;
    cellClassName?: string;
  }
}

export {};
