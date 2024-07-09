import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Task } from '../App';
import { db, auth } from '../config/firebase';

/**
 * Description: Function written to create tasks.
 * Learn more: https://firebase.google.com/docs/firestore/manage-data/add-data#web_14
 * @param name: Name of the task that is passed to the parent
 * @param description: Description of the task that is passed to the parent as a part of handleSave prop
*/
export const createTask = async (task: Omit<Task, 'id'>): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  const taskDoc = { ...task, userId: user.uid };
  await addDoc(collection(db, 'tasks'), taskDoc);
};

/**
 * Description: Anonymous function written to fetch tasks from the tasks collection.
 * Learn more: https://firebase.google.com/docs/firestore/query-data/get-data#web_14
*/
export const fetchTasks = async (): Promise<Task[]> => {
  // Getting user status
  const user = auth.currentUser;

  // Checking authentication status
  if (!user) {
    throw new Error('User not authenticated');
  }

  /*
  Description: Defining query
  db: Connection defined in the auth model
  task: Name of the collection (could be anything)
  where: Info related to the logged in user
  More info: https://firebase.google.com/docs/firestore/query-data/get-data
  */
  const qry = query(collection(db, 'tasks'), where('userId', '==', user.uid));

  // Waiting for response
  const querySnapshot = await getDocs(qry);

  const tasks: Task[] = [];

  // Looping over the reponse data
  querySnapshot?.forEach((docSnapshot) => {
    const data = docSnapshot.data(); // Data is a proto method defined in reponse.

    // Adding data to the response array.
    tasks.push({
      id: docSnapshot.id, // This was changed to a string.
      name: data.name,
      description: data.description,
    } as Task); // Strict type casting.
  });

  return tasks;
};

/**
 * Description: Function to delete tasks from the task list.
 * Learn more: https://firebase.google.com/docs/firestore/manage-data/delete-data
*/
export const deleteTask = async (taskId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
};
