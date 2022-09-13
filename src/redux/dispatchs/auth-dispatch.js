import { AuthActionType } from "../action-types";

class AuthDispatch {
    registerDispatch(statusCode, payload) {
        const type =
            (statusCode === 201 && AuthActionType.SIGNUP_SUCCESS) ||
            AuthActionType.SIGNUP_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
            // console.log({type, payload});
        };
    }
    loginDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && AuthActionType.LOGIN_SUCCESS) ||
            AuthActionType.LOGIN_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    logoutDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && AuthActionType.LOGOUT_SUCCESS) ||
            AuthActionType.LOGOUT_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    forgotPasswordDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && AuthActionType.CONFIRM_EMAIL_SUCCESS) ||
            AuthActionType.CONFIRM_EMAIL_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    resetPasswordDispatch(statusCode, payload) {
        const type =
            (statusCode === 202 && AuthActionType.RESET_PASSWORD_SUCCESS) ||
            AuthActionType.RESET_PASSWORD_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }
}

export default new AuthDispatch();