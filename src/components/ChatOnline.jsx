import React from "react";
import { link } from "../constants/link";

function ChatOnline({ online }) {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={link.images + "tokuda1.jpg"}
            alt="avatar"
          />
          {online ? <div className="chatOnlineBadge"></div> : ""}
        </div>
        <div className="chatOnlineName">Shigeo Tokuda</div>
      </div>
    </div>
  );
}

export default ChatOnline;
