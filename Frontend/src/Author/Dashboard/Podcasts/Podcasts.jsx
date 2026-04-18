import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './Podcasts.css';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';
import playIcon from '../../../assets/Images/Author/Dashboard/Podcasts/play.png';

function Podcasts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPodcasts = async () => {
            try {
                setLoading(true);
                const res = await api.get('/podcasts/my-podcasts');
                if (res.data.success) {
                    setPodcasts(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching my podcasts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyPodcasts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this podcast?")) {
            try {
                await api.delete(`/podcasts/${id}`);
                setPodcasts(podcasts.filter(p => p._id !== id));
            } catch (err) {
                alert("Failed to delete podcast.");
            }
        }
    };

    const filteredPodcasts = podcasts.filter(pod =>
        pod.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalViews = podcasts.reduce((acc, curr) => acc + (curr.views || 0), 0);

    if (loading) return (
        <div className="author-podcasts-container">
            <Slidebar />
            <main className="podcasts-main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>Syncing your audio stories...</div>
            </main>
        </div>
    );

    return (
        <div className="author-podcasts-container">
            <Slidebar />

            <main className="podcasts-main-content">
                <header className="podcasts-header">
                    <div className="header-left">
                        <h1>Manage Your Video Podcasts</h1>
                        <p>Track performance and manage your video stories.</p>
                    </div>
                    <Link to="/author/upload-podcast" className="upload-btn">
                        <span>🎞️</span> Upload New Video Podcast
                    </Link>
                </header>

                <div className="management-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-stats">
                        <span className="stat-tag total">Total: {podcasts.length}</span>
                        <span className="stat-tag published">Live: {podcasts.filter(p => p.status === "Published").length}</span>
                        <span className="stat-tag listeners">Total Views: {totalViews.toLocaleString()}</span>
                    </div>
                </div>

                <div className="podcasts-list">
                    {filteredPodcasts.length > 0 ? (
                        filteredPodcasts.map((pod) => (
                            <div className="podcast-item-card" key={pod._id}>
                                <div className="pod-thumbnail">
                                    <img src={pod.coverImage || 'https://via.placeholder.com/120x80'} alt="Thumb" />
                                    <div className="pod-play-overlay">
                                        <Link to={`/podcast-detail/${pod._id}`}>
                                            <button className="mini-play-btn">
                                                <img src={playIcon} alt="Play" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="pod-info">
                                    <div className="title-row">
                                        <h3>{pod.title}</h3>
                                        <span className={`status-badge ${pod.status?.toLowerCase()}`}>{pod.status}</span>
                                    </div>
                                    <p className="pod-desc">{pod.desc}</p>
                                    <div className="pod-meta">
                                        <span className="meta-item">📅 {new Date(pod.createdAt).toLocaleDateString()}</span>
                                        <span className="meta-item">👁️ {pod.views || 0} Views</span>
                                        <span className="meta-item">📁 {pod.category}</span>
                                    </div>
                                </div>

                                <div className="pod-actions">
                                    <Link to={`/author/edit-podcast/${pod._id}`} className="action-button edit" title="Edit">
                                        <img src={editIcon} alt="Edit" />
                                    </Link>
                                    <button className="action-button delete" title="Delete" onClick={() => handleDelete(pod._id)}>
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">No podcasts found. Start uploading!</div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Podcasts;
