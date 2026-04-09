import { flexRender, Table } from "@tanstack/react-table";

interface Props<T> {
  table: Table<T>;
  columnsLength: number;
  renderActions?: (row: T) => React.ReactNode;
}

export const TableBody = <T,>({
  table,
  columnsLength,
  renderActions,
}: Props<T>) => {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columnsLength + (renderActions ? 1 : 0)}
            className="text-center py-6"
          >
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} className="hover:bg-gray-50">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-4 py-3 border border-gray-200">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}

          {renderActions && (
            <td className="sticky right-0 z-20 border border-gray-200 bg-white px-4 py-3 shadow-2xl before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:-translate-x-full before:bg-linear-to-l before:from-black/15 before:to-transparent before:content-['']">
              {renderActions(row.original)}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
