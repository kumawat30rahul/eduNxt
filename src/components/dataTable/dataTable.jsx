import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import Pagination from "../pagination/pagination";

const DataTable = ({
  dataGridColumn,
  dataGridRow = [],
  pageSize,
  loading,
  pagination = false,
  error,
  searchedText,
}) => {
  const [dataGridState, setDataGridState] = useState({
    pageSize: pageSize || 10,
    page: 0,
    sortBy: null,
    sortDirection: "asc",
  });

  const sortedData = useMemo(() => {
    if (!dataGridState?.sortBy) return dataGridRow;

    const sortedRows = [...(dataGridRow || [])].sort((a, b) => {
      const aValue = a?.[dataGridState?.sortBy];
      const bValue = b?.[dataGridState?.sortBy];

      if (aValue < bValue)
        return dataGridState?.sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue)
        return dataGridState?.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sortedRows;
  }, [dataGridRow, dataGridState?.sortBy, dataGridState?.sortDirection]);

  const columns = useMemo(() => {
    return (dataGridColumn || []).map((column) => ({
      ...column,
      visible: column?.visible !== false, // Ensure visible is true by default
    }));
  }, [dataGridColumn]);

  const { page, pageSize: size } = dataGridState || {};
  const totalPages = Math.ceil((dataGridRow?.length || 0) / (size || 1));
  const start = (page || 0) * (size || 1);
  const end = start + (size || 1);
  const paginatedRows = sortedData?.slice(start, end); // 👈 derived here

  const handlePagination = (direction) => {
    if (direction === "next" && (page || 0) < totalPages - 1) {
      setDataGridState((prev) => ({ ...prev, page: (prev?.page || 0) + 1 }));
    }
    if (direction === "prev" && (page || 0) > 0) {
      setDataGridState((prev) => ({ ...prev, page: (prev?.page || 0) - 1 }));
    }
  };

  const handleSort = (columnId, sortable) => {
    if (!sortable) return; // If the column is not sortable, do nothing
    setDataGridState((prev) => {
      const isAsc = prev?.sortBy === columnId && prev?.sortDirection === "asc";
      return {
        ...prev,
        sortBy: columnId,
        sortDirection: isAsc ? "desc" : "asc",
      };
    });
  };

  const handleColorSearchedText = (stringData) => {
    if (!searchedText) return stringData;
    const regex = new RegExp(`(${searchedText})`, "gi");
    const parts = String(stringData ?? "").split(regex);
    return parts?.map((part, index) =>
      part?.toLowerCase() === searchedText?.toLowerCase() ? (
        <span key={index} className="text-blue-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm  h-[600px] overflow-hidden relative">
      <div className={`overflow-x-auto h-full ${pagination ? "pb-15" : ""}`}>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
            <tr className="sticky top-0">
              {columns?.map((column) => (
                <th
                  hidden={!column?.visible}
                  key={column?.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider truncate bg-blue-400 sticky top-0 ${
                    column?.sortable
                      ? "cursor-pointer hover:bg-blue-500 transition-colors duration-150 select-none"
                      : ""
                  }`}
                  style={{
                    width: column?.width ? `${column?.width}px` : "auto",
                  }}
                  onClick={() => handleSort(column?.key, column?.sortable)}
                  role="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-md font-bold">{column?.label}</span>
                    {column?.sortable && (
                      <div className="flex flex-col">
                        {dataGridState?.sortBy === column?.key ? (
                          dataGridState?.sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4 text-black" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-black" />
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
                <td
                  colSpan={columns?.length}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={columns?.length}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-sm text-red-600 font-medium">
                    Error loading data. Please try again.
                  </div>
                </td>
              </tr>
            ) : paginatedRows?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns?.length}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-sm text-gray-500">No data available</div>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, index) => {
                const rowKey = row?.id || row?.key || `row-${start + index}`;
                return (
                  <tr
                    key={rowKey}
                    className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-25"
                  >
                    {columns
                      .filter((col) => col.visible)
                      .map((column) => (
                        <td
                          key={`${rowKey}-${column.key}`}
                          className="px-6 py-4 text-sm text-gray-900 truncate"
                          style={{
                            width: column?.width ? `${column.width}px` : "auto",
                          }}
                        >
                          {column?.renderCell
                            ? column.renderCell(row)
                            : handleColorSearchedText(row?.[column.key])}
                        </td>
                      ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
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
      )}
    </div>
  );
};

export default DataTable;
