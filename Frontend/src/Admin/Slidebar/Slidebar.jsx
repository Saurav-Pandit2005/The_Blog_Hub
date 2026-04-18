import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Slidebar.css';

// Assets
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';
import { 
    LayoutDashboard, 
    PenSquare, 
    Users, 
    FileText, 
    Mic, 
    FolderOpen, 
    MessageSquare, 
    User, 
    LogOut,
    FileEdit,
    BarChart3,
    Home,
    ChevronLeft
} from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function Slidebar() {
    const { user, logout } = React.useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin/home', label: 'Back to Home', icon: <ChevronLeft size={20} /> },
        { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/write-blog', label: 'Write Blog', icon: <PenSquare size={20} /> },
        { path: '/admin/manage-users', label: 'Manage Users', icon: <Users size={20} /> },
        { path: '/admin/manage-blogs', label: 'Manage Blogs', icon: <FileText size={20} /> },
        { path: '/admin/manage-podcasts', label: 'Manage Podcasts', icon: <Mic size={20} /> },
        { path: '/admin/manage-resources', label: 'Manage Resources', icon: <FolderOpen size={20} /> },
        { path: '/admin/inquiries', label: 'Inquiries', icon: <MessageSquare size={20} /> },
        // { path: '/admin/edit-about', label: 'Edit About', icon: <FileEdit size={20} /> },
        // { path: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
        { path: '/admin/profile', label: 'Profile', icon: <User size={20} /> },
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

            <div className="sidebar-bottom">
                <div className="admin-status-card" onClick={() => navigate('/admin/profile')}>
                    <div className="admin-avatar">
                        <img src={user?.profilePic || adminProfileImg} alt="Admin" />
                    </div>
                    <div className="admin-info">
                        <h4>{user?.name || 'Admin User'}</h4>
                        <span>Administrator</span>
                    </div>
                </div>

                <button className="logout-btn" onClick={() => {
                    logout();
                    navigate('/login');
                }}>
                    <span className="icon"><LogOut size={18} /></span> Logout
                </button>
            </div>
        </aside>
    );
}

export default Slidebar;
