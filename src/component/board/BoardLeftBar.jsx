import React from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getChannelActions } from "../../store/actions/channelActions";

import { CgAdd } from "react-icons/cg";


const BoardLeftBar = ({ channelsSemiData, projectId, setChannelId}) => {



  return (
    <div className="project__board__leftbar">
      <div className="project__board__leftbar__header">
        <h1>Channels</h1>
        <Link to={`/main/project/${projectId}/board/create`}>
          <CgAdd id="channel__create__icon" />
        </Link>
      </div>
      <div className="project__board__leftbar__content">
        {channelsSemiData?.map((channel, index) => {
          return (
            <Link to={`channel/${channel.channelKey}`} key={index}>
              <div
                onClick={()=> setChannelId(channel.channelId)}
                key={index}
                className="project__board__leftbar__content__channel"
              >
                {channel.channelKey} # {channel.channelName}
                
              </div>
            </Link>
          );
        })}
        
      </div>
    </div>
  );
}






const mapStateToProps = ({ channel, auth }) => {
  return {
    ...auth,
    ...channel,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getChannelActions(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(BoardLeftBar);


