// FormList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/form/');
        setForms(response.data.results);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/form/${id}`);
      setForms(forms.filter(form => form.id !== id));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div>
      <h1>Forms</h1>
      <Link to="/form/new">Add New Form</Link>
      {forms.map(form => (
        <div key={form.id}>
          <h2>{form.name}</h2>
          <p>{form.description}</p>
          <p>{form.uuid}</p>
          <Link to={`/form/build/${form.id}`}>Build</Link>
          <br></br>
          <Link to={`/public/form/${form.uuid}`}>Submit Form Data</Link>
        </div>
      ))}
    </div>
  );
};

export default FormList;
