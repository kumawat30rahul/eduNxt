import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  setDataGridState,
  handlePagination,
  dataGridRow,
  size,
  start,
  end,
  page,
  totalPages,
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          Rows per page:
        </label>
        <select
          value={size}
          onChange={(e) => {
            setDataGridState((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
              page: 0, // reset to page 0
            }));
          }}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-200"
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">
            {start + 1}-{Math.min(end, dataGridRow.length)}
          </span>{" "}
          of <span className="font-medium">{dataGridRow.length}</span> results
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePagination("prev")}
            disabled={page === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1 mx-2">
            <span className="text-sm text-gray-600">
              Page <span className="font-medium">{page + 1}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </span>
          </div>

          <button
            onClick={() => handlePagination("next")}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
