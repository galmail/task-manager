import React, { useState } from "react";
import type { Task } from "../../data/types";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
            id="outlined-required"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleEdit}
          disabled={!name || !description}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          {editingTask ? "Save" : "Edit"}
        </Button>
        <Button
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
