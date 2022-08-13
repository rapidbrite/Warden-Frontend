import axios from "axios";
import URL from "./URL";

export const getUserData = async (token) => {
    const data = {
        token
    }
    const response = await axios.post(`${URL}/user/getDataByJWT`,  data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
};