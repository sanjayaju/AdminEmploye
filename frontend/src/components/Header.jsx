import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ adminName }) {
    console.log("Header rendered");
    return (
      <header className="header">
        <div className="logo">Logo</div>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/employees">Employee List</Link>
        </nav>
        {adminName && (
          <div className="admin-info">
            <span>{adminName}</span>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </header>
    );
  }
  

export default Header;