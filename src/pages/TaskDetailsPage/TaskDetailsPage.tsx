import React, { useCallback } from "react";
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

  const handleEdit = useCallback(
    (updatedTask: Task) => {
      onEditTask(updatedTask);
    },
    [onEditTask]
  );

  const handleDelete = useCallback(() => {
    onDeleteTask(task!);
    navigate("/");
  }, [navigate, onDeleteTask, task]);

  return (
    <>
      <TopBar title="Task Details" canGoBack={true} />
      {task ? (
        <div role="main">
          <TaskDetails
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <h3>Task Not Found</h3>
      )}
    </>
  );
}

export default TaskDetailsPage;
