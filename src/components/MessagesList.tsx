import React from "react";
import { DataGrid, GridValueGetterParams, GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../utils/helpers";
import { MessageType } from "../types/Message";

interface MessagesListProps {
  messages: MessageType[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "userName",
    headerName: "User Name",
    width: 120,
  },
  {
    field: "content",
    headerName: "Message",
    width: 450,
  },
  {
    field: "timestampSent",
    headerName: "Date",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      formatDate(params.row.timestampSent),
  },
];

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  console.log("messages", messages);
  return (
    <div>
      <DataGrid
        rows={messages || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          fontSize: "1.3rem",
        }}
      />
    </div>
  );
};

export default MessagesList;
