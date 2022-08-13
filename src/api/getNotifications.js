import axios from "axios";
// http://local
import URL from "./URL";


export const getNotifications = async (userName,token) => {
    const data = {
        userName,
        token
    }
    const response = await axios.post(`${URL}/notification/getAll`,  data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
};