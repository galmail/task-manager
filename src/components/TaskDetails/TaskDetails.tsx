import React, { useState, useEffect } from "react";
import type { Task } from "../../data/types";

function TaskDetails() {
  const task: Task = {
    id: 1,
    name: "task1",
    description: "desc1",
    type: "general",
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
      &nbsp;&nbsp;
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskDetails;
