import React, { useState, useEffect, useCallback } from "react";
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

  const filterTasks = useCallback(
    (query: string) => {
      const filtered = tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    },
    [tasks]
  );

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    filterTasks(searchTerm);
  }, [filterTasks, searchTerm]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchParams({ q: query });
      setSearchTerm(query);
    },
    [setSearchParams, setSearchTerm]
  );

  return (
    <>
      <TopBar title="Tasks">
        <Search
          id="search-tasks"
          placeholder="search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          data-testid="tasks-search-input"
        />
      </TopBar>
      <TaskList tasks={filteredTasks} />
    </>
  );
}

export default TaskListPage;
