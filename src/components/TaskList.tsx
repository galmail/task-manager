import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTasks } from "../data/api";
import type { Task } from "../data/types";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
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
