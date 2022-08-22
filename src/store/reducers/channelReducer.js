import { channelConstants } from "../actions/channelActions"

const initialState = {
    channelsSemiData : [],
    channelDetails: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case channelConstants.SET_CHANNELS_SEMIDATA:
            return {
                ...state,
                channelsSemiData: action.channelsSemiData
            }
        case channelConstants.SET_NEW_CHANNEL_SEMIDATA:
            return {
                ...state,
                channelsSemiData: [...state.channelsSemiData, action.channelsSemiData]
            }
        case channelConstants.SET_CHANNEL_DETAILS:
            return {
                ...state,
                channelDetails: action.channelDetails
            }
        default:
            return state
    }
}

export default reducer;