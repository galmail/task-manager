import axios from "axios";
import type { Task } from "./types";

export const fetchTasks = async (): Promise<Task[]> => {
  console.debug("fetching tasks");
  const response = await axios.get<Task[]>(
    "https://adam-deleteme.s3.amazonaws.com/tasks.json"
  );
  return response.data;
};
