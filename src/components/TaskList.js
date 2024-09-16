import React from "react";
import TaskItem from "./TaskItem";
import "../styles/taskList.css";

const TaskList = ({ tasks, onDelete, onEdit, onChangeState }) => {
  if (tasks.length === 0) {
    return <p>Nicio sarcina nu este disponibila pentru filtrul selectat.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeState={onChangeState}
        />
      ))}
    </div>
  );
};

export default TaskList;
