import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RegisterAuthAction } from "../redux/actions/auth-action";
import { useForm } from "../hooks/useForm";
import { ThreeDots } from "react-loader-spinner";
import validationRegister from "../helpers/validation-register";
import { useEffect, useState } from "react";

function RegisterPage(props) {
  const navigate = useNavigate();
  const { signUp } = props;
  const initialState = {
    user_name: "",
    user_email: "",
    user_password: "",
    user_confirm_password: "",
    user_avatar: "",
  };
  const [passwordShowned, setPasswordShowned] = useState(false);
  const [confirmPasswordShowned, setConfirmPasswordShowned] = useState(false);
  const { handleChange, values, handleSubmit, errorsValidation, loading } =
    useForm({
      validate: validationRegister,
      initialState,
      eventSubmit: signUp,
      navigate,
    });

  const handleTogglePasswordVisibility = () => {
    setPasswordShowned(!passwordShowned);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShowned(!confirmPasswordShowned);
  };

  useEffect(() => {
    document.title = "Đăng ký";
  });

  return (
    <div className="formContainer">
      <div className="form">
        <h2 className="textTitle"> Tạo tài khoản </h2>{" "}
        <form onSubmit={handleSubmit}>
          <input
            id="userAvatar"
            type="hidden"
            name="user_avatar"
            onChange={handleChange}
            value={values.user_avatar}
          />
          <div className="formInput">
            <label htmlFor="userName">
              {" "}
              <FaUser />{" "}
            </label>{" "}
            <input
              id="userName"
              type="text"
              name="user_name"
              onChange={handleChange}
              value={values.user_name}
              placeholder="Họ và tên"
            />
          </div>{" "}
          {errorsValidation.user_name && (
            <p className="textError"> {errorsValidation.user_name} </p>
          )}{" "}
          <div className="formInput">
            <label htmlFor="userEmail">
              <MdEmail />
            </label>{" "}
            <input
              id="userEmail"
              type="text"
              name="user_email"
              onChange={handleChange}
              value={values.user_email}
              placeholder="Email"
            />
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
              name="user_password"
              value={values.user_password}
              placeholder="Mật khẩu"
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
          <div className="formInput">
            <label htmlFor="userConfirmPassword">
              <BsFillShieldLockFill />
            </label>{" "}
            <input
              id="userConfirmPassword"
              type={!confirmPasswordShowned ? "password" : "text"}
              name="user_confirm_password"
              value={values.user_confirm_password}
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
            />{" "}
            {confirmPasswordShowned ? (
              <AiFillEyeInvisible
                title="Ẩn mật khẩu"
                onClick={handleToggleConfirmPasswordVisibility}
                className="icon"
              />
            ) : (
              <AiFillEye
                title="Hiện mật khẩu"
                onClick={handleToggleConfirmPasswordVisibility}
                className="icon"
              />
            )}{" "}
          </div>{" "}
          {errorsValidation.user_confirm_password && (
            <p className="textError">
              {" "}
              {errorsValidation.user_confirm_password}{" "}
            </p>
          )}{" "}
          {loading ? (
            <ThreeDots
              wrapperStyle={{ padding: "5px 0" }}
              color="#48A6DF"
              height={20}
              width={"100%"}
            />
          ) : (
            <button>Đăng ký</button>
          )}
          <p className="messageForm">
            Bạn đã có tài khoản ?
            <span onClick={() => navigate("/sign-in")} className="link">
              Đăng nhập{" "}
            </span>{" "}
          </p>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (userSignUpState, navigate, setLoading) => {
      dispatch(RegisterAuthAction(userSignUpState, navigate, setLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
