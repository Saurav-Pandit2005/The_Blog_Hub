import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logoImg from '../assets/Images/Visitor/Navbar/logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="logo">
                <img src={logoImg} alt="The Blog Hub Logo" />
                <span>The Blog Hub</span>
            </div>

            {/* Links Section */}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/podcasts">Podcasts</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            {/* Actions Section */}
            <div className="auth-buttons">
                <a href="#login" className="login-btn">Sign In</a>
                <a href="#register" className="register-btn">Join Now</a>
            </div>
        </nav>
    );
}

export default Navbar;