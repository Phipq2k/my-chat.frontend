import {
    createMessage,
    showAllMessagesInActiveConversation,
} from "../../services/chat/message-service";
import { sendFileMessage } from "../../services/helpers/file-service";
import messageDispatch from "../dispatchs/message-dispatch";

const showAllMessagesActiveConversation = (conversationId) => {
    return async(dispatch) => {
        try {
            const res = await showAllMessagesInActiveConversation(conversationId);
            messageDispatch.getAllMessagesActiveConversation(
                res.status,
                res.data
            )(dispatch);
        } catch (err) {
            messageDispatch.getAllMessagesActiveConversation(
                err.status,
                err.data
            )(dispatch);
        }
    };
};

const sendMessageActiveConversation = (message, onSendMessage) => {
    return async(dispatch) => {
        try {
            const res = await createMessage(message);
            onSendMessage("onSendMessage", {
                chat_room: res.data.chat_room._id.toString(),
                content: res.data,
            });
            messageDispatch.createMessageActiveConversation(
                res.status,
                res.data
            )(dispatch);
            console.log(message);
        } catch (err) {
            console.log(err);
            messageDispatch.createMessageActiveConversation(
                err.status,
                err.data
            )(dispatch);
        }
    };
};

const sendFileMessageActiveConversation = (file, activeConversationId) => {
    return async(dispatch) => {
        let formData = new FormData();
        formData.append("fileMessage", file);
        formData.append("conversationId", activeConversationId);
        try {
            const res = await sendFileMessage(formData);
            messageDispatch.createMessageActiveConversation(
                res.status,
                res.data
            )(dispatch);
        } catch (err) {
            console.log(err);
            messageDispatch.createMessageActiveConversation(
                err.status,
                err.data
            )(dispatch);
        }
    };
};

export {
    showAllMessagesActiveConversation,
    sendMessageActiveConversation,
    sendFileMessageActiveConversation,
};