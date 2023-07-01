import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
// eslint-disable-next-line jest/no-mocks-import
import tasksData from "../../__mocks__/tasks.json";
import type { Task } from "../../data/types";
import TaskListPage from "./TaskListPage";

describe.skip("TaskListPage tests", () => {
  const tasks = tasksData as Task[];

  test("renders task list", () => {
    render(
      <MemoryRouter initialEntries={["/tasks"]}>
        <Routes>
          <Route path="/tasks" element={<TaskListPage />} />
        </Routes>
      </MemoryRouter>
    );

    const taskName1 = screen.getByText(/Task 1/);
    const taskName2 = screen.getByText(/Task 2/);

    expect(taskName1).toBeInTheDocument();
    expect(taskName2).toBeInTheDocument();
  });

  test("renders filtered tasks when loaded", () => {
    const query = "task 3";
    render(
      <MemoryRouter initialEntries={[`/tasks?q=${query}`]}>
        <Routes>
          <Route path="/tasks" element={<TaskListPage />} />
        </Routes>
      </MemoryRouter>
    );

    const taskName1 = screen.queryByText(/Task 1/);
    const taskName2 = screen.queryByText(/Task 2/);
    const taskName3 = screen.queryByText(/Task 3/);

    const searchInput = screen.getByTestId(
      "tasks-search-input"
    ) as HTMLInputElement;

    expect(taskName1).not.toBeInTheDocument();
    expect(taskName2).not.toBeInTheDocument();
    expect(taskName3).toBeInTheDocument();
    expect(searchInput.value).toBe(query);
  });
});
