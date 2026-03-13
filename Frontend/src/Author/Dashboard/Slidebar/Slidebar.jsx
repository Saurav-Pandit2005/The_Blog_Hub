import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Slidebar.css';

// Assets
import logoImg from '../../../assets/Images/Visitor/Navbar/logo.png';
import dashboardIcon from '../../../assets/Images/Author/Dashboard/Slidebar/dashboard.png';
import writingIcon from '../../../assets/Images/Author/Dashboard/Slidebar/writing.png';
import bloggingIcon from '../../../assets/Images/Author/Dashboard/Slidebar/blogging.png';
import podcastIcon from '../../../assets/Images/Author/Dashboard/Slidebar/podcast.png';
import resourcesIcon from '../../../assets/Images/Author/Dashboard/Slidebar/resouces.png';
import profileIcon from '../../../assets/Images/Author/Dashboard/Slidebar/profile.png';

function Slidebar() {
    const location = useLocation();

    const menuItems = [
        { path: '/author/dashboard', label: 'Dashboard', icon: dashboardIcon },
        { path: '/author/write-post', label: 'Write Post', icon: writingIcon },
        { path: '/author/my-blogs', label: 'My Blogs', icon: bloggingIcon },
        { path: '/author/dashboard/podcasts', label: 'Podcasts', icon: podcastIcon },
        { path: '/author/dashboard/resources', label: 'Resources', icon: resourcesIcon },
        { path: '/author/profile', label: 'Profile', icon: profileIcon },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <Link to="/author/home" className="logo">
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
                            <img src={item.icon} alt={item.label} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="logout">
                <Link to="/login">Logout</Link>
            </div>
        </aside>
    );
}

export default Slidebar;
