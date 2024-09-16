import React, { useState, useEffect } from "react";
import TaskOverview from "./components/TaskOverview";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskModal from "./components/EditTaskModal";
import { generateId } from "./utils/taskUtils";
import { getTasks, saveTasks } from "./utils/taskService";
import "./App.css";
import "./globals.css";

const initialTasks = [
  // Niste sarcini in caz ca nu exista nimic in localStorage
  {
    id: 1,
    title: "Sarcina 1",
    description: "Descriere sarcina 1",
    date: "2024-09-10",
    state: "creata",
  },
  {
    id: 2,
    title: "Sarcina 2",
    description: "Descriere sarcina 2",
    date: "2024-09-11",
    state: "creata",
  },
];

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await getTasks(); // Incercam sa obtinem sarcinile din backend/localStorage
      if (loadedTasks.length === 0) {
        setTasks(initialTasks);
        saveTasks(initialTasks);
      } else {
        setTasks(loadedTasks);
      }
    };

    fetchTasks();
  }, []);

  /**
   * Adauga o noua sarcina in lista de sarcini, fiecare sarcina are un ID unic.
   */
  const handleAddTask = (task) => {
    const newTask = { ...task, id: generateId(tasks), state: "creata" };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  /**
   * Sterge o sarcina in functie de ID si redistribuie id-urile ramasese la restul sarcinilor.
   */
  const handleDeleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    const updatedTasks = remainingTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  /**
   * Deschide modalul de editare pentru o sarcina specifica.
   */
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  /**
   * Schimba starea unei sarcini (creata, in curs de efectuare, finalizata) in functie de starea curenta.
   */
  const handleChangeTaskState = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            state:
              task.state === "creata"
                ? "in curs de efectuare"
                : task.state === "in curs de efectuare"
                ? "finalizata"
                : "creata",
          }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  /**
   * Salveaza o sarcina editata si inchide modalul de editare.
   */
  const handleSaveTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <h1>Agenda Virtuala</h1>

      {/* Formular pentru adaugarea unei sarcini noi */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Privire de ansamblu a sarcinilor */}
      <TaskOverview
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onChangeState={handleChangeTaskState}
      />

      {/* Modal pentru editarea unei sarcini */}
      {isModalOpen && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
