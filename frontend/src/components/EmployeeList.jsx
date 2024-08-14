import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
// After fetch in EmployeeList
useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      console.log('Fetched Employees:', res.data); // Log fetched data here
      setEmployees(res.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to fetch employees');
      setLoading(false); // Set loading to false if there's an error
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

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-list-container">
      <div className="sub-header">
        <h3>Employee List</h3>
      </div>
      <div className="sidebar">
      <div className="total-employees-container">
  <span>Total Employees: {employees.length}</span>
  <Link to="/create-employee" className="create-button">Create Employee</Link>
</div>

        {/* <Link to="/create-employee" className="create-button">Create Employee</Link> */}
        <input 
          type="text" 
          placeholder="Enter Search Keyword" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
            {filteredEmployees.map(emp => (
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
                  <Link to={`/edit-employee/${emp._id}`} className="edit-button">Edit</Link>
                  <button onClick={() => handleDelete(emp._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;