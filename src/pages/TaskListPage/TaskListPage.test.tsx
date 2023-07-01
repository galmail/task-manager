import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
// eslint-disable-next-line jest/no-mocks-import
import tasksData from "../../__mocks__/tasks.json";
import type { Task } from "../../data/types";
import TaskListPage from "./TaskListPage";
import userEvent from "@testing-library/user-event";

const wait = (ms: number) =>
  new Promise((callback) => {
    setTimeout(callback, ms);
  });

describe("TaskListPage tests", () => {
  const tasks = tasksData as Task[];
  const routes = [
    {
      path: "/tasks",
      element: <TaskListPage />,
      loader: async () => tasks,
    },
  ];

  it("renders task list page", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: ["/tasks"],
        })}
      />
    );

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

  it("can filter tasks by name", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: ["/tasks"],
        })}
      />
    );

    const searchInput = await screen.findByTestId("tasks-search-input");
    await userEvent.type(searchInput, "task 2");

    await wait(50); // wait a bit to get the filtered results

    const task1 = screen.queryByText(/Task 1/);
    const task2 = screen.queryByText(/Task 2/);
    const task3 = screen.queryByText(/Task 3/);

    expect(task1).not.toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(task3).not.toBeInTheDocument();
  });

  it("can filter tasks by description", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: ["/tasks"],
        })}
      />
    );

    const searchInput = await screen.findByTestId("tasks-search-input");
    await userEvent.type(searchInput, "tion 3");

    await wait(50); // wait a bit to get the filtered results

    const task1 = screen.queryByText(/Task 1/);
    const task2 = screen.queryByText(/Task 2/);
    const task3 = screen.queryByText(/Task 3/);

    expect(task1).not.toBeInTheDocument();
    expect(task2).not.toBeInTheDocument();
    expect(task3).toBeInTheDocument();
  });

  it("when filtering something else - show no tasks found", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: ["/tasks"],
        })}
      />
    );

    const searchInput = await screen.findByTestId("tasks-search-input");
    await userEvent.type(searchInput, "some other task");

    await wait(50); // wait a bit to get the filtered results

    expect(screen.getByText(/No Tasks Found/)).toBeInTheDocument();
  });

  it("filters task on query params when loading the page", async () => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: ["/tasks?q=3"],
        })}
      />
    );

    await wait(50); // wait a bit to get the filtered results

    const task1 = screen.queryByText(/Task 1/);
    const task2 = screen.queryByText(/Task 2/);
    const task3 = screen.queryByText(/Task 3/);

    expect(task1).not.toBeInTheDocument();
    expect(task2).not.toBeInTheDocument();
    expect(task3).toBeInTheDocument();
  });
});
