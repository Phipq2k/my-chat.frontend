import { UserActionType } from "../action-types";

const initialState = [];

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionType.GET_CURRENT_USER_SUCCESS:
            return action.payload;
        case UserActionType.SEARCH_USER_SUCCESS:
            return action.payload;
        case UserActionType.SEARCH_USER_FAILURE:
            return [];
        default:
            return state;
    }
};

export default userReducer;