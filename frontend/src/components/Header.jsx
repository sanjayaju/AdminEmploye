import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ adminName }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session storage or any authentication tokens
        sessionStorage.clear();
        // Redirect to the login page
        navigate('/');
    };

    console.log("Header rendered");
    return (
        <header className="header">
            <div className="logo">Logo</div>
            <nav>
                <Link to="/admin-dashboard">Home</Link>
                <Link to="/employees">Employee List</Link>
            </nav>
            {adminName && (
                <div className="admin-info">
                    <span>{adminName}</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </header>
    );
}

export default Header;
