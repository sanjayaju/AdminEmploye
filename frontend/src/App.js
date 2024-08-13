import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList'

function App() {
  const adminName = "Admin";

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/admin-dashboard/*" element={<Header adminName={adminName} />} />
        <Route path="/create-employee/*" element={<Header adminName={adminName} />} />
        <Route path="/employees/*" element={<Header adminName={adminName} />} />
        </Routes>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
