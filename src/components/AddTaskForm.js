// src/components/AddTaskForm.js
import React from "react";
import "../styles/addTaskForm.css"; // Import the CSS file

/**
 * Formular pentru adăugarea unei noi sarcini.
 * Permite utilizatorului să completeze detaliile sarcinii și să o adauge la lista de sarcini.
 */
const AddTaskForm = ({ onAddTask }) => {
  /**
   * Funcția care se execută la trimiterea formularului.
   * Preia valorile introduse de utilizator, creează un obiect de sarcină și apelează funcția `onAddTask`.
   * Resetează formularul după adăugarea sarcinii.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne comportamentul implicit al formularului (reîmprospătare pagină)

    const { title, description, date } = e.target.elements; // Preia elementele formularului

    // Verificăm dacă titlul și data sunt completate
    if (title && date) {
      onAddTask({
        title: title.value, // Titlul sarcinii
        description: description
          ? description.value // Descrierea sarcinii (dacă este prezentă)
          : "Aceasta este o referință la sarcina {#1}", // Descriere implicită dacă nu este specificată
        date: date.value, // Data sarcinii
      });
      e.target.reset(); // Resetează formularul după trimitere
    }
  };

  return (
    <div className="add-task-form">
      <h2>Adauga Sarcina</h2>
      <form onSubmit={handleSubmit}>
        {/* Input pentru titlul sarcinii */}
        <input
          type="text"
          name="title"
          placeholder="Titlu"
          required // Câmp obligatoriu
        />
        {/* Input pentru descrierea sarcinii */}
        <input type="text" name="description" placeholder="Descriere" />
        {/* Input pentru data sarcinii */}
        <input
          type="date"
          name="date"
          required // Câmp obligatoriu
        />
        {/* Buton pentru trimiterea formularului */}
        <button type="submit">Adauga sarcina</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
