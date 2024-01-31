import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { Action } from "./actions";
export const store = createStore(reducers, {}, applyMiddleware(thunk));

// /* Manual Testing of a Redux Store */
// store.dispatch({
//   type: ActionType.FETCH_USERS_START,
//   payload: null,
// });
