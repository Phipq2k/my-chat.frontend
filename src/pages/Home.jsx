import Conversation from "../components/Conversation";
import React, { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import {
  AiFillFileAdd,
  AiFillCaretDown,
  AiFillCheckCircle,
  AiFillCaretUp,
  AiFillEye,
  AiFillSetting,
} from "react-icons/ai";
import { SiAdguard } from "react-icons/si";
import {
  RiEmotionHappyFill,
  RiProfileFill,
  RiLockPasswordFill,
} from "react-icons/ri";
import {
  MdCall,
  MdLanguage,
  MdLocalGroceryStore,
  MdPrivacyTip,
} from "react-icons/md";
import { BiTask, BiLogOut } from "react-icons/bi";
import {
  BsCameraVideoFill,
  BsMoonStarsFill,
  BsFillSunFill,
  BsThreeDots,
} from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import Message from "../components/Message";
import { connect } from "react-redux";
import {
  addUserToConversationAction,
  ShowConversationsAction,
} from "../redux/actions/conversation-action";
import {
  sendMessageActiveConversation,
  showAllMessagesActiveConversation,
} from "../redux/actions/message-action";
import { useNavigate, useOutletContext } from "react-router-dom";
import File from "../components/File";
import { sendMessageFile } from "../redux/actions/file-action";
import { defaultAvatar } from "../constants/link";
import { useTimeStamp } from "../hooks/useTimeStamp";
import AutoComplete from "../components/AutoComplete";
import { apiURL } from "../constants/api";
import { getCurrentUser, updateUser } from "../services/user/user-service";
import { LogoutAuthAction } from "../redux/actions/auth-action";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import Profile from "../components/Profile";
import AddUserToConversation from "../components/AddUserToConversation";

function HomePage(props) {
  useRef((document.title = "Trang chủ"));
  const scrollRef = useRef();
  const {
    auth,
    file,
    conversations,
    messages,
    getAllConversations,
    getAllMessagesActiveConversation,
    sendMessageActiveConversation,
    sendFileMessageActiveConversation,
    logout,
    addUserToConversation,
  } = props;
  const navigator = useNavigate();
  const checkRef = useRef();

  const [my, setMy] = useState(null);
  const [activeConversationstate, setActiveConversationState] = useState(null);
  const [newMessageState, setNewMessageState] = useState("");
  const [keywordSearchUser, setKeywordSearchUser] = useState("");
  const [listenMessage, setListenMessage] = useState(null);
  const [focusWindow, setFocusWindow] = useState(true);
  const [seen, setSeen] = useState([]);
  const [fileState, setFileState] = useState(null);
  const [partner, setPartner] = useState(null);
  const { sendMessage, receiveMessage } = useOutletContext();
  const { timeFromNow } = useTimeStamp(partner?.updatedAt);
  const [displayToggleMenu, setDisplayToggleMenu] = useState(false);
  const [displayToggleDarkMode, setDisplayToggleDarkMode] = useState(false);
  const [isShowingProfile, toggleProfile] = useModal();
  const [isShowingAddfriendBox, toggleAddfriendBox] = useModal();

  //Todo:Get current user
  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setMy(user);
    })();
  }, [file, my]);

  //Todo: Show all messages in the active conversation
  useEffect(() => {
    if (activeConversationstate?._id.toString()) {
      getAllMessagesActiveConversation(activeConversationstate._id.toString());
    }
  }, [
    activeConversationstate,
    getAllMessagesActiveConversation,
    sendMessage,
    listenMessage,
  ]);

  useEffect(() => {
    if (focusWindow && activeConversationstate?._id.toString()) {
      sendMessage("onSeenMessage", activeConversationstate?._id.toString());
    }
  }, [
    listenMessage,
    activeConversationstate,
    sendMessage,
    messages,
    focusWindow,
  ]);

  useEffect(() => {
    setNewMessageState("");
    setFileState(null);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    receiveMessage("emitSendMessage", (data) => {
      setListenMessage(data);
    });
    receiveMessage("emitAddUserToConversation", (data) => {
      setListenMessage(data);
    });
  }, [messages, sendMessage, receiveMessage]);

  useEffect(() => {
    receiveMessage("emitSeenMessage", (data) => {
      if (data) {
        setSeen(data);
      } else {
        setSeen([]);
      }
    });
  }, [sendMessage, receiveMessage]);

  useEffect(() => {
    window.addEventListener("blur", handleBlurWindow);
    window.addEventListener("focus", handleFocusWindow);
  });

  //Todo: Get conversations list
  useEffect(() => {
    getAllConversations();
  }, [auth.message.user_id, getAllConversations, listenMessage]);

  const handleActiveConversation = (conversation, activeUser) => {
    return () => {
      setPartner(activeUser);
      setActiveConversationState(conversation);
    };
  };

  const handleChangeSearchUser = () => {
    return (e) => {
      setKeywordSearchUser(e.target.value);
    };
  };

  const handleActiveUser = (user, isFriend) => {
    return (e) => {
      setKeywordSearchUser("");
      setPartner({ isFriend, ...user });
      if (isFriend) {
        const friend = conversations.find((conversation) =>
          !!conversation.participants.find(
            (participant) => participant._id.toString() === user._id.toString()
          )
        );
        setActiveConversationState(friend);
      }
      else{
        setActiveConversationState(null);
      }
    };
  };

  const handleChangeMessage = () => {
    return (e) => {
      const { value } = e.target;
      setNewMessageState(value);
    };
  };

  const handleSendMessage = () => {
    return (e) => {
      if (newMessageState) {
        sendMessageActiveConversation(
          {
            chat_room: activeConversationstate?._id.toString(),
            message: newMessageState,
          },
          sendMessage
        );
      }
      if (fileState) {
        sendFileMessageActiveConversation(
          fileState,
          activeConversationstate._id.toString(),
          sendMessage
        );
      }
    };
  };

  const handleChangeFile = () => {
    return (e) => {
      const selectedFile = e.target.files[0];
      setFileState(selectedFile);
    };
  };

  const handleBlurWindow = (e) => {
    setFocusWindow(false);
  };

  const handleFocusWindow = (e) => {
    setFocusWindow(true);
  };

  const handleCall = () => {
    alert("Call");
  };

  const handleVideoCall = () => {
    alert("Video call");
  };

  const handleMessagesSetting = () => {
    alert("Setting");
  };

  const handleShowEmoji = () => {
    return (e) => {
      alert("Emoji");
    };
  };

  //Todo: handle setting
  const handleSetting = () => {
    return () => {
      alert("Setting");
    };
  };

  //Todo: handle update profile
  const handleUpdateProfile = (updateInfo, setDisabled) => {
    updateUser(updateInfo)
      .then((res) => {
        setMy(res.data);
        setDisabled(true);
      })
      .catch((err) => {
        window.alert(err.data.message);
      });
  };

  //Todo: handle move to store
  const handleMoveToStore = () => {
    return () => {
      window.open("https://robertphi.shop");
    };
  };

  //Todo: Toggle Menu
  const handleToggleMenu = () => {
    return () => {
      setDisplayToggleMenu(!displayToggleMenu);
    };
  };

  const handleToggleDarkMode = () => {
    return () => {
      if (checkRef?.current?.checked) {
        setDisplayToggleDarkMode(true);
      } else {
        setDisplayToggleDarkMode(false);
      }
    };
  };

  const handleLogout = () => {
    return (e) => {
      window.confirm("Bạn có chắc là muốn đăng xuất không?") &&
        logout(navigator);
    };
  };

  const handleAddUserToConversation = (message, userAdding) => {
    return (e) => {
      if (message) {
        addUserToConversation(
          {
            partnerId: userAdding._id.toString(),
            message: message,
          },
          sendMessage,
          setActiveConversationState,
          setPartner
        );

        toggleAddfriendBox();
      } else {
        window.alert("Vui lòng nhập lời chào");
      }
    };
  };

  return (
    <React.Fragment>
      <div className="mainContainer">
        <Modal
          isShowing={isShowingProfile}
          hide={toggleProfile}
          element={<Profile onUpdate={handleUpdateProfile} user={my} />}
          title="Hồ sơ cá nhân"
          width="50%"
          height="auto"
        />
        <div className="chatMenu">
          <div className="chatSearch">
            <FaSearch className="chatSearchIcon" />
            <input
              type="text"
              placeholder="Tìm kiếm bạn bè"
              className="chatSearchInput"
              value={keywordSearchUser}
              onChange={handleChangeSearchUser()}
            />
          </div>
          <div className="userModal">
            <AutoComplete keyword={keywordSearchUser} type="users">
              {(user) => {
                const isFriend = conversations.some((conversations) =>
                  conversations.participants.some(
                    (participant) =>
                      participant._id.toString() === user._id.toString()
                  )
                );
                return (
                  <div
                    className="userAutocomplete"
                    onClick={handleActiveUser(user, isFriend)}
                  >
                    <div className="userAutoAvatar">
                      <img
                        src={
                          user.user_avatar
                            ? `${apiURL.default}${apiURL.file.avatar.show}${user.user_avatar}`
                            : defaultAvatar
                        }
                        alt={user.user_name}
                      />
                    </div>
                    <div className="userAutoText">
                      <div className="userAutoName">{user.user_name}</div>
                      <div className="userAutoEmail">{user.user_email}</div>
                    </div>
                    <div>{isFriend ? "Bạn bè" : "Người lạ"}</div>
                  </div>
                );
              }}
            </AutoComplete>
          </div>
          <div
            className={`chatMenuWrapper ${
              displayToggleMenu && "displayHidden"
            }`}
          >
            {conversations.map((conversation, index) => {
              const friend = conversation.participants.filter(
                (participant) =>
                  participant._id.toString() !== auth.message.user_id
              )[0];
              return (
                <Conversation
                  active={
                    activeConversationstate?._id.toString() ===
                    conversation._id.toString()
                  }
                  handleClick={handleActiveConversation(conversation, {
                    isFriend: true,
                    ...friend,
                  })}
                  currentUserId={auth.message.user_id}
                  partner={{ isFriend: true, ...friend }}
                  key={index}
                  conversation={conversation}
                />
              );
            })}
          </div>
          <div
            className={`chatMenuSetting ${displayToggleMenu && "toggleMenuUp"}`}
            onClick={handleToggleMenu()}
          >
            <span
              className="settingItem"
              onClick={handleSetting()}
              title="Cài đặt"
            >
              <AiFillSetting />
            </span>
            <span className="settingItem" title="Quản lý công việc">
              <BiTask />
            </span>
            <span
              className="settingItem"
              onClick={handleMoveToStore()}
              title="Mua sắm trực tuyến"
            >
              <MdLocalGroceryStore />
            </span>
            <div className="toggleArrow">
              {displayToggleMenu ? (
                <AiFillCaretDown title="Thu nhỏ" />
              ) : (
                <AiFillCaretUp title="Mở rộng" />
              )}
            </div>
          </div>
          <div className="settingSidbar">
            <div className="settingOptionItem">
              <div className="settingIcon">
                <img
                  src={
                    my?.user_avatar
                      ? `${apiURL.default}${apiURL.file.avatar.show}${my.user_avatar}`
                      : defaultAvatar
                  }
                  alt=""
                />
              </div>
              <div className="settingItemName">{my?.user_name}</div>
              <div className="optionProfileItem">
                <BsThreeDots className="optionProfileIcon" />
                <ul className="optionProfileItemList">
                  <li onClick={toggleProfile}>
                    <span>
                      <RiProfileFill />
                    </span>
                    <span>Xem hồ sơ</span>
                  </li>
                  <li onClick={handleLogout()}>
                    <span>
                      <BiLogOut />
                    </span>
                    <span>Đăng xuất</span>
                  </li>
                  <li>
                    <span>
                      <RiLockPasswordFill />
                    </span>
                    <span>Đổi mật khẩu</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="settingOptionItem" onClick={handleToggleDarkMode()}>
              {displayToggleDarkMode ? (
                <>
                  <div className="settingIcon">
                    <BsFillSunFill className="settingIconItem dark-mode" />
                  </div>
                  <div className="settingItemName">Light mode</div>
                </>
              ) : (
                <>
                  <div className="settingIcon">
                    <BsMoonStarsFill className="settingIconItem dark-mode" />
                  </div>
                  <div className="settingItemName">Dark mode</div>
                </>
              )}
              <div className="darkModeButton">
                <label className="switch">
                  <input ref={checkRef} type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="settingOptionItem">
              <div className="settingIcon">
                <MdPrivacyTip className="settingIconItem privacy" />
              </div>
              <div className="settingItemName">Cài đặt quyền riêng tư</div>
            </div>
            <div className="settingOptionItem">
              <div className="settingIcon">
                <SiAdguard className="settingIconItem security" />
              </div>
              <div className="settingItemName">Bảo mật</div>
            </div>
            <div className="settingOptionItem">
              <div className="settingIcon">
                <MdLanguage className="settingIconItem language" />
              </div>
              <div className="settingItemName">Ngôn ngữ</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {activeConversationstate?._id.toString() || partner ? (
              <React.Fragment>
                <div className="chatBoxHeader">
                  <div className="chatBoxAvatar">
                    <div className="chatBoxAvatarItem">
                      <img
                        src={
                          partner.user_avatar
                            ? `${apiURL.default}${apiURL.file.avatar.show}${partner.user_avatar}`
                            : defaultAvatar
                        }
                        alt="avatar"
                      />
                      {partner.socketId && partner.isFriend ? (
                        <div className="chatBoxStatusBar"></div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="chatBoxTitle">
                    <div className="chatBoxName">{partner.user_name}</div>
                    {partner.isFriend ? (
                      <div className="chatBoxStatus">
                        {partner.socketId ? "Đang hoạt động" : timeFromNow}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="chatBoxUltil">
                    <ul>
                      <li>
                        <MdCall onClick={handleCall} />
                      </li>
                      <li>
                        <BsCameraVideoFill onClick={handleVideoCall} />
                      </li>
                      <li>
                        <GoThreeBars onClick={handleMessagesSetting} />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="chatBoxTop">
                  {partner.isFriend ? (
                    <>
                      {messages.map((message, index) => {
                        const myMessage =
                          message.sender._id.toString() ===
                          auth.message.user_id;
                        return (
                          <div key={index} ref={scrollRef}>
                            {/* <div className="messageNewDay">
                          <div className="borderNewDay">
                            <hr />
                          </div>
                          <div className="contentNewDay">22:14 Hôm qua</div>
                        </div> */}
                            <Message message={message} own={myMessage} />
                          </div>
                        );
                      })}
                      {messages &&
                      messages[messages.length - 1]?.sender._id.toString() ===
                        auth.message.user_id ? (
                        <div className="messageStatusContainer">
                          {seen.length >= 2 ? (
                            <AiFillEye
                              title="Đã xem"
                              className="messageStatusItem"
                            />
                          ) : (
                            <AiFillCheckCircle
                              title="Đã nhận"
                              className="messageStatusItem"
                            />
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <div className="addFriendContainer">
                      <div className="addFriendText">
                        {`Bạn và ${partner.user_name} chưa phải là bạn bè`}
                      </div>
                      <div className="addFriendButton">
                        <button onClick={toggleAddfriendBox}>
                          Thêm vào cuộc trò chuyện
                        </button>
                      </div>
                      <Modal
                        isShowing={isShowingAddfriendBox}
                        hide={toggleAddfriendBox}
                        width={"300px"}
                        height={"auto"}
                        element={
                          <AddUserToConversation
                            partner={partner}
                            handleClick={handleAddUserToConversation}
                          />
                        }
                      ></Modal>
                    </div>
                  )}
                </div>
                {partner.isFriend && (
                  <div className="chatBoxBottom">
                    <div className="chatBoxUtil">
                      <label htmlFor="addFile" className="chatAddFile">
                        <AiFillFileAdd width={"100%"} />
                      </label>
                      <input
                        type={"file"}
                        onChange={handleChangeFile()}
                        id={"addFile"}
                      />
                    </div>
                    <div className="chatBoxInput">
                      {fileState ? (
                        <React.Fragment>
                          <div className="chatBoxInputTop">
                            {fileState ? (
                              <div className="chatBoxInputTopItem">
                                <File
                                  ext={fileState.name.split(".")[1]}
                                  type={fileState.type.split("/")[0]}
                                  url={URL.createObjectURL(fileState)}
                                  className={{
                                    img: {
                                      container: "imageContainer",
                                      image: "imageItem",
                                    },
                                    video: {
                                      container: "videoContainer",
                                      video: "videoItem",
                                    },
                                    audio: {
                                      container: "audioContainer",
                                      audio: "audioItem",
                                    },
                                    icon: {
                                      container: "iconContainer",
                                      icon: "iconItem",
                                      name: "nameItem",
                                    },
                                  }}
                                  name={fileState.name}
                                />
                                <div
                                  className="removeFile"
                                  onClick={() => setFileState(null)}
                                >
                                  <span>&times;</span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </React.Fragment>
                      ) : (
                        ""
                      )}

                      <div className="chatBoxInputBottom">
                        <textarea
                          className="chatMessageInput"
                          placeholder="Aa"
                          value={newMessageState}
                          onChange={handleChangeMessage()}
                        ></textarea>
                        <RiEmotionHappyFill
                          title={"Chọn biểu tượng cảm xúc"}
                          className="chatAddEmoji"
                          onClick={handleShowEmoji()}
                        />
                      </div>
                    </div>
                    <div className="chatSend">
                      <IoMdSend
                        onClick={handleSendMessage()}
                        className="chatSendButton"
                        size={"20px"}
                        color={"#48A6DF"}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <span className="noActiveConversationMessage">
                Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
              </span>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer,
    conversations: state.conversationReducer,
    auth: state.authReducer,
    file: state.fileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllConversations: () => {
      dispatch(ShowConversationsAction());
    },

    getAllMessagesActiveConversation: (conversationId) => {
      dispatch(showAllMessagesActiveConversation(conversationId));
    },
    sendMessageActiveConversation: (message, onSendMessage) => {
      dispatch(sendMessageActiveConversation(message, onSendMessage));
    },
    sendFileMessageActiveConversation: (
      file,
      activeConversationId,
      onSendMessage
    ) => {
      dispatch(sendMessageFile(file, activeConversationId, onSendMessage));
    },
    logout: (navigate) => {
      dispatch(LogoutAuthAction(navigate));
    },
    addUserToConversation: (
      newConversation,
      onSendMessage,
      setConversation,
      setPartner
    ) => {
      dispatch(
        addUserToConversationAction(
          newConversation,
          onSendMessage,
          setConversation,
          setPartner
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
