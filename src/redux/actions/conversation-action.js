import {
    addUserToConversation,
    showAllConversation,
} from "../../services/chat/conversation-service";
import conversationDispatch from "../dispatchs/conversation-dispatch";

const ShowConversationsAction = () => {
    return async(dispatch) => {
        const res = await showAllConversation();
        try {
            conversationDispatch.getAllConversationsDispatch(
                res.status,
                res.data
            )(dispatch);
        } catch (err) {
            console.log(err);
            conversationDispatch.getAllConversationsDispatch(
                err.status,
                err.data
            )(dispatch);
        }
    };
};

const addUserToConversationAction = (
    newConversation,
    onSendMessage,
    setConversation,
    setPartner
) => {
    return async(dispatch) => {
        try {
            const res = await addUserToConversation(newConversation);
            onSendMessage("onAddUserToConversation", {
                partnerId: newConversation.partnerId,
                conversationId: res.data._id.toString(),
            });
            setConversation(res.data);
            setPartner({ isFriend: true, ...newConversation.partnerId });
            conversationDispatch.addUserToConversationDispatch(
                res.status,
                res.data
            )(dispatch);
        } catch (err) {
            conversationDispatch.addUserToConversationDispatch(
                err.status,
                err.data
            )(dispatch);
        }
    };
};

export { ShowConversationsAction, addUserToConversationAction };