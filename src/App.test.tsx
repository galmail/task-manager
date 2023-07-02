import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import * as api from "./data/api";
// eslint-disable-next-line jest/no-mocks-import
import tasksData from "./__mocks__/tasks.json";
import type { Task } from "./data/types";
import App from "./App";

describe("App component", () => {
  it('displays "Loading..." when loading tasks', async () => {
    jest
      .spyOn(api, "fetchTasks")
      .mockImplementationOnce(async () => Promise.resolve([]));
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it('displays "Error loading tasks" when tasks fail to load', async () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => {}); // Suppress console.error output
    jest
      .spyOn(api, "fetchTasks")
      .mockImplementationOnce(async () =>
        Promise.reject(new Error("Failed to fetch tasks"))
      );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Error loading tasks")).toBeInTheDocument();
    });
  });

  it("displays the task list when tasks are loaded successfully", async () => {
    const tasks = tasksData as Task[];
    jest
      .spyOn(api, "fetchTasks")
      .mockImplementationOnce(async () => Promise.resolve(tasks));
    render(<App />);

    const searchInput = await screen.findByTestId("tasks-search-input");
    const taskName1 = await screen.findByText(/Task 1/);
    const taskDescription1 = await screen.findByText(/Description 1/);
    const taskName2 = await screen.findByText(/Task 2/);
    const taskDescription2 = await screen.findByText(/Description 2/);

    expect(taskName1).toBeInTheDocument();
    expect(taskDescription1).toBeInTheDocument();
    expect(taskName2).toBeInTheDocument();
    expect(taskDescription2).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
