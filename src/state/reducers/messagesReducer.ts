import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { MessageType } from "../../types/Message";

interface MessagesState {
  loading: boolean;
  messages: MessageType[];
  error: string | null;
}

const initialState: MessagesState = {
  loading: false,
  messages: [],
  error: null,
};

const reducer = produce(
  (state: MessagesState = initialState, action: Action): MessagesState => {
    switch (action.type) {
      case ActionType.FETCH_MESSAGES_FOR_USER_START:
        state.loading = true;
        return state;
      case ActionType.FETCH_MESSAGES_FOR_USER_COMPLETE:
        // Generate unique IDs and add them to each message (this is required from MUI component)
        const messagesWithIds = action.payload.map((message, index) => ({
          ...message,
          id: `${index + 1}`,
        }));

        state.loading = false;
        state.messages = messagesWithIds;
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
