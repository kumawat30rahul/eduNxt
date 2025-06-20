import { useState } from "react";

const ColumnVisibilityToggle = ({ columns, setColumns }) => {
  const [open, setOpen] = useState(false);

  const handleChangeColumns = (columnKey, checked) => {
    const updatedColumns = columns.map((column) => {
      if (column.key === columnKey) {
        return { ...column, visible: checked };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  return (
    <div>
      <div className="" onClick={() => setOpen(!open)}>
        <span>Columns</span>
      </div>
      <div
        className="absolute z-10 bg-gray-400 shadow-lg rounded-lg p-4 mt-2 w-48"
        style={{ display: open ? "block" : "none" }}
      >
        <div className="flex flex-col">
          {columns.map((column) => (
            <label
              key={column.key}
              className="flex items-center mb-2 text-black"
            >
              <input
                type="checkbox"
                checked={column.visible}
                onChange={(e) =>
                  handleChangeColumns(column.key, e.target.checked)
                }
                className="mr-2"
              />
              {column.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnVisibilityToggle;
