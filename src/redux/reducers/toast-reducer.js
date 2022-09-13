import ToastType from "../../constants/toast-type";
import { ConversationActionType, FileActionType, MessageActionType } from "../action-types";
import { AuthActionType } from "../actions/auth-action";

const error = {
  show: false,
  type: ToastType.ERROR,
  message: "",
};

const toastReducer = (state = error, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.SIGNUP_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: payload?.message,
      };
      return state;
    case AuthActionType.LOGIN_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: payload?.message,
      };
      return state;
    case AuthActionType.LOGOUT_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: payload?.message,
      };
      return state;
    case AuthActionType.CONFIRM_EMAIL_SUCCESS:
      state = {
        show: true,
        type: ToastType.SUCCESS,
        message: payload,
      };
      return state;
    case AuthActionType.CONFIRM_EMAIL_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: payload?.message,
      };
      return state;
    case AuthActionType.RESET_PASSWORD_SUCCESS:
      state = {
        show: true,
        type: ToastType.SUCCESS,
        message: payload,
      };
      return state;
    case AuthActionType.RESET_PASSWORD_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: payload?.message,
      };
      return state;
    case MessageActionType.SHOW_MESSAGES_FAILURE:
      state = {
        show: true,
        type: ToastType.WARNING,
        message: payload?.message,
      };
      return state;
    case FileActionType.UPDATE_AVATAR_SUCCESS:
      state = {
        show: true,
        type: ToastType.SUCCESS,
        message: "Thay đổi avatar thành công",
      };
      return state;
    case ConversationActionType.ADD_USER_TO_CONVERSATION_FAILURE:
      state = {
        show: true,
        type: ToastType.ERROR,
        message: 'Không thể thêm người này vào cuộc trò chuyện'
      }
    default:
      return error;
  }
};

export default toastReducer;
