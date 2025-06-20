import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import DataTable from "../dataTable/dataTable";
import ColumnVisibilityToggle from "../columnsVisibility/columnsToggle";
import SearchFilter from "../searchFilter/searchFilter";
import ExportButton from "../exportButton/exportButton";

const productColumns = [
  {
    label: "Id",
    key: "id",
    width: 100,
    sortable: true,
    filterable: true,
    exportable: true,
    visible: true,
  },
  // {
  //   label: "Sr No.",
  //   id: "srNo",
  // },
  {
    label: "Product Name",
    key: "title",
    sortable: true,
    width: 200,
    sortable: true,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Body",
    key: "body",
    sortable: false,
    width: 300,
    sortable: true,
    filterable: true,
    exportable: true,
    visible: true,
  },
];

const ProductsTable = () => {
  const { data, error, loading } = useFetch(getProducts);
  const persistedColumns = localStorage.getItem("columnsVisibility");
  const persistedColumnsData = persistedColumns
    ? JSON.parse(persistedColumns)
    : null;
  const [columns, setColumns] = useState(
    persistedColumnsData ? persistedColumnsData : productColumns
  );
  const [textSearch, setTextSearch] = useState("");

  const rows = useMemo(
    () =>
      data?.products
        ?.map((item, index) => {
          if (textSearch) {
            if (textSearch) {
              const searchText = textSearch.toLowerCase();
              const titleMatch = item?.title
                ?.toLowerCase()
                .includes(searchText);
              const descriptionMatch = item?.description
                ?.toLowerCase()
                .includes(searchText);

              if (!titleMatch && !descriptionMatch) {
                return null; // Skip this item if it doesn't match the search
              }
            }
          }

          return {
            key: item?.id,
            // srNo: index + 1,
            title: item?.title,
            body: item?.description,
          };
        })
        .filter(Boolean), // Filter out null values
    [data, textSearch]
  );

  console.log("Rows:", rows);

  return (
    <div className="w-full p-4">
      <ColumnVisibilityToggle columns={columns} setColumns={setColumns} />
      <SearchFilter setTextSearch={setTextSearch} />
      <ExportButton type={"json"} rows={rows} columns={columns} />
      <DataTable
        dataGridColumn={columns}
        dataGridRow={rows || []}
        loading={loading}
      />
    </div>
  );
};

export default ProductsTable;
