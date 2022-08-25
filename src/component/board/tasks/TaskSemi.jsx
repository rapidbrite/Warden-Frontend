import React from "react";
import "../../../scss/Tasks/task.scss";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDelete from "./ConfirmDelete";

import Dialog from '@mui/material/Dialog';

import axios from "axios";
import URL from "../../../api/URL.js";
import { connect } from "react-redux";
import { getSnackbarActions } from "../../../store/actions/snackbarActions";
import { getTaskActions } from "../../../store/actions/taskActions";

import { Draggable } from "react-beautiful-dnd";

const TaskSemi = ({
  task,
  channelId,
  k,
  userName,
  tasksSemiData,
  setNewTaskSemiData,
  setTaskDeleted,
  taskDeleted,
  setSnackbar
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const deleteTask = async () => {
    const data = {
      userName,
      taskId: task.taskId,
      channelId: channelId,
      token: localStorage.getItem("token"),
    };

    const response = await axios.post(`${URL}/task/delete`, data);
    //console.log(response);
    if (response.data.statusCode === 200) {
      const newTasksSemiData = tasksSemiData;
      newTasksSemiData[k].splice(newTasksSemiData[k].indexOf(task), 1);
      setNewTaskSemiData(newTasksSemiData);
      taskDeleted ? setTaskDeleted(false) : setTaskDeleted(true);

      setSnackbar(
         true,
         "Task deleted successfully",
        "success"
      );
    }
    else{
      setSnackbar(
        true,
        "Something went wrong",
        "error"
      );
    }
  };
 
  
  return (
    <Draggable draggableId={task.taskId} index={tasksSemiData[k].indexOf(task)}>
      {(provided, snapshot) => (
    <div 
    
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    isDragging={snapshot.isDragging} 

    className={`taskmainboard__tasklist__taskin  ${ snapshot.isDragging ? "taskmainboard__tasklist__taskin__dragging" : ""}`}>
    
      <Dialog open={open} onClose={handleClose} >
        <ConfirmDelete handleClose={handleClose} deleteTask={deleteTask} />
      </Dialog>
      <h1>{task.taskName}</h1>
      <div className="taskmainboard__tasklist__taskin__type">
        {task?.taskType ? <h2>{task.taskType}</h2> : null}
        <CgAdd id="taskmainboard__tasklist__taskin__type__icon" />
      </div>
      <div className="taskmainboard__tasklist__taskin__footer">
        <h3 className="taskmainboard__tasklist__taskin__footer__left">
          {task.taskKey}
        </h3>
        <div className="taskmainboard__tasklist__taskin__footer__right">
          <div
            className={`${
              task.taskAssignee &&
              "taskmainboard__tasklist__taskin__footer__right__1"
            }`}
          >
            {task.taskAssignee
              ? task.taskAssignee.slice(0, 1).toUpperCase()
              : ""}
          </div>
          <div className="taskmainboard__tasklist__taskin__footer__right__2" onClick={ handleClickOpen}>
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
    </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({ task }) => {
  return {
    ...task,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getSnackbarActions(dispatch),
    ...getTaskActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(TaskSemi);
