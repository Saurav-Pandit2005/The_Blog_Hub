import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            {/* Logo Section */}
            <Link to="/home" className="logo">
                <img src={logoImg} alt="The Blog Hub Logo" />
                <span>The Blog Hub</span>
            </Link>

            {/* Links Section */}
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/podcasts">Podcasts</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            {/* Actions Section */}
            <div className="auth-buttons">
                <Link to="/login" className="login-btn">Sign In</Link>
                <Link to="/register" className="register-btn">Join Now</Link>
            </div>
        </nav>
    );
}

export default Navbar;