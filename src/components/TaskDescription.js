import React from "react";
import { replaceTaskReferences } from "../utils/taskUtils";

const TaskDescription = ({ description, tasks, onEditTask }) => {
  return <p>{replaceTaskReferences(description, tasks, onEditTask)}</p>;
};

export default TaskDescription;
