import React from 'react'
import "../../../scss/Tasks/task.scss";


const ConfirmDelete = ({handleClose,deleteTask}) => {
  return (
    <div className='taskmainboard__confirmdelete'>
        
        <h1>Are you sure?</h1>
        <h2>You want to delete this task?</h2>
        <div className='taskmainboard__confirmdelete__buttons'>
            <div className='taskmainboard__confirmdelete__buttons__no' onClick={handleClose}>Cancel</div>
            <div className='taskmainboard__confirmdelete__buttons__yes' onClick={deleteTask}>Yes</div>
            
        </div>
    </div>
  )
}

export default ConfirmDelete