import React from 'react'
import { Link , useNavigate } from "react-router-dom";
import {
  Routes,
  Route,
} from "react-router-dom";

// component
import ProfileTask from './ProfileTask';
import ProfileDashboard from './ProfileDashboard';


import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import {AiFillGithub} from "react-icons/ai";
// scss
import "../../scss/profile/profile.scss";
import { motion } from "framer-motion"

// redux
import { connect } from "react-redux";



const Profile = ({userDetails}) => {
    const navigate = useNavigate();
  return (
      <div className='profile'>
          
          {/* left side */}
          <div className='profile__menu'>
              <div className='profile__menu__header'>
                  <div className="profile__menu__header__button">
                    <div>
                        
                            <RiArrowGoBackFill onClick={() => navigate(-1)}/>
                        
                    </div>
                      <div>
                          <a href={`https://github.com/${userDetails?.userName}`} rel="noreferrer"  target="_blank">
                            <AiFillGithub />
                          </a>
                    </div>
                  </div>
                  <div className='profile__menu__header__avatar'>
                      <div className="profile__menu__header__avatar__border">
                          <img src={userDetails?.avatar} alt='user avatar' />
                     </div>
                  </div>
                  <div className='profile__menu__header__details'>
                      <h1>Hello, {userDetails?.name}</h1>
                      <h3>{userDetails?.email}</h3>
                  </div>
              </div>
              <div className='profile__menu__setting'>
                  {/* setting, tasks, Dashboard */}
                    <motion.div
                      className='profile__menu__setting__div'
                      whileHover={{ scale: 1.1 , x : "-5%", y : "-5%" }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                        >
                    
                      <MdDashboard className='profile__menu__setting__div__icon' />
                    <Link to="/main/profile/dashboard">
                      
                        <h3>Dashboard</h3>
                    </Link>
                      </motion.div>
                  <motion.div
                      className='profile__menu__setting__div'
                      whileHover={{ scale: 1.1, x : "5%" , y : "-5%" }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                  >
                    
                      <FaTasks className='profile__menu__setting__div__icon' />
                  <Link to="/main/profile/task">
                    
                        <h3>Tasks</h3>
                  </Link>
                  </motion.div>
              </div>
          </div>



            {/* right side  */}
      <div className='profile__content'>
              <Routes>
                <Route path="/task" element={<ProfileTask/>} />
                <Route path="/dashboard" element={<ProfileDashboard />}/>
              </Routes>
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

export default connect(mapStoreStateToProps)(Profile)