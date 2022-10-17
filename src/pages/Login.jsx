import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { images } from "../constants/link";
import { LoginAuthAction } from "../redux/actions/auth-action";
import { useForm } from "../hooks/useForm";
import { ThreeDots } from "react-loader-spinner";
import validationLogin from "../helpers/validation-login";

function LoginPage(props) {
  const { login } = props;
  const navigate = useNavigate();
  const initialState = {
    user_email: "",
    user_password: "",
  };
  const [passwordShowned, setPasswordShowned] = useState(false);
  const { handleChange, values, handleSubmit, errorsValidation, loading } =
    useForm({ validate: validationLogin, initialState, eventSubmit: login, navigate });

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleTogglePasswordVisibility = () => {
    setPasswordShowned(!passwordShowned);
  };

  return (
    <React.Fragment>
      <div className="formContainer">
        <div className="form">
          <img src={images + "logo-resize.png"} alt="logo" />
          <form id="login" className="loginForm" onSubmit={handleSubmit}>
            <div className="formInput">
              <label htmlFor="userEmail">
                <MdMail />
              </label>{" "}
              <input
                type="text"
                id="userEmail"
                values={values.user_email}
                onChange={handleChange}
                name="user_email"
                placeholder="Email"
              />{" "}
            </div>{" "}
            {errorsValidation.user_email && (
              <p className="textError"> {errorsValidation.user_email} </p>
            )}{" "}
            <div className="formInput">
              <label htmlFor="userPassword">
                <FaLock />
              </label>{" "}
              <input
                id="userPassword"
                type={!passwordShowned ? "password" : "text"}
                value={values.user_password}
                placeholder="Mật khẩu"
                name="user_password"
                onChange={handleChange}
              />{" "}
              {passwordShowned ? (
                <AiFillEyeInvisible
                  title="Ẩn mật khẩu"
                  onClick={handleTogglePasswordVisibility}
                  className="icon"
                />
              ) : (
                <AiFillEye
                  title="Hiện mật khẩu"
                  onClick={handleTogglePasswordVisibility}
                  className="icon"
                />
              )}{" "}
            </div>{" "}
            {errorsValidation.user_password && (
              <p className="textError"> {errorsValidation.user_password} </p>
            )}{" "}
            {loading ? (
              <ThreeDots
                wrapperStyle={{ padding: "5px 0" }}
                color="#48A6DF"
                height={20}
                width={"100%"}
              />
            ) : (
              <button> Đăng nhập </button>
            )}{" "}
            <p className="messageForm">
              Bạn chưa có tài khoản ?
              <span onClick={() => navigate("/sign-up")} className="link">
                Đăng ký{" "}
              </span>{" "}
              <span
                className="link"
                onClick={() =>
                  navigate("/forgot-password", {
                    replace: true,
                    state: { user_email: values.user_email },
                  })
                }
                style={{ display: "block" }}
              >
                Quên mật khẩu ?
              </span>{" "}
            </p>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userLoginState, navigate, setLoading) => {
      dispatch(LoginAuthAction(userLoginState, navigate, setLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
