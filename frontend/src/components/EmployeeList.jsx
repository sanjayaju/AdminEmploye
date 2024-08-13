import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/employees');
        setEmployees(res.data);
      } catch (err) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employees/${id}`);
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  return (
    <div className="employee-list-container">
      <header className="header">
        <h2>Employee List</h2>
        <Link to="/create-employee" className="create-button">Create Employee</Link>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Total Employees: {employees.length}</p>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp._id}</td>
                  <td>
                    {emp.image ? (
                      <img src={`/uploads/${emp.image}`} alt={emp.name} className="employee-image" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobileNo}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.course.join(', ')}</td>
                  <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/employee/edit/${emp._id}`} className="edit-button">Edit</Link>
                    <button onClick={() => handleDelete(emp._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
