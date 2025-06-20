import { useMemo, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Pagination from "../pagination/pagination";

const DataTable = ({ dataGridColumn, dataGridRow = [], pageSize, loading }) => {
  const [dataGridState, setDataGridState] = useState({
    pageSize: pageSize || 10,
    page: 0,
    sortBy: null,
    sortDirection: "asc",
  });

  const sortedData = useMemo(() => {
    if (!dataGridState.sortBy) return dataGridRow;

    const sortedRows = [...dataGridRow].sort((a, b) => {
      const aValue = a[dataGridState.sortBy];
      const bValue = b[dataGridState.sortBy];

      if (aValue < bValue)
        return dataGridState.sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue)
        return dataGridState.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sortedRows;
  }, [dataGridRow, dataGridState.sortBy, dataGridState.sortDirection]);

  const columns = useMemo(() => {
    return dataGridColumn.map((column) => ({
      ...column,
      visible: column.visible !== false, // Ensure visible is true by default
    }));
  }, [dataGridColumn]);

  const { page, pageSize: size } = dataGridState;
  const totalPages = Math.ceil(dataGridRow.length / size);
  const start = page * size;
  const end = start + size;
  const paginatedRows = sortedData.slice(start, end); // 👈 derived here

  const handlePagination = (direction) => {
    if (direction === "next" && page < totalPages - 1) {
      setDataGridState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
    if (direction === "prev" && page > 0) {
      setDataGridState((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleSort = (columnId, sortable) => {
    if (!sortable) return; // If the column is not sortable, do nothing
    setDataGridState((prev) => {
      const isAsc = prev.sortBy === columnId && prev.sortDirection === "asc";
      return {
        ...prev,
        sortBy: columnId,
        sortDirection: isAsc ? "desc" : "asc",
      };
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  hidden={!column.visible}
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider truncate ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-200 transition-colors duration-150 select-none"
                      : ""
                  }`}
                  style={{
                    width: column.width ? `${column.width}px` : "auto",
                  }}
                  onClick={() => handleSort(column.key, column.sortable)}
                  role="button"
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        {dataGridState.sortBy === column.key ? (
                          dataGridState.sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4 text-blue-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-blue-500" />
                          )
                        ) : (
                          <div className="w-4 h-4 flex flex-col justify-center opacity-30">
                            <ChevronUp className="w-3 h-2 -mb-1" />
                            <ChevronDown className="w-3 h-2" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="text-sm">No data available</div>
                </td>
              </tr>
            ) : (
              paginatedRows?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      hidden={!column.visible}
                      className="px-6 py-4 text-sm text-gray-900 truncate"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        setDataGridState={setDataGridState}
        handlePagination={handlePagination}
        dataGridRow={dataGridRow}
        size={size}
        start={start}
        end={end}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DataTable;
