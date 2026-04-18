import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './ManageBlogs.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { Search, Filter, Eye, Edit, Trash2, BookOpen, TrendingUp, ChevronDown, Mail, Calendar } from 'lucide-react';
import { UserContext } from '../../context/UserContext';

function ManageBlogs() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/blogs');
            if (res.data.success) {
                setBlogs(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const res = await api.delete(`/blogs/${id}`);
                if (res.data.success) {
                    alert('Blog Deleted!');
                    fetchBlogs();
                }
            } catch (err) {
                alert('Error deleting blog');
            }
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (blog.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="manage-blogs-container">
            <Slidebar />

            <main className="manage-blogs-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Content Management</span>
                        <h1>Manage Published Blogs</h1>
                        <p>Review, moderate, and manage all articles published on the platform.</p>
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

                <section className="blogs-stats-grid">
                    <div className="stat-premium-card total" onClick={() => setStatusFilter('All')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><BookOpen size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Publications</span>
                            <h3 className="stat-value">{blogs.length}</h3>
                        </div>
                    </div>
                    <div className="stat-premium-card published" onClick={() => setStatusFilter('Published')} style={{cursor:'pointer'}}>
                        <div className="stat-icon-box"><TrendingUp size={24} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Active Posts</span>
                            <h3 className="stat-value">{blogs.filter(b => b.status === 'Published').length}</h3>
                        </div>
                    </div>
                </section>

                <section className="blogs-management-hub">
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
                        ) : filteredBlogs.length > 0 ? (
                            <table className="admin-premium-table">
                                <thead>
                                    <tr>
                                        <th>Blog Info</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Stats</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBlogs.map(blog => (
                                        <tr key={blog._id}>
                                            <td>
                                                <div className="t-blog-info">
                                                    <img src={blog.coverImage || 'https://via.placeholder.com/40'} alt="cv" className="t-min-cover" />
                                                    <div>
                                                        <p className="t-title">{blog.title}</p>
                                                        <p className="t-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-author">
                                                    <span className="t-name">{blog.author?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td><span className="t-cat">{blog.category}</span></td>
                                            <td>
                                                <span className={`st-tag ${blog.status.toLowerCase()}`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="t-stats">
                                                    <Eye size={12} /> {blog.views || 0}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="t-actions">
                                                    <Link to={`/blog-detail/${blog.slug}`} className="t-act-btn view" title="View"><Eye size={16} /></Link>
                                                    {blog.author?.role === 'Admin' && (
                                                        <Link to={`/author/edit-post/${blog._id}`} className="t-act-btn edit" title="Edit"><Edit size={16} /></Link>
                                                    )}
                                                    <button className="t-act-btn delete" title="Delete" onClick={() => handleDelete(blog._id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-results">No blogs found matching your criteria.</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ManageBlogs;
