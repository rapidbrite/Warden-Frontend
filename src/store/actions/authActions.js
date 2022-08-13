import * as api from "../../api/getUserData";

export const authConstants = {
    SET_USER_DETAILS: 'SET_USER_DETAILS',
}

export const getAuthActions = (dispatch) => {
    return {
        login : (token) => dispatch(userData(token)),
        setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails))
    }
}

const setUserDetails = (userDetails) => {
    return {
        type: authConstants.SET_USER_DETAILS,
        userDetails
    }
}

const userData = (token) => {
    return async (dispatch) => {
        api.getUserData(token).then(userDetails => {
            dispatch(setUserDetails(userDetails))
        })
    }
}
