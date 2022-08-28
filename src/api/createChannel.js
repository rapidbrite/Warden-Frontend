import axios from 'axios';
import URL from "./URL";

export const createChannel = async (userName, channelName, channelDescription, channelType, projectId, members, token) => {
    const data = {
        userName,
        channelName,
        channelDescription,
        channelType,
        projectId,
        members,
        token
    }
    //console.log(data);
    const response = await axios.post(`${URL}/channel/create`, data);
    //console.log(response);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}