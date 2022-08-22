import * as api from "../../api/getAllTasks";

export const taskConstants = {
    SET_TASK_DETAILS: 'SET_TASK_DETAILS',
    SET_TASKS_SEMIDATA: 'SET_TASKS_SEMIDATA',
    SET_NEW_TASK_SEMIDATA : 'SET_NEW_TASK_SEMIDATA',
}

export const getTaskActions = (dispatch) => {
    return {
        getTasksSemiData: (userName, channelId,token) => dispatch(getTasksSemiData(userName, channelId,token)),
        setTaskDetails: (taskDetails) => dispatch(setTaskDetails(taskDetails)),
        setNewTaskSemiData: (taskDetails) => dispatch(setNewTaskSemiData(taskDetails)),
    }
}

const setTasksSemiData = (tasksSemiData) => {
    return {
        type: taskConstants.SET_TASKS_SEMIDATA,
        tasksSemiData,
    }
}

const getTasksSemiData = (userName, channelId,token) => {
    return dispatch => {
        api.getAllTasks(userName, channelId,token)
            .then(response => {
                // console.log(response);
                dispatch(setTasksSemiData(response));
            })
    }
}

const setTaskDetails = (taskDetails) => {
    return {
        type: taskConstants.SET_TASK_DETAILS,
        taskDetails,
    }
}

const setNewTaskSemiData = (newTaskSemiData) => {
    return {
        type: taskConstants.SET_NEW_TASK_SEMIDATA,
        tasksSemiData : newTaskSemiData,
    }
}

