import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { MdMail } from "react-icons/md";
import { useForm } from "../hooks/useForm";
import validationForgotPassword from "../helpers/validation-forgot-password";
import { ForgotPasswordAuthAction } from "../redux/actions/auth-action";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

function ForgotPasswordPage(props) {
  const { forgotPassword } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = {
    user_email: location.state.user_email,
  };
  const { handleChange, values, handleSubmit, errorsValidation, loading } =
    useForm({
      validate: validationForgotPassword,
      initialState,
      eventSubmit: forgotPassword,
      navigate,
    });

  useEffect(() => {
    document.title = "Xác nhận email";
  }, []);
  return (
    <div className="formContainer">
      <div className="form">
        <h2> Xác nhận email </h2>{" "}
        <form className="forgotPasswordForm" onSubmit={handleSubmit}>
          <div className="formInput">
            <label htmlFor="userEmail">
              {" "}
              <MdMail />{" "}
            </label>{" "}
            <input
              id="userEmail"
              type="text"
              value={values.user_email}
              onChange={handleChange}
              name="user_email"
              placeholder="Email"
            />{" "}
          </div>{" "}
          {errorsValidation.user_email && (
            <p className="textError"> {errorsValidation.user_email} </p>
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
          <p className="messageForm">
            Bạn nhớ mật khẩu ?
            <span onClick={() => navigate("/sign-in")} className="link">
              {" "}
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
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (userForgotPasswordState, navigate, setLoading) => {
      dispatch(
        ForgotPasswordAuthAction(userForgotPasswordState, navigate, setLoading)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
