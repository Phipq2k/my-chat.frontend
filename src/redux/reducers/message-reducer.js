import { MessageActionType } from "../action-types";

const initialState = [];


const messageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case MessageActionType.SHOW_MESSAGES_SUCCESS:
            return payload;
        case MessageActionType.SEND_MESSAGE_SUCCESS:
            return [...state, payload];
        default:
            return state;
    }
};

export default messageReducer;