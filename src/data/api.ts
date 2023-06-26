import axios from "axios";
import type { Task } from "./types";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(
    "https://adam-deleteme.s3.amazonaws.com/tasks.json"
  );
  return response.data;
};
