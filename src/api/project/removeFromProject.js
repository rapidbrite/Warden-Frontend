import URL from "../URL";
import axios from "axios";

export const removeFromProject = async (data) => {
    const response = await axios.post(`${URL}/project/removeuser`, data);
    //console.log(response.data)
    if (response.data.statusCode === 200) {
        return true;
    }
    return false;
}