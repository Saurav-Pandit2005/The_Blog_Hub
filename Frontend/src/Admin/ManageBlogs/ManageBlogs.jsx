import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './ManageBlogs.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function ManageBlogs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
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

    const blogs = [
        { id: 1, title: 'The Future of React 19', author: 'Saurav Pandit', category: 'Technology', status: 'Published', date: 'Mar 10, 2024', views: '1.2k' },
        { id: 2, title: 'UI Design Patterns for 2024', author: 'Rima Sah', category: 'Design', status: 'Pending', date: 'Mar 12, 2024', views: '-' },
        { id: 3, title: 'Mastering Framer Motion', author: 'Surja Bist', category: 'Design', status: 'Published', date: 'Mar 14, 2024', views: '850' },
        { id: 4, title: 'Understanding Node Streams', author: 'Alice Smith', category: 'Technology', status: 'Draft', date: 'Mar 15, 2024', views: '-' },
        { id: 5, title: 'Healthy Lifestyle Tips', author: 'Bob Wilson', category: 'Lifestyle', status: 'Published', date: 'Mar 16, 2024', views: '2.4k' },
    ];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             blog.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="manage-blogs-container">
            <Slidebar />

            <main className="manage-blogs-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Content Moderation Center</h1>
                        <p>Review, approve, and manage all platform publications.</p>
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

                <section className="blogs-stats-row">
                    <div className="stat-mini-pill">
                        <span className="p-label">Total Posts</span>
                        <h4 className="p-value">3,850</h4>
                    </div>
                    <div className="stat-mini-pill alert">
                        <span className="p-label">Pending Approval</span>
                        <h4 className="p-value">124</h4>
                    </div>
                    <div className="stat-mini-pill success">
                        <span className="p-label">Published Today</span>
                        <h4 className="p-value">28</h4>
                    </div>
                </section>

                <section className="blogs-list-card">
                    <div className="list-filters">
                        <div className="search-bar">
                            <span>🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search by title or author..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option>All</option>
                                <option>Published</option>
                                <option>Pending</option>
                                <option>Draft</option>
                            </select>
                            <button className="bulk-action-btn">Bulk Actions</button>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table className="admin-blog-table">
                            <thead>
                                <tr>
                                    <th>Blog Details</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Views</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>
                                            <div className="blog-title-cell">
                                                <p className="b-title">{blog.title}</p>
                                                <p className="b-author">By {blog.author}</p>
                                            </div>
                                        </td>
                                        <td><span className="cat-text">{blog.category}</span></td>
                                        <td>
                                            <span className={`status-tag ${blog.status.toLowerCase()}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td><span className="date-text">{blog.date}</span></td>
                                        <td><span className="views-text">{blog.views}</span></td>
                                        <td>
                                            <div className="blog-actions">
                                                <button className="icon-btn" title="View">👁️</button>
                                                {blog.status === 'Pending' && <button className="icon-btn check" title="Approve">✓</button>}
                                                <button className="icon-btn edit" title="Edit">✏️</button>
                                                <button className="icon-btn delete" title="Delete">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ManageBlogs;
