import React, { useState } from "react";
import TaskList from "./TaskList";
import "../styles/taskOverview.css";

const TaskOverview = ({ tasks, onDelete, onEdit, onChangeState }) => {
  const [filterState, setFilterState] = useState("all");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const uniqueDates = [...new Set(tasks.map((task) => task.date))];

  const filteredTasks = tasks.filter((task) => {
    const matchesState = filterState === "all" || task.state === filterState;
    const matchesTitle = task.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());
    const matchesDate = filterDate === "" || task.date === filterDate;
    return matchesState && matchesTitle && matchesDate;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "mostRecent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  return (
    <div className="task-overview">
      <h2>Privire de ansamblu a sarcinilor</h2>

      {/* Filtrare dupa titlu */}
      <div className="filter-group">
        <label htmlFor="filterTitle">Cauta dupa titlu:</label>
        <input
          type="text"
          id="filterTitle"
          placeholder="Cauta dupa titlu..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
      </div>

      {/* Filtre și sortare */}
      <div className="filters-container">
        <div className="filter-item">
          <div className="filter-group">
            <label htmlFor="filterState">Filtreaza dupa stare:</label>
            <select
              id="filterState"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="all">Toate</option>
              <option value="creata">Create</option>
              <option value="in curs de efectuare">In curs</option>
              <option value="finalizata">Finalizate</option>
            </select>
          </div>
        </div>

        {/* Filtrare dupa data */}
        <div className="filter-item">
          <div className="filter-group">
            <label htmlFor="filterDate">Filtreaza dupa data:</label>
            <select
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="">Toate datele</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sortare dupa data */}
        <div className="filter-item">
          <div className="filter-group">
            <label htmlFor="sortOrder">Sortare dupa data:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sortare</option>
              <option value="mostRecent">Cele mai recente</option>
              <option value="oldest">Cele mai vechi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listar de saricini */}
      <TaskList
        tasks={sortedTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onChangeState={onChangeState}
      />
    </div>
  );
};

export default TaskOverview;
