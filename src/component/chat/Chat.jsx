import React, {useRef} from "react";

// redux
import { connect } from "react-redux";
import { getChatActions } from "../../store/actions/chatActions";

// icons
import {AiOutlineSend} from "react-icons/ai";


// component
import MessageBox from "./MessageBox";

// style
import "../../scss/chat/chat.scss";
import {motion} from "framer-motion";


// socket
// addConnectedUsersInSingleProject
import { addConnectedUsersInSingleProject } from "../../socket/socketConnection";


const Chat = ({ projectId, userDetails, getChatMessages, chatMessages,sendMessage }) => {
  const token = localStorage.getItem("token");
  const userName = userDetails?.userName;

  const [text,setText] = React.useState("");

  const sendMessageHandler = (e) =>{
    e.preventDefault();
    if (text.length > 0) {
      sendMessage(userName,projectId,text,token);
      setText("");
    }
    
  }
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  
  React.useEffect(() => {
    getChatMessages(userName, projectId, token);
    if(userName){
      addConnectedUsersInSingleProject(userName, projectId);
    }
  }, [projectId, token, userName, getChatMessages]);

  React.useEffect(() => {
    scrollToBottom();
  },[chatMessages]);

  return (
    <div className="project__chat">
      <div className="project__chat__container">
        <div className="project__chat__container__messages">
          {chatMessages?.map((message, index) => {
            return (
              <MessageBox
                key={index}
                userName={message?.senderUserName}
                avatar={message?.senderAvatar}
                text={message?.text}
                createdAt={message?.createdAt}
                myUserName={userName}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="project__chat__container__send">
          <input
            type="text"
            placeholder="Type a message"
            className="project__chat__input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <motion.button onClick={sendMessageHandler}>
            <AiOutlineSend />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ auth, chat }) => {
  return {
    ...auth,
    ...chat,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getChatActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Chat);
