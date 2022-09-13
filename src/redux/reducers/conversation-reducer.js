import { ConversationActionType } from "../action-types";

const conversationState = [];

const conversationReducer = (state = conversationState, action) => {
    switch (action.type) {
        case ConversationActionType.SHOW_CONVERSATIONS_SUCCESS:
            return action.payload;
        case ConversationActionType.ADD_USER_TO_CONVERSATION_SUCCESS:
            return [state, ...action.payload];
        default:
            return state;
    }
};

export default conversationReducer;