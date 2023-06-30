import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import type { Task } from "../../data/types";
import TaskDetails from "../../components/TaskDetails";
import TopBar from "../../components/TopBar";

type TaskDetailsPageProps = {
  onEditTask: (t: Task) => void;
  onDeleteTask: (t: Task) => void;
};

function TaskDetailsPage({ onEditTask, onDeleteTask }: TaskDetailsPageProps) {
  const navigate = useNavigate();
  const task = useLoaderData() as Task | null;

  const handleEdit = (updatedTask: Task) => {
    onEditTask(updatedTask);
  };

  const handleDelete = () => {
    onDeleteTask(task!);
    navigate("/tasks");
  };

  return (
    <>
      <TopBar title="Task Details" goBack={() => navigate(-1)} />
      {task ? (
        <TaskDetails task={task} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <h3>Task Not Found</h3>
      )}
    </>
  );
}

export default TaskDetailsPage;
