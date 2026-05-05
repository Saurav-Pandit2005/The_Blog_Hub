import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './ManageResources.css';
import { Search, Filter, Folder, Download, Edit, Trash2, Eye, ChevronDown, Calendar, CheckCircle, X } from 'lucide-react';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../context/UserContext';
import '../Dashboard/Dashboard.css'; // Global Toast styles

function ManageResources() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [resources, setResources] = useState([]);
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
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/resources');
            if (res.data.success) {
                setResources(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching resources:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            try {
                const res = await api.delete(`/resources/${id}`);
                if (res.data.success) {
                    triggerToast('Resource Deleted Successfully!');
                    fetchResources();
                }
            } catch (err) {
                triggerToast('Error deleting resource', 'error');
            }
        }
    };

    const filteredResources = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (res.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || res.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="manage-resources-container">
            <Slidebar />

            <main className="manage-resources-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Resource Library</span>
                        <h1>Manage Platform Assets</h1>
                        <p>Organize, moderate, and monitor downloads for eBooks, toolkits, and guides.</p>
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

                <section className="resources-stats-grid">
                    <div className="stat-premium-card total" onClick={() => setTypeFilter('All')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><Folder size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Resources</span>
                            <h3 className="stat-value">{resources.length}</h3>
                        </div>
                    </div>
                    <div className="stat-premium-card downloads">
                        <div className="stat-icon-box"><Download size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Downloads</span>
                            <h3 className="stat-value">{resources.reduce((acc, r) => acc + (r.downloads || 0), 0)}</h3>
                        </div>
                    </div>
                </section>

                <section className="resources-management-hub">
                    <div className="hub-controls">
                        <div className="search-wrapper">
                            <Search size={18} className="search-i" />
                            <input
                                type="text"
                                placeholder="Search by title, author or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-select-box">
                            <Filter size={16} className="filter-i" />
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                <option value="All">All Types</option>
                                <option value="PDF">PDF</option>
                                <option value="eBook">eBook</option>
                                <option value="Toolkit">Toolkit</option>
                            </select>
                            <ChevronDown size={14} className="chevron-i" />
                        </div>
                    </div>

                    <div className="table-card-wrapper">
                        {loading ? (
                            <div className="sync-pulse">Synchronizing records...</div>
                        ) : filteredResources.length > 0 ? (
                            <table className="resources-table">
                                <thead>
                                    <tr>
                                        <th>Resource Info</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Stats</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResources.map(res => (
                                        <tr key={res._id}>
                                            <td>
                                                <div className="t-res-info">
                                                    <div className="t-min-icon"><Folder size={20} /></div>
                                                    <div>
                                                        <p className="t-title">{res.title}</p>
                                                        <p className="t-date">{new Date(res.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-author">
                                                    <span className="t-name">{res.author?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td><span className="t-cat">{res.category}</span></td>
                                            <td>
                                                <span className={`st-tag ${res.status.toLowerCase()}`}>
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="t-stats">
                                                    <Download size={12} /> {res.downloads || 0}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-actions">
                                                    <button 
                                                        className="t-act-btn view" 
                                                        title="View"
                                                        onClick={() => navigate(`/resource-detail/${res._id}`)}
                                                    ><Eye size={16} /></button>
                                                    {res.author?.role === 'Admin' && (
                                                        <button className="t-act-btn edit" title="Edit"><Edit size={16} /></button>
                                                    )}
                                                    <button 
                                                        className="t-act-btn delete" 
                                                        title="Delete" 
                                                        onClick={() => handleDelete(res._id)}
                                                    ><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-results">No resources found matching your criteria.</div>
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

export default ManageResources;
