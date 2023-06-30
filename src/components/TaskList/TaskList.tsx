import React from "react";
import { Link } from "react-router-dom";
import type { Task } from "../../data/types";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import "./task-list.scss";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return tasks.length > 0 ? (
    <List className="task-list">
      {tasks.map((task, index) => (
        <Link to={`/tasks/${task.id}`} key={`item-${task.id}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={task.type} src={`/assets/icons/${task.type}.png`} />
            </ListItemAvatar>
            <ListItemText primary={task.name} secondary={task.description} />
          </ListItem>
          {index + 1 < tasks.length && (
            <Divider variant="inset" component="li" />
          )}
        </Link>
      ))}
    </List>
  ) : (
    <p>No Tasks Found</p>
  );
}

export default TaskList;
