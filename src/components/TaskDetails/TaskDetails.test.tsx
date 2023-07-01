import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskDetails from "./TaskDetails";
import { Task, TaskType } from "../../data/types";

describe("TaskDetails tests", () => {
  const task: Task = {
    id: 1,
    name: "Task 1",
    description: "Description 1",
    type: TaskType.GENERAL,
  };

  it("renders task details", () => {
    render(<TaskDetails task={task} onEdit={jest.fn} onDelete={jest.fn} />);
    const taskName = screen.getByText(/Task 1/);
    const taskDescription = screen.getByText(/Description 1/);
    expect(taskName).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
  });

  it("can edit task name and description", async () => {
    const callbacks = {
      onEdit: jest.fn,
      onDelete: jest.fn,
    };
    jest.spyOn(callbacks, "onEdit");
    render(<TaskDetails task={task} {...callbacks} />);
    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toHaveTextContent("Edit");
    await userEvent.click(editButton);
    expect(editButton).toHaveTextContent("Save");
    const nameTextfield = screen.getByTestId("task-name");
    const descriptionTextfield = screen.getByTestId("task-description");
    await userEvent.type(nameTextfield, ": my super task");
    await userEvent.type(descriptionTextfield, ": my super task description");
    await userEvent.click(editButton);
    expect(editButton).toHaveTextContent("Edit");
    expect(callbacks.onEdit).toHaveBeenCalledWith({
      ...task,
      name: "Task 1: my super task",
      description: "Description 1: my super task description",
    });
  });

  it("can delete task", async () => {
    const callbacks = {
      onEdit: jest.fn,
      onDelete: jest.fn,
    };
    jest.spyOn(callbacks, "onDelete");
    render(<TaskDetails task={task} {...callbacks} />);
    const deleteButton = screen.getByTestId("delete-button");
    expect(deleteButton).toHaveTextContent("Delete");
    await userEvent.click(deleteButton);
    expect(callbacks.onDelete).toHaveBeenCalled();
  });
});
