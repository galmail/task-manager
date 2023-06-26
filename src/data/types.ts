export interface Task {
  id: number;
  name: string;
  description: string;
  type: "general" | "hydration" | "medication" | "nutrition";
}
