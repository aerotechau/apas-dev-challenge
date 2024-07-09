import React, { useCallback, useLayoutEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { createTask, deleteTask, fetchTasks } from './api/firestore';
// import { createTask, fetchTasks } from './api/mockApi';

export interface Task {
  id: string;
  name: string;
  description: string;
}

const App = (): React.ReactElement => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoised function to re-fetch data.
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchTasks();
      setTasks(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Description: Method to save information in the firebase database.
   * @param: Not required
  */
  const handleSave = useCallback(async (data: Omit<Task, 'id'>) => {
    try {
      await createTask(data);
      await refetch();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }, [refetch]);

  // Layout effect runs synchronously after all DOM changes to the component.
  useLayoutEffect(() => {
    refetch();
  }, [refetch]);

  // Deleting the task based on ID and refetching the tasks.
  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    refetch();
  };

  return (
    <div className={'App'}>
      <div className={'container p-5 p-md-3'}>
        <div className={'row'}>
          <h1 className={'mb-3'}>{'Task Manager'}</h1>
          <div className={'col-sm-12 col-md'}>
            <TaskForm onSave={handleSave} />
          </div>
          <div className={'col-sm-12 col-md'}>
            {loading ? <h3 className={'text-center'}>{'Loading tasks...'}</h3> : <TaskList tasks={tasks} onDelete={handleDelete} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
