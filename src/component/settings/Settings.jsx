import React from "react";

import { connect } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../../scss/project/settings.scss";
import UsersRoles from "./UsersRoles";
import Dialog from '@mui/material/Dialog';
import ConfirmPopUp from "../ConfirmPopUp";
import { TiArrowBack } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom' ;
import { getSnackbarActions } from "../../store/actions/snackbarActions";
import { getChannelActions } from "../../store/actions/channelActions";
import { getTaskActions } from "../../store/actions/taskActions";
import { getProjectActions } from "../../store/actions/projectActions";

import * as apidelete from "../../api/project/deleteProject";
import * as apiupdate from "../../api/project/updateProject";

const Settings = ({ projectId, projectsData, userDetails,projectsSemiData,setProjectData,setProjectSemiData,setSnackbar }) => {

//states
const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [name, setName] = React.useState(projectsData.name);
  const [description, setDescription] = React.useState(
    projectsData.description
  );
  const [category, setCategory] = React.useState(projectsData.category || "");
  const [rolesupdate, setRolesupdate] = React.useState(false);

//popup code
const [deleteopen, setDeleteopen] = React.useState(false);
const [updateopen, setUpdateopen] = React.useState(false);
const handleDeleteOpen = () => {
  setDeleteopen(true);
};
const handleUpdateOpen = () => {
  setUpdateopen(true);
};

const handleDeleteClose = () => {
  setDeleteopen(false);
};

const handleUpdateClose = () => {
  setUpdateopen(false);
};


//functions
    const deleteProject = () => {
        //console.log("delete project");
        
        
        const data = {
            projectId: projectId,
            userName: userDetails.userName,
            token : localStorage.getItem("token")
        }
        apidelete.deleteProject(data).then((res) => {
            //console.log(res);
            if (res) {
                handleDeleteClose();
                setProjectData([]);
                const semidata = projectsSemiData.filter((p) => p.projectId !== projectId);
                setProjectSemiData(semidata);
                setSnackbar(true, "Project deleted successfully", "success");
                navigate(`/main/project/`);
            }
            else {
                handleDeleteClose();
                setSnackbar(true, "You must be creator of this project", "error");            }
        })

    }

    const updateProject = () => {
        const data = {
            userName : userDetails.userName,
            name : name,
            description : description,
            category : category,
            projectId : projectId,
            token : localStorage.getItem("token")
        }
        apiupdate.updateProject(data).then((res) => {
            if (res) {
                if(projectsData?.name !== name){
                    const semidata = projectsSemiData.map((p) => {
                        if(p.projectId === projectId){
                            p.name = name;
                        }
                        return p;
                    }
                    )
                    setProjectSemiData(semidata);


                }
                const projectdata = projectsData;
                projectdata.name = name;
                projectdata.description = description;
                projectdata.category = category;
                setProjectData(projectdata);

                
                handleUpdateClose();
                
                
                setSnackbar(true, "Project updated successfully", "success");
            }
            else {
                handleUpdateClose();
                setSnackbar(true, "You must be admin of this project", "error");            }
            }
        )
    }











//useEffect
  React.useEffect(() => {
    projectsData.admins.forEach((admin) => {
      if (admin.userName === userDetails.userName) {
        setIsAdmin(true);
      }
    });
    //console.log(projectsData.admins);
  }, [projectsData.admins, userDetails.userName]);

  return (
    <div>
        <Dialog open={deleteopen} onClose={handleDeleteClose} >
        <ConfirmPopUp title='Are you sure?' desc={`This project along with all channels/tasks/issues, data, attachments will be permanently deleted.`} handleClose={handleDeleteClose} handleConfirm={deleteProject} />
      </Dialog>
      <Dialog open={updateopen} onClose={handleUpdateClose} >
        <ConfirmPopUp title='Are you sure?' desc='You want to update settings of this project' handleClose={handleUpdateClose} handleConfirm={updateProject} />
      </Dialog>
      {isAdmin ? (
        <div className="project__settings">
          <div className="project__settings__header">
            <h1 >
              {projectsData?.name} / settings
            </h1>
            <div className="project__settings__header__icons">
              <div className="project__settings__header__icons__back">
                <TiArrowBack
                  className="channelBoard__main__text__navi__back__icon"
                  onClick={() => {
                    window.history.back();
                  }}
                />
              </div>
              <div className="project__settings__header__icons__delete">
                <RiDeleteBin6Fill
                  className="channelBoard__main__text__navi__delete__icon"
                  onClick={() => {
                    handleDeleteOpen();
                    
                  }}
                />
              </div>
            </div>
            <h2 className="project__settings__header__title">
                Project Details
            </h2>
          </div>


          <div className="project__settings__textfields">
            <TextField
              id="updateproject__textfield"
              type="text"
              label="Name"
              placeholder="Name"
              variant="filled"
              required
              spellCheck="false"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="updateproject__textfield"
              type="text"
              label="Description"
              placeholder="Description"
              variant="filled"
              required
              spellCheck="false"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="updateproject__textfield"
              type="text"
              label="Category"
              placeholder="Category"
              variant="filled"
              spellCheck="false"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="project__settings__update" >
            <Button onClick={handleUpdateOpen}>
              UPDATE
            </Button>
          </div>

          <div className="project__settings__roles">
            <div className="project__settings__roles__admins">
              <h1>Project Admins</h1>
              <div>
                <UsersRoles list={projectsData.admins} areAdmins={true} rolesupdate={rolesupdate} setRolesupdate={setRolesupdate} />
              </div>
            </div>

            <div className="project__settings__roles__members">
              <h1>Project Members</h1>
              <div>
                <UsersRoles list={projectsData.users} areAdmins={false} rolesupdate={rolesupdate} setRolesupdate={setRolesupdate}/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
const mapActionsToProps = (dispatch) => {
    return {
      ...getProjectActions(dispatch),
      ...getSnackbarActions(dispatch),
      ...getChannelActions(dispatch),
      ...getTaskActions(dispatch),
    };
  };
const mapStateToProps = ({ project, auth, channel }) => {
  return {
    ...project,
    ...auth,
    ...channel,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Settings);
