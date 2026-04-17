import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Assets
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState({ name: 'Author', profilePic: '' });

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
    }, []);

    // Toggle dropdown
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="author-navbar">
            {/* LOGO */}
            <Link to="/author/home" className="logo">
                <img src={logoImg} alt="Logo" />
                The Blog Hub
            </Link>

            {/* NAVIGATION */}
            <ul className="nav-links">
                <li><Link to="/author/home">Home</Link></li>
                <li><Link to="/author/explore">Explore</Link></li>
                <li><Link to="/author/podcasts">Podcasts</Link></li>
                <li><Link to="/author/resources">Resources</Link></li>
                <li><Link to="/author/about">About</Link></li>
                <li><Link to="/author/contact">Contact</Link></li>
            </ul>

            {/* PROFILE & USER INFO */}
            <div className="auth-profile-container" ref={dropdownRef} onClick={toggleDropdown}>
                <span className="auth-user-name">{user.name}</span>
                <img 
                    src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=3b82f6`} 
                    className="auth-profile-img" 
                    alt="Profile" 
                />

                <div className={`auth-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                    <Link to="/author/profile" className="auth-dropdown-item bold-item">Profile</Link>
                    <Link to="/author/dashboard" className="auth-dropdown-item bold-item">Dashboard</Link>
                    <Link to="/login" className="auth-dropdown-item auth-logout-btn" onClick={() => localStorage.clear()}>
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
