import React from 'react'
import "../../../scss/Tasks/task.scss"
import TaskSemi from './TaskSemi'

const TaskListView = ({k,tasks}) => {
  //console.log(k)
  return (
    <div>
        <h1 className='taskmainboard__map__statustitle'>
          {
            k === 'ToDo' ? 'To Do' : k === 'InProgress' ? 'In Progress' : k === 'Done' ? 'Done' : k
          }
        </h1>
        <div className='taskmainboard__tasklist'>
        {

            tasks.map((task) => {
                return (<div key={task.taskId} className='taskmainboard__tasklist__task'>
                  <TaskSemi task={task} />
                  </div>)
            }
            ) 
        } 
        </div>
     </div>                   

  ) 

}

export default TaskListView