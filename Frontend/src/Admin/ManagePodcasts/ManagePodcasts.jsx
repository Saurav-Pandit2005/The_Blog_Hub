import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './ManagePodcasts.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function ManagePodcasts() {
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

    const podcasts = [
        { id: 1, title: 'Tech Trends 2024', host: 'Saurav Pandit', category: 'Technology', duration: '45:30', status: 'Published', date: 'Mar 10, 2024', plays: '1.2k' },
        { id: 2, title: 'UI Design Patterns', host: 'Rima Sah', category: 'Design', duration: '32:15', status: 'Pending', date: 'Mar 12, 2024', plays: '-' },
        { id: 3, title: 'Mastering React 19', host: 'Alice Smith', category: 'Coding', duration: '50:00', status: 'Published', date: 'Mar 14, 2024', plays: '850' },
        { id: 4, title: 'The Future of AI', host: 'Bob Wilson', category: 'Technology', duration: '40:00', status: 'Draft', date: 'Mar 15, 2024', plays: '-' },
        { id: 5, title: 'Growth Strategies', host: 'Saurav Pandit', category: 'Business', duration: '28:45', status: 'Published', date: 'Mar 16, 2024', plays: '2.4k' },
    ];

    const filteredPodcasts = podcasts.filter(podcast => {
        const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             podcast.host.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || podcast.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="manage-podcasts-container">
            <Slidebar />

            <main className="manage-podcasts-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Podcast Management</h1>
                        <p>Track, moderate, and analyze all platform podcasts.</p>
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

                <section className="podcasts-stats-row">
                    <div className="stat-card">
                        <span className="sc-label">Total Tracks</span>
                        <h4 className="sc-value">458</h4>
                    </div>
                    <div className="stat-card alert">
                        <span className="sc-label">Pending Approval</span>
                        <h4 className="sc-value">12</h4>
                    </div>
                    <div className="stat-card success">
                        <span className="sc-label">Total Plays</span>
                        <h4 className="sc-value">124.5k</h4>
                    </div>
                    <div className="stat-card">
                        <span className="sc-label">Average Time</span>
                        <h4 className="sc-value">34m</h4>
                    </div>
                </section>

                <section className="podcasts-list-card">
                    <div className="list-filters-row">
                        <div className="search-bar">
                            <span>🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search by title or host..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <select 
                                className="status-select"
                                value={statusFilter} 
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option>All</option>
                                <option>Published</option>
                                <option>Pending</option>
                                <option>Draft</option>
                            </select>
                            <button className="export-report-btn" onClick={() => alert('Podcast Performance Report Exported to CSV!')}>📊 Export CSV Report</button>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table className="admin-podcast-table">
                            <thead>
                                <tr>
                                    <th>Podcast Details</th>
                                    <th>Category</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Plays</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPodcasts.map(podcast => (
                                    <tr key={podcast.id}>
                                        <td>
                                            <div className="podcast-title-cell">
                                                <div className="p-cover-mini">
                                                    🎙️
                                                </div>
                                                <div className="p-text">
                                                    <p className="p-title">{podcast.title}</p>
                                                    <p className="p-host">By {podcast.host}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="cat-tag">{podcast.category}</span></td>
                                        <td><span className="dur-text">{podcast.duration}</span></td>
                                        <td>
                                            <span className={`status-badge ${podcast.status.toLowerCase()}`}>
                                                {podcast.status}
                                            </span>
                                        </td>
                                        <td><span className="date-text">{podcast.date}</span></td>
                                        <td><span className="plays-text">{podcast.plays}</span></td>
                                        <td>
                                            <div className="podcast-actions">
                                                <button className="p-icon-btn" title="Listen">🎧</button>
                                                {podcast.status === 'Pending' && <button className="p-icon-btn check" title="Approve">✓</button>}
                                                <button className="p-icon-btn edit" title="Edit">✏️</button>
                                                <button className="p-icon-btn delete" title="Remove">🗑️</button>
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

export default ManagePodcasts;
