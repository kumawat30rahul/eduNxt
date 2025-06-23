import ExportButton from "./exportButton/exportButton";
import SearchFilter from "./searchFilter/searchFilter";
import ColumnVisibilityToggle from "./columnsVisibility/columnsToggle";

const Tools = ({ columns, setColumns, rows, setTextSearch }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4 lg:gap-0">
      <div className="flex flex-row items-center gap-4">
        <ColumnVisibilityToggle columns={columns} setColumns={setColumns} />
        <ExportButton rows={rows} columns={columns} />
      </div>
      <div className="w-full lg:w-100">
        <SearchFilter setTextSearch={setTextSearch} />
      </div>
    </div>
  );
};

export default Tools;
