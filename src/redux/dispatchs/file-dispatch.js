import { FileActionType } from "../action-types";

class FileDispatch {
    sendFileMessageDispatch(statusCode, payload) {
        const type =
            (statusCode === 201 && FileActionType.SEND_FILE_SUCCESS) ||
            FileActionType.SEND_FILE_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    sendFileAvatarDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && FileActionType.UPDATE_AVATAR_SUCCESS) ||
            FileActionType.UPDATE_AVATAR_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    downloadMessageDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 && FileActionType.DOWNLOAD_FILE_SUCCESS) ||
            FileActionType.DOWNLOAD_FILE_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }
}

export default new FileDispatch();