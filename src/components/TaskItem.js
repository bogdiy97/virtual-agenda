import React from "react";
import { replaceTaskReferences } from "../utils/taskUtils";
import "../styles/taskItem.css";

/**
 * Componenta pentru afisarea unei sarcini individuale (titlul, descrierea, data, starea și butoane)
 */
const TaskItem = ({ task, tasks, onDelete, onEdit, onChangeState }) => {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>

      <p>
        <strong>Descriere:</strong>{" "}
        {replaceTaskReferences(task.description, tasks, onEdit)}{" "}
      </p>

      <p>
        <strong>Data:</strong> {task.date}
      </p>

      <p>
        <strong>Stare:</strong> {task.state}
      </p>

      <div className="task-actions">
        <button className="edit" onClick={() => onEdit(task.id)}>
          Editeaza
        </button>{" "}
        <button className="delete" onClick={() => onDelete(task.id)}>
          Sterge
        </button>{" "}
        <button onClick={() => onChangeState(task.id)}>Schimba Starea</button>{" "}
      </div>
    </div>
  );
};

export default TaskItem;
