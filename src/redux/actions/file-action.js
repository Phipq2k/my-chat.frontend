import fileDownload from "js-file-download";
import {
    downloadFileMessage,
    sendFileMessage,
    uploadAvatar,
} from "../../services/helpers/file-service";
import fileDispatch from "../dispatchs/file-dispatch";
import messageDispatch from "../dispatchs/message-dispatch";

const sendMessageFile = (file, activeConversationId, onSendMessage) => {
    return async(dispatch) => {
        let formData = new FormData();
        formData.append("fileMessage", file);
        formData.append("conversationId", activeConversationId);
        try {
            const res = await sendFileMessage(formData);
            onSendMessage("onSendMessage", {
                chat_room: activeConversationId,
                content: res.data.file.filename,
            });
            fileDispatch.sendFileMessageDispatch(res.status, res.data.file)(dispatch);
            messageDispatch.createMessageActiveConversation(
                res.status,
                res.data.messageFile
            )(dispatch);
        } catch (err) {
            fileDispatch.sendFileMessageDispatch(err.status, err.data)(dispatch);
        }
    };
};

const downloadMessageFile = (filename) => {
    return async(dispatch) => {
        try {
            const res = await downloadFileMessage(filename);
            fileDownload(res.data.file, filename.split("-")[1]);
            fileDispatch.downloadMessageDispatch(res.status, res.data.file)(dispatch);
        } catch (err) {
            fileDispatch.downloadMessageDispatch(err.status, err.data)(dispatch);
        }
    };
};

const updateAvatarAction = (file, loading) => {
    return async(dispatch) => {
        let formData = new FormData();
        formData.append('avatar', file);
        try {
            const res = await uploadAvatar(formData);
            fileDispatch.sendFileAvatarDispatch(res.status, res.data)(dispatch);

        } catch (err) {
            console.log(err);
            fileDispatch.sendFileAvatarDispatch(err.status, err.data)(dispatch);
        }
    };
};

export { sendMessageFile, downloadMessageFile, updateAvatarAction };