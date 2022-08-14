import React from "react";
import Avatar from "../leftbar/Avatar";
import "../../scss/chat/chat.scss";

const MessageBox = ({ userName, avatar, text, createdAt, myUserName }) => {
  const placement = myUserName === userName ? "right" : "left";
  return (
    <div className={`project__chat__container__message__box ${userName === myUserName && "project__chat__container__message__box-reverse"}`}>
      <Avatar projectIcon={avatar} tooltip={userName} placement={placement} />
      <div className="project__chat__container__message__box__text">
        <div className={`project__chat__container__message__box__text__u ${userName === myUserName && "project__chat__container__message__box__text__u-reverse"}`} >
          <div className="project__chat__container__message__box__text__u__username">
            {userName}
          </div>
          <div className="project__chat__container__message__box__text__u__time">
            {createdAt?.slice(0, 10)}
            {" "}
            {createdAt?.slice(11, 19)}
          </div>
        </div>
        <div className={`project__chat__container__message__box__text__msg ${userName === myUserName && "project__chat__container__message__box__text__msg-reverse"}`} >
          {text}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
