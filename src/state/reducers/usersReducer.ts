import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { UserType } from "../../types/User";

interface UsersState {
  loading: boolean;
  users: UserType[];
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  users: [],
  error: null,
};

const reducer = produce(
  (state: UsersState = initialState, action: Action): UsersState => {
    switch (action.type) {
      case ActionType.FETCH_USERS_START:
        console.log("User reducer 22");
        state.loading = true;
        return state;
      case ActionType.FETCH_USERS_COMPLETE:
        console.log("User reducer 25");
        state.loading = false;
        if (action.payload?.users) {
          state.users = action.payload.users;
        }
        return state;
      case ActionType.FETCH_MESSAGES_FOR_USER_START:
        return state;
      case ActionType.FETCH_MESSAGES_FOR_USER_COMPLETE:
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
