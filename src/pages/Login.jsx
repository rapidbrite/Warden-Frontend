import React from 'react'
import {BsGithub} from "react-icons/bs";
import {GiMagicHat} from "react-icons/gi";
import { motion } from "framer-motion"

// style
import "../scss/login.scss";

const Login = () => {
  const github = () => {
    window.open("https://zwvqkv-3333.preview.csb.app/auth/github", "_self");
  };
  return (
    <div className="login">
            <div id="login__bg"></div>
            <div className="login__header">
                <GiMagicHat id="login__icon"/>
                <h1>War<span>d</span>en</h1>
            </div>
            <div className="login__lower">
                <motion.div 
                    className="login__lower__box"
                    whileHover={{ scale: 1.1 }}
                >
                    <h1>Login With Github</h1>                     
                    <button onClick={github}>
                        <BsGithub/>
                    </button>
                </motion.div>
            </div> 
        </div>
  )
}

export default Login