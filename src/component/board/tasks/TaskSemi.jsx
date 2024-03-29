import React from "react";
import "../../../scss/Tasks/task.scss";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";

import Dialog from "@mui/material/Dialog";

import axios from "axios";
import URL from "../../../api/URL.js";
import { connect } from "react-redux";
import { getSnackbarActions } from "../../../store/actions/snackbarActions";
import { getTaskActions } from "../../../store/actions/taskActions";
import ConfirmPopUp from "../../ConfirmPopUp";
import { Draggable } from "react-beautiful-dnd";
import TaskDetailsMain from "./taskDetails/TaskDetailsMain.jsx";

const TaskSemi = ({
  task,
  channelId,
  k,
  userName,
  tasksSemiData,
  setNewTaskSemiData,
  setTaskDeleted,
  taskDeleted,
  setSnackbar,
}) => {
  const [dopen, setDopen] = React.useState(false);
 const [taskDetailsOpen, setTaskDetailsOpen] = React.useState(false);

  const handleDeleteOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDopen(true);
  };
  const handleDeleteClose = () => {
    setDopen(false);
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

      setSnackbar(true, "Task deleted successfully", "success");
    } else {
      setSnackbar(true, "Something went wrong", "error");
    }
  };
  const handleTaskDetailsOpen = () => {
    setTaskDetailsOpen(true);
  }; 
  const handleTaskDetailsClose = () => {
    setTaskDetailsOpen(false);
  }


  return (
    <Draggable draggableId={task.taskId} index={tasksSemiData[k].indexOf(task)}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={`taskmainboard__tasklist__taskin  ${
            snapshot.isDragging
              ? "taskmainboard__tasklist__taskin__dragging"
              : ""
          }`} >
          <Dialog open={taskDetailsOpen} onClose={handleTaskDetailsClose}>
            <TaskDetailsMain handleClose={handleTaskDetailsClose} />
          </Dialog>



        
          <Dialog open={dopen} onClose={handleDeleteClose}>
            
            <ConfirmPopUp
              title="Are you sure?"
              desc="You want to delete this task?"
              handleClose={handleDeleteClose}
              handleConfirm={deleteTask}
            />
          </Dialog>
          <div onClick={handleTaskDetailsOpen}>
          <h1 >{task.taskName}</h1>
          <div className="taskmainboard__tasklist__taskin__type" >
            {task?.taskType.map((t) => (
              <h2>{t}</h2>
            ))}
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
              <div
                className="taskmainboard__tasklist__taskin__footer__right__2"
                onClick={(event) => handleDeleteOpen(event)}
              >
                <RiDeleteBin6Line />
              </div>
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
