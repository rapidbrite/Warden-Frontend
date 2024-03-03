import io from "socket.io-client";
import { setNewNotification } from "../store/actions/notificationActions";
import { setMessage } from "../store/actions/chatActions";
import store from "../store/store";

import config from "../config.json";
let socket = null;

export const connectWithSocketServer = () => {
  socket = io(`${config.Backend}`);
  socket.on("connect", () => {
    // console.log("connected to socket server");
    // console.log(socket.id);
  });

  socket.on("disconnect", () => {
    // console.log("disconnected from socket server");
    // console.log(socket.id);
  });

  socket.on("notification", (data) => {
    store.dispatch(setNewNotification(data));
    //console.log(data);
  });
  socket.on("sendMessage", (data) => {
    store.dispatch(setMessage(data));
    // console.log(data);
  });
};

export const addConnectedUserToSocket = (userName) => {
  socket.emit("addConnectedUser", userName);
};

export const addConnectedUsersInSingleProject = (userName, projectId) => {
  socket.emit("addConnectedUsersInSingleProject", { userName, projectId });
};
