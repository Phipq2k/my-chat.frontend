import AuthService from "../../services/auth/auth-service";
import { AuthActionType, LoadingActionType } from "../action-types";
import authDispatch from "../dispatchs/auth-dispatch";

const LoginAuthAction = (userLoginState, navigate, setLoading) => {
  return async (dispatch) => {
    await setLoading(true);
    try {
      const res = await AuthService.login(userLoginState);
      authDispatch.loginDispatch(res.status, res.data)(dispatch);
      navigate("/");
    } catch (err) {
      authDispatch.loginDispatch(err.status, err.data)(dispatch);
    }
    finally{
      await setLoading(false);
    }
  };
};

const RegisterAuthAction = (userRegisterState, navigate, setLoading) => {
  return async (dispatch) => {
    await setLoading(true);
    try {
      const res = await AuthService.register(userRegisterState);
      authDispatch.registerDispatch(res.status, res.data)(dispatch);
      navigate("/");
    } catch (err) {
      console.log(err);
      authDispatch.registerDispatch(err.status, err.data)(dispatch);
    }
    finally{
      await setLoading(false);
    }
  };
};

const LogoutAuthAction = (navigate) => {
  return async (dispatch) => {
    try {
      const res = await AuthService.logout();
      authDispatch.logoutDispatch(res.status, res.data)(dispatch);
      navigate("/sign-in");
    } catch (err) {
      authDispatch.logoutDispatch(err.status, err.data)(dispatch);
    }
  };
};

const ForgotPasswordAuthAction = (userForgotPasswordState, navigate, setLoading) => {
  return async (dispatch) => {
    await setLoading(true);
    try {
      const res = await AuthService.forgotPassword(userForgotPasswordState);
      authDispatch.forgotPasswordDispatch(res.status, res.data)(dispatch);
      navigate("/sign-in");
    } catch (err) {
      await dispatch({
        type: LoadingActionType.SUBMITING,
        payload: true,
      });
      authDispatch.forgotPasswordDispatch(err.status, err.data)(dispatch);
    } finally {
      await setLoading(false);
    }
  };
};

const ResetPasswordAuthAction = (userResetPasswordState, navigate, setLoading) => {
  return async (dispatch) => {
    await setLoading(true);
    try {
      const res = await AuthService.resetPassword(userResetPasswordState);
      authDispatch.resetPasswordDispatch(res.status, res.data)(dispatch);
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
      authDispatch.resetPasswordDispatch(err.status, err.data)(dispatch);
    }
    finally{
      await setLoading(false);
    }
  };
};

export {
  RegisterAuthAction,
  LoginAuthAction,
  AuthActionType,
  LogoutAuthAction,
  ForgotPasswordAuthAction,
  ResetPasswordAuthAction,
};
