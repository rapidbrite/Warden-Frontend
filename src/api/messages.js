import axios from "axios";
import URL from "./URL";


export const getMessages = async (userName,projectId, token) => {
    const data = {
        userName,
        projectId,
        token
    }
    const response = await axios.post(`${URL}/chat/get`, data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}

export const sendMessage = async (userName, projectId, text, token) => {
    const data = {
        userName,
        projectId,
        text,
        token
    }
    const response = await axios.post(`${URL}/chat/send`, data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}
