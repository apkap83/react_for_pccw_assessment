import React from "react";
import {
  DataGrid,
  GridValueGetterParams,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { formatDate } from "../utils/helpers";
import { UserType } from "../types/User";

interface UsersListProps {
  users: UserType[] | null;
  onUserSelection: (selectedUser: UserType) => void;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "surname", headerName: "Last name", width: 130 },
  {
    field: "userName",
    headerName: "User Name",
    width: 120,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      formatDate(params.row.dateOfBirth),
  },
  // {
  //   field: "userName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: any) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const UsersList: React.FC<UsersListProps> = ({ users, onUserSelection }) => {
  // Function to handle selection change
  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    if (users) {
      // selectionModel is an array, so you should iterate over it
      selectionModel.forEach((selectedId) => {
        const selectedUser = users.find((user) => user.id === selectedId);
        if (selectedUser) {
          onUserSelection(selectedUser);
        }
      });
    }
    // You can now use selectionModel to get the IDs of selected rows
  };

  if (users && users.length === 0) {
    return null;
  }

  return (
    <div>
      <DataGrid
        rows={users || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          fontSize: "1.3rem",
          width: "80rem",
        }}
        onRowSelectionModelChange={handleSelectionChange} // Add this prop
      />
    </div>
  );
};

export default UsersList;
