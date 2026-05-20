import { ColumnDef, RowData, TableOptions } from "@tanstack/react-table";
import { TableExportColumn } from "@/_types/Table.types";

const EXCEL_MIME_TYPE = "application/vnd.ms-excel;charset=utf-8";

const getHeaderText = <T extends RowData>(column: ColumnDef<T>): string => {
  if (typeof column.header === "string") {
    return column.header;
  }

  return column.id || "Column";
};

const stringifyCellValue = (value: unknown): string => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  if (value instanceof Date) {
    return value.toLocaleString("en-IN");
  }

  if (Array.isArray(value)) {
    return value.map((item) => stringifyCellValue(item)).join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const sanitizeWorksheetName = (name: string): string =>
  name.replace(/[\\/?*[\]:]/g, " ").trim().slice(0, 31) || "Export";

const sanitizeFileName = (name: string): string =>
  name
    .trim()
    .replace(/[^a-z0-9-_]+/gi, "_")
    .replace(/^-+|-+$/g, "")
    .replace(/^_+|_+$/g, "") || "table-export";

export const getDefaultExportColumns = <T extends RowData>(
  columns: TableOptions<T>["columns"],
): TableExportColumn<T>[] =>
  columns.flatMap((column) => {
    if (!("accessorFn" in column) || typeof column.accessorFn !== "function") {
      return [];
    }

    return [
      {
        header: getHeaderText(column),
        accessor: (row: T) => column.accessorFn?.(row, 0),
      },
    ];
  });

export const createExcelFileName = (name: string): string => {
  const date = new Date().toISOString().slice(0, 10);

  return `${sanitizeFileName(name)}-${date}.xls`;
};

export const downloadExcelWorksheet = <T extends RowData>({
  rows,
  columns,
  fileName,
  sheetName,
}: {
  rows: T[];
  columns: TableExportColumn<T>[];
  fileName: string;
  sheetName: string;
}) => {
  const workbook = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <xml>
      <x:ExcelWorkbook xmlns:x="urn:schemas-microsoft-com:office:excel">
        <x:ExcelWorksheets>
          <x:ExcelWorksheet>
            <x:Name>${escapeHtml(sanitizeWorksheetName(sheetName))}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines /></x:WorksheetOptions>
          </x:ExcelWorksheet>
        </x:ExcelWorksheets>
      </x:ExcelWorkbook>
    </xml>
  </head>
  <body>
    <table>
      <thead>
        <tr>${columns
          .map((column) => `<th>${escapeHtml(column.header)}</th>`)
          .join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) =>
              `<tr>${columns
                .map(
                  (column) =>
                    `<td>${escapeHtml(stringifyCellValue(column.accessor(row)))}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </body>
</html>`;

  const blob = new Blob([workbook], { type: EXCEL_MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
