import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import {
    Routes,
    Route,
  } from "react-router-dom";

// component
import Header from "../component/main/Header";
import Leftbar from '../component/main/Leftbar';
// import Footer from '../component/main/Footer';
import CutomizedSnackbar from "../component/CustomizedSnackbar";
import Profile from "../component/profile/Profile";
import Project from "../component/project/Project";

// redux
import { connect } from "react-redux";
import { getAuthActions } from "../store/actions/authActions";
import { getProjectActions } from '../store/actions/projectActions';
import {getNotificationActions} from "../store/actions/notificationActions";

// style
import "../scss/main.scss";
// connectWithSocketServer
import {connectWithSocketServer,addConnectedUserToSocket} from "../socket/socketConnection";

// apis

const Main = ({login,getProjectsSemiData,userDetails,getNotifications}) => {
    const navigate = useNavigate();
    window.onbeforeunload = ()=>"";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token ) {
            navigate('/login');
        }
        connectWithSocketServer();
        addConnectedUserToSocket(userDetails?.userName);
        login(token);
        getProjectsSemiData(userDetails?.userName,token);
        getNotifications(userDetails?.userName, token);
    }, [userDetails?.userName,login,getProjectsSemiData,navigate,getNotifications]);
    return (
        <div className='main'>
            <Header />
            <div className='main__body'>
                <Leftbar />
                <div className='main__dashboard'>
                    <Routes>
                        <Route path="/profile/*" element={<Profile/>} />
                        <Route path="/project/:id/*" element={<Project />}/>
                    </Routes>
                    
                </div>   
                {/* <Rightbar/> */}
            </div>
            <CutomizedSnackbar/>
        </div>
    )
}

const mapActionsToProps = (dispatch) =>{
    return {
        ...getAuthActions(dispatch),
        ...getProjectActions(dispatch),
        ...getNotificationActions(dispatch)
    }
}

const mapStoreStateToProps = ({ auth, project }) => { 
    return {
        ...auth,
        ...project
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Main);