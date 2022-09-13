import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import validationResetPassword from "../helpers/validation-reset-password";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ResetPasswordAuthAction } from "../redux/actions/auth-action";

function ResetPasswordPage(props) {
  const { resetPassword } = props;
  const navigate = useNavigate();
  const { token } = useParams();
  const [passwordShowned, setPasswordShowned] = useState(false);
  const [confirmPasswordShowned, setConfirmPasswordShowned] = useState(false);
  const initialState = {
    user_password: "",
    user_confirm_password: "",
    token,
  };
  const { handleChange, values, handleSubmit, errorsValidation, loading } =
    useForm({
      validate: validationResetPassword,
      initialState,
      eventSubmit: resetPassword,
      navigate,
    });

  useEffect(() => {
    document.title = "Thay đổi mật khẩu";
  });

  const handleTogglePasswordVisibility = () => {
    setPasswordShowned(!passwordShowned);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShowned(!confirmPasswordShowned);
  };
  return (
    <div className="formContainer">
      <div className="form">
        <h2 className="textTitle"> Thay đổi mật khẩu </h2>{" "}
        <form className="resetPasswordForm" onSubmit={handleSubmit}>
          <input type="hidden" value={values.token} onChange={handleChange} />
          <div className="formInput">
            <label htmlFor="userPassword">
              <FaLock />
            </label>
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
            </label>
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
            <button> Gửi </button>
          )}
        </form>{" "}
      </div>{" "}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (userResetPasswordState, navigate, setLoading) => {
      dispatch(
        ResetPasswordAuthAction(userResetPasswordState, navigate, setLoading)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
