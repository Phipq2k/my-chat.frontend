import { apiURL } from '../../constants/api';
import api from '../api';

const getCurrentUser = async() => {
    const res = await api.get(apiURL.user.get_my);
    return res.data;
}

const searchUsers = async(keyword) => {
    const res = await api.get(apiURL.user.search + keyword);
    return res;
}

const updateUser = async(updateInfo) => {
    const res = await api.patch(apiURL.user.update, updateInfo);
    return res;
}

export {
    getCurrentUser,
    searchUsers,
    updateUser
}