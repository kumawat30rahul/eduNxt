import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import DataTable from "../dataTable/dataTable";

const PostsList = () => {
  const { data, error, loading } = useFetch(getPosts);
  const rows = useMemo(
    () =>
      data?.map((item) => {
        return {
          id: item?.id,
          postTitle: item?.title,
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
      width: 50,
      sortable: true,
    },
    {
      label: "User Id",
      key: "userId",
      width: 50,
      sortable: true,
    },
    {
      label: "Post Title",
      key: "postTitle",
      sortable: true,
      width: 150,
    },
    {
      label: "Description",
      key: "body",
      sortable: false,
      width: 200,
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        dataGridColumn={productColumns}
        dataGridRow={rows || []}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PostsList;
