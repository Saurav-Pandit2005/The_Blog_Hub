import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Slidebar.css';

// Assets
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';
// Using some author icons as placeholders if needed, or stick to emojis for now
import dashboardIcon from '../../assets/Images/Author/Dashboard/Slidebar/dashboard.png';
import profileIcon from '../../assets/Images/Author/Dashboard/Slidebar/profile.png';

function Slidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '🟦' },
        { path: '/admin/write-blog', label: 'Write Blog', icon: '📝' },
        { path: '/admin/manage-users', label: 'Manage Users', icon: '👥' },
        { path: '/admin/manage-blogs', label: 'Manage Blogs', icon: '🔗' },
        { path: '/admin/manage-podcasts', label: 'Manage Podcasts', icon: '🎙️' },
        { path: '/admin/manage-resources', label: 'Manage Resources', icon: '📁' },
        { path: '/admin/inquiries', label: 'Inquiries', icon: '✉️' },
        { path: '/admin/edit-about', label: 'Edit About', icon: '✍️' },
        // { path: '/admin/analytics', label: 'Analytics', icon: '📊' },
        { path: '/admin/profile', label: 'Profile', icon: '👤' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-top">
                <Link to="/admin/dashboard" className="logo">
                    <img src={logoImg} alt="Logo" />
                    The Blog Hub
                </Link>

                <nav className="menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            <span className="icon">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

export default Slidebar;
