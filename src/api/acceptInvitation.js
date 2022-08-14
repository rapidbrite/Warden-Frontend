// user/acceptInvite
import URL from "./URL";
import axios from "axios";

export const acceptInvitation = async (data) => { 
    const send = {
        userName : data.userName, 
        notificationId : data.notificationId, 
        invitationId : data.invitationId
    }
    //console.log(send);
    const response = await axios.post(`${URL}/user/acceptInvite`, send);
    //console.log(response.data);
    if (response.data.statusCode === 200) {
        return response.data.data;
    }
    return null;
};