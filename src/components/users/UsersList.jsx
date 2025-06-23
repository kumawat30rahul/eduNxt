import { useMemo } from "react";
import { getUsers } from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import DataTable from "../dataTable/DataTable";

const UsersList = () => {
  const { data, error, loading } = useFetch(getUsers);
  const rows = useMemo(
    () =>
      data?.map((item, index) => {
        return {
          id: item?.id,
          // srNo: index + 1,
          name: item?.name,
          userId: item?.userId,
          userName: item?.username,
          phone: item?.phone,
          email: item?.email,
          website: item?.website,
        };
      }),
    [data]
  );

  const userColumns = [
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
      label: "Name",
      key: "name",
      sortable: true,
      width: 200,
    },
    {
      label: "User Name",
      key: "userName",
      sortable: true,
      width: 200,
    },
    {
      label: "Phone",
      key: "phone",
      sortable: true,
      width: 200,
    },
    {
      label: "Email",
      key: "email",
      sortable: true,
      width: 200,
    },
    {
      label: "Website",
      key: "website",
      sortable: false,
      width: 300,
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        dataGridColumn={userColumns}
        dataGridRow={rows || []}
        loading={loading}
        pagination={false}
        error={error}
      />
    </div>
  );
};

export default UsersList;
