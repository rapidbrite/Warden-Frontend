import React from 'react'
import "../../scss/project/invite.scss";

import * as api from "../../api/searchUser";

// material ui
import { TextField } from '@mui/material';
import {Button} from '@mui/material';

// component
import UserBox from './UserBox';


const Invite = ({projectId}) => {
    const [search, setSearch] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const searchHandler = () => {
      api.searchUser(search, projectId).then(res => { 
            setUsers(res);
        })
    }
  return (
      <div className='project__invite'>
          <div className="project__invite__header">
              <TextField
                id='project__invite__header_text'
                label="Username" 
                type="text"
                placeholder="username"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                variant="filled"/>
                <Button 
                  variant="contained"
                  color="primary"
                  id='project__invite__header_text'
                  onClick={searchHandler}
              >
                  Search
                </Button>
          </div>
          <div className='project__invite__content'>
              {
                  users?.map(user => {
                    return <UserBox user={user} projectId={projectId}/>
                  })
              }
          </div>
    </div>
  )
}

export default Invite