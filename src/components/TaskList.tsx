import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <div>
    <h2>{'Task List'}</h2>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} />
    ))}
  </div>
);

export default TaskList;
