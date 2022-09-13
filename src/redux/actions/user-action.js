import { getCurrentUser, searchUsers } from "../../services/user/user-service"
import { UserActionType } from "../action-types";
import userDispatch from "../dispatchs/user-dispatch";

// const GetCurrentUserAction = () => {
//     return async(dispatch) => {
//         try {
//             const data = await getCurrentUser();
//             dispatch({
//                 type: UserActionType.GET_CURRENT_USER_SUCCESS,
//                 action: data
//             });
//         } catch (err) {
//             dispatch({
//                 type: UserActionType.GET_CURRENT_USER_SUCCESS,
//                 action: err.data
//             });
//         }
//     }
// }
const searchUsersAction = (keyword) => {
    return async(dispatch) => {
        try {
            const res = await searchUsers(keyword);
            userDispatch.searchUserDispatch(res.status, res.data)(dispatch);
        } catch (err) {
            userDispatch.searchUserDispatch(err.status, err.data)(dispatch);
        }

    }
}

export {
    // GetCurrentUserAction
    searchUsersAction
}