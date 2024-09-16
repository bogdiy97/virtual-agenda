const STORAGE_KEY = "tasks";

// loclalStorage

export const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Backend

// export const getTasksFromBackend = async () => {
//   try {
//     const response = await fetch("/api/tasks");
//     if (!response.ok) throw new Error("Network response was not ok");
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch tasks from backend:", error);
//     return null;
//   }
// };

// export const saveTasksToBackend = async (tasks) => {
//   try {
//     const response = await fetch("/api/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(tasks),
//     });
//     if (!response.ok) throw new Error("Network response wasn ok");
//   } catch (error) {
//     console.error("Failed to save taks to backend:", error);
//   }
// };

export const getTasks = async () => {
  //const tasksFromBackend = await getTasksFromBackend();
  // if (tasksFromBackend) {
  // return tasksFromBackend; // Returneaza sarcinile de la backend daca exista
  // }
  //// Daca backend-ul nu este disponibil, returneaza sarcinile din localStorage
  return getTasksFromLocalStorage();
};

export const saveTasks = async (tasks) => {
  // //Salvam in backend sarcinile
  // const backendSaveSuccess = await saveTasksToBackend(tasks);
  //if (!backendSaveSuccess) {
  //// Fallback in caz ca avem erori la salvare in backend
  saveTasksToLocalStorage(tasks);
  // }
};
