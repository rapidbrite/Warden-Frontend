import * as api from "../../api/getAllProjects";

import { getProject } from "../../api/getProject";
export const projectConstants = {
    GET_PROJECTS_SEMIDATA: "GET_PROJECTS_SEMIDATA",
    SET_NEW_PROJECT_SEMIDATA: "SET_NEW_PROJECT_SEMIDATA",
    SET_PROJECT_DATA : "SET_PROJECT_DATA",
    
}

export const getProjectActions = (dispatch) => {
    return {
        getProjectsSemiData: (userName,token) => dispatch(getProjectSemiData(userName,token)),
        setNewProjectSemiData: (projectDetails) => dispatch(setNewProjectSemiData(projectDetails)),
        getProjectData : (projectId,userName,token) => dispatch(getProjectData(projectId,userName,token))
    }
}

const setProjectSemiData = (projectDetails) => {
    return {
        type: projectConstants.GET_PROJECTS_SEMIDATA,
        projectDetails
    }
}

const setNewProjectSemiData = (projectDetails) => {
    return {
        type: projectConstants.SET_NEW_PROJECT_SEMIDATA,
        projectDetails
    }
}

const getProjectSemiData = (userName, token) => {
    return async (dispatch) => {
        api.getAllProjects(userName, token).then(projectDetails => {
            dispatch(setProjectSemiData(projectDetails))
        })
    }
}

const setProjectData = (projectData) => { 
    return {
        type: projectConstants.SET_PROJECT_DATA,
        projectData
    }
}

const getProjectData = (projectId,userName, token) => {
    return async (dispatch) => {
        getProject(projectId,userName, token).then(projectData => {
            dispatch(setProjectData(projectData))
        })
    }
}

