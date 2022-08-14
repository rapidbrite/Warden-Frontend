import { chatConstants } from "../actions/chatActions";


const initialState = {
    chatMessages: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case chatConstants.SET_CHAT_MESSAGES:
            return {
                ...state,
                chatMessages: action.chatMessages
            }
        case chatConstants.SET_CHAT_MESSAGE:
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.chatMessage]
            }
        default:
            return state
    }
}

export default reducer;