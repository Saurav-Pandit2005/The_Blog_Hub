import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    PenTool, 
    BookOpen, 
    Mic, 
    FolderClosed, 
    User as UserIcon, 
    LogOut, 
    ChevronLeft,
    Sparkles
} from 'lucide-react';
import './Slidebar.css';
import logoImg from '../../../assets/Images/Visitor/Navbar/logo.png';

function Slidebar() {
    const location = useLocation();
    
    // Get user data from localStorage for the bottom profile section
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Author', profilePic: '' };

    const menuItems = [
        { path: '/author/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/author/write-post', label: 'Write Post', icon: <PenTool size={20} /> },
        { path: '/author/my-blogs', label: 'My Blogs', icon: <BookOpen size={20} /> },
        { path: '/author/dashboard/podcasts', label: 'Podcasts', icon: <Mic size={20} /> },
        { path: '/author/dashboard/resources', label: 'Resources', icon: <FolderClosed size={20} /> },
        { path: '/author/profile', label: 'Settings', icon: <UserIcon size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-top-content">
                <Link to="/author/home" className="sidebar-logo-simple">
                    <img src={logoImg} alt="Logo" />
                    <span>The Blog Hub</span>
                </Link>

                <div className="sidebar-nav-section">
                    <Link to="/author/home" className="home-back-cta">
                        <ChevronLeft size={16} />
                        <span>Back to Home</span>
                    </Link>

                    <nav className="sidebar-menu-list">
                        <div className="menu-group-label">Menu</div>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`menu-item-link ${location.pathname === item.path ? 'is-active' : ''}`}
                            >
                                <span className="icon-box">{item.icon}</span>
                                <span className="label-text">{item.label}</span>
                                {item.path === '/author/write-post' && <Sparkles size={12} className="ai-badge-icon" />}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="sidebar-footer-area">
                <div className="author-brief-card">
                    <div className="brief-avatar">
                        <img 
                            src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                            alt="Profile" 
                        />
                    </div>
                    <div className="brief-info">
                        <p className="brief-name">{user.name}</p>
                        <p className="brief-role">Author</p>
                    </div>
                </div>

                <Link to="/login" className="sidebar-logout-trigger">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </Link>
            </div>
        </aside>
    );
}

export default Slidebar;
