import React from "react";
import axios from "axios";
import URL from "../../../api/URL.js";

//files/components
import "../../../scss/Tasks/task.scss";

import { connect } from "react-redux";
import { getTaskActions } from "../../../store/actions/taskActions";
import { getSnackbarActions } from "../../../store/actions/snackbarActions";
//rbd
import { DragDropContext } from "react-beautiful-dnd";
import TaskListView from "./TaskListView";

const TaskMainBoard = ({
  tasksSemiData,
  setNewTaskSemiData,
  userDetails,
  channelId,
  setSnackbar,
}) => {
  const [keys, setKeys] = React.useState();

  const onDragEnd = async (result) => {
    //console.log("result", result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const newTasksSemiData = tasksSemiData;

      //Just reordering the tasks
      const sourceTask = newTasksSemiData[source.droppableId][source.index];
      newTasksSemiData[source.droppableId].splice(source.index, 1);
      newTasksSemiData[destination.droppableId].splice(
        destination.index,
        0,
        sourceTask
      );

      const data = {
        userName: userDetails.userName,
        channelId: channelId,
        taskStatusName: source.droppableId,
        realtaskId: draggableId,
        sourceindex: source.index,
        destinationindex: destination.index,
        token: localStorage.getItem("token"),
      };
      const response = await axios.post(`${URL}/task/reorder`, data);
      if (response.data.statusCode === 200) {
        setNewTaskSemiData(newTasksSemiData);
      } else {
        //console.log(response.data.message);
        setSnackbar(true, "Something went wrong", "error");
      }
    }

    //if the task is moved to another status
    else {
      const newTasksSemiData = tasksSemiData;
      const sourceTask = newTasksSemiData[source.droppableId][source.index];
      newTasksSemiData[source.droppableId].splice(source.index, 1);
      newTasksSemiData[destination.droppableId].splice( destination.index, 0, sourceTask);
      

      const data = {
        userName: userDetails.userName,
        channelId: channelId,
        sourcetaskStatusName : source.droppableId,
        destinationStatusName : destination.droppableId,
        realtaskId: draggableId,
        sourceindex: source.index,
        destinationindex: destination.index,
        token: localStorage.getItem("token"),
      };

      const response = await axios.post(`${URL}/task/move`, data);
      if (response.data.statusCode === 200) {
        setNewTaskSemiData(newTasksSemiData);
      } else {
        //console.log(response.data.message);
        setSnackbar(true, "Something went wrong", "error");
      }


    }

  };

  React.useEffect(() => {
    if (tasksSemiData) setKeys(Object.keys(tasksSemiData));
  }, [tasksSemiData]);

  return (
    <div className="taskmainboard">
      <DragDropContext onDragEnd={onDragEnd}>
        {keys?.map((k) => {
          return (
            <div className="taskmainboard__map">
              <TaskListView key={k} k={k} tasks={tasksSemiData[k]} />
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = ({ task, auth }) => {
  return {
    ...task,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getTaskActions(dispatch),
    ...getSnackbarActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(TaskMainBoard);
