import React from 'react'
import "../../../scss/Tasks/task.scss"
import { CgAdd } from "react-icons/cg";
import {RiDeleteBin6Line } from "react-icons/ri";

const TaskSemi = ({task}) => {
  return (
    <div className='taskmainboard__tasklist__taskin'>
        <h1 >{task.taskName}</h1>
        <div className='taskmainboard__tasklist__taskin__type'>
        <h2 >{task.taskType}</h2>
        <CgAdd id='taskmainboard__tasklist__taskin__type__icon' />
        </div>
        <div className='taskmainboard__tasklist__taskin__footer'>
            <h3 className='taskmainboard__tasklist__taskin__footer__left'>{task.taskKey}</h3>
            <div className='taskmainboard__tasklist__taskin__footer__right'>
                <div className={`${task.taskAssignee && "taskmainboard__tasklist__taskin__footer__right__1"}`}>
                {task.taskAssignee ? task.taskAssignee.slice(0,1).toUpperCase()  : '' }
                </div>
                <div className='taskmainboard__tasklist__taskin__footer__right__2'>
                <RiDeleteBin6Line/></div>
            </div>

        </div>
    </div>
  )
}

export default TaskSemi