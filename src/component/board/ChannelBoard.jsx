import React from "react";
//import {getChannelActions} from '../../store/actions/channelActions'
import { connect } from "react-redux";
import { getTaskActions } from "../../store/actions/taskActions";
import TaskMainBoard from "./tasks/TaskMainBoard";

//css
import "../../scss/Tasks/channelBoard.scss";

const ChannelBoard = ({
  userDetails,
  channelDetails,
  getTasksSemiData,
  projectsData,
}) => {
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (channelDetails)
      getTasksSemiData(userDetails?.userName, channelDetails?.channelId, token);
  }, [channelDetails, getTasksSemiData, userDetails, token]);

  return (
    <div className="channelBoard__main">
      <div className="channelBoard__main__text">
        <h1 className="channelBoard__main__text__navi">
          {projectsData?.name} / <span>{channelDetails.channelName}</span>
        </h1>
        <h1 className="channelBoard__main__text__title"> {channelDetails.channelKey}'s DashBoard</h1>
        <h2 className="channelBoard__main__text__content">{channelDetails.channelDescription}</h2>
        <h2 className="channelBoard__main__text__content">{channelDetails.channelType}</h2>
      </div>
      <div className="channelBoard__main__helpers">
        </div>
      <div className="channelBoard__main__board">
        <TaskMainBoard />
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ auth, channel, task, project }) => {
  return {
    ...auth,
    ...channel,
    ...task,
    ...project,
  };
};
const mapStoreDispatchToProps = (dispatch) => {
  return {
    ...getTaskActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapStoreDispatchToProps
)(ChannelBoard);
