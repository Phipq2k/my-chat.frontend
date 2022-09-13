import { apiURL } from "../../constants/api";
import api from "../api";
const sendFileMessage = async (message) => {
  const res = await api.post(apiURL.file.message.send, message, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

const downloadFileMessage = async (filename) => {
  const res = await api.get(apiURL.file.message.show + filename, {
    headers: {
      responseType: "blob",
    },
  });
  return res;
};

const uploadAvatar = async (avatar) => {
  const res = await api.post(apiURL.file.avatar.send, avatar, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

const getAvatar = async (avatarName) => {
  const res = await api.get(apiURL.file.avatar.show);
  console.log(res.data);
};

export { sendFileMessage, uploadAvatar, downloadFileMessage, getAvatar };
