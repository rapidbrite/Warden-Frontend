import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom' ;
import "../../scss/Board/createChannel.scss";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
// import MenuItem from "@mui/material/MenuItem";

import { connect } from "react-redux";
import { getSnackbarActions } from "../../store/actions/snackbarActions";
import { getChannelActions } from "../../store/actions/channelActions";

import * as api from "../../api/createChannel";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CreateChannel = ({
  userDetails,
  projectsData,
  setSnackbar,
  setNewChannelSemiData,
  setChannelId
}) => {
  const navigate = useNavigate();
  const allUsers = [];
  for (let i = 0; i < projectsData?.admins?.length; i++) {
    allUsers.push(projectsData?.admins[i].userName);
  }
  for (let i = 0; i < projectsData?.users?.length; i++) {
    allUsers.push(projectsData?.users[i].userName);
  }
  const projectId = projectsData?.projectId;
  const userName = userDetails?.userName;
  const [channelName, setChannelName] = React.useState("");
  const [channelDescription, setChannelDescription] = React.useState("");
  const [channelType, setChannelType] = React.useState("");
  const [members, setMembers] = React.useState([]);

  const clearHandler = () => {
    setChannelName("");
    setChannelDescription("");
    setChannelType("");
    setMembers([]);
  };

  const createHandler = () => {
    //console.log(channelName, channelDescription, channelType, members);
    if (channelName === "") {
      setSnackbar(true, "name is required", "error");
    } else {
      const token = localStorage.getItem("token");
      api
        .createChannel(
          userName,
          channelName,
          channelDescription,
          channelType,
          projectId,
          members,
          token
        )
        .then((res) => {
          //console.log(res);
          if (res) {
            const reduxStoreData = {
              channelId: res.channelId,
              channelName: res.channelName,
              channelKey: res.channelKey,
            };
            setNewChannelSemiData(reduxStoreData);
            clearHandler();
            setChannelId(res.channelId);
            navigate(`/main/project/${projectsData.projectId}/board/channel/${res.channelKey}`);
            
            setSnackbar(true, "channel created", "success");
          } else {
            setSnackbar(false, "Something went wrong", "error");
          }
        });
    }
  };

  useEffect(() => {}, [setNewChannelSemiData]);

  return (
    <div className="create__channel">
      <h1>Create New Channel</h1>
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
        <h2>Add members to new channel</h2>
        <h4>In the future, you can always add new members to this channel.</h4>
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
          <button onClick={createHandler}>Create</button>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getSnackbarActions(dispatch),
    ...getChannelActions(dispatch),
  };
};

const mapStateToProps = ({ project, auth }) => {
  return {
    ...project,
    ...auth,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);
