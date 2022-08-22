import { projectConstants } from "../actions/projectActions";

const initialState = {
    projectsSemiData: [],
    projectsData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case projectConstants.GET_PROJECTS_SEMIDATA:
            return {
                ...state,
                projectsSemiData: action.projectDetails
            }
        case projectConstants.SET_NEW_PROJECT_SEMIDATA:
            return {
                ...state,
                projectsSemiData: [...state.projectsSemiData, action.projectDetails]
            }
        case projectConstants.SET_PROJECT_DATA:
            return {
                ...state,
                projectsData: action.projectData
            }
       
        default:
            return state  
        
    }
            
}

export default reducer;