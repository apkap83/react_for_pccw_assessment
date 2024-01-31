import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { UserType } from "../../types/User";
import { MessageType } from "../../types/Message";

import httpService from "../../services/httpService";
import config from "../../../config";

// export const insertCellAfter = (
//   id: string | null,
//   cellType: CellTypes
// ): InsertCellAfterAction => {
//   return {
//     type: ActionType.INSERT_CELL_AFTER,
//     payload: {
//       id,
//       type: cellType,
//     },
//   };
// };

export const getAllUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_USERS_START,
      payload: null,
    });

    const response = await httpService.get(config.apiPrefix + "/api/users");
    const data = response.data as UserType[];

    dispatch({
      type: ActionType.FETCH_USERS_COMPLETE,
      payload: {
        users: data,
      },
    });
  };
};

export const getAllMessagesForUser = (userId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_MESSAGES_FOR_USER_START,
      payload: null,
    });

    const response = await httpService.get(
      config.apiPrefix + `/api/user/${userId}/messages`
    );

    // Assert that data is of the expected type
    const data = response.data as MessageType[];

    dispatch({
      type: ActionType.FETCH_MESSAGES_FOR_USER_COMPLETE,
      payload: data,
    });
  };
};
