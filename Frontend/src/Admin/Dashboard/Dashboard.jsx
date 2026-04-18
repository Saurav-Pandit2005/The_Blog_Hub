import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './Dashboard.css';
import { Users, FileText, Mic, Box, Calendar } from 'lucide-react';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../context/UserContext';

function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/stats');
            if (res.data.success) {
                setStatsData(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching admin stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const dashboardStats = [
        { label: 'Total Users', value: statsData?.totalUsers || '0', color: '#3b82f6', icon: <Users size={24} />, path: '/admin/manage-users' },
        { label: 'Total Blogs', value: statsData?.totalBlogs || '0', color: '#10b981', icon: <FileText size={24} />, path: '/admin/manage-blogs' },
        { label: 'Active Podcasts', value: statsData?.totalPodcasts || '0', color: '#f59e0b', icon: <Mic size={24} />, path: '/admin/manage-podcasts' },
        { label: 'Resources', value: statsData?.totalResources || '0', color: '#8b5cf6', icon: <Box size={24} />, path: '/admin/manage-resources' },
    ];

    return (
        <div className="admin-dashboard-layout">
            <Slidebar />
            
            <main className="admin-main-content">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Administrator Control Panel</span>
                        <h1>Admin Overall View</h1>
                        <p>Monitor platform growth, manage users, and audit system activities from one central hub.</p>
                    </div>
                    <div className="header-actions">
                        <div className="header-date">
                            <Calendar size={16} color="var(--admin-accent)" style={{marginRight: '10px'}} />
                            <span className="live-clock">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="admin-profile-container" onClick={() => navigate('/admin/profile')}>
                            <div className="admin-profile-icon">
                                <img src={user?.profilePic || adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="stats-grid">
                    {loading ? (
                        <div className="loading-state">Syncing real-time stats...</div>
                    ) : (
                        dashboardStats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="admin-stat-card-custom" 
                                style={{ '--accent-color': stat.color, cursor: 'pointer' }}
                                onClick={() => navigate(stat.path)}
                            >
                                <div className="stat-card-inner">
                                    <div className="stat-top">
                                        <div className="stat-info">
                                            <span className="stat-label">{stat.label}</span>
                                            <h2 className="stat-value">{stat.value}</h2>
                                        </div>
                                        <div className="stat-icon-wrapper" style={{ backgroundColor: stat.color }}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="dashboard-main-grid">
                    {/* RECENT SIGNUPS - Left Column */}
                    <div className="admin-panel-card glass">
                        <div className="card-header">
                            <div className="header-title">
                                <h3>New Authors</h3>
                                <span className="view-count">{statsData?.recentUsers?.length || 0} recent</span>
                            </div>
                            <button className="text-btn" onClick={() => navigate('/admin/manage-users')}>Manage</button>
                        </div>
                        <div className="user-feed">
                            {statsData?.recentUsers?.length > 0 ? (
                                statsData.recentUsers.map((user, idx) => (
                                    <div className="user-list-item" key={idx}>
                                        <div className="user-avatar-box">
                                            <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=3b82f6`} alt="user" />
                                            <span className={`role-dot ${user.role.toLowerCase()}`}></span>
                                        </div>
                                        <div className="user-details">
                                            <p className="u-name">{user.name}</p>
                                            <p className="u-email">{user.email}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-feed">No recent authors found.</p>
                            )}
                        </div>
                    </div>

                    {/* SYSTEM LOGS - Right Column */}
                    <div className="admin-panel-card glass">
                        <div className="card-header">
                            <div className="header-title">
                                <h3>System Activity</h3>
                                <span className="status-live">Live Feed</span>
                            </div>
                        </div>
                        <div className="logs-container">
                            {statsData?.recentActivity?.length > 0 ? (
                                statsData.recentActivity.map((log, idx) => (
                                    <div className="log-row" key={idx}>
                                        <div className={`log-icon-wrap ${log.type}`}>
                                            <span className="log-i">{log.icon}</span>
                                        </div>
                                        <div className="log-content">
                                            <p className="log-desc"><strong>{log.user || 'Unknown'}</strong> published "{log.title}"</p>
                                            <span className="log-time">{new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-feed">No recent activity logged.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
