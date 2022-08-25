import { taskConstants } from "../actions/taskActions";

const initialState = {
    tasksSemiData : [],
    taskDetails: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case taskConstants.SET_TASKS_SEMIDATA:
            return {
                ...state,
                tasksSemiData: action.tasksSemiData
            }
        case taskConstants.SET_NEW_TASK_SEMIDATA:
            return {
                ...state,
                tasksSemiData: action.tasksSemiData
            }
        case taskConstants.SET_TASK_DETAILS:
            return {
                ...state,
                taskDetails: action.taskDetails
            }
        default:
            return state
    }
}

export default reducer;