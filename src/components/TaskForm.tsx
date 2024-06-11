import React, { useState } from 'react';

interface TaskFormProps {
  onSave: (task: { name: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{'Task Name'}
          <input
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          {'Description'}
          <input
            name={'Description'}
            type={'text'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type={'submit'}>{'Save'}</button>
    </form>
  );
};

export default TaskForm;
