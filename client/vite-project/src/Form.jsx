import './Form.css';

const Form = ({ formData, handleChange, handleSubmit, errors, message }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employees</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter full name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        type="text"
        name="employeeId"
        placeholder="Enter Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
      />
      {errors.employeeId && <span className="error">{errors.employeeId}</span>}

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="tel"
        name="phone"
        placeholder="Enter Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <select name="department" value={formData.department} onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
      </select>
      {errors.department && <span className="error">{errors.department}</span>}

      <input
        type="date"
        name="dateOfJoining"
        value={formData.dateOfJoining}
        onChange={handleChange}
      />
      {errors.dateOfJoining && <span className="error">{errors.dateOfJoining}</span>}

      <input
        type="text"
        name="role"
        placeholder="Enter Role Manager / Developer"
        value={formData.role}
        onChange={handleChange}
      />
      {errors.role && <span className="error">{errors.role}</span>}

      <button type="submit">Submit</button>
      <button type="reset" onClick={() => window.location.reload()}>
        Reset
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default Form;
