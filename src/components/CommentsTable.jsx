import { useMemo, useState } from "react";
import { getComments } from "../config/services/services";
import { useFetch } from "../hooks/useFetch";
import ExportButton from "./exportButton/exportButton";
import SearchFilter from "./searchFilter/searchFilter";
import DataTable from "./dataTable/dataTable";
import ColumnVisibilityToggle from "./columnsVisibility/columnsToggle";
import Tools from "./Tools";

const commentsColumns = [
  {
    label: "Id",
    key: "id",
    width: 80,
    sortable: true,
    filterable: false,
    exportable: true,
    visible: true,
  },
  {
    label: "Comments",
    key: "comment",
    sortable: true,
    width: 300,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Likes",
    key: "like",
    sortable: true,
    width: 80,
    filterable: false,
    exportable: true,
    visible: true,
  },
  {
    label: "User's Fullname",
    key: "userFullName",
    sortable: true,
    width: 150,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "User's Username",
    key: "username",
    sortable: true,
    width: 150,
    filterable: true,
    exportable: true,
    visible: true,
  },
  {
    label: "Post Id",
    key: "postId",
    sortable: true,
    width: 80,
    filterable: true,
    exportable: true,
    visible: true,
  },
];

const CommentsTable = () => {
  const { data, error, loading } = useFetch(getComments);
  const persistedColumns = localStorage.getItem("columnsVisibility");
  const persistedColumnsData = persistedColumns
    ? JSON.parse(persistedColumns)
    : null;
  const [columns, setColumns] = useState(
    persistedColumnsData ? persistedColumnsData : commentsColumns
  );
  const [textSearch, setTextSearch] = useState("");

  const rows = useMemo(
    () =>
      data?.comments
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
                return null;
              }
            }
          }

          return {
            key: item?.id,
            comment: item?.body,
            like: item?.likes,
            userFullName: item?.user?.fullName,
            username: item?.user?.username,
            postId: item?.postId,
            id: item?.id,
          };
        })
        .filter(Boolean),
    [data, textSearch]
  );

  return (
    <div className="w-full p-4">
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
        error={error}
      />
    </div>
  );
};

export default CommentsTable;
