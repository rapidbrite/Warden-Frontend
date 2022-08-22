import axios from "axios";
import URL from "./URL";

export const getAllTasks = async (userName,channelId,token) => {
        const data = {
            userName,
            channelId,
            token
        }
        const response = await axios.post(`${URL}/task/getAll`, data);
        // console.log(response);
        if (response.data.statusCode === 200) {
            return response.data.data;
        }
        return null;

    }