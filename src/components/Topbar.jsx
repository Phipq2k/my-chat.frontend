// import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { LogoutAuthAction } from "../redux/actions/auth-action";

function Topbar(props) {
  //   const { user } = useContext(AuthContext);
  //   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { logout } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"> MyChat </span>{" "}
        </Link>{" "}
      </div>{" "}
      <div className="topbarCenter">
        <div className="searchbar">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Tìm kiếm bạn bè theo sdt"
            className="searchInput"
          />
        </div>{" "}
      </div>{" "}
      <div className="topbarRight">
        <div className="topbarLink">
          <span className="topbarLinks isActive"> Trang chủ </span>{" "}
          <span onClick={handleLogout} className="topbarLinks">
            Đăng xuất{" "}
          </span>{" "}
        </div>{" "}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsFillPersonFill />
            <span className="topbarIconBadge"> 1 </span>{" "}
          </div>{" "}
          <div className="topbarIconItem">
            <BsFillChatLeftTextFill />
            <span className="topbarIconBadge"> 2 </span>{" "}
          </div>{" "}
          <div className="topbarIconItem">
            <IoIosNotifications />
            <span className="topbarIconBadge"> 1 </span>{" "}
          </div>{" "}
        </div>{" "}
        <Link to={`/profile/ok`}>
          <img
            src={
              "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
            }
            alt=""
            className="topbarImg"
          />
        </Link>{" "}
      </div>{" "}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (navigate) => {
      dispatch(LogoutAuthAction(navigate));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
