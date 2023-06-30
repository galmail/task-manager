import React, { useState, useEffect } from "react";
import { useSearchParams, useLoaderData } from "react-router-dom";
import type { Task } from "../../data/types";
import TaskList from "../../components/TaskList";
import TopBar from "../../components/TopBar";
import Search from "../../components/Search";

function TaskListPage() {
  const tasks = useLoaderData() as Task[];

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
      <TaskList tasks={filteredTasks} />
    </>
  );
}

export default TaskListPage;
