import URL from "../URL";
import axios from "axios";

export const updateProject = async (data) => {
    
    const response = await axios.post(`${URL}/project/update`, data);
    if (response.data.statusCode === 200) {
        return true;
    }
    return false;
} 