import URL from "./URL";
import axios from "axios";

export const getProject = async (projectId,token) => {
    const data = {
        projectId,
        token
    }
    const response = await axios.post(`${URL}/project/get`,data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
};