import { apiURL } from "../../constants/api";
import api from "../api";
import TokenService from "./token-service";
const register = async (registerInfo) => {
    const res = await api.post(apiURL.authentication.register,registerInfo);
    if(res.data['access_token']){
        TokenService.setUser(res.data);
    }
    return res;
};
const login = async (loginInfo) => {
    const res =  await api.post(apiURL.authentication.login,loginInfo);
    if(res.data['access_token']){
        TokenService.setUser(res.data);
    }
    return res;
};

const logout = async () => {
  const res =  await api.post(apiURL.authentication.logout);
  TokenService.removeUser();
  return res;
};

const forgotPassword = async (forgotPasswordInfo) => {
    const res = await api.post(apiURL.authentication.forgot_password, forgotPasswordInfo);
    return res;
}

const resetPassword = async (resetPasswordInfo) => {
    const res = await api.post(apiURL.authentication.reset_password, resetPasswordInfo);
    return res;
}

const AuthService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
}
export default AuthService;
