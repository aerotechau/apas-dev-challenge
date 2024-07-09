import React, { useState } from 'react';

interface TaskFormProps {
  onSave: (task: { name: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={'form-label w-100 text-start'}>{'Task Name'}
          <input
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={'form-control'}
            required
          />
        </label>
      </div>
      <div>
        <label className={'form-label w-100 text-start'}>
          {'Description'}
          <textarea
            name={'Description'}
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={'form-control'}
            required
          />
        </label>
      </div>
      <button type={'submit'} className={'btn btn-primary'}>{'Save'}</button>
    </form>
  );
};

export default TaskForm;
