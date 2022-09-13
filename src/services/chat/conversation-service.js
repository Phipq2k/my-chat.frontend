import { apiURL } from "../../constants/api";
import api from "../api";


const showAllConversation = async() => {
    const res = await api.get(apiURL.chat.conversation.all);
    return res;
}

const addUserToConversation = async(newConversation) => {
    const res = await api.post(apiURL.chat.conversation.add_user, newConversation);
    return res;
}

export {
    showAllConversation,
    addUserToConversation
}