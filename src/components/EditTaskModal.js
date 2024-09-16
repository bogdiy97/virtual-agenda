import React, { useState, useEffect } from "react";
import "../styles/editTaskModal.css";

/**
 * Modal pentru editarea unei sarcini existente.
 */
const EditTaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, description, date });
    onClose();
  };

  if (!task) return null;

  return (
    <div className="edit-task-modal">
      <div className="modal-content">
        <h2>Editare Sarcina</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu"
            required
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Actualizează descrierea
            placeholder="Descriere"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Actualizează data
            required
          />

          <button type="submit">Salveaza modificarile</button>

          <button type="button" onClick={onClose}>
            Inchide
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
