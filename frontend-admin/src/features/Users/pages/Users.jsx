import React, { useEffect, useState } from "react";
import Tablegrid from "../../../components/table/TableGrid";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../slices/usersSlice";
import UsersCreateupdetmodel from "../components/Userscreateupdetmodel";
import Button from "../../../components/Button";
import { HeaderType } from "../../../utils/types";
import EditIcon from "../../../components/svgs/EditIcon";
import { cn } from "../../../lib/utils";

// Table column definitions will be declared inside component so handlers are in scope

const Users = () => {
  const dispatch = useDispatch();
  const { getUsersApi } = useSelector((s) => s.user || {});

  // local UI state
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract data safely
  const rawRows = getUsersApi?.data?.response?.docs ?? [];
  // Pagination

  const totalPages = getUsersApi?.data?.response?.totalPages || 1;
  const totalRecords = getUsersApi?.data?.response?.totalDocs || 0;
  const limit = getUsersApi?.data?.response?.limit || 10;

  // Normalize rows for table
  const rows = rawRows.map((r) => ({
    ...r,
    fullName: r.fullName ?? r.name ?? r.full_name ?? r._id ?? "—",
    email: r.email ?? "—",
    accessLevel:
      r.accessLevel ??
      r.roleId?.role ??
      r.group?.accessLevel ??
      r.group?.access ??
      "—",
  }));

  useEffect(() => {
    dispatch(getUsers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleEdit = (id) => {
    const user = rows.find((r) => r._id === id || r.id === id);
    if (!user) return;
    setEditUser(user);
    setShowCreate(true);
  };

  const columns = [
    { value: "fullName", name: "Full name", _class: "col-span-4" },
    { value: "email", name: "Email", _class: "col-span-3" },
    { value: "accessLevel", name: "Access level", _class: "col-span-2" },
    {
      name: "Actions",
      value: "actions",
      _class: "col-span-2",
      type: HeaderType.dynamicAction,
      actions: [
        {
          label: "Edit",
          icon: <EditIcon />,
          onClick: (row) => handleEdit(row._id || row.id),
        },
      ],
    },
  ];

  return (
    <div className="common-page flex flex-col gap-4">
      <div
        className={cn(
          "common-page",
          "flex flex-row justify-between items-center"
        )}
      >
        <h1 className="text-2xl font-bold">Users List</h1>
        <Button onClick={() => setShowCreate(true)}>New user</Button>
      </div>

      <UsersCreateupdetmodel
        open={showCreate}
        onOpenChange={(v) => {
          setShowCreate(v);
          if (!v) setEditUser(null);
        }}
        initialData={editUser}
        onCreated={() => dispatch(getUsers({ page: currentPage }))}
      />
      <Tablegrid
        data={rows}
        columns={columns}
        isCompressView={false}
        isLoading={!!getUsersApi?.isLoading}
        allowPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        pageLimit={limit}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Users;
