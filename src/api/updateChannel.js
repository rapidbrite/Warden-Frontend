import axios from 'axios';
import URL from "./URL";

export const updateChannel = async (data) => {
    // const data = {
    //     userName,
    //     channelName,
    //     channelDescription,
    //     channelType,
    //     channelId,
    //     members,
    //     token
    // }
    //console.log(data);
    const response = await axios.post(`${URL}/channel/update`, data);
    //console.log(response);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}