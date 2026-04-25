import React, { useState, useEffect, useRef, useContext } from 'react';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './Inquiries.css';
import { Search, Mail, MessageSquare, Trash2, Send, CheckCircle, Clock, X, ChevronDown, Filter, Calendar } from 'lucide-react';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Inquiries() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await api.get('/inquiries');
            if (res.data.success) {
                setMessages(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (id) => {
        if (!replyText.trim()) return alert("Please type a reply.");
        try {
            const res = await api.put(`/inquiries/${id}/reply`, { replyMessage: replyText });
            if (res.data.success) {
                alert("Reply sent successfully via Email!");
                setReplyText('');
                setSelectedMessage(null);
                fetchInquiries();
            }
        } catch (err) {
            alert("Failed to send reply.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this inquiry?")) return;
        try {
            await api.delete(`/inquiries/${id}`);
            setMessages(messages.filter(m => m._id !== id));
            setSelectedMessage(null);
        } catch (err) {
            alert("Delete failed.");
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'All' || msg.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const unreadCount = messages.filter(m => m.status === 'New').length;

    return (
        <div className="inquiries-container">
            <Slidebar />

            <main className="inquiries-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Communication Hub</span>
                        <h1>User Inquiries</h1>
                        <p>Monitor incoming messages, respond to feedback, and manage platform support requests.</p>
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

                <section className="inq-stats-grid">
                    <div className="stat-premium-card total" onClick={() => setStatusFilter('All')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><Mail size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Messages</span>
                            <h3 className="stat-value">{messages.length}</h3>
                        </div>
                    </div>
                    <div className="stat-premium-card new" onClick={() => setStatusFilter('New')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><Clock size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">New Messages</span>
                            <h3 className="stat-value">{unreadCount}</h3>
                        </div>
                    </div>
                </section>

                <section className="inq-management-hub">
                    <div className="hub-controls">
                        <div className="search-wrapper">
                            <Search size={18} className="search-i" />
                            <input
                                type="text"
                                placeholder="Search by name, email or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-select-box">
                            <Filter size={16} className="filter-i" />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="All">All Inquiries</option>
                                <option value="New">New Only</option>
                                <option value="Replied">Replied</option>
                            </select>
                            <ChevronDown size={14} className="chevron-i" />
                        </div>
                    </div>

                    <div className="inbox-list">
                        {loading ? (
                            <div className="sync-pulse">Synchronizing inbox...</div>
                        ) : filteredMessages.length > 0 ? (
                            filteredMessages.map(msg => (
                                <div
                                    key={msg._id}
                                    className={`message-item ${msg.status === 'New' ? 'unread' : ''}`}
                                    onClick={() => setSelectedMessage(msg)}
                                >
                                    <div className="msg-avatar">{msg.name.charAt(0)}</div>
                                    <div className="msg-info-main">
                                        <div className="msg-sender-box">
                                            <span className="msg-name">{msg.name}</span>
                                            <span className="msg-email">{msg.email}</span>
                                        </div>
                                        <p className="msg-title-line">{msg.subject}</p>
                                        <p className="msg-preview">{msg.message}</p>
                                    </div>
                                    <div className="msg-meta-side">
                                        <span className={`st-tag ${msg.status.toLowerCase()}`}>{msg.status}</span>
                                        <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-results">Your inbox is clean for this filter.</div>
                        )}
                    </div>
                </section>
            </main>

            {/* MESSAGE DETAIL MODAL */}
            {selectedMessage && (
                <div className="msg-overlay" onClick={() => setSelectedMessage(null)}>
                    <div className="msg-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="author-profile">
                                <div className="author-img">{selectedMessage.name.charAt(0)}</div>
                                <div className="author-meta">
                                    <h3>{selectedMessage.name}</h3>
                                    <p>{selectedMessage.email}</p>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedMessage(null)}><X size={24} /></button>
                        </div>
                        <div className="modal-content">
                            <h2 className="content-subject"><MessageSquare size={20} color="#3b82f6" /> {selectedMessage.subject}</h2>
                            <div className="content-message">
                                {selectedMessage.message}
                            </div>
                            
                            {selectedMessage.status === 'Replied' && (
                                <div className="replied-banner">
                                    <div className="replied-title">
                                        <CheckCircle size={16} /> Admin Response
                                    </div>
                                    <p className="replied-text">{selectedMessage.replyMessage}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="modal-footer">
                            {selectedMessage.status !== 'Replied' ? (
                                <div className="reply-input-box">
                                    <textarea 
                                        placeholder="Write your email reply here..." 
                                        rows="4"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    ></textarea>
                                    <div className="footer-actions">
                                        <button className="action-btn del" onClick={() => handleDelete(selectedMessage._id)}><Trash2 size={16} /> Delete</button>
                                        <button className="action-btn send" onClick={() => handleReply(selectedMessage._id)}><Send size={16} /> Send Email Reply</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="footer-actions">
                                    <button className="action-btn del" onClick={() => handleDelete(selectedMessage._id)}><Trash2 size={16} /> Delete Inquiry</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inquiries;
