import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import messagesReducer from "./messagesReducer";

const reducers = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
