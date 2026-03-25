import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Dashboard.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function AdminDashboard() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const stats = [
        { label: 'Total Users', value: '1,240', change: '+12%', color: '#3b82f6', icon: '👥' },
        { label: 'Total Blogs', value: '3,850', change: '+5%', color: '#10b981', icon: '📝' },
        { label: 'Active Podcasts', value: '150', change: '+8%', color: '#f59e0b', icon: '🎙️' },
        { label: 'Downloads', value: '12.5k', change: '+24%', color: '#8b5cf6', icon: '📥' },
    ];

    return (
        <div className="admin-dashboard-layout">
            <Slidebar />
            
            <main className="admin-main-content">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>System Administration Overview</h1>
                        <p>Real-time oversight and site management dashboard.</p>
                    </div>
                    <div className="header-actions">
                        <div className="admin-profile-container" ref={dropdownRef}>
                            <div className="admin-profile-icon" onClick={toggleDropdown}>
                                <img src={adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>

                            {isDropdownOpen && (
                                <div className="admin-profile-dropdown">
                                    <Link to="/admin/profile" className="dropdown-item">👤 Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item logout-item">🚪 Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
                            <div className="stat-card-inner">
                                <div className="stat-top">
                                    <span className="stat-label">{stat.label}</span>
                                    <div className="stat-icon">{stat.icon}</div>
                                </div>
                                <div className="stat-bottom">
                                    <h2 className="stat-value">{stat.value}</h2>
                                    <span className="stat-trend positive">{stat.change} ↑</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-main-grid">
                    {/* RECENT SIGNUPS - Left Column */}
                    <div className="admin-panel-card glass">
                        <div className="card-header">
                            <div className="header-title">
                                <h3>New Authors</h3>
                                <span className="view-count">8 pending</span>
                            </div>
                            <button className="text-btn">Manage</button>
                        </div>
                        <div className="user-feed">
                            <div className="user-list-item">
                                <div className="user-avatar-box">
                                    <img src="https://ui-avatars.com/api/?name=Surja+Bist&background=eff6ff&color=3b82f6" alt="user" />
                                    <span className="role-dot author"></span>
                                </div>
                                <div className="user-details">
                                    <p className="u-name">Surja Bist</p>
                                    <p className="u-email">surja@bloghub.com</p>
                                </div>
                                <div className="user-action-btns">
                                    <button className="mini-btn approve" title="Approve Account">✓</button>
                                </div>
                            </div>

                            <div className="user-list-item">
                                <div className="user-avatar-box">
                                    <img src="https://ui-avatars.com/api/?name=Rima+Sah&background=fef2f2&color=ef4444" alt="user" />
                                    <span className="role-dot author"></span>
                                </div>
                                <div className="user-details">
                                    <p className="u-name">Rima Sah</p>
                                    <p className="u-email">rima@bloghub.com</p>
                                </div>
                                <div className="user-action-btns">
                                    <button className="mini-btn approve" title="Approve Account">✓</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SYSTEM LOGS - Right Column */}
                    <div className="admin-panel-card glass">
                        <div className="card-header">
                            <div className="header-title">
                                <h3>System Activity</h3>
                                <span className="status-live">Live Feed</span>
                            </div>
                            <button className="text-btn">All Logs</button>
                        </div>
                        <div className="logs-container">
                            <div className="log-row">
                                <div className="log-icon-wrap podcast"><span className="log-i">🎙️</span></div>
                                <div className="log-content">
                                    <p className="log-desc"><strong>Rima Sah</strong> uploaded "Tech Talk Ep. 4"</p>
                                    <span className="log-time">14:20 PM</span>
                                </div>
                            </div>
                            <div className="log-row">
                                <div className="log-icon-wrap blog"><span className="log-i">📝</span></div>
                                <div className="log-content">
                                    <p className="log-desc"><strong>Saurav Pandit</strong> published "The UI Guide"</p>
                                    <span className="log-time">12:05 PM</span>
                                </div>
                            </div>
                            <div className="log-row warning">
                                <div className="log-icon-wrap mod"><span className="log-i">🛡️</span></div>
                                <div className="log-content">
                                    <p className="log-desc">Reported content flagged for moderator review</p>
                                    <span className="log-time">09:15 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
