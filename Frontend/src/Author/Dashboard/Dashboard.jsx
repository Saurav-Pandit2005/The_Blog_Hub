import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from './Slidebar/Slidebar';
import api from '../../api';
import './Dashboard.css';

// Assets from Slidebar (reusing for stats)
import blogIcon from '../../assets/Images/Author/Dashboard/Slidebar/blogging.png';
import viewIcon from '../../assets/Images/Author/Dashboard/Slidebar/dashboard.png';
import podcastIcon from '../../assets/Images/Author/Dashboard/Slidebar/podcast.png';
import resourcesIcon from '../../assets/Images/Author/Dashboard/Slidebar/resouces.png';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Get user from localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : { name: 'Author' };

    useEffect(() => {
        fetchAuthorStats();
    }, []);

    const fetchAuthorStats = async () => {
        try {
            setLoading(true);
            const res = await api.get('/author/stats');
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching author stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const statsData = [
        { title: "Total Blogs", value: stats?.totalBlogs || "0", icon: blogIcon },
        { title: "Total Views", value: stats?.totalViews || "0", icon: viewIcon },
        { title: "Podcasts", value: stats?.totalPodcasts || "0", icon: podcastIcon },
        { title: "Resources", value: stats?.totalResources || "0", icon: resourcesIcon },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <Slidebar />

            <main className="main-content">
                <header className="welcome-header">
                    <div className="header-top">
                        <div className="welcome-text">
                            <h1>Welcome back, {user.name} 👋</h1>
                            <p>Here's a snapshot of your creative impact today.</p>
                        </div>
                        <div className="header-actions">
                            <div className="profile-header-trigger">
                                <span className="profile-name">{user.name}</span>
                                <img 
                                    src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=3b82f6`} 
                                    className="header-profile-img" 
                                    alt="Profile" 
                                />
                                <div className="header-dropdown">
                                    <Link to="/author/profile">My Profile</Link>
                                    <button onClick={handleLogout} className="drop-logout-btn">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="stats-grid">
                    {loading ? (
                        <div className="loading-shimmer-stats">Syncing your performance...</div>
                    ) : (
                        statsData.map((stat, index) => (
                            <div className="stat-card" key={index}>
                                <div className="card-header">
                                    <h3>{stat.title}</h3>
                                    <div className="card-icon-round">
                                        <img src={stat.icon} alt={stat.title} />
                                    </div>
                                </div>
                                <p className="stat-value">{stat.value}</p>
                            </div>
                        ))
                    )}
                </section>

                <section className="recent-posts-section">
                    <div className="section-header">
                        <h2>Recent Posts</h2>
                        <Link to="/author/write-post" className="write-btn">Write New Post</Link>
                    </div>

                    <div className="posts-list">
                        {loading ? (
                            <p>Loading your articles...</p>
                        ) : stats?.recentBlogs?.length > 0 ? (
                            stats.recentBlogs.map((post, index) => (
                                <div className="post-item" key={index}>
                                    <div className="post-info">
                                        <span className="post-title">{post.title}</span><br />
                                        <small className="post-date">{new Date(post.createdAt).toLocaleDateString()}</small>
                                    </div>
                                    <div className="post-meta">
                                        <span className="views-count">{post.views} views</span>
                                        <span className={`status-badge ${post.status.toLowerCase()}`}>{post.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-posts">No posts yet. Start writing today!</p>
                        )}
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
