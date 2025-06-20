import { useMemo, useState } from "react";

const DataTable = ({ dataGridColumn, dataGridRow = [], pageSize, loading }) => {
  const [dataGridState, setDataGridState] = useState({
    columns: dataGridColumn || [],
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

  const handleSort = (columnId) => {
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
    <div className="overflow-x-auto w-full rounded-lg">
      <table className="w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {dataGridState.columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate"
                style={{ width: column.width ? `${column.width}px` : "auto" }}
                onClick={() => handleSort(column.id)}
                role="button"
              >
                <span>{column.label}</span>
                {dataGridState.sortBy === column.id && (
                  <span className="ml-2">
                    {dataGridState.sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <div>Loading...</div>
          ) : (
            paginatedRows?.map((row, index) => (
              <tr key={index}>
                {dataGridState.columns.map((column) => (
                  <td
                    key={column.id}
                    className="px-6 py-4 text-sm text-gray-900 truncate"
                  >
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between">
        <select
          value={size}
          onChange={(e) => {
            setDataGridState((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
              page: 0, // reset to page 0
            }));
          }}
          className="mt-4 p-2 border border-gray-300 rounded"
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>
              Show {s} rows
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between gap-2">
          <p className="mt-4 text-sm text-gray-600">
            Page {page + 1} of {totalPages} ({dataGridRow.length} total rows)
          </p>
          <button onClick={() => handlePagination("prev")}>Prev</button>
          <button onClick={() => handlePagination("next")}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
