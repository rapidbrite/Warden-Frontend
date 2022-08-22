import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "../../scss/leftbar/createProject.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// redux
import { connect } from "react-redux";
import { getSnackbarActions } from "../../store/actions/snackbarActions";
import { getProjectActions } from "../../store/actions/projectActions";

import * as api from "../../api/createProject";

const CreateProject = ({
  userDetails,
  handleClose,
  setSnackbar,
  setNewProjectSemiData,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");
  // const [navigate, setNavigate] = useState(false)
  //const [projectIcon, setProjectIcon] = useState('')
  const [created, setCreated] = useState(false);
  const [navigateLink, setNavigateLink] = useState("");
  const handleCreate = () => {
    // console.log(name, description, category)
    if (name === "" || description === "") {
      setSnackbar(true, "name and description are required", "error");
    } else {
      api
        .createProject(
          userDetails?.userName,
          token,
          name,
          description,
          category
        )
        .then((res) => {
          // console.log(res);
          if (res) {
            setSnackbar(true, "project created", "success");
            const reduxStoreData = {
              projectId: res.projectId,
              projectIcon: res.projectIcon,
              name: res.name,
            };

            setNewProjectSemiData(reduxStoreData);
            // setNavigate(true);
            setCreated(true);
            setNavigateLink(res.projectId);
            // handleClose();
          } else {
            setSnackbar(false, "Something went wrong", "error");
          }
        });
    }
  };
  return (
    <div className="createproject">
      
          <div className="createproject__header">
          <h1>Create Project</h1>
        </div>
        <div className="createproject__body">
          <h1>Add project details</h1>
          <h4>You can change these details anytime in your project settings.</h4>
          <TextField
            id="createproject__textfield"
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
            id="createproject__textfield"
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
            id="createproject__textfield"
            type="text"
            label="Category"
            placeholder="Category"
            variant="filled"
            spellCheck="false"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {/* start */}
  
          <div className="Neon Neon-theme-dragdropbox">
            <input
              name="files[]"
              id="filer_input2"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <div className="Neon-input-dragDrop">
              <div className="Neon-input-inner">
                <div className="Neon-input-icon">
                  <i className="fa fa-file-image-o"></i>
                </div>
                <div className="Neon-input-text">
                  <h3>Drag&amp;Drop files here</h3>
                  <span>or</span>
                </div>
                <div className="Neon-input-choose-btn blue">Browse Files</div>
              </div>
            </div>
          </div>
  
          {/* end */}
        </div>
      <div className="createproject__footer">
        
      {created ? (
          <Link to = {`/main/project/${navigateLink}`}>
            <Button variant="contained" onClick={handleClose}>
              Go to New Project
            </Button>
          </Link>
        
        ) : (
          <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
        )
      }
          
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
            </div>

    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getSnackbarActions(dispatch),
    ...getProjectActions(dispatch),
  };
};

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateProject);
