import { flexRender, Table } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

interface TableHeaderProps<T> {
  table: Table<T>;
  hasActions: boolean;
}

export const TableHeader = <T,>({ table, hasActions }: TableHeaderProps<T>) => {
  return (
    <thead className="bg-[#F3E4C7] sticky top-0 z-10">
      {table.getHeaderGroups().map((hg) => (
        <tr key={hg.id}>
          {hg.headers.map((h) => (
            <th
              key={h.id}
              onClick={h.column.getToggleSortingHandler()}
              className="px-4 py-3 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-4">
                <span>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </span>
                <span>
                  {{
                    asc: <ChevronUp size={20} />,
                    desc: <ChevronDown size={20} />,
                  }[h.column.getIsSorted() as string] ?? (
                    <ChevronsUpDown size={20} />
                  )}
                </span>
              </div>
            </th>
          ))}

          {hasActions && (
            <th className="sticky right-0 z-30 w-30 border-l border-black/10 bg-[#F3E4C7] px-4 py-3 shadow-2xl before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:-translate-x-full before:bg-linear-to-l before:from-black/15 before:to-transparent before:content-['']">
              Action
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
};
