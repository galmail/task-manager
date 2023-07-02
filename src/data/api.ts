import axios from "axios";
import type { Task } from "./types";

const tasksEndpoint = "https://adam-deleteme.s3.amazonaws.com/tasks.json";

export const fetchTasks = async (): Promise<Task[]> => {
  console.log("fetching tasks", tasksEndpoint);
  const response = await axios.get<Task[]>(tasksEndpoint);
  return response.data;
};
