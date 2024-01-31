import { ActionType } from "../action-types";
import { UserType } from "../../types/User";
import { MessageType } from "../../types/Message";
export type Direction = "up" | "down";

export interface FetchUsersStartAction {
  type: ActionType.FETCH_USERS_START;
  payload: null;
}

export interface FetchUsersCompleteAction {
  type: ActionType.FETCH_USERS_COMPLETE;
  payload: {
    users: UserType[];
  };
}

export interface FetchMessagesForUserStartAction {
  type: ActionType.FETCH_MESSAGES_FOR_USER_START;
  payload: null;
}

export interface FetchMessagesForUserStartCompleteAction {
  type: ActionType.FETCH_MESSAGES_FOR_USER_COMPLETE;
  payload: MessageType[];
}

export type Action =
  | FetchUsersStartAction
  | FetchUsersCompleteAction
  | FetchMessagesForUserStartAction
  | FetchMessagesForUserStartCompleteAction;
