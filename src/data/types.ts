export enum TaskType {
  GENERAL = "general",
  HYDRATION = "hydration",
  MEDICATION = "medication",
  NUTRITION = "nutrition",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  type: TaskType;
}
