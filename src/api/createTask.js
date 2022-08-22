import URL from "./URL";
import axios from "axios";

export const createTask = async (
  userName,
  taskName,
  taskDescription,
  taskType,
  taskPriority,
  taskAssignee,
  taskReporter,
  taskStatus,
  channelId,
  token
) => {
  const data = {
    userName,
    taskName,
    taskDescription,
    taskType,
    taskPriority,
    taskAssignee,
    taskReporter,
    taskStatus,
    channelId,
    token,
  };
  //console.log(send);
  const response = await axios.post(`${URL}/task/create`, data);
  //console.log(response.data);
  if (response.data.statusCode === 200) {
    return response.data.data;
  }
  return null;
};
