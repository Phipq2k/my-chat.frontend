import { FileActionType } from "../action-types";

const initialState = {
    filename: "",
    type: "",
    ext: "",
};

const fileState = (file) => {
    const type = file.mimetype.split("/")[0];
    const ext = file.filename.split(".")[1];
    return {
        filename: file.filename,
        type,
        ext,
    };
};

const fileReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FileActionType.SEND_FILE_SUCCESS:
            return fileState(payload);
        case FileActionType.DOWNLOAD_FILE_SUCCESS:
            return fileState;
        case FileActionType.UPDATE_AVATAR_SUCCESS:
            return fileState(payload);
        default:
            return state;
    }
};
export default fileReducer;