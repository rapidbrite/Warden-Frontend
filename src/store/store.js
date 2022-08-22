import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';
import snackbarReducer from "./reducers/snackbarReducer";
import notificationReducer from "./reducers/notificationReducer";
import chatReducer from "./reducers/chatReducer";
import channelReducer from "./reducers/channelReducer";
import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    project : projectReducer,
    snackbar: snackbarReducer,
    notification: notificationReducer,
    chat: chatReducer,
    channel: channelReducer,
    task: taskReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;