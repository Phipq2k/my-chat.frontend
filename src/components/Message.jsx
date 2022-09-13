import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { apiURL } from "../constants/api";
import { link } from "../constants/link";
import TypeInstance from "../constants/type";
import { useTimeStamp } from "../hooks/useTimeStamp";
import { downloadMessageFile } from "../redux/actions/file-action";
import File from "./File";

function Message({ own, message, ...props }) {
  const { downloadFile } = props;
  const { timeItem } = useTimeStamp(message.createdAt);
  const saveFile = () => {
    downloadFile(message.message);
  };

  return (
    <div className={own ? "messageContainer own" : "messageContainer"}>
      <div className="messageAvatar">
        {(own && <></>) || (
          <img
            className="messageImg"
            src={
              message.sender.user_avatar
                ? `${apiURL.default}${apiURL.file.avatar.show}${message.sender.user_avatar}`
                : link.images + "tokuda1.jpg"
            }
            alt="avatar"
          />
        )}{" "}
      </div>
      <div className="messageContentBox">
        <div className="messageContentTop">
          {own ? (
            <>
              <div title="Cài đặt tin nhắn" className="messageOptions">
                <BsThreeDots />
              </div>
              <div
                className={
                  message.type === TypeInstance.content.text
                    ? "messageContent"
                    : "messageContent file"
                }
              >
                {message.type === TypeInstance.content.text ? (
                  <p className="messageText"> {message.message} </p>
                ) : (
                  <File
                    downloadFile={saveFile}
                    ext={message.message.split(".")[1]}
                    name={message.message.split("-")[1]}
                    type={message.type}
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
                        name: "fileName",
                      },
                    }}
                    url={`${apiURL.default}${apiURL.file.message.show}${message.message}`}
                  />
                )}
                <div className="messageTime">{timeItem}</div>
              </div>
            </>
          ) : (
            <>
              <div
                className={
                  message.type === TypeInstance.content.text
                    ? "messageContent"
                    : "messageContent file"
                }
              >
                {message.type === TypeInstance.content.text ? (
                  <p className="messageText">{message.message} </p>
                ) : (
                  <File
                    downloadFile={saveFile}
                    ext={message.message.split(".")[1]}
                    name={message.message.split("-")[1]}
                    type={message.type}
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
                        name: "fileName",
                      },
                    }}
                    url={`${apiURL.default}${apiURL.file.message.show}${message.message}`}
                  />
                )}
                <div className="messageTime">{timeItem}</div>
              </div>
              <div title="Cài đặt tin nhắn" className="messageOptions">
                <BsThreeDots />
              </div>
            </>
          )}
        </div>
        <div className="messageContentBottom"></div>
      </div>{" "}
      {/* <div className="messageBottom"> {timeItem} </div>{" "} */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloadFile: (filename) => {
      dispatch(downloadMessageFile(filename));
    },
  };
};

export default connect(null, mapDispatchToProps)(Message);
