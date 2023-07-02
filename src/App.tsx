import React, { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TaskDetailsPage from "./pages/TaskDetailsPage/TaskDetailsPage";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import { fetchTasks } from "./data/api";
import type { Task } from "./data/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
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
  }, []);

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const handleDeleteTask = useCallback((taskToDelete: Task) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskToDelete.id));
  }, []);

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
          loader: async () => tasks,
        },
        {
          path: "/tasks/:id",
          element: (
            <TaskDetailsPage
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ),
          loader: async ({ params }) =>
            tasks.find((task) => String(task.id) === params.id) ?? null,
        },
        {
          path: "*",
          element: <div>Page not found</div>,
        },
      ],
    },
  ]);

  return error ? (
    <div>Error loading tasks</div>
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
