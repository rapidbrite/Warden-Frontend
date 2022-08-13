import axios from "axios";
import URL from "./URL";
export const createProject = async (userName, token, name, description, category) => {
    const data = {
        userName,
        token,
        name,
        description,
        category
    }
    const response = await axios.post(`${URL}/project/create`, data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
}