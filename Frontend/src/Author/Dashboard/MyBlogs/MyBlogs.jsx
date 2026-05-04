import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './MyBlogs.css';
import '../Dashboard.css'; // Global Dashboard styles for Toasts
import { CheckCircle, X } from 'lucide-react';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';

function MyBlogs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/author/blogs');
            if (res.data.success) {
                setBlogs(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Failed to load your blogs. Please try again.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const res = await api.delete(`/blogs/${id}`);
                if (res.data.success) {
                    triggerToast('Blog deleted successfully!');
                    fetchMyBlogs();
                }
            } catch (err) {
                console.error('Error deleting blog:', err);
                triggerToast('Failed to delete blog.', 'error');
            }
        }
    };

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="myblogs-container">
            <Slidebar />

            <main className="myblogs-content">
                <header className="myblogs-header">
                    <div className="header-left">
                        <h1>My Blog Repository</h1>
                        <p>Manage, refine, and track your creative storytelling journey.</p>
                    </div>
                    <Link to="/author/write-post" className="write-btn">
                        <span>+</span> Write New Post
                    </Link>
                </header>

                <div className="management-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Find an article..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-stats">
                        <span className="stat-tag">Total: {blogs.length}</span>
                        <span className="stat-tag published">Published: {blogs.filter(b => b.status === "Published").length}</span>
                        <span className="stat-tag draft">Drafts: {blogs.filter(b => b.status === "Draft").length}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">Loading your blogs...</div>
                ) : error ? (
                    <div className="error-state">{error}</div>
                ) : (
                    <div className="blogs-list">
                        {filteredBlogs.map((blog) => (
                            <div className="blog-item-card" key={blog._id}>
                                <div className="blog-info-wrapper">
                                    <div className="title-section">
                                        <h3>{blog.title}</h3>
                                        <span className={`status-pill ${blog.status.toLowerCase()}`}>
                                            {blog.status}
                                        </span>
                                    </div>
                                    <p className="blog-desc">{stripHtml(blog.summary || blog.content || "").substring(0, 100) + '...'}</p>
                                    <div className="blog-meta-data">
                                        <span className="meta-item">📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="meta-divider">|</span>
                                        <span className="meta-item">👁️ {blog.views} views</span>
                                        <span className="meta-divider">|</span>
                                        <span className="meta-item">❤️ {blog.likes?.length || 0} likes</span>
                                    </div>
                                </div>

                                <div className="blog-actions">
                                    <Link to={`/author/edit-post/${blog._id}`} className="action-button edit" title="Edit Post">
                                        <img src={editIcon} alt="Edit" />
                                    </Link>
                                    <button 
                                        className="action-button delete" 
                                        title="Delete Post"
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredBlogs.length === 0 && (
                            <div className="no-results">
                                <p>No articles found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                )}
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

export default MyBlogs;
