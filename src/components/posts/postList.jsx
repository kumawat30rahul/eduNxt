import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import DataTable from "../dataTable/dataTable";

const PostsList = () => {
  const { data, error, loading } = useFetch(getPosts);
  const rows = useMemo(
    () =>
      data?.map((item, index) => {
        return {
          id: item?.id,
          // srNo: index + 1,
          productName: item?.title,
          userId: item?.userId,
          body: item?.body,
        };
      }),
    [data]
  );

  const productColumns = [
    {
      label: "Id",
      key: "id",
      width: 100,
      sortable: true,
    },
    // {
    //   label: "Sr No.",
    //   id: "srNo",
    // },
    {
      label: "Product Name",
      key: "productName",
      sortable: true,
      width: 200,
    },
    {
      label: "Body",
      key: "body",
      sortable: false,
      width: 300,
    },
  ];

  return (
    <div className="w-full p-4">
      <DataTable
        dataGridColumn={productColumns}
        dataGridRow={rows || []}
        loading={loading}
      />
    </div>
  );
};

export default PostsList;
