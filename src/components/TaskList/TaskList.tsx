import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./task-list.scss";
import type { Task } from "../../data/types";
import TopBar from "../TopBar";
import Search from "../Search";
import ListWithIcons from "../ListWithIcons";

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
    <>
      <TopBar title="Tasks">
        <Search
          placeholder="search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          data-testid="tasks-search-input"
        />
      </TopBar>
      <ListWithIcons
        className="task-list"
        list={filteredTasks.map((task) => ({
          ...task,
          url: `/tasks/${task.id}`,
          icon: {
            name: task.type,
            url: `/assets/icons/${task.type}.png`,
          },
        }))}
        emptyList={<div>No tasks found</div>}
      />
    </>
  );
}

export default TaskList;
