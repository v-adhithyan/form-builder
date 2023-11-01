
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from '../utils/api';

const NewForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall('post', 'form', { name, description });
      if (response.status === 201) {
        navigate('/form');
      }
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div>
      <center><h1>New Form</h1></center>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default NewForm;
