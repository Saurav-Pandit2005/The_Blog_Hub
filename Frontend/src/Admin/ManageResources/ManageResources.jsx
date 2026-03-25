import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './ManageResources.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function ManageResources() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
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

    const resources = [
        { id: 1, title: 'React Complete Guide 2024', author: 'Saurav Pandit', type: 'PDF', category: 'Coding', status: 'Published', date: 'Mar 10, 2024', downloads: '2.4k' },
        { id: 2, title: 'UI/UX Design Principles', author: 'Rima Sah', type: 'eBook', category: 'Design', status: 'Pending', date: 'Mar 12, 2024', downloads: '-' },
        { id: 3, title: 'Node.js Best Practices', author: 'Alice Smith', type: 'PDF', category: 'Coding', status: 'Published', date: 'Mar 14, 2024', downloads: '1.1k' },
        { id: 4, title: 'Digital Marketing Starter Kit', author: 'Bob Wilson', type: 'Toolkit', category: 'Marketing', status: 'Draft', date: 'Mar 15, 2024', downloads: '-' },
        { id: 5, title: 'CSS Animations Cheatsheet', author: 'Surja Bist', type: 'PDF', category: 'Design', status: 'Published', date: 'Mar 16, 2024', downloads: '890' },
        { id: 6, title: 'Business Growth Templates', author: 'Saurav Pandit', type: 'Toolkit', category: 'Business', status: 'Published', date: 'Mar 17, 2024', downloads: '560' },
    ];

    const filteredResources = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              res.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || res.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const typeIcon = (type) => {
        if (type === 'PDF') return '📄';
        if (type === 'eBook') return '📚';
        if (type === 'Toolkit') return '🧰';
        return '📁';
    };

    return (
        <div className="manage-resources-container">
            <Slidebar />

            <main className="manage-resources-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Resource Library</h1>
                        <p>Review, approve, and manage all platform resources.</p>
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

                <section className="resources-stats-row">
                    <div className="res-stat-card">
                        <span className="rs-icon">📁</span>
                        <div>
                            <p className="rs-label">Total Resources</p>
                            <h4 className="rs-value">1,284</h4>
                        </div>
                    </div>
                    <div className="res-stat-card warning">
                        <span className="rs-icon">⏳</span>
                        <div>
                            <p className="rs-label">Pending Review</p>
                            <h4 className="rs-value">34</h4>
                        </div>
                    </div>
                    <div className="res-stat-card success">
                        <span className="rs-icon">⬇️</span>
                        <div>
                            <p className="rs-label">Total Downloads</p>
                            <h4 className="rs-value">58.3k</h4>
                        </div>
                    </div>
                    <div className="res-stat-card">
                        <span className="rs-icon">📄</span>
                        <div>
                            <p className="rs-label">PDFs Published</p>
                            <h4 className="rs-value">820</h4>
                        </div>
                    </div>
                </section>

                <section className="resources-list-card">
                    <div className="res-filters-row">
                        <div className="search-bar">
                            <span>🔍</span>
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="res-filter-group">
                            <select
                                className="res-type-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option>All</option>
                                <option>PDF</option>
                                <option>eBook</option>
                                <option>Toolkit</option>
                            </select>
                            <button
                                className="res-export-btn"
                                onClick={() => alert('Resource Report Exported!')}
                            >
                                📊 Export Report
                            </button>
                        </div>
                    </div>

                    <div className="res-table-wrapper">
                        <table className="resources-table">
                            <thead>
                                <tr>
                                    <th>Resource</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Downloads</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.map(res => (
                                    <tr key={res.id}>
                                        <td>
                                            <div className="res-title-cell">
                                                <div className="res-type-icon">{typeIcon(res.type)}</div>
                                                <div className="res-text">
                                                    <p className="res-title">{res.title}</p>
                                                    <p className="res-author">By {res.author}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`type-badge ${res.type.toLowerCase()}`}>
                                                {res.type}
                                            </span>
                                        </td>
                                        <td><span className="res-cat">{res.category}</span></td>
                                        <td>
                                            <span className={`res-status-pill ${res.status.toLowerCase()}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td><span className="res-date">{res.date}</span></td>
                                        <td><span className="res-downloads">{res.downloads}</span></td>
                                        <td>
                                            <div className="res-action-btns">
                                                <button className="r-btn" title="View">👁️</button>
                                                {res.status === 'Pending' && <button className="r-btn approve" title="Approve">✓</button>}
                                                <button className="r-btn edit" title="Edit">✏️</button>
                                                <button className="r-btn delete" title="Delete">🗑️</button>
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

export default ManageResources;
