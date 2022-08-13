import { notificationConstants } from "../actions/notificationActions"
const initialState = {
    notifications: [],
}

const reducer = (state = initialState, action) => { 
    switch (action.type) {
        case notificationConstants.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications
            }
        case notificationConstants.SET_NEW_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.notification]
            }
        default:
            return state;
    }
}

export default reducer;
