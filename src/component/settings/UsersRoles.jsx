import React from 'react'
import UserBox from './UserBox'

import { connect } from 'react-redux';
import { getProjectActions } from '../../store/actions/projectActions';
import { getSnackbarActions } from '../../store/actions/snackbarActions';

import * as apimakeadmin from "../../api/project/makeAdmin";
import * as apiremoveadmin from "../../api/project/removeAsAdmin";
import * as apiremoveuser from "../../api/project/removeFromProject";

import { useNavigate } from 'react-router-dom' ;

const UsersRoles = ({list,areAdmins , projectsData, userDetails,setProjectData,setSnackbar,rolesupdate ,setRolesupdate}) => {

  const navigate = useNavigate();
  const handleMakeAdmin = (username) => {
    const data = {
      projectId: projectsData.projectId,
      AdminUserName : userDetails.userName,
      userName : username,
      token : localStorage.getItem("token")
  }
    apimakeadmin.makeAdmin(data)
    .then(res => {
      if (res) {
        const projectdata = projectsData;
        projectdata?.users?.forEach(user => {
          if (user.userName === username) {
            projectdata?.admins.push({userName:username,avatar:user.avatar});
            projectdata?.users.splice(projectdata?.users.indexOf(user),1);
          }
        }
        )


        setProjectData(projectdata);
        setRolesupdate(!rolesupdate);

        setSnackbar(true, "User made admin", "success");
      }
      else {
        setSnackbar(true, "You must be admin of this project", "error");
      }
    }
    )
  }






  const handleRemoveAdmin = (username) => {
    const data = {
      projectId: projectsData.projectId,
      ByUserName : userDetails.userName,
      OnuserName : username,
      token : localStorage.getItem("token")
  }
    apiremoveadmin.removeAsAdmin(data)
    .then(res => {
      if (res) {
        const projectdata = projectsData;
        if(!projectdata.users)
          projectdata.users = [];
        projectdata?.admins?.forEach(admin => {
          if (admin.userName === username) {

            projectdata?.users.push({userName:username,avatar:admin.avatar});
            projectdata?.admins.splice(projectdata.admins.indexOf(admin),1);
          }
        }
        )

        
        setProjectData(projectdata);
        setRolesupdate(!rolesupdate);
        setSnackbar(true, "User removed admin", "success");
      }
      else {
        setSnackbar(true, "You must be admin of this project", "error");
      }
    }
    )
  }
  
  
  const handleRemoveFromProject = (username,isAdmin) => {

  
    const data = {
      projectId: projectsData.projectId,
      ByAdminUserName : userDetails.userName,
      OnAdminuserName : isAdmin?username : null,
      OnMemberuserName : !isAdmin?username : null,
      token : localStorage.getItem("token")
    }
    apiremoveuser.removeFromProject(data)
    .then(res => {
      if (res) {
        const projectdata = projectsData;
        
        if(isAdmin){
          projectdata?.admins.splice(projectdata?.admins.indexOf(username),1);
        }
        else{
          projectdata?.users.splice(projectdata?.users.indexOf(username),1);
        }
        setProjectData(projectdata);
        setRolesupdate(!rolesupdate);
        setSnackbar(true, "User removed from project", "success");
        if(userDetails.userName === username){
          navigate(`/main/project/`);
          window.location.reload();
        }
        
      }
      else {
        setSnackbar(true, "You must be admin of this project", "error");
      }
    }
    )


  }

  
  return (
    <div className='usersroles__list'>
        {list?.map((user) => {
            return (
                <UserBox user={user} areAdmins={areAdmins} handleMakeAdmin={handleMakeAdmin} handleRemoveAdmin={handleRemoveAdmin} handleRemoveFromProject={handleRemoveFromProject}/>
            )
        }
        )}
    </div>
  )
}
const mapActionsToProps = (dispatch) => {
  return {
    ...getProjectActions(dispatch),
    ...getSnackbarActions(dispatch),
    
  };
};
const mapStateToProps = ({ project, auth }) => {
  return {
    ...project,
    ...auth,
    
  };
};
export default connect(mapStateToProps, mapActionsToProps)(UsersRoles);