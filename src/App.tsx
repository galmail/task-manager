import React, { useState } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import type { Task } from "./data/types";
import TaskDetailsPage from "./pages/TaskDetailsPage/TaskDetailsPage";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import { fetchTasks } from "./data/api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTasks = () => {
    setLoading(true);
    return fetchTasks()
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) {
    return <div>Error loading tasks</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  }

  const handleEditTask = (updatedTask: Task) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskToDelete.id));
  };

  const router = createBrowserRouter([
    {
      children: [
        {
          path: "/",
          element: <Navigate to="/tasks" />,
        },
        {
          path: "/tasks",
          element: <TaskListPage />,
          loader: async () => {
            if (tasks.length === 0) await loadTasks();
            return tasks;
          },
        },
        {
          path: "/tasks/:id",
          element: (
            <TaskDetailsPage
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ),
          loader: async ({ params }) => {
            if (tasks.length === 0) await loadTasks();
            return tasks.find((task) => String(task.id) === params.id);
          },
        },
        {
          path: "*",
          element: <div>Page not found</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
