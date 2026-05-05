import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../../assets/Images/Visitor/Navbar/logo.png';
import adminProfileImg from '../../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../../context/UserContext';
import { User as UserIcon, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

function AdminNavbar() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="author-navbar admin-mode-navbar">
            {/* LOGO */}
            <Link to="/admin/home" className="logo">
                <img src={logoImg} alt="Logo" />
                The Blog Hub
            </Link>

            {/* NAVIGATION */}
            <ul className="nav-links">
                <li><Link to="/admin/home">Home</Link></li>
                <li><Link to="/admin/explore">Explore</Link></li>
                <li><Link to="/admin/podcasts">Podcasts</Link></li>
                <li><Link to="/admin/resources">Resources</Link></li>
                <li><Link to="/admin/about">About</Link></li>
                <li><Link to="/admin/contact">Contact</Link></li>
            </ul>

            {/* PROFILE & USER INFO */}
            <div className="auth-profile-container" ref={dropdownRef} onClick={toggleDropdown}>
                <div className="auth-user-info-wrap">
                    <span className="auth-user-name">{user?.name}</span>
                    <small className="admin-tag-new">Admin</small>
                </div>
                <img
                    src={user?.profilePic || adminProfileImg}
                    className="auth-profile-img-square"
                    alt="Profile"
                />
                <ChevronDown size={16} className={`auth-chevron ${isDropdownOpen ? 'open' : ''}`} />

                <div className={`auth-dropdown-content premium-admin-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <Link to="/admin/profile" className="auth-dropdown-item">
                        <UserIcon size={16} /> My Profile
                    </Link>
                    <Link to="/admin/dashboard" className="auth-dropdown-item">
                        <LayoutDashboard size={16} /> Admin Panel
                    </Link>

                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="auth-dropdown-item auth-logout-btn">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
