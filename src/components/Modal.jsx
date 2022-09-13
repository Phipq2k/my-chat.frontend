import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
const Modal = ({
  isShowing,
  hide,
  element,
  title = "",
  width = "200px",
  height = "200px",
}) => {
  return (
    <React.Fragment>
      {isShowing ? (
        <div className="modal">
          <div
            className="modalWrapper"
            style={{
              width,
              height,
            }}
          >
            <div className="tabControlModalContainer">
              <button
                className="modalCloseButton"
                aria-label="close"
                data-dismiss="modal"
                onClick={hide}
                title="Đóng"
              >
                <AiFillCloseSquare aria-hidden="true" />
              </button>
            </div>
            <div className="modalContainer">
              <div className="titleModal">{title}</div>
              {element}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Modal;
