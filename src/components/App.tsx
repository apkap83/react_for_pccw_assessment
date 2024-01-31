import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import UsersList from "./UsersList.tsx";
import MessagesList from "./MessagesList.tsx";
import { UserType } from "../types/User.ts";
import { MessageType } from "../types/Message.ts";

import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions.ts";

import httpService from "../services/httpService";
import config from "../../config.ts";

function App() {
  // Redux State from Users Reducer
  const {
    error,
    loading,
    users: usersFromRedux,
  } = useTypedSelector((state) => state.users);

  // Redux State from Messages Reducer
  const { messages } = useTypedSelector((state) => state.messages);

  // Actions on both Reducers
  const { getAllUsers, getAllMessagesForUser } = useActions();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserSelection = async (userSelected: UserType) => {
    const { id } = userSelected;
    getAllMessagesForUser(id);
  };

  const messagesSection = () => {
    if (messages.length === 0) {
      return (
        <div className="noteIndication">
          <h1>Select a User to check messages</h1>
        </div>
      );
    }

    return (
      <div className="messageList">
        <Typography
          variant="h4"
          style={{ textAlign: "center", paddingBottom: "1rem" }}
        >
          Messages List
        </Typography>
        <div>
          <MessagesList messages={messages} />
        </div>
      </div>
    );
  };

  return (
    <>
      <header>PCCW - Tech assessment</header>
      <div className="mainWrapper">
        <div className="userSection">
          <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
            Users List
          </Typography>
          <div>
            {loading ? (
              "Loading..."
            ) : (
              <UsersList
                users={usersFromRedux}
                onUserSelection={handleUserSelection}
              />
            )}
          </div>
        </div>

        <div
          className="rightSection"
          style={{
            border: messages.length === 0 ? "1px solid #d8d8d8" : undefined,
          }}
        >
          {messagesSection()}
        </div>
      </div>
      <footer>Apostolos Kapetanios</footer>
    </>
  );
}

export default App;
