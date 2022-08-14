import * as api from "../../api/messages";

export const chatConstants = {
  SET_CHAT_MESSAGES: "SET_CHAT_MESSAGES",
  SET_CHAT_MESSAGE: "SET_CHAT_MESSAGE",
};

export const getChatActions = (dispatch) => {
  return {
    getChatMessages: (userName, projectId, token) =>
      dispatch(getChatMessages(userName, projectId, token)),
    sendMessage: (userName, projectId, text, token) =>
        dispatch(sendMessage(userName, projectId, text, token)),
  };
};

export const setMessages = (chatMessages) => {
  return {
    type: chatConstants.SET_CHAT_MESSAGES,
    chatMessages,
  };
};

export const setMessage = (chatMessage) => {
  return {
    type: chatConstants.SET_CHAT_MESSAGE,
    chatMessage,
  };
};

export const getChatMessages = (userName, projectId, token) => {
  return async (dispatch) => {
    api.getMessages(userName, projectId, token).then((messages) => {
      dispatch(setMessages(messages));
    });
  };
};

export const sendMessage = (userName, projectId, text, token) => {
  return async (dispatch) => {
    api.sendMessage(userName, projectId, text, token).then((message) => {
      dispatch(setMessage(message));
    });
  };
};
