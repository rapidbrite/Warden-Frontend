import URL from "../URL";
import axios from "axios";

export const makeAdmin = async (data) => {
    //console.log(data);
    const response = await axios.post(`${URL}/project/makeadmin`, data);
    //console.log(response.data);
    if (response.data.statusCode === 200) {
        return true;
    }
    return false;
}