import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

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
                {isLoggedIn ? (
                    <div className="profile-dropdown-container">
                        <div className="user-profile-trigger">
                            <span className="user-name">{user?.name}</span>
                            <img 
                                src={user?.profilePic || `https://ui-avatars.com/api/?name=${user?.name}&background=eff6ff&color=3b82f6`} 
                                className="nav-profile-img" 
                                alt="Profile" 
                            />
                        </div>
                        <div className="nav-dropdown-menu">
                            <Link to="/author/profile" className="auth-dropdown-item bold-item">Profile</Link>
                            <Link to={user?.role?.toLowerCase() === 'author' ? "/author/home" : (user?.role?.toLowerCase() === 'admin' ? "/admin/dashboard" : "/home")} className="auth-dropdown-item bold-item">
                                Dashboard
                            </Link>
                            <Link to="#" onClick={handleLogout} className="auth-dropdown-item auth-logout-btn">
                                Logout
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="login-btn">Sign In</Link>
                        <Link to="/register" className="register-btn">Join Now</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;