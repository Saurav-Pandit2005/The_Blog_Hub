import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './ManagePodcasts.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { Search, Filter, Play, Edit, Trash2, Mic, Film, Eye, ChevronDown, Calendar, CheckCircle, X } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import '../Dashboard/Dashboard.css'; // Global Toast styles

function ManagePodcasts() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const fetchPodcasts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/podcasts');
            if (res.data.success) {
                setPodcasts(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching podcasts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this podcast?')) {
            try {
                const res = await api.delete(`/podcasts/${id}`);
                if (res.data.success) {
                    triggerToast('Podcast Deleted Successfully!');
                    fetchPodcasts();
                }
            } catch (err) {
                triggerToast('Error deleting podcast', 'error');
            }
        }
    };

    const filteredPodcasts = podcasts.filter(podcast => {
        const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (podcast.host?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || podcast.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="manage-podcasts-container">
            <Slidebar />

            <main className="manage-podcasts-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Audio-Visual Hub</span>
                        <h1>Podcast Management</h1>
                        <p>Track listener engagement, moderate episodes, and manage your broadcast schedule.</p>
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

                <section className="podcasts-stats-grid">
                    <div className="stat-premium-card total" onClick={() => setStatusFilter('All')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><Mic size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Tracks</span>
                            <h3 className="stat-value">{podcasts.length}</h3>
                        </div>
                    </div>
                    <div className="stat-premium-card views">
                        <div className="stat-icon-box"><Film size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Plays</span>
                            <h3 className="stat-value">{podcasts.reduce((acc, p) => acc + (p.plays || 0), 0)}</h3>
                        </div>
                    </div>
                </section>

                <section className="podcasts-management-hub">
                    <div className="hub-controls">
                        <div className="search-wrapper">
                            <Search size={18} className="search-i" />
                            <input 
                                type="text" 
                                placeholder="Search by title, host or category..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-select-box">
                            <Filter size={16} className="filter-i" />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="All">All Status</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                            </select>
                            <ChevronDown size={14} className="chevron-i" />
                        </div>
                    </div>

                    <div className="table-card-wrapper">
                        {loading ? (
                            <div className="sync-pulse">Synchronizing records...</div>
                        ) : filteredPodcasts.length > 0 ? (
                            <table className="admin-premium-table">
                                <thead>
                                    <tr>
                                        <th>Podcast Info</th>
                                        <th>Host</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Stats</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPodcasts.map(podcast => (
                                        <tr key={podcast._id}>
                                            <td>
                                                <div className="t-pod-info">
                                                    <div className="t-min-cover">
                                                        {podcast.type === 'Audio' ? <Mic size={20} color="#3b82f6" /> : <Film size={20} color="#3b82f6" />}
                                                    </div>
                                                    <div>
                                                        <p className="t-title">
                                                            {podcast.title}
                                                            <span className={`t-type-tag ${podcast.type.toLowerCase()}`}>
                                                                {podcast.type === 'Audio' ? 'Audio' : 'Video'}
                                                            </span>
                                                        </p>
                                                        <p className="t-date">{new Date(podcast.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-host">
                                                    <span className="t-name">{podcast.host?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td><span className="t-cat">{podcast.category}</span></td>
                                            <td>
                                                <span className={`st-tag ${podcast.status.toLowerCase()}`}>
                                                    {podcast.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="t-stats">
                                                    <Play size={12} /> {podcast.plays || 0}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-actions">
                                                    <button 
                                                        className="t-act-btn watch" 
                                                        title="Watch"
                                                        onClick={() => navigate(`/podcast-detail/${podcast._id}`)}
                                                    ><Play size={16} /></button>
                                                    {podcast.host?.role === 'Admin' && (
                                                        <button className="t-act-btn edit" title="Edit"><Edit size={16} /></button>
                                                    )}
                                                    <button 
                                                        className="t-act-btn delete" 
                                                        title="Delete" 
                                                        onClick={() => handleDelete(podcast._id)}
                                                    ><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-results">No podcasts found matching your criteria.</div>
                        )}
                    </div>
                </section>
            </main>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`premium-toast-container ${toast.type}`}>
                    <div className="toast-content">
                        {toast.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
                        <span>{toast.message}</span>
                    </div>
                    <div className="toast-progress-bar"></div>
                </div>
            )}
        </div>
    );
}

export default ManagePodcasts;
