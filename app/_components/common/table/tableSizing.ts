import { CSSProperties } from "react";
import { ColumnMeta } from "@tanstack/react-table";

type ColumnSizeOptions = {
  size?: number;
  minSize?: number;
  width?: CSSProperties["width"];
  minWidth?: CSSProperties["minWidth"];
  maxWidth?: CSSProperties["maxWidth"];
};

export const getColumnSizeStyle = ({
  size,
  minSize,
  width,
  minWidth,
  maxWidth,
}: ColumnSizeOptions): CSSProperties | undefined => {
  if (
    typeof size !== "number" &&
    typeof minSize !== "number" &&
    typeof width === "undefined" &&
    typeof minWidth === "undefined" &&
    typeof maxWidth === "undefined"
  ) {
    return undefined;
  }

  const style: CSSProperties = {};

  if (typeof width !== "undefined") {
    style.width = width;
  }

  if (typeof size === "number") {
    style.width = `${size}px`;
    style.minWidth = `${size}px`;
  }

  if (typeof minWidth !== "undefined") {
    style.minWidth = minWidth;
  }

  if (typeof minSize === "number") {
    style.minWidth = `${minSize}px`;
  }

  if (typeof maxWidth !== "undefined") {
    style.maxWidth = maxWidth;
  }

  return style;
};

export const hasColumnSizing = ({
  size,
  minSize,
  meta,
}: {
  size?: number;
  minSize?: number;
  meta?: ColumnMeta<unknown, unknown>;
}) =>
  typeof size === "number" ||
  typeof minSize === "number" ||
  typeof meta?.width !== "undefined" ||
  typeof meta?.minWidth !== "undefined" ||
  typeof meta?.maxWidth !== "undefined";
