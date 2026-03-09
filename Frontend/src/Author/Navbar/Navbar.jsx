import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Assets
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';
import profileImg from '../../assets/Images/Author/Navbar/Profile.jpg';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    // Placeholder name - could come from context/props later
    const userName = "Rima Sah";

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

                {/* 
                <li><Link to="/author/write-blog">Write</Link></li>
                <li><Link to="/author/my-blogs">My Blogs</Link></li>
                <li><Link to="/author/analytics">Analytics</Link></li>
                */}
            </ul>

            {/* PROFILE & USER INFO */}
            <div className="profile-container" ref={dropdownRef} onClick={toggleDropdown}>
                <span className="user-name">{userName}</span>
                <img src={profileImg} className="profile-img" alt="Profile" />

                <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                    <Link to="/author/profile">Profile</Link>
                    <Link to="/author/dashboard">Dashboard</Link>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
