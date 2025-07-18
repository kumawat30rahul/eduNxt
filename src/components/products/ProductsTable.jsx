import { useMemo, useState } from "react";
import { getProducts } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import { isItemMatchingSearch } from "../commonFunctions/itemSearch";
import Tools from "../tools/Tools";
import DataTable from "../dataTable/DataTable";

const productColumns = [
  {
    label: "Id",
    key: "id",
    width: 80,
    sortable: true,
    filterable: true,
    exportable: true,
    visible: true,
  },

  {
    label: "Image",
    key: "image",
    sortable: true,
    width: 100,
    filterable: true,
    exportable: true,
    visible: true,
    renderCell: (row) => {
      return (
        <div className="flex items-center">
          <img
            src={row.image}
            alt={row.title}
            className="h-16 aspect-square object-cover rounded"
          />
        </div>
      );
    },
  },
  {
    label: "Product Name",
    key: "title",
    sortable: true,
    width: 300,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Brand",
    key: "brand",
    sortable: false,
    width: 200,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Category",
    key: "category",
    sortable: false,
    width: 100,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Price",
    key: "price",
    sortable: true,
    width: 80,
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
          if (!isItemMatchingSearch(item, textSearch, columns)) return null;

          return {
            key: item?.id,
            // srNo: index + 1,
            title: item?.title,
            brand: item?.brand,
            category: item?.category,
            price: item?.price,
            image: item?.images?.[0] || "", // Assuming images is an array and we take the first image
            id: item?.id,
          };
        })
        .filter(Boolean), // Filter out null values
    [data, textSearch]
  );

  return (
    <div className="w-full p-4 ">
      <Tools
        columns={columns}
        rows={rows}
        setColumns={setColumns}
        setTextSearch={setTextSearch}
      />
      <DataTable
        dataGridColumn={columns}
        dataGridRow={rows || []}
        loading={loading}
        pagination={true}
        searchedText={textSearch}
      />
    </div>
  );
};

export default ProductsTable;
