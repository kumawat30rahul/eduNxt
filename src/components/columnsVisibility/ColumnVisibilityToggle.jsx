import { useState } from "react";
import { Eye, EyeOff, Settings2, ChevronDown } from "lucide-react";

const ColumnsToggle = ({ columns, setColumns }) => {
  const [open, setOpen] = useState(false);

  const handleChangeColumns = (columnKey, checked) => {
    const updatedColumns = columns.map((column) => {
      if (column.key === columnKey) {
        return { ...column, visible: checked };
      }
      return column;
    });
    localStorage.setItem("columnsVisibility", JSON.stringify(updatedColumns));
    setColumns(updatedColumns);
  };

  const visibleCount = columns.filter((col) => col.visible).length;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
        onClick={() => setOpen(!open)}
      >
        <Settings2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Columns</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          {visibleCount}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 bg-white shadow-xl rounded-xl border border-gray-200 mt-2 w-64 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-800">
                Column Visibility
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {visibleCount} of {columns.length} columns visible
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto">
              <div className="p-2">
                {columns.map((column, index) => {
                  const isLastVisible = visibleCount === 1 && column.visible;
                  return (
                    <label
                      key={column.key}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                        index !== columns.length - 1 ? "mb-1" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {column.visible ? (
                          <Eye className="w-4 h-4 text-blue-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            column.visible ? "text-gray-800" : "text-gray-500"
                          }`}
                        >
                          {column.label}
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          disabled={isLastVisible}
                          onChange={(e) =>
                            handleChangeColumns(column.key, e.target.checked)
                          }
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnsToggle;
