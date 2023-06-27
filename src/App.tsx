import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useFetchTasks } from "./hooks";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import type { Task } from "./data/types";

function App() {
  const { tasks, setTasks, loading, error } = useFetchTasks();

  if (error) {
    return <div>Error loading tasks</div>;
  } else if (loading) {
    return <div>Loading tasks...</div>;
  } else if (!tasks || tasks.length === 0) {
    return <div>There are no tasks available</div>;
  }

  const handleEditTask = (task: Task) => {
    setTasks((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = (task: Task) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} />} />
        <Route
          path="/tasks/:id"
          element={
            <TaskDetails
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
