import axios from 'axios';
import URL from "./URL";

export const deleteChannel = async (userName,channelId,token) => {
    const data = {
        userName,
        channelId,
        token
    }
    //console.log(data);
    const response = await axios.post(`${URL}/channel/delete`, data);
    //console.log(response);
    if (response.data.statusCode === 200) {
        return response.data;
    }
    return null;
}