import { ConversationActionType } from "../action-types";

class ConversationDispatch {
    getAllConversationsDispatch(statusCode, payload) {
        const type =
            (statusCode === 200 &&
                ConversationActionType.SHOW_CONVERSATIONS_SUCCESS) ||
            ConversationActionType.SHOW_CONVERSATIONS_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }

    addUserToConversationDispatch(statusCode, payload) {
        const type =
            (statusCode === 201 &&
                ConversationActionType.ADD_USER_TO_CONVERSATION_SUCCESS) ||
            ConversationActionType.ADD_USER_TO_CONVERSATION_FAILURE;
        return (dispatch) => {
            dispatch({ type, payload });
        };
    }
}

export default new ConversationDispatch();