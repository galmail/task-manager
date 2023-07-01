import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
// eslint-disable-next-line jest/no-mocks-import
import tasksData from "../../__mocks__/tasks.json";
import { TaskType, type Task } from "../../data/types";
import TaskList from "./TaskList";

jest.mock("react-router-dom", () => ({
  // ...(jest.requireActual("react-router-dom") as any),
  Link: (props: { to: string; children: ReactNode }) => (
    <a href={props.to}>{props.children}</a>
  ),
}));

describe("TaskList tests", () => {
  const tasks = tasksData as Task[];

  it("renders task list", () => {
    render(<TaskList tasks={tasks} />);
    expect(screen.getByText(/Task 1/)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/)).toBeInTheDocument();
    expect(screen.getByText(/Task 3/)).toBeInTheDocument();
    expect(screen.getByAltText(TaskType.MEDICATION)).toBeInTheDocument();
  });

  it("renders no tasks found message when tasks=0", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText(/No Tasks Found/)).toBeInTheDocument();
  });
});
