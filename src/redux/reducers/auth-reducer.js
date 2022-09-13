import TokenService from "../../services/auth/token-service";
import { AuthActionType } from "../actions/auth-action";

const authState = {
    isLogined: false,
    message: "",
};

//Todo:Functional handler using local storage to saving authState when user logined
const getAuthState = () => {
    const auth = TokenService.getUser();
    try {
        if (auth) {
            const authObj = auth;
            return authObj;
        } else {
            return authState;
        }
    } catch (err) {
        return authState;
    }
};

const authReducer = (state = getAuthState(), action) => {
    switch (action.type) {
        case AuthActionType.SIGNUP_SUCCESS:
            return {
                isLogined: true,
                message: action.payload,
            };
        case AuthActionType.LOGIN_SUCCESS:
            return {
                isLogined: true,
                message: action.payload,
            };
        case AuthActionType.LOGOUT_SUCCESS:
            return {
                isLogined: false,
                message: action.payload,
            };
        case AuthActionType.CONFIRM_EMAIL_SUCCESS:
            return {
                isLogined: false,
                message: action.payload,
            };
        case AuthActionType.RESET_PASSWORD_SUCCESS:
            return {
                isLogined: false,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;