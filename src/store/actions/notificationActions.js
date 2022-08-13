import * as api from "../../api/getNotifications";


export const notificationConstants = {
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_NEW_NOTIFICATION: 'SET_NEW_NOTIFICATION',
}

export const getNotificationActions = (dispatch) => {
    return {
        getNotifications: (userName,token) => dispatch(getNotifications(userName,token)),
        setNewNotification: (notification) => dispatch(setNewNotification(notification))
    }
}

const setNotifications = (notifications) => {
    return {
        type: notificationConstants.SET_NOTIFICATIONS,
        notifications
    }
}

export const setNewNotification = (notification) => {
    return {
        type: notificationConstants.SET_NEW_NOTIFICATION,
        notification
    }
}

const getNotifications = (userName, token) => {
    return async (dispatch) => {
        api.getNotifications(userName, token).then(notifications => {
            dispatch(setNotifications(notifications))
        })
    }
}




