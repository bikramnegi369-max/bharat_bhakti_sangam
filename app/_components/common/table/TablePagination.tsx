import { PaginationProps } from "@/_types/Table.types";

export function TablePagination({
  page,
  total,
  limit = 5,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-4 text-sm shadow-ms">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded cursor-pointer hover:bg-gray-300 hover:text-black transition-colors ${
            p === page ? "bg-black text-white" : "bg-white"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}
