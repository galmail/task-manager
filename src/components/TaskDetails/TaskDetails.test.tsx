import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDetails from "./TaskDetails";
// eslint-disable-next-line jest/no-mocks-import
import tasksData from "../../__mocks__/tasks.json";
import type { Task } from "../../data/types";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

describe("TaskDetails tests", () => {
  const tasks = tasksData as Task[];

  test("renders task details", () => {
    render(<TaskDetails tasks={tasks} onEdit={jest.fn} onDelete={jest.fn} />);
    const taskName = screen.getByText(/Task 1/);
    const taskDescription = screen.getByText(/Description 1/);
    expect(taskName).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
  });
});
