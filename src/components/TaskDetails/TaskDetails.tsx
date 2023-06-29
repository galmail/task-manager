import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../../data/types";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import TopBar from "../TopBar";

import "./task-details.scss";

type TaskDetailsProps = {
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
};

function TaskDetails({ tasks, onEdit, onDelete }: TaskDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));
  const [editingTask, setEditingTask] = useState(false);
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleDelete = () => {
    onDelete(task!);
    navigate("/tasks");
  };

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
    <>
      <TopBar title="Task Details" goBack={() => navigate(-1)} />
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
    </>
  ) : (
    <div>There is no task with id {id}</div>
  );
}

export default TaskDetails;
