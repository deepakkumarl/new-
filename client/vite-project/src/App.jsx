import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
    setMessage('');
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const today = new Date().toISOString().split('T')[0];

    if (!formData.name) errors.name = 'Name is required';
    if (!formData.employeeId || formData.employeeId.length > 10)
      errors.employeeId = 'Employee ID is required and must be max 10 characters';
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = 'Valid email is required';
    if (!formData.phone || !phoneRegex.test(formData.phone))
      errors.phone = 'Phone number must be a valid 10-digit number';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.dateOfJoining || formData.dateOfJoining > today)
      errors.dateOfJoining = 'Date of Joining cannot be in the future';
    if (!formData.role) errors.role = 'Role is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/submit', formData);
      setMessage('Employee added successfully!');
      setFormData({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: '',
      });
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        message={message}
      />
    </>
  );
}

export default App;
