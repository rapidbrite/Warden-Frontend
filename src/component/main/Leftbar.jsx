import React from 'react'
import { Link } from 'react-router-dom';

import "../../scss/leftbar/leftbar.scss";


// material ui
// import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
// redux
import { connect } from "react-redux";

// component
import Avatar from '../leftbar/Avatar';
import CreateProject from '../leftbar/CreateProject';


const  Leftbar = ({projectsSemiData}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div className='leftbar'>
      <Dialog open={open}>
        <CreateProject handleClose={handleClose} />
      </Dialog>
      <div className='leftbar__projects'>
        {
          projectsSemiData?.map((project, index) => {
            return (
              <Link to={`/main/project/${project?.projectId}/board`} key={index}>
                <Avatar char={project.name.slice(0, 1)} tooltip={project.name} projectIcon={project.projectIcon} projectId={ project?.projectId} />
              </Link>
            )
          })
        }
      </div>
      <div className='leftbar__create' onClick={handleClickOpen}>
        <Avatar char='+' create={true} tooltip="create project"/>
      </div>
    </div>
  )
}

const mapStoreStateToProps = ({ auth, project }) => { 
  return {
    ...auth,
    ...project
  }
}

export default connect(mapStoreStateToProps)(Leftbar);