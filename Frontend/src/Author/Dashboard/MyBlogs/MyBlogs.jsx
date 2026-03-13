import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './MyBlogs.css';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';

function MyBlogs() {
    const [searchTerm, setSearchTerm] = useState('');

    const blogsData = [
        {
            id: 1,
            title: "Getting Started with Next.js",
            description: "Learn how to build modern web applications with Next.js and React.",
            date: "2024-02-01",
            views: 523,
            likes: 87,
            status: "published"
        },
        {
            id: 2,
            title: "AI Trends in 2024",
            description: "Exploring the latest advancements in Artificial Intelligence.",
            date: "2024-02-18",
            views: 0,
            likes: 0,
            status: "draft"
        },
        {
            id: 3,
            title: "Understanding Spring Boot",
            description: "A beginner-friendly guide to building REST APIs using Spring Boot.",
            date: "2024-02-10",
            views: 312,
            likes: 45,
            status: "published"
        },
        {
            id: 4,
            title: "Mastering TypeScript",
            description: "Deep dive into advanced TypeScript patterns and utility types.",
            date: "2024-03-05",
            views: 120,
            likes: 32,
            status: "published"
        }
    ];

    const filteredBlogs = blogsData.filter(blog =>
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

                {/* SEARCH & FILTERS IMPROVEMENT */}
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
                        <span className="stat-tag">Total: {blogsData.length}</span>
                        <span className="stat-tag published">Published: {blogsData.filter(b => b.status === "published").length}</span>
                        <span className="stat-tag draft">Drafts: {blogsData.filter(b => b.status === "draft").length}</span>
                    </div>
                </div>

                <div className="blogs-list">
                    {filteredBlogs.map((blog) => (
                        <div className="blog-item-card" key={blog.id}>
                            <div className="blog-info-wrapper">
                                <div className="title-section">
                                    <h3>{blog.title}</h3>
                                    <span className={`status-pill ${blog.status}`}>
                                        {blog.status}
                                    </span>
                                </div>
                                <p className="blog-desc">{blog.description}</p>
                                <div className="blog-meta-data">
                                    <span className="meta-item">📅 {blog.date}</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">👁️ {blog.views} views</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">❤️ {blog.likes} likes</span>
                                </div>
                            </div>

                            <div className="blog-actions">
                                <button className="action-button edit" title="Edit Post">
                                    <img src={editIcon} alt="Edit" />
                                </button>
                                <button className="action-button delete" title="Delete Post">
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
            </main>
        </div>
    );
}

export default MyBlogs;
