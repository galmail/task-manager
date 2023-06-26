import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchTasks from "../hooks/useFetchTasks";
import type { Task } from "../data/types";

function TaskList() {
  const { tasks, loading, error } = useFetchTasks();

  if (error) {
    return <div>Error loading tasks</div>;
  } else if (loading) {
    return <div>Loading tasks...</div>;
  } else if (!tasks || tasks.length === 0) {
    return <div>There are no tasks available</div>;
  }
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>
              <span>{task.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
