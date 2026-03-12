import React from 'react';
import { Link } from 'react-router-dom';
import Slidebar from './Slidebar/Slidebar';
import './Dashboard.css';

// Assets from Slidebar (reusing for stats)
import blogIcon from '../../assets/Images/Author/Dashboard/Slidebar/blogging.png';
import viewIcon from '../../assets/Images/Author/Dashboard/Slidebar/dashboard.png';
import podcastIcon from '../../assets/Images/Author/Dashboard/Slidebar/podcast.png';
import resourcesIcon from '../../assets/Images/Author/Dashboard/Slidebar/resouces.png';

function Dashboard() {
    const username = "Rima Sah"; // Dynamic in future

    const statsData = [
        { title: "Total Blogs", value: "12", icon: blogIcon },
        { title: "Total Views", value: "917", icon: viewIcon },
        { title: "Podcasts", value: "8", icon: podcastIcon },
        { title: "Resources", value: "15", icon: resourcesIcon },
    ];

    const recentPosts = [
        { title: "Getting Started with Next.js", date: "2024-02-01", views: "523", status: "Published" },
        { title: "Advanced JavaScript Patterns", date: "2024-01-15", views: "412", status: "Published" },
    ];

    return (
        <div className="dashboard-container">
            <Slidebar />

            <main className="main-content">
                <header className="welcome-header">
                    <h1>Welcome, {username} 👋</h1>
                    <p>Here's an overview of your content and engagement.</p>
                </header>

                <section className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div className="stat-card" key={index}>
                            <div className="card-top">
                                <h3>{stat.title}</h3>
                                <img src={stat.icon} alt={stat.title} />
                            </div>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    ))}
                </section>

                <section className="recent-posts-section">
                    <div className="section-header">
                        <h2>Recent Posts</h2>
                        <Link to="/author/write-post" className="write-btn">Write New Post</Link>
                    </div>

                    <div className="posts-list">
                        {recentPosts.map((post, index) => (
                            <div className="post-item" key={index}>
                                <div className="post-info">
                                    <span className="post-title">{post.title}</span><br />
                                    <small className="post-date">{post.date}</small>
                                </div>
                                <div className="post-meta">
                                    <span className="views-count">{post.views} views</span>
                                    <span className="status-badge published">{post.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bottom-cards-grid">
                    <div className="big-card writing-promo">
                        <h2>Start Writing</h2>
                        <p>Create a new article and share your thoughts with the world.</p>
                        <Link to="/author/write-post" className="action-btn">Write Post</Link>
                    </div>

                    <div className="big-card manage-promo">
                        <h2>Manage Your Blogs</h2>
                        <p>View, edit, and delete your published articles.</p>
                        <Link to="/author/my-blogs" className="action-btn">View All Posts</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
