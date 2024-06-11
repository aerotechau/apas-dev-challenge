import React from 'react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => (
  <div className={'task-item'}>
    <h3>{task.name}</h3>
    <p>{task.description}</p>
  </div>
);

export default TaskItem;
