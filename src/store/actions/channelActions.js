import * as api from "../../api/getAllChannels";
import { getChannel } from "../../api/getChannel";

export const channelConstants = {
  SET_CHANNEL_DETAILS: "SET_CHANNEL_DETAILS",
  SET_CHANNELS_SEMIDATA: "SET_CHANNELS_SEMIDATA",
  SET_NEW_CHANNEL_SEMIDATA: "SET_NEW_CHANNEL_SEMIDATA",
};

export const getChannelActions = (dispatch) => {
  return {
    getChannelsSemiData: (userName, projectId, token) =>
      dispatch(getChannelsSemiData(userName, projectId, token)),
    setChannelDetails: (channelId, userName, token) =>
      dispatch(setChannelDetails(channelId, userName, token)),
    setNewChannelSemiData: (channelDetails) =>
      dispatch(setNewChannelSemiData(channelDetails)),
    setChannelData: (channelDetails) =>
      dispatch(setChannelData(channelDetails)),
    setChannelsSemiData: (channelsSemiData) =>
      dispatch(setChannelsSemiData(channelsSemiData)),
  };
};

const setChannelsSemiData = (channelsSemiData) => {
  return {
    type: channelConstants.SET_CHANNELS_SEMIDATA,
    channelsSemiData,
  };
};

const getChannelsSemiData = (userName, projectId, token) => {
  return (dispatch) => {
    api.getAllChannels(userName, projectId, token).then((response) => {
      // console.log(response);
      dispatch(setChannelsSemiData(response));
    });
  };
};
const setChannelDetails = (channelId, userName, token) => {
  return (dispatch) => {
    getChannel(channelId, userName, token).then((channelDetails) => {
      dispatch(setChannelData(channelDetails));
    });
  };
};

const setChannelData = (channelDetails) => {
  return {
    type: channelConstants.SET_CHANNEL_DETAILS,
    channelDetails,
  };
};

const setNewChannelSemiData = (newChannelSemiData) => {
  return {
    type: channelConstants.SET_NEW_CHANNEL_SEMIDATA,
    channelsSemiData: newChannelSemiData,
  };
};
