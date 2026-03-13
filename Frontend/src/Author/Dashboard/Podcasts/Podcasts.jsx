import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Podcasts.css';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';
import playIcon from '../../../assets/Images/Author/Dashboard/Podcasts/play.png';

function Podcasts() {
    const [searchTerm, setSearchTerm] = useState('');

    const podcastsData = [
        {
            id: 1,
            title: "Mastering the Craft of Writing",
            description: "Deep dive into storytelling techniques and finding your unique author voice.",
            duration: "45:20",
            date: "2024-02-15",
            listens: 1250,
            status: "published"
        },
        {
            id: 2,
            title: "The Future of Digital Publishing",
            description: "Discussing how AI and blockchain are changing the landscape for independent authors.",
            duration: "32:15",
            date: "2024-02-28",
            listens: 840,
            status: "published"
        },
        {
            id: 3,
            title: "Building an Audience from Scratch",
            description: "Practical strategies for growing your email list and social media presence.",
            duration: "55:00",
            date: "2024-03-05",
            listens: 0,
            status: "draft"
        },
        {
            id: 4,
            title: "Interview with Best-Selling Authors",
            description: "Exclusive insights from creators who have reached the top of the charts.",
            duration: "1:15:30",
            date: "2024-03-10",
            listens: 2100,
            status: "published"
        }
    ];

    const filteredPodcasts = podcastsData.filter(pod =>
        pod.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="author-podcasts-container">
            <Slidebar />

            <main className="podcasts-main-content">
                <header className="podcasts-header">
                    <div className="header-left">
                        <h1>Manage Your Podcasts</h1>
                        <p>Track performance and manage your audio stories.</p>
                    </div>
                    <Link to="/author/upload-podcast" className="upload-btn">
                        <span>🎙️</span> Upload New Podcast
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
                        <span className="stat-tag total">Total: {podcastsData.length}</span>
                        <span className="stat-tag published">Live: {podcastsData.filter(p => p.status === "published").length}</span>
                        <span className="stat-tag listeners">Total Listens: 4,190</span>
                    </div>
                </div>

                <div className="podcasts-list">
                    {filteredPodcasts.map((pod) => (
                        <div className="podcast-item-card" key={pod.id}>
                            <div className="pod-play-indicator">
                                <button className="mini-play-btn">
                                    <img src={playIcon} alt="Play" />
                                </button>
                            </div>

                            <div className="pod-info">
                                <div className="title-row">
                                    <h3>{pod.title}</h3>
                                    <span className={`status-badge ${pod.status}`}>{pod.status}</span>
                                </div>
                                <p className="pod-desc">{pod.description}</p>
                                <div className="pod-meta">
                                    <span className="meta-item">⏱️ {pod.duration}</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">🎧 {pod.listens} listens</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">📅 {pod.date}</span>
                                </div>
                            </div>

                            <div className="pod-actions">
                                <button className="action-button edit" title="Edit Podcast">
                                    <img src={editIcon} alt="Edit" />
                                </button>
                                <button className="action-button delete" title="Remove Podcast">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredPodcasts.length === 0 && (
                        <div className="no-data">
                            <p>No podcasts found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Podcasts;
