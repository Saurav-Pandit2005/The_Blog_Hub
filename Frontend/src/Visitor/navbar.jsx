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
                <li><a href="#blogs">Blogs</a></li>
                <li><a href="#podcasts">Podcasts</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
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