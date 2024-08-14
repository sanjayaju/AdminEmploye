import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';

function App() {
  const adminName = "Admin";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<><Header adminName={adminName} /><AdminDashboard /></>} />
          <Route path="/create-employee" element={<><Header adminName={adminName} /><CreateEmployee /></>} />
          <Route path="/employees" element={<><Header adminName={adminName} /><EmployeeList /></>} />
          <Route path="/edit-employee/:id"element={<><Header adminName={adminName} /><EditEmployee /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
