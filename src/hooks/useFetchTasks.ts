import React, { useState, useEffect } from "react";
import { fetchTasks } from "../data/api";
import type { Task } from "../data/types";

export default function useFetchTasks() {
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

  return { tasks, loading, error };
}
