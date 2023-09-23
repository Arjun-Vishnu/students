import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './list.css';

function StudentList() {
  const [studentData, setStudentData] = useState([]);

  function getData() {
    const url = "http://localhost:8084/data/student/getall";
    axios.get(url).then(response => {
      setStudentData(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <section className="intro" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-6">
              <h1>Students List</h1>
            </div>
            <div className="col-6 text-right">
              {/* Use the Link component with the "to" prop */}
              <Link to="/add" className="btn btn-primary">Add Student</Link>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-dark table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Student Name</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Class</th>
                      <th scope="col">Division</th>
                      <th scope="col">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map(student => (
                      <tr key={student._id}>
                        <td>{student.studentname}</td>
                        <td>{student.studentdob}</td>
                        <td>{student.studentclass}</td>
                        <td>{student.studentdivision}</td>
                        <td>{student.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="gradient-custom-2 h-100">
          <div className="mask d-flex align-items-center h-100">
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentList;
