import URL from "./URL";
import axios from "axios";

export const getChannel = async (channelId,userName,token) => {
    const data = {
        channelId,
        userName,
        token
    }
    const response = await axios.post(`${URL}/channel/get`,data);
    if (response.data.statusCode === 200) {
        //console.log(response.data.data);
        return response.data.data;

    }
    return null;
}