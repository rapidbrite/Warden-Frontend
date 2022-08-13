import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import "../../scss/header/invitation.scss";
//GrFormClose
//TiTick
import { GrFormClose } from "react-icons/gr";
import { TiTick } from "react-icons/ti";

import {acceptInvitation} from "../../api/acceptInvitation";


// redux
import { connect } from "react-redux";
import { getNotificationActions } from "../../store/actions/notificationActions";
import {getProjectActions} from "../../store/actions/projectActions";


const Invitation = ({invitations,userDetails,getNotifications,setNewProjectSemiData}) => {
  const token = localStorage.getItem('token');

  const acceptInvitationHandler = (index) => { 
    const invitation = invitations?.slice(0).reverse()[index];
    const data = {
      userName : userDetails?.userName,
      notificationId : invitation?.id,
      invitationId : invitation?.invitation
    }
    acceptInvitation(data).then(res => { 
      console.log(res);
      if(res){
        getNotifications(userDetails?.userName, token);
        setNewProjectSemiData(res);
      }
    })
  }

  return (
    <div className='invitation__tab'>
      {
        invitations?.slice(0).reverse().map((invitation, index) => { 
          return (
            <div className='invitation__tab__item' key={index}>
              <h1>{invitation.Message}</h1>

              {invitation.status === "unread" && 
                (
                  <div className='invitation__tab__item__buttons' >
              <Tooltip
                title="Accept"
                placement="bottom"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                            height: '2.5rem',
                            width: 'auto',
                            fontSize : '1.2rem',
                            color: '#1f62ff',
                            border : '1px solid #1f62ff',
                            bgcolor: 'common.white',
                            '& .MuiTooltip-arrow': {
                                color: '#1f62ff'
                            },
                      },
                    },
                  }}
              >
                <div onClick={() => acceptInvitationHandler(index)}>
                  <TiTick />
                </div>
              </Tooltip>
              <Tooltip
                title="Reject"
                placement="bottom"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                            height: '2.5rem',
                            width: 'auto',
                            fontSize : '1.2rem',
                            color: '#000',
                            border : '1px solid #000',
                            bgcolor: 'common.white',
                            '& .MuiTooltip-arrow': {
                                color: '#000'
                            },
                      },
                    },
                  }}
              >
                <div>
                  <GrFormClose />
                </div>
              </Tooltip>
     
              </div>
                ) 
              }
            </div>
          )
        }
        )
      }
    </div>
  )
}









const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

const mapActionsToProps = (dispatch) =>{
  return {
      ...getProjectActions(dispatch),
      ...getNotificationActions(dispatch)
  }
}

export default connect(mapStoreStateToProps,mapActionsToProps)(Invitation)

