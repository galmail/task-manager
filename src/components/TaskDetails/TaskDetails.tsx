import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import type { Task } from "../../data/types";
import "./task-details.scss";

type TaskDetailsProps = {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: () => void;
};

function TaskDetails({ task, onEdit, onDelete }: TaskDetailsProps) {
  const [editingTask, setEditingTask] = useState(false);
  const [name, setName] = useState(task.name || "");
  const [description, setDescription] = useState(task.description || "");

  const handleDelete = () => {
    onDelete();
  };

  const handleEdit = () => {
    if (editingTask) {
      setEditingTask(false);
      onEdit({ ...task, name, description });
    } else {
      setEditingTask(true);
    }
  };

  return (
    <div className="task-details">
      {editingTask ? (
        <Stack direction="column" spacing={2} mt={1}>
          <TextField
            required
            id="task-name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ "data-testid": "task-name" }}
          />
          <TextField
            id="task-description"
            label="Description"
            placeholder="Task Description"
            multiline
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ "data-testid": "task-description" }}
          />
        </Stack>
      ) : (
        <>
          <Typography variant="h6" component="em">
            {name}
          </Typography>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </>
      )}

      <Stack direction="row" spacing={2} mt={1}>
        <Button
          data-testid="edit-button"
          onClick={handleEdit}
          disabled={!name || !description}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          {editingTask ? "Save" : "Edit"}
        </Button>
        <Button
          data-testid="delete-button"
          onClick={handleDelete}
          disabled={editingTask}
          color="warning"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
}

export default TaskDetails;
