import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDetails from "./TaskDetails";
import { Task, TaskType } from "../../data/types";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

describe("TaskDetails tests", () => {
  test("renders task details", () => {
    const task: Task = {
      id: 1,
      name: "Task 1",
      description: "Description 1",
      type: TaskType.GENERAL,
    };
    render(<TaskDetails task={task} onEdit={jest.fn} onDelete={jest.fn} />);
    const taskName = screen.getByText(/Task 1/);
    const taskDescription = screen.getByText(/Description 1/);
    expect(taskName).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
  });
});
