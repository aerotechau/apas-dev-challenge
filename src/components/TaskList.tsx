import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => (
  <div>
    <h2>{'Task List'}</h2>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList;
