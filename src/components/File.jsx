import fileDownload from "js-file-download";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultStyles, FileIcon } from "react-file-icon";
import { Link } from "react-router-dom";
import TypeInstance from "../constants/type";
import { downloadMessageFile } from "../redux/actions/file-action";

function File({
  type,
  name = "",
  ext,
  url = "",
  className = {},
  style = {},
  downloadFile = () => {},
}) {
  switch (type) {
    case TypeInstance.content.image:
      return (
        <div
          className={className["img"]?.["container"]}
          style={style["img"]?.["container"]}
        >
          <img
            className={className["img"]?.["image"]}
            style={style["img"]?.["image"]}
            src={url}
            alt="ảnh"
          />
        </div>
      );
    case TypeInstance.content.audio:
      return (
        <div className={className["audio"]?.["container"]}>
          <audio
            controls
            className={className["audio"]?.["audio"]}
            style={style["audio"]?.["audio"]}
          >
            <source src={url}></source>
          </audio>
        </div>
      );
    case TypeInstance.content.video:
      return (
        <div
          className={className["video"]?.["container"]}
          style={style["video"]?.["container"]}
        >
          <video
            controls
            className={className["video"]?.["video"]}
            style={style["video"]?.["video"]}
          >
            <source src={url} />
          </video>
        </div>
      );
    default:
      return (
        <a
          onClick={downloadFile}
          className={className["icon"]?.["container"]}
          style={style["icon"]?.["container"]}
        >
          <div
            className={className["icon"]?.["icon"]}
            style={style["icon"]?.["icon"]}
          >
            <FileIcon extension={ext} {...defaultStyles[ext]} />
          </div>
          <div
            className={className["icon"]?.["name"]}
            style={style["icon"]?.["name"]}
          >
            {name}
          </div>
        </a>
      );
  }
}

export default File;
