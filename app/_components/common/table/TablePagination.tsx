import { PaginationProps } from "@/_types/Table.types";

export function TablePagination({
  page,
  total,
  limit = 5,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const totalPage = totalPages ?? Math.max(1, Math.ceil(total / limit));
  const currentPage = page ?? Math.min(Math.max(page, 1), totalPage);

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-4 text-sm shadow-ms">
      <button
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1 || totalPage === 0}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => {
            onPageChange(p);
          }}
          className={`px-3 py-1 border rounded cursor-pointer hover:bg-gray-300 hover:text-black transition-colors ${
            p === currentPage ? "bg-black text-white" : "bg-white"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPage || totalPage === 0}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}
