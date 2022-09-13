import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { apiURL } from "../constants/api";
import { link } from "../constants/link";
import TypeInstance from "../constants/type";
export default function Conversation({
  conversation,
  active,
  currentUserId,
  handleClick,
  partner,
}) {
  const [user, setUser] = useState({});
  const [contentActive, setContentActive] = useState("");
  const handleActiveMessageType = () => {
    switch (conversation.last_message?.message.type) {
      case TypeInstance.content.text:
        return conversation.last_message.message.content;
      case TypeInstance.content.image:
        return "Đã gửi hình ảnh";
      case TypeInstance.content.audio:
        return "Đã gửi clip thoại";
      case TypeInstance.content.video:
        return "Đã gửi video";
      default:
        return "Đã gửi tệp";
    }
  };
  useEffect(() => {
    setUser(partner);
    setContentActive(handleActiveMessageType());
  }, [currentUserId, conversation]);

  return (
    <div
      className={`conversationContainer ${active && "activeConversation"}`}
      onClick={handleClick}
    >
      <div className="conversationTitle">
        <img
          className="conversationImg"
          src={
            user.user_avatar
              ? `${apiURL.default}${apiURL.file.avatar.show}${user.user_avatar}`
              : link.images + "tokuda1.jpg"
          }
          alt="avatar"
        />
        {user.socketId ? <div className="conversationStatusBar"></div> : <></>}
      </div>
      <div className="conversationText">
        <div className="conversationTextTitle"> {user.user_name} </div>
        {conversation.last_message ? (
          <div className="conversationActiveMessage">
            {conversation.last_message.user_id === currentUserId ? (
              <>
                <span>Bạn: </span>
              </>
            ) : (
              ""
            )}
            {contentActive}
          </div>
        ) : (
          <></>
        )}
      </div>
      <span title="Cài đặt cuộc trò chuyện" className="conversationOptionBar">
        <BsThreeDots />
      </span>
    </div>
  );
}
