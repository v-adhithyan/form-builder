// PublicForm.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PublicForm.css'; // Importing the CSS file for styling

const PublicForm = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({ name: '', description: '', fields: [] });
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({}); // State to keep track of errors

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/form/fields/${uuid}`);
        setFormInfo(response.data); // Assuming the API response has name, description, and fields
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate('/');
        } else {
          console.error('Error fetching form fields:', error);
        }
      }
    };

    fetchFormFields();
  }, [uuid, navigate]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error for this field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/public/form/${uuid}/submit/`, formData);
      alert('Form submitted successfully');
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setFormErrors(error.response.data); // Assuming the errors are in the response data
      } else {
        console.error('Error submitting form:', error);
        alert('Failed to submit form');
      }
    }
  };

  return (
    <div className="public-form-container">
      <center><h1>{formInfo.name}</h1></center>
      <p>{formInfo.description}</p>
      <p className="required-note">(Fields with <span className="asterisk">*</span> are required)</p>
      <form onSubmit={handleSubmit}>
        {formInfo.fields.sort((a, b) => a.order - b.order).map((field) => (
          <div className="form-field" key={field.id}>
            <label>
              {field.label}
              {field.is_required && <span className="asterisk">*</span>}
            </label>
            {formErrors[field.name] && <p className="error-message">{formErrors[field.name]}</p>} {/* Display error message */}
            {field.field_type === 'ss' ? (
              field.choices.split(',').map((choice, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={field.name}
                    value={choice}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.is_required}
                  />
                  {choice}
                </div>
              ))
            ) : field.field_type === 'ms' ? (
              field.choices.split(',').map((choice, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={field.name}
                    value={choice}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  {choice}
                </div>
              ))
            ) : (
              <input
                type={field.field_type === 'em' ? 'email' : field.field_type === 'ti' ? 'text' : 'tel'}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.is_required}
                minLength={field.min_length > 0 ? field.min_length : undefined}
                maxLength={field.max_length > 0 ? field.max_length : undefined}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default PublicForm;
