import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line jest/no-mocks-import
import tasksData from "../../__mocks__/tasks.json";
import TaskDetailsPage from "./TaskDetailsPage";
import type { Task } from "../../data/types";

const wait = (ms: number) =>
  new Promise((callback) => {
    setTimeout(callback, ms);
  });

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("TaskDetailsPage tests", () => {
  const tasks = tasksData as Task[];
  const callbacks = {
    onEditTask: jest.fn,
    onDeleteTask: jest.fn,
  };
  const routesWithLoader = (loader: () => Promise<Task | null>) => [
    {
      path: "/tasks/:id",
      element: <TaskDetailsPage {...callbacks} />,
      loader,
    },
  ];

  it("renders task details page", async () => {
    const loader = async () => tasks[0];
    render(
      <RouterProvider
        router={createMemoryRouter(routesWithLoader(loader), {
          initialEntries: ["/tasks/1"],
        })}
      />
    );

    const taskName1 = await screen.findByText(/Task 1/);
    const taskDescription1 = await screen.findByText(/Description 1/);

    expect(taskName1).toBeInTheDocument();
    expect(taskDescription1).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("renders Task Not Found", async () => {
    const loader = async () => null;
    render(
      <RouterProvider
        router={createMemoryRouter(routesWithLoader(loader), {
          initialEntries: ["/tasks/9"],
        })}
      />
    );

    const taskNotFound = await screen.findByText("Task Not Found");
    expect(taskNotFound).toBeInTheDocument();
  });

  it("redirects to /tasks on delete", async () => {
    jest.spyOn(callbacks, "onDeleteTask");

    const loader = async () => tasks[0];
    render(
      <RouterProvider
        router={createMemoryRouter(routesWithLoader(loader), {
          initialEntries: ["/tasks/1"],
        })}
      />
    );

    const deleteButton = await screen.findByTestId("delete-button");
    await userEvent.click(deleteButton);

    expect(callbacks.onDeleteTask).toHaveBeenCalledWith(tasks[0]);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/tasks");
  });
});
