import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { Task } from "../../data/types";

import "./task-list.scss";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return tasks.length > 0 ? (
    <List className="task-list">
      {tasks.map((task) => (
        <ListItem className="task-item" key={`item-${task.id}`}>
          <Link to={`/tasks/${task.id}`} className="task-link">
            <ListItemAvatar>
              <Avatar
                alt={task.type}
                src={`/assets/icons/${task.type}.png`}
                className="task-icon"
              />
            </ListItemAvatar>
            <ListItemText primary={task.name} secondary={task.description} />
          </Link>
        </ListItem>
      ))}
    </List>
  ) : (
    <p>No Tasks Found</p>
  );
}

export default TaskList;
