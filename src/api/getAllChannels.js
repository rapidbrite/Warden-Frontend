import axios from "axios";
import URL from "./URL";

export const getAllChannels = async (userName, projectId, token) => {
  const data = {
    userName,
    projectId,
    token,
  };
  const response = await axios.post(`${URL}/channel/getAll`, data);
  // console.log(response);
  if (response.data.statusCode === 200) {
    return response.data.data;
  }
  return null;
};
