import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCall from '../utils/api';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await apiCall('get', 'form');
        setForms(response.data.results);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await apiCall('delete', `form/${id}`);
  //     setForms(forms.filter(form => form.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting form:', error);
  //   }
  // };

  return (
    <div style={{ margin: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Forms</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/form/new" style={{ textDecoration: 'none', color: 'blue' }}>Add New Form</Link>
      </div>
      {forms.map(form => (
        <div key={form.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
          <h2>{form.name}</h2>
          <p>{form.description}</p>
          <p><Link to={`/public/form/${form.uuid}`} style={{ textDecoration: 'none', color: 'blue' }}>{form.uuid}</Link></p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Link to={`/form/build/${form.id}`} style={{ textDecoration: 'none', color: 'green' }}>Build</Link>
          </div>
          <a href={`${process.env.REACT_APP_API_URL}/form/${form.uuid}/data`} target="_blank" rel="noopener noreferrer">View Data</a>
        </div>
      ))}
    </div>
  );
};

export default FormList;
