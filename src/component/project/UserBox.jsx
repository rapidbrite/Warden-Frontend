import React from 'react'
import "../../scss/project/invite.scss";
import {Button} from '@mui/material';

import * as api from "../../api/inviteUser";

import { connect } from "react-redux";

const UserBox = ({ user, userDetails, projectId }) => {
  const [invite, setInvited] = React.useState(null);
  const [inviteButton, setInviteButton] = React.useState(null);
 const token = localStorage.getItem("token");

  const inviteHandler = () => {
    api.inviteUser(user.userName, projectId, userDetails.userName, token).then(res => {
      //console.log(res);
      if(res?.statusCode === 200){
        setInvited("Invited");
        setInviteButton(false);
      }

    })
  }
  React.useEffect(()=>{
    if(user?.inviteStatus === "new"){
      setInviteButton(true);
      setInvited("Invite");
    }
    else {
      setInviteButton(false);
      setInvited("Invited");
    }
  },[])
  return (
      <div className="project__invite__content__userbox">
          <div className='project__invite__content__userbox__left'>
              <img src = {user.avatar} alt="none"/>
          </div>
          <div className='project__invite__content__userbox__right'>
              <h1>@{user.userName}</h1>
        <h2>{user.name}</h2>
        {
          inviteButton && <Button variant="contained" color="primary" onClick={inviteHandler}>{invite}</Button>
        }
        {
          !inviteButton && <Button variant="contained" color="primary" disabled>{invite}</Button>
        }
          </div>
    </div>
  )
}

const mapStoreStateToProps = ({ auth }) => { 
  return {
      ...auth,
  }
}

export default connect(mapStoreStateToProps)(UserBox);