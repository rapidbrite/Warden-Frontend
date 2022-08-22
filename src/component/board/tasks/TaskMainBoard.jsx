import React from 'react'
import { connect } from 'react-redux';
import TaskListView from './TaskListView';
import "../../../scss/Tasks/task.scss"


const TaskMainBoard = ({tasksSemiData}) => {
    const [keys, setKeys] = React.useState();
    React.useEffect(() => {
        if(tasksSemiData)
        setKeys(Object.keys(tasksSemiData));
        //console.log(keys)
    } , [tasksSemiData])
  return (
    <div className='taskmainboard'>
        {
            keys?.map((key) => {
                //console.log(key)
                return (
                    <div className='taskmainboard__map'>
                <TaskListView k={key} tasks={tasksSemiData[key]} />
                </div>
                )
            }
            )
        }


        


    </div>
  )
}

const mapStoreStateToProps = ({ task }) => {
    return {
      
      ...task,
      
    };
  };

export default connect(mapStoreStateToProps)(TaskMainBoard);