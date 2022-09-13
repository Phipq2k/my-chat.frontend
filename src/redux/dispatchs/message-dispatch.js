import { MessageActionType } from "../action-types";

class MessageDispatch {
    getAllMessagesActiveConversation(statusCode, payload) {
        const type =
            (statusCode === 200 && MessageActionType.SHOW_MESSAGES_SUCCESS) ||
            MessageActionType.SHOW_MESSAGES_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    createMessageActiveConversation(statusCode, payload) {
        const type =
            (statusCode === 201 && MessageActionType.SEND_MESSAGE_SUCCESS) ||
            MessageActionType.SEND_MESSAGE_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        }
    }
}

export default new MessageDispatch();