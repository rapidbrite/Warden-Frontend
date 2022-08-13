import axios  from "axios";
import URL from "./URL";

export const inviteUser =  async (userName, projectId, senderId,token) => { 
        const data = {
            userName,
            projectId,
            senderId,
            token
        }
    const response = await axios.post(`${URL}/project/invite`, data);
    console.log(response);
    if (response.data.statusCode === 200) {
            return response.data;
        }
        return null;
    }
