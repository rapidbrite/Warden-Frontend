import React from "react";
import "../../../scss/Tasks/task.scss";
import TaskSemi from "./TaskSemi";
import axios from "axios";
import URL from "../../../api/URL.js";

import { connect } from "react-redux";
import { getTaskActions } from "../../../store/actions/taskActions";
import { getSnackbarActions } from "../../../store/actions/snackbarActions";
import { Droppable } from "react-beautiful-dnd";
const TaskListView = ({
  k,
  tasks,
  userDetails,
  channelDetails,
  tasksSemiData,
  setNewTaskSemiData,
  setSnackbar,
}) => {
  //console.log(tasksSemiData);
  const [text, setText] = React.useState("");
  const [taskadded, setTaskadded] = React.useState(false);
  const [taskDeleted, setTaskDeleted] = React.useState(false);

  const bottomRef = React.useRef(null);



  const createNewTask = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      // console.log(text);
      const data = {
        userName: userDetails.userName,
        taskName: text,
        taskStatus: k,
        channelId: channelDetails.channelId,
        token: localStorage.getItem("token"),
      };
      const response = await axios.post(`${URL}/task/create`, data);
      if (response.data.statusCode === 200) {
        const newTasksSemiData = tasksSemiData;
        newTasksSemiData[k].push(response.data.data);

        setNewTaskSemiData(newTasksSemiData);
        setText("");
        taskadded ? setTaskadded(false) : setTaskadded(true);
        setSnackbar(true, "Task created successfully", "success");
      } else {
        setSnackbar(true, "Something went wrong", "error");
      }
    }
  };

  const sendTextWhenEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createNewTask(e);
    }
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [setNewTaskSemiData, tasksSemiData, taskadded]);
  React.useEffect(() => {}, [taskDeleted]);

  return (
    <div>
      <h1 className="taskmainboard__map__statustitle">
        {k === "ToDo"
          ? "To Do"
          : k === "InProgress"
          ? "In Progress"
          : k === "Done"
          ? "Done"
          : k}
      </h1>
      <Droppable droppableId={k}>
        {(provided, snapshot) => (
      <div  
      ref={provided.innerRef}
      {...provided.droppableProps}
      isDraggingOver={snapshot.isDraggingOver}
      className={`taskmainboard__tasklist ${snapshot.isDraggingOver ? "taskmainboard__tasklist__draggingover" : ""}`}
      >
        {tasks.map((task,index) => {
          return (

            <div
              key={index}
              className="taskmainboard__tasklist__task"
              
              
            >
              <TaskSemi
                key={task?.taskId}
                task={task}
                k={k}
                channelId={channelDetails.channelId}
                userName={userDetails.userName}
                taskDeleted={taskDeleted}
                setTaskDeleted={setTaskDeleted}
              />
            </div>
          );
        })}
        {provided.placeholder}

        <div ref={bottomRef} />
      </div>
        )}
      </Droppable>
      <div className="taskmainboard__map__create">
        {/* <div className="taskmainboard__tasklist__createarea"> */}
        <textarea
          placeholder="What needs to be done?"
          id="taskmainboard__createtextarea"
          value={text}
          // resize="none"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={sendTextWhenEnter}
        ></textarea>
        {/* </div> */}

        <div className="taskmainboard__map__createissue">
          <h1 className="taskmainboard__map__createissue__h1"> + </h1>
          <h2 className="taskmainboard__map__createissue__h2">Create Issue</h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ channel, auth, task }) => {
  return {
    ...auth,
    ...channel,
    ...task,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getTaskActions(dispatch),
    ...getSnackbarActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(TaskListView);
