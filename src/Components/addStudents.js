import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './add.css';

function AddStudents() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [studentClass, setStudentClass] = useState(''); // State for class
  const [division, setDivision] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // State for validation errors

  // Function to validate the form
  function validateForm() {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    if (!studentClass) {
      errors.studentClass = 'Class is required';
    }

    if (!division.trim()) {
      errors.division = 'Division is required';
    }

    if (!gender) {
      errors.gender = 'Gender is required';
    }

    return errors;
  }

  function handleSubmit() {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const studentData = {
        studentname: name,
        studentdob: dateOfBirth,
        studentclass: studentClass,
        studentdivision: division,
        gender: gender,
      };

      axios
        .post('http://localhost:8084/data/student/save', studentData)
        .then((response) => {
          navigate('/list');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // Set validation errors to display to the user
      setErrors(validationErrors);
    }
  }

  // Function to generate class options from 1 to 12
  function generateClassOptions() {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  return (
    <div>
      <div className="wrapper rounded bg-white">
        <div className="h3">Registration Form</div>
        <div className="form">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              {errors.dateOfBirth && (
                <div className="text-danger">{errors.dateOfBirth}</div>
              )}
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Class</label>
              <select
                className="form-control"
                required
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              >
                <option value="" disabled>
                  Select Class
                </option>
                {generateClassOptions()}
              </select>
              {errors.studentClass && (
                <div className="text-danger">{errors.studentClass}</div>
              )}
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Division</label>
              <input
                type="text"
                className="form-control"
                required
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              />
              {errors.division && (
                <div className="text-danger">{errors.division}</div>
              )}
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Gender</label>
              <div className="d-flex align-items-center mt-2">
                <label className="option">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                  <span className="checkmark"></span>
                </label>
                <label className="option ms-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                  <span className="checkmark"></span>
                </label>
              </div>
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudents;
