// AdvancedFormBuilder.js

import React, { useState, useEffect } from 'react';
import './FormBuilder.css';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams, useNavigate } from 'react-router-dom';


const initialField = {
  fieldType: 'text',
  label: '',
  name: '',
  placeholder: '',
  value: '',
  minLength: '',
  maxLength: '',
  isRequired: false,
  choices: ''
};

const FormBuilder = ({ history }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fieldData, setFieldData] = useState([]);
  const [formData, setFormData] = useState({}); // Holds the data to be submitted

  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ ...initialField });

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/form/${id}/`);
        if (response.status === 200) {
          setFieldData(response.data); // Assuming the form fields are in the response data
        } else {
          navigate('/');
          alert('Invalid form');
        }
      } catch (error) {
        console.error('Error fetching form:', error);
        navigate('/');
        alert('Invalid form');
      }
    };

    fetchForm();
  }, [id, navigate]);
  
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const addField = () => {
    setFields([...fields, { ...newField, order: fields.length + 1 }]);
    setNewField({ ...initialField });
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = fields.map((field, index) => {
      const { fieldType, label, name, placeholder, isRequired, minLength, maxLength, choices } = field;
      let fieldTypeAbbreviation;

      switch (fieldType) {
        case 'email':
          fieldTypeAbbreviation = 'em';
          break;
        case 'text':
          fieldTypeAbbreviation = 'ti';
          break;
        case 'phone_number':
          fieldTypeAbbreviation = 'ph';
          break;
        case 'radio':
          fieldTypeAbbreviation = 'ss';
          break;
        case 'multiple_choice':
          fieldTypeAbbreviation = 'ms';
          break;
        default:
          fieldTypeAbbreviation = fieldType;
      }

      const fieldData = {
        form: id,
        field_type: fieldTypeAbbreviation,
        label,
        name,
        placeholder,
        order: index + 1,
        is_required: isRequired
      };
      if (fieldType === 'text') {
        if (minLength) fieldData.min_length = parseInt(minLength, 10);
        if (maxLength) fieldData.max_length = parseInt(maxLength, 10);
      }
      if (['radio', 'multiple_choice'].includes(fieldType) && choices) {
        fieldData.choices = choices;
      }
      return fieldData;
    });

    try {
      const response = await axios.post('http://localhost:8000/api/form/build/', payload);
      console.log(response.data);
      if (response.status === 201) {
        window.location.href = '/thank-you';
      }     
      // TODO: Handle response
    } catch (error) {
      console.error('There was an error!', error);
      // TODO: Handle error
    }
  };


  return (
    <div className="form-builder-container">
      <div className="form-controls">
        {/* ...form control elements */}
        <select className="form-control" value={newField.fieldType} onChange={(e) => setNewField({ ...newField, fieldType: e.target.value })}>
          <option value="email">Email</option>
          <option value="text">Text</option>
          <option value="phone_number">Phone Number</option>
          <option value="radio">Radio</option>
          <option value="multiple_choice">Multiple Choice</option>
        </select>
        <input className="form-control" type="text" placeholder="Label" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} />
        <input className="form-control" type="text" placeholder="Name" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
        <input className="form-control" type="text" placeholder="Placeholder" value={newField.placeholder} onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })} />
        <label>
          <input type="checkbox" checked={newField.isRequired} onChange={(e) => setNewField({ ...newField, isRequired: e.target.checked })} />
          Required
        </label>
        {newField.fieldType === 'text' && (
          <>
            <input className="form-control" type="number" placeholder="Min Length" value={newField.minLength} onChange={(e) => setNewField({ ...newField, minLength: e.target.value })} />
            <input className="form-control" type="number" placeholder="Max Length" value={newField.maxLength} onChange={(e) => setNewField({ ...newField, maxLength: e.target.value })} />
          </>
        )}
        {['radio', 'multiple_choice'].includes(newField.fieldType) && (
          <input className="form-control" type="text" placeholder="Choices (comma separated)" value={newField.choices} onChange={(e) => setNewField({ ...newField, choices: e.target.value })} />
        )}
        <button className="add-btn" onClick={addField}>Add Field</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div className="form-preview" {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <div className="field-preview" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>Label: {field.label}</div>
                      <div>Name: {field.name}</div>
                      <div>Placeholder: {field.placeholder}</div>
                      <button className="remove-btn" onClick={() => removeField(index)}>X</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="submit-btn" onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default FormBuilder;
