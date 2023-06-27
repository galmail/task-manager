import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./task-list.scss";
import type { Task } from "../../data/types";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchTerm(query);
    filterTasks(query);
  }, []);

  const filterTasks = (query: string) => {
    const filtered = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    filterTasks(query);
    setSearchParams({ q: query });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        data-testid="tasks-search-input"
      />
      <ul>
        {filteredTasks.map((task: Task) => (
          <li className="task" key={task.id}>
            <Link to={`/tasks/${task.id}`} state={task}>
              <span className={`icon icon--${task.type}`}></span>
              <span>{task.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
