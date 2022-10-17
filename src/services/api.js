import axios from "axios";
import { apiURL } from "../constants/api";
import TokenService from "./auth/token-service";

const instance = axios.create({
    baseURL: apiURL.default,
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            if (
                config.url.indexOf(apiURL.authentication.login) >= 0 ||
                config.url.indexOf(apiURL.authentication.refresh_token) >= 0 ||
                config.url.indexOf(apiURL.authentication.register) >= 0 ||
                config.url.indexOf(apiURL.authentication.forgot_password) >= 0 ||
                config.url.indexOf(apiURL.authentication.reset_password) >= 0
            ) {
                return config;
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async(err) => {
        const originalConfig = err.config;
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                if (err.config.url === apiURL.authentication.refresh_token) {
                    const confirmUnAuth = window.confirm('Phiên đăng nhập của bạn đã hết hạn');
                    if (confirmUnAuth) {
                        TokenService.removeUser();
                        window.location.reload();
                    }
                    if (confirmUnAuth === false) {
                        window.location.reload();
                    }
                } else {
                    const token = TokenService.getLocalRefreshToken();
                    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const rs = await instance.post(apiURL.authentication.refresh_token);
                    const { access_token } = rs.data;
                    TokenService.updateLocalAccessToken(access_token);
                    return instance(originalConfig);
                }
            } catch (_error) {
                return Promise.reject(_error);
            }
        }
        return Promise.reject(err.response);
    }
);

export default instance;