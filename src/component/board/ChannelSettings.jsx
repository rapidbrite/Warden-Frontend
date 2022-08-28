import React, { useEffect } from "react";

import "../../scss/Board/createChannel.scss";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ConfirmPopUp from "../ConfirmPopUp";
// import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
// import MenuItem from "@mui/material/MenuItem";
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom' ;
import { connect } from "react-redux";
import { getSnackbarActions } from "../../store/actions/snackbarActions";
import { getChannelActions } from "../../store/actions/channelActions";
import { getTaskActions } from "../../store/actions/taskActions";
import { TiArrowBack } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";

import * as api from "../../api/updateChannel";
import * as api2 from "../../api/deleteChannel";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ChannelSettings = ({
  userDetails,
  projectsData,
  setSnackbar,
  setChannelData,
  channelDetails,
  channelsSemiData,
  setChannelsSemiData,
  setTasksSemiData
}) => {
  const navigate = useNavigate();
  const allUsers = [];
  for (let i = 0; i < projectsData?.admins?.length; i++) {
    allUsers.push(projectsData?.admins[i].userName);
  }
  for (let i = 0; i < projectsData?.users?.length; i++) {
    allUsers.push(projectsData?.users[i].userName);
  }


  const userName = userDetails?.userName;
  const [channelName, setChannelName] = React.useState(
    channelDetails?.channelName
  );
  const [channelDescription, setChannelDescription] = React.useState(
    channelDetails?.channelDescription
  );
  const [channelType, setChannelType] = React.useState(
    channelDetails?.channelType
  );
  const [members, setMembers] = React.useState(channelDetails?.members);
  const [nameChanged, setNameChanged] = React.useState(false);


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



  const clearHandler = () => {
    setChannelName("");
    setChannelDescription("");
    setChannelType("");
    setMembers([]);
  };

  const deleteHandler = () => {
    const token = localStorage.getItem("token");
    const channelId = channelDetails?.channelId;
    api2.deleteChannel(userName,channelId,token).then((res) => {
       if(res)
       {
        setTasksSemiData([]);
        setChannelData([]);
        const channelsemidata = channelsSemiData.filter(
          (channel) => channel.channelId !== channelId
        );
        setChannelsSemiData(channelsemidata);
        setSnackbar(true, "channel deleted", "success");
        
        navigate(`/main/project/${projectsData.projectId}/board`);
       }
        else
        {
          setSnackbar(true, "something went wrong", "error");
        }
    });
  }
  

  const updateHandler = () => {
    //console.log(channelName, channelDescription, channelType, members);
    if (channelName === "") {
      setSnackbar(true, "name is required", "error");
    } else {
      const token = localStorage.getItem("token");

      setNameChanged(channelName !== channelDetails?.channelName);
      const data = {
        userName,
        channelName:
          channelName === channelDetails?.channelName ? null : channelName,
        channelDescription:
          channelDescription === channelDetails?.channelDescription
            ? null
            : channelDescription,
        channelType:
          channelType === channelDetails?.channelType ? null : channelType,
        channelId: channelDetails?.channelId,
        members: members === channelDetails?.members ? null : members,
        projectId: projectsData?.projectId,
        token,
      };
      //console.log(data);
      if (
        data.channelName !== null ||
        data.channelDescription !== null ||
        data.channelType !== null ||
        data.members !== null
      ) {
        api.updateChannel(data).then((res) => {
          if (res) {
            //console.log(res);
            setChannelData(res);
            if (nameChanged) {
              //console.log("name changed");
              const semidata = channelsSemiData;
              for (let i = 0; i < semidata.length; i++) {
                if (semidata[i].channelId === res.channelId) {
                  semidata[i].channelName = res.channelName;
                }
              }
              
              setChannelsSemiData(semidata);
            } 
             setSnackbar(true, "channel updated", "success");
          } else {
            setSnackbar(false, "Something went wrong", "error");
          }
        });
      } else {
        setSnackbar(true, "no changes made", "info");
      }
    }
    handleUpdateClose();
  };

  useEffect(() => {}, [setChannelData, setChannelsSemiData]);

  return (
    <>
    <Dialog open={deleteopen} onClose={handleDeleteClose} >
        <ConfirmPopUp title='Are you sure?' desc={`This channel along with all tasks/issues, data, attachments will be permanently deleted.`} handleClose={handleDeleteClose} handleConfirm={deleteHandler} />
      </Dialog>
      <Dialog open={updateopen} onClose={handleUpdateClose} >
        <ConfirmPopUp title='Are you sure?' desc='You want to update settings of this channel' handleClose={handleUpdateClose} handleConfirm={updateHandler} />
      </Dialog>
      <div className="channelBoard__main__text">
        <h1 className="channelBoard__main__text__navi">
          {projectsData?.name} / {channelDetails.channelName} / settings
        </h1>
        <div className="channelBoard__main__text__navi">
          <div className="channelBoard__main__text__navi__back">
            <TiArrowBack
              className="channelBoard__main__text__navi__back__icon"
              onClick={() => {
                window.history.back();
              }}
            />
          </div>
          <div className="channelBoard__main__text__navi__delete">
            
            <RiDeleteBin6Fill
              className="channelBoard__main__text__navi__delete__icon"
              onClick={() => {
                handleDeleteOpen();
              }}
            />
            
          </div>
        </div>
      </div>
      <div className="create__channel">
        <h1>Update channel details</h1>
        <div className="create__channel__textfield">
          <TextField
            className="create__channel__textfield__container"
            label="Channel Name"
            variant="filled"
            value={channelName}
            required
            onChange={(e) => setChannelName(e.target.value)}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
          />
          <TextField
            className="create__channel__textfield__container"
            label="Channel Description"
            variant="filled"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
          />
          <TextField
            className="create__channel__textfield__container"
            label="Channel Type"
            variant="filled"
            value={channelType}
            onChange={(e) => setChannelType(e.target.value)}
            inputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
          />
        </div>
        {/* <div>
            <h2>Add Members</h2>
            
        </div> */}
        <div className="create__channel__members">
          <h2>Update members list to this channel</h2>
          <h4>
            In the future, you can always add new/remove members to this
            channel.
          </h4>
          <Autocomplete
            className="member_tab"
            multiple
            id="checkboxes-tags-demo"
            options={allUsers}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            value={members}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  id="member_chip"
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderOption={(props, option, { selected }) => (
              <li {...props} className="member_list">
                <Checkbox
                  className="member_check"
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Members"
                id="members_textfield"
                fullWidth
                variant="filled"
                sx={{
                  label: {
                    height: "auto !important",
                    fontSize: "1.15rem !important",
                    fontWeight: "300",
                    color: "#666",
                    letterSpacing: ".02em",
                    background: "white",
                    paddingInline: ".8em",
                    paddingBlock: ".2em",
                    lineHeight: "1.4",
                    borderRadius: "500px",
                  },
                }}
              />
            )}
            onChange={(event, value) => {
              setMembers(value);
            }}
          />
        </div>

        <div className="create__channel__button">
          <div className="create__channel__button__clear">
            <button onClick={clearHandler}>Clear</button>
          </div>
          <div className="create__channel__button__create">
            <button onClick={handleUpdateOpen}>Update</button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapActionsToProps)(ChannelSettings );
