import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Resources.css';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';

function Resources() {
    const [searchTerm, setSearchTerm] = useState('');

    const resourcesData = [
        {
            id: 1,
            title: "Advanced Writing Templates",
            type: "PDF / Link",
            description: "A comprehensive set of templates for different blog formats and storytelling styles.",
            downloads: 450,
            date: "2024-01-20",
            status: "published"
        },
        {
            id: 2,
            title: "Author's Brand Ebook",
            type: "Ebook",
            description: "Guide to building a personal brand as a professional writer or journalist.",
            downloads: 1200,
            date: "2024-02-15",
            status: "published"
        },
        {
            id: 3,
            title: "SEO Checklist for Bloggers",
            type: "Document",
            description: "Step-by-step checklist to optimize your blog posts for search engines.",
            downloads: 0,
            date: "2024-03-01",
            status: "draft"
        },
        {
            id: 4,
            title: "Content Planning Spreadsheet",
            type: "Spreadsheet",
            description: "Organize your editorial calendar and content pipeline efficiently.",
            downloads: 890,
            date: "2024-02-10",
            status: "published"
        }
    ];

    const filteredResources = resourcesData.filter(res =>
        res.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="author-resources-container">
            <Slidebar />

            <main className="resources-main-content">
                <header className="resources-header">
                    <div className="header-left">
                        <h1>Manage Resources</h1>
                        <p>Organize and track your educational materials and community assets.</p>
                    </div>
                    <Link to="/author/upload-resource" className="upload-btn">
                        <span>📂</span> Upload New Resource
                    </Link>
                </header>

                <div className="management-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Find a resource..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-stats">
                        <span className="stat-tag total">Total: {resourcesData.length}</span>
                        <span className="stat-tag published">Live: {resourcesData.filter(r => r.status === "published").length}</span>
                        <span className="stat-tag downloads">Total Downloads: 2,540</span>
                    </div>
                </div>

                <div className="resources-list">
                    {filteredResources.map((res) => (
                        <div className="resource-item-card" key={res.id}>
                            <div className="res-icon-box">
                                <span className="type-badge">{res.type}</span>
                            </div>

                            <div className="res-info">
                                <div className="title-row">
                                    <h3>{res.title}</h3>
                                    <span className={`status-pill ${res.status}`}>{res.status}</span>
                                </div>
                                <p className="res-desc">{res.description}</p>
                                <div className="res-meta">
                                    <span className="meta-item">📅 {res.date}</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">💾 {res.downloads} downloads</span>
                                </div>
                            </div>

                            <div className="res-actions">
                                <button className="action-button edit" title="Edit Resource">
                                    <img src={editIcon} alt="Edit" />
                                </button>
                                <button className="action-button delete" title="Remove Resource">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredResources.length === 0 && (
                        <div className="empty-results">
                            <p>No resources found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Resources;
