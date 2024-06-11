import React, { useCallback, useLayoutEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { createTask, fetchTasks } from './api/mockApi';

export interface Task {
    id: number;
    name: string;
    description: string;
}

const App = (): React.ReactElement => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refetch = useCallback(() => fetchTasks()
    .then((result) => setTasks(result.map((t) => t))), []);

  const handleSave = useCallback((data) => createTask(data).then(refetch), [refetch]);

  useLayoutEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={'App'}>
      <h1>{'Task Manager'}</h1>
      <TaskForm onSave={handleSave} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
