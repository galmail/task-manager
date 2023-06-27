import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../../data/types";
import "./task-details.scss";

type TaskDetailsProps = {
  tasks: Task[];
  onEdit: (t: Task) => void;
};

function TaskDetails({ tasks, onEdit }: TaskDetailsProps) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === Number(id));
  const [editingTask, setEditingTask] = useState(false);
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleDelete = () => {};

  const handleEdit = () => {
    if (editingTask) {
      setEditingTask(false);
      onEdit({
        id: task!.id,
        name,
        description,
        type: task!.type,
      });
    } else {
      setEditingTask(true);
    }
  };

  return task ? (
    <div className="task-details">
      {editingTask ? (
        <>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            id="description"
            rows={4}
            cols={50}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2>{name}</h2>
          <p>{description}</p>
        </>
      )}
      <div className="action-buttons">
        <button onClick={handleEdit} disabled={!name || !description}>
          {editingTask ? "Save" : "Edit"}
        </button>
        &nbsp;&nbsp;
        <button onClick={handleDelete} disabled={editingTask}>
          Delete
        </button>
      </div>
    </div>
  ) : (
    <div>There is no task with id {id}</div>
  );
}

export default TaskDetails;
