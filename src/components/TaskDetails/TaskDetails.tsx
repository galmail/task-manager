import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../../data/types";

type TaskDetailsProps = {
  tasks: Task[];
};

function TaskDetails({ tasks }: TaskDetailsProps) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === Number(id));

  const handleDelete = () => {};

  const handleEdit = () => {};

  return task ? (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
      &nbsp;&nbsp;
      <button onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <div>There is no task with id {id}</div>
  );
}

export default TaskDetails;
