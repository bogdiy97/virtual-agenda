import "../styles/taskUtils.css";

// Functie pentru a genera următorul ID
export const generateId = (tasks) => {
  return tasks.length + 1;
};

// Functia pentru inlocuirea referintelor in descrieri
export const replaceTaskReferences = (description, tasks, onEdit) => {
  const referenceRegex = /{#(\d+)}/g;
  const parts = description.split(referenceRegex);
  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      elements.push(parts[i]);
    } else {
      const taskId = parseInt(parts[i], 10);
      const referencedTask = tasks.find((task) => task.id === taskId);
      if (referencedTask) {
        elements.push(
          <button
            key={taskId}
            onClick={() => onEdit(taskId)}
            className="task-reference-link"
          >
            {referencedTask.title}
          </button>
        );
      } else {
        elements.push(
          <span key={taskId} className="task-reference-missing">
            [Sarcina {taskId} lipsa]
          </span>
        );
      }
    }
  }
  return elements;
};
