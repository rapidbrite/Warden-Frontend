import React from "react";
import "../../../../scss/Tasks/taskdetails.scss";

function TaskDetailsMain({ handleClose }) {
  return (
    <div className="taskDetailsMain">
      <div className="taskDetailsMain__header" onClick={handleClose}>
        <h1>Task id</h1>
        <h2 onClick={handleClose}>close X</h2>
      </div>

      <div className="taskDetailsMain__main">
        <div className="taskDetailsMain__main__left">
          <div className="taskDetailsMain__main__left__header">
            <h1>Task Name</h1>
            <button>Add attachment</button>
          </div>
          <div className="taskDetailsMain__main__left__body">
            <h2>Task Description</h2>
            <h3>add child task</h3>
          </div>
          <div className="taskDetailsMain__main__left__footer">
            <h3>Comment</h3>
          </div>
        </div>
        <div className="taskDetailsMain__main__right">
          <div className="taskDetailsMain__main__right__header">
            dropdown "[todo, inprogress,done]"
          </div>
          <div className="taskDetailsMain__main__right__body">
            <h3>Task Type</h3>
            <h4>Task Priority</h4>
            <h5>Task Assignee</h5>
            <h6>Task Reporter</h6>
            <h7>Task Start Date</h7>
            <h8>Task Due Date</h8>
          </div>
          <div className="taskDetailsMain__main__right__footer">
            <h4> created at </h4>
            <h4> updated at </h4>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>

      
  );
}

export default TaskDetailsMain;
