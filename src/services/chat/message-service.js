import { apiURL } from '../../constants/api';
import api from '../api';

const showAllMessagesInActiveConversation = async(activeConversationId) => {
    const res = await api.get(apiURL.chat.chat_message.all + activeConversationId);
    return res;
}

const createMessage = async(message) => {
    const res = await api.post(apiURL.chat.chat_message.new, message);
    return res;
}

export {
    showAllMessagesInActiveConversation,
    createMessage
}