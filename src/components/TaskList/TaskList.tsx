import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./task-list.scss";
import type { Task } from "../../data/types";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li className="task" key={task.id}>
            <Link to={`/tasks/${task.id}`} state={task}>
              <span className={`icon icon--${task.type}`}></span>
              <span>{task.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
