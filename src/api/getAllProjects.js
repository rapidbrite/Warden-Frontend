import axios from "axios";
import URL from "./URL";

export const getAllProjects = async (userName,token) => { 
    const data = {
        userName,
        token
    }
    const response = await axios.post(`${URL}/project/all`, data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
};