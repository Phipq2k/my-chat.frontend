import { UserActionType } from "../action-types";

class UserDispatch {
    searchUserDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && UserActionType.SEARCH_USER_SUCCESS) ||
            UserActionType.SEARCH_USER_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }
}

export default new UserDispatch();