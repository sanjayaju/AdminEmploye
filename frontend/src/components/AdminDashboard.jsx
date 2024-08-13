import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h3 className="admin-title">Dashboard</h3>
        <p className="admin-welcome">Welcome to the Admin Panel</p>
        <nav className="admin-nav">
          {/* <Link className="admin-nav-link" to="/home">Home</Link> */}
          <Link className="admin-nav-link" to="/employees">Employee List</Link>
        </nav>
      </div>
    </div>
  );
}

export default AdminDashboard;
