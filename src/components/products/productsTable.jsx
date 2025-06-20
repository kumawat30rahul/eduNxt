import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import DataTable from "../dataTable/dataTable";
import ColumnVisibilityToggle from "../columnsVisibility/columnsToggle";
import SearchFilter from "../searchFilter/searchFilter";

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
  const [columns, setColumns] = useState(productColumns);

  const rows = useMemo(
    () =>
      data?.products?.map((item, index) => {
        return {
          key: item?.id,
          // srNo: index + 1,
          title: item?.title,
        };
      }),
    [data]
  );

  return (
    <div className="w-full p-4">
      <ColumnVisibilityToggle columns={columns} setColumns={setColumns} />
      {/* <SearchFilter /> */}
      <DataTable
        dataGridColumn={columns}
        dataGridRow={rows || []}
        loading={loading}
      />
    </div>
  );
};

export default ProductsTable;
