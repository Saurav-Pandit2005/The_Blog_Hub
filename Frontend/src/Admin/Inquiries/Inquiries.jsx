import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Inquiries.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function Inquiries() {
    const [activeTab, setActiveTab] = useState('messages');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
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

    const messages = [
        { id: 1, name: 'Arjun Mehta', email: 'arjun@example.com', subject: 'Collaboration Opportunity', message: 'Hi, I would love to collaborate with The Blog Hub on a tech series. Please let me know if you are interested!', status: 'Unread', date: 'Mar 22, 2024' },
        { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', subject: 'Content Removal Request', message: 'I found an article that contains incorrect information about my company. Requesting immediate removal.', status: 'Replied', date: 'Mar 21, 2024' },
        { id: 3, name: 'Kunal Das', email: 'kunal@dev.io', subject: 'Author Application', message: 'I am a software engineer with 5 years of experience and would like to write for The Blog Hub.', status: 'Unread', date: 'Mar 20, 2024' },
        { id: 4, name: 'Neha Joshi', email: 'neha@outlook.com', subject: 'Sponsorship Inquiry', message: 'Our startup would like to sponsor a blog series. Could you share your media kit?', status: 'Archived', date: 'Mar 19, 2024' },
        { id: 5, name: 'Rohit Verma', email: 'rohit@corp.com', subject: 'Technical Issue on Platform', message: 'I am unable to login to my author account. Getting an error 403 each time I try.', status: 'Replied', date: 'Mar 18, 2024' },
        { id: 6, name: 'Sara Wilson', email: 'sara@media.com', subject: 'Press & Media Request', message: 'Hello, I am a journalist working on a piece about blogging platforms. Would love a quick interview.', status: 'Unread', date: 'Mar 17, 2024' },
    ];

    const subscribers = [
        { id: 1, email: 'user1@gmail.com', subscribedOn: 'Mar 22, 2024', status: 'Active' },
        { id: 2, email: 'techfan@outlook.com', subscribedOn: 'Mar 21, 2024', status: 'Active' },
        { id: 3, email: 'designlover@yahoo.com', subscribedOn: 'Mar 20, 2024', status: 'Active' },
        { id: 4, email: 'blockd@example.com', subscribedOn: 'Mar 19, 2024', status: 'Unsubscribed' },
        { id: 5, email: 'priya@blog.com', subscribedOn: 'Mar 18, 2024', status: 'Active' },
        { id: 6, email: 'newsletter@test.com', subscribedOn: 'Mar 17, 2024', status: 'Active' },
        { id: 7, email: 'curious@dev.io', subscribedOn: 'Mar 16, 2024', status: 'Active' },
        { id: 8, email: 'noreply@sample.com', subscribedOn: 'Mar 15, 2024', status: 'Unsubscribed' },
    ];

    const filteredMessages = messages.filter(msg => {
        const matchSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'All' || msg.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unreadCount = messages.filter(m => m.status === 'Unread').length;
    const activeSubsCount = subscribers.filter(s => s.status === 'Active').length;

    return (
        <div className="inquiries-container">
            <Slidebar />

            <main className="inquiries-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Inquiries & Subscribers</h1>
                        <p>Manage contact messages and newsletter subscribers.</p>
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

                {/* STATS ROW */}
                <section className="inq-stats-row">
                    <div className="inq-stat-card">
                        <span className="inq-stat-icon">✉️</span>
                        <div>
                            <p className="inq-stat-label">Total Messages</p>
                            <h4 className="inq-stat-value">{messages.length}</h4>
                        </div>
                    </div>
                    <div className="inq-stat-card danger">
                        <span className="inq-stat-icon">🔔</span>
                        <div>
                            <p className="inq-stat-label">Unread</p>
                            <h4 className="inq-stat-value">{unreadCount}</h4>
                        </div>
                    </div>
                    <div className="inq-stat-card success">
                        <span className="inq-stat-icon">📬</span>
                        <div>
                            <p className="inq-stat-label">Active Subscribers</p>
                            <h4 className="inq-stat-value">{activeSubsCount}</h4>
                        </div>
                    </div>
                    <div className="inq-stat-card">
                        <span className="inq-stat-icon">👥</span>
                        <div>
                            <p className="inq-stat-label">Total Subscribers</p>
                            <h4 className="inq-stat-value">{subscribers.length}</h4>
                        </div>
                    </div>
                </section>

                {/* TABS */}
                <div className="inq-tabs">
                    <button
                        className={`inq-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('messages'); setSearchTerm(''); setStatusFilter('All'); }}
                    >
                        ✉️ Contact Messages
                        {unreadCount > 0 && <span className="tab-badge">{unreadCount}</span>}
                    </button>
                    <button
                        className={`inq-tab-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('subscribers'); setSearchTerm(''); }}
                    >
                        📬 Newsletter Subscribers
                    </button>
                </div>

                <section className="inq-list-card">
                    {/* FILTER BAR */}
                    <div className="inq-filters-row">
                        <div className="inq-search-bar">
                            <span>🔍</span>
                            <input
                                type="text"
                                placeholder={activeTab === 'messages' ? 'Search by name, email or subject...' : 'Search by email...'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="inq-filter-group">
                            {activeTab === 'messages' && (
                                <select
                                    className="inq-status-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option>All</option>
                                    <option>Unread</option>
                                    <option>Replied</option>
                                    <option>Archived</option>
                                </select>
                            )}
                            <button
                                className="inq-export-btn"
                                onClick={() => alert(`${activeTab === 'messages' ? 'Messages' : 'Subscriber list'} exported!`)}
                            >
                                📊 Export CSV
                            </button>
                        </div>
                    </div>

                    {/* ---- MESSAGES TAB ---- */}
                    {activeTab === 'messages' && (
                        <div className="messages-list">
                            {filteredMessages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`message-card ${msg.status === 'Unread' ? 'unread' : ''}`}
                                    onClick={() => setSelectedMessage(msg)}
                                >
                                    <div className="msg-avatar">
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div className="msg-body">
                                        <div className="msg-top-row">
                                            <div className="msg-sender">
                                                <span className="msg-name">{msg.name}</span>
                                                <span className="msg-email">{msg.email}</span>
                                            </div>
                                            <div className="msg-meta">
                                                <span className={`msg-status-pill ${msg.status.toLowerCase()}`}>{msg.status}</span>
                                                <span className="msg-date">{msg.date}</span>
                                            </div>
                                        </div>
                                        <p className="msg-subject">{msg.subject}</p>
                                        <p className="msg-preview">{msg.message.substring(0, 90)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ---- SUBSCRIBERS TAB ---- */}
                    {activeTab === 'subscribers' && (
                        <div className="subs-table-wrapper">
                            <table className="subs-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email Address</th>
                                        <th>Subscribed On</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubscribers.map((sub, index) => (
                                        <tr key={sub.id}>
                                            <td className="sub-index">{index + 1}</td>
                                            <td className="sub-email">
                                                <span className="sub-email-icon">📧</span>
                                                {sub.email}
                                            </td>
                                            <td><span className="sub-date">{sub.subscribedOn}</span></td>
                                            <td>
                                                <span className={`sub-status-pill ${sub.status.toLowerCase()}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="sub-actions">
                                                    <button className="sub-btn delete" title="Remove">🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>

            {/* MESSAGE DETAIL MODAL */}
            {selectedMessage && (
                <div className="msg-overlay" onClick={() => setSelectedMessage(null)}>
                    <div className="msg-detail-card" onClick={(e) => e.stopPropagation()}>
                        <div className="msg-detail-header">
                            <div className="msg-detail-avatar">{selectedMessage.name.charAt(0)}</div>
                            <div>
                                <h3>{selectedMessage.name}</h3>
                                <p>{selectedMessage.email}</p>
                            </div>
                            <button className="msg-close-btn" onClick={() => setSelectedMessage(null)}>×</button>
                        </div>
                        <div className="msg-detail-body">
                            <div className="msg-detail-meta">
                                <span className="msg-detail-subject">📌 {selectedMessage.subject}</span>
                                <span className="msg-detail-date">{selectedMessage.date}</span>
                            </div>
                            <p className="msg-detail-text">{selectedMessage.message}</p>
                        </div>
                        <div className="msg-detail-footer">
                            <textarea placeholder="Type your reply here..." rows="3"></textarea>
                            <div className="msg-footer-actions">
                                <button className="msg-archive-btn" onClick={() => setSelectedMessage(null)}>🗃️ Archive</button>
                                <button className="msg-reply-btn">✉️ Send Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inquiries;
