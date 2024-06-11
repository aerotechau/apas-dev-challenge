interface Task {
  id: number;
  name: string;
  description: string;
}

let tasks: Task[] = [
  { id: 1, name: 'Task 1', description: 'Description 1' },
  { id: 2, name: 'Task 2', description: 'Description 2' },
];

export const fetchTasks = (): Promise<Task[]> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(tasks);
  }, 50);
});

export const createTask = (task: { name: string; description: string }): Promise<Task> => new Promise((resolve) => {
  setTimeout(() => {
    const newTask = { id: Date.now(), ...task };
    tasks.push(newTask);
    resolve(newTask);
  }, 100);
});

export const updateTask = (
  id: number,
  updatedTask: { name: string; description: string },
): Promise<Task> => new Promise((resolve) => {
  setTimeout(() => {
    tasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    resolve({ id, ...updatedTask });
  }, 500);
});

export const deleteTask = (id: number): Promise<number> => new Promise((resolve) => {
  setTimeout(() => {
    tasks = tasks.filter((task) => task.id !== id);
    resolve(id);
  }, 500);
});
