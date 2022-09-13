import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./components/AuthRouter";
import PrivateRouter from "./components/PrivateRouter";
import Toast from "./components/Toast";
import wsNamespace from "./constants/ws";
import { useWebsocket } from "./hooks/useWebsocket";
import ForgotPasswordPage from "./pages/ForgotPassword";
import LoginPage from "./pages/Login";
import ResetPasswordPage from "./pages/ResetPassword";
import RegisterPage from "./pages/Register";
import { routers } from "./router";
import "./scss/main.scss";

function App(props) {
  const { auth, toast } = props;
  const ws = useWebsocket(
    {
      connectAddress: wsNamespace.home,
      condition: auth.isLogined,
    },
    {
      extraHeaders: {
        Authorization: auth.message.user_id,
      },
    }
  );

  return (
    <div className="App">
      {toast.show && <Toast type={toast.type} toast={toast} />}{" "}
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PrivateRouter websocket={ws} isLogined={auth.isLogined} />
            }
          >
            {routers.map((router, index) => {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={router.element}
                />
              );
            })}{" "}
          </Route>{" "}
          <Route element={<AuthRouter isLogined={auth.isLogined} />}>
            <Route path="/sign-in" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<RegisterPage />}></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            ></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toast: state.toastReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps)(App);
