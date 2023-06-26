import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import useFetchTasks from "./hooks/useFetchTasks";

function App() {
  const { tasks, loading, error } = useFetchTasks();

  if (error) {
    return <div>Error loading tasks</div>;
  } else if (loading) {
    return <div>Loading tasks...</div>;
  } else if (!tasks || tasks.length === 0) {
    return <div>There are no tasks available</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} />} />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
