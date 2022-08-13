import axios from "axios";
import URL from "./URL";

export const searchUser = async (userName,projectId) => {
    const data = {
        userName,
        projectId
    }
    const response = await axios.post(`${URL}/search/user`, data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}