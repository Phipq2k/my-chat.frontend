import { link } from "../constants/link";
import { AiFillCamera } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import validationUpdateProfile from "../helpers/validation-upate-profile";
import UploadFile from "./UploadFile";
import { connect } from "react-redux";
import { updateAvatarAction } from "../redux/actions/file-action";
import { apiURL } from "../constants/api";

function Profile({ user,onUpdate, ...props }) {
  const { updateAvatar} = props;
  const [currentUser, setCurrentUser] = useState(user);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (disabled) {
      setValues({
        user_name: user.user_name,
        user_email: user.user_email,
      });
      setErrorsValidation({});
    }
  }, [disabled, user]);
  const initialState = {
    user_name: currentUser.user_name,
    user_email: currentUser.user_email,
  };

  const handleEnableInput = (e) => {
    setDisabled(false);
  };

  const handleCancelUpdateProfile = () => {
    const { user_name, user_email } = currentUser;
    if (
      user_name === values.user_name.trim() &&
      user_email === values.user_email.trim()
    ) {
      return setDisabled(true);
    } else {
      window.confirm("Hủy thay đổi?") && setDisabled(true);
    }
  };

  const handleUploadAvatar = (file) => {
    updateAvatar(file);
  };

  const handleSubmitUpdateProfile = () => {
    const { user_name, user_email } = currentUser;
    if (
        user_name === values.user_name.trim() &&
        user_email === values.user_email.trim()
      ) {
        return setDisabled(true);
      }
      else{
        onUpdate(values, setDisabled);
      }
  };
  const {
    handleChange,
    values,
    handleSubmit,
    errorsValidation,
    loading,
    setValues,
    setErrorsValidation,
  } = useForm({
    validate: validationUpdateProfile,
    initialState,
    eventSubmit: handleSubmitUpdateProfile,
  });

  return (
    <div className="profileContainer">
      <div className="introProfile">
        <div className="avatarProfile">
          <img
            src={
              currentUser.user_avatar
                ? `${apiURL.default}${apiURL.file.avatar.show}${currentUser.user_avatar}`
                : link.images + "ricado1.jpg"
            }
            alt=""
          />
          <div className="changeAvatarProfile" title="Thay đổi ảnh">
            <UploadFile
              types={["jpg", "png"]}
              onUpload={handleUploadAvatar}
              htmlFor="chooseAvatar"
            >
              <AiFillCamera />
            </UploadFile>
          </div>
        </div>
      </div>
      <div className="infoProfile">
        <form
          id="updateProfile"
          onSubmit={handleSubmit}
          className="updateProfileForm"
        >
          <div className="formUpdateProfileInput">
            <span className="profileInfoLabel">
              <label htmlFor="user_name">Họ và tên:</label>
            </span>
            <span
              className={`profileInfoInput ${!disabled && "openChangeInput"}`}
            >
              <textarea
                maxLength="255"
                onChange={handleChange}
                disabled={disabled}
                id="user_name"
                value={values.user_name}
                name="user_name"
                type="text"
                placeholder="Nhập tên"
              />
            </span>
          </div>
          <p className="errorUpdateProfile">
            {!disabled && errorsValidation.user_name}
          </p>
          <div className="formUpdateProfileInput">
            <span className="profileInfoLabel">
              <label htmlFor="user_email">Email:</label>
            </span>
            <span
              className={`profileInfoInput ${!disabled && "openChangeInput"}`}
            >
              <textarea
                onChange={handleChange}
                disabled={disabled}
                value={values.user_email}
                id="user_email"
                name="user_email"
                type="text"
                placeholder="Nhập email"
                //   value="tranquocphipq@gmail.com"
              />
            </span>
          </div>
          <p className="errorUpdateProfile">
            {!disabled && errorsValidation.user_email}
          </p>
          <>
            {!disabled && (
              <div className="formUpdateProfileOption">
                <button type="submit" className="submitUpdateProfile">
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={handleCancelUpdateProfile}
                  className="cancelUpdateProfile"
                >
                  Hủy
                </button>
              </div>
            )}
          </>
        </form>
        <>
          {disabled && (
            <button
              className="changeProfileButton"
              onClick={handleEnableInput}
              title="Thay đổi thông tin"
            >
              <BsFillPenFill />
            </button>
          )}
        </>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    file: state.fileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAvatar: (file) => {
      dispatch(updateAvatarAction(file));
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
