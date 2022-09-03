import React from 'react'
import "../../scss/rightbar.scss";
import { connect } from 'react-redux'
import Avatar from '../leftbar/Avatar';


function Rightbar({ projectsData }) {
  const users = projectsData?.users;
  const admins = projectsData?.admins;
  

  // console.log(projectsData);
  
  return (
    
 
    <div className='project__body__content__rightbar'>
      
      <h1>Admins</h1>
        {
          admins?.map((admin,index) => {
            return (
              <Avatar projectIcon={admin.avatar} key={index} tooltip={`@${admin?.userName}`} customCss = "admin__avatar__css"/>
            )
          })
        }
        <h1>Users</h1>
        {users?.map((user,index) => {
          return (
            <div>
            <Avatar projectIcon={user?.avatar} tooltip={`@${user?.userName}`} key={index} customCss="user__avatar__css" tooltipColor="#942aff"/>
            </div>
          )
        })}       
      </div>
   
  )
}


const mapStoreStateToProps = ({ auth, project }) => { 
  return {
    ...auth,
    ...project
  }
}




export default connect(mapStoreStateToProps)(Rightbar);