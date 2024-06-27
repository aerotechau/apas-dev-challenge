import React from 'react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const deleteTaskHandler = async () => {
    onDelete(task.id);
  };

  return (
    <div className={'task-item card text-start p-0'}>
      <div className={'card-header'}>
        <p className={'m-0 card-title'}>{`Task: ${task.name}`}</p>
      </div>
      <div className={'card-body'}>
        {/* <h5 className={'card-title'}>{task.name}</h5> */}
        <p className={'card-text'}>{`Description: ${task.description}`}</p>
        <button type={'button'} onClick={deleteTaskHandler} className={'btn btn-danger'}>{'Delete'}</button>
      </div>
    </div>
  );
};

export default TaskItem;
