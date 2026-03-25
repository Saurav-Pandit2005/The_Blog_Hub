import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Analytics.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

// ─────────────────────────────────────────────
// MOCK DATA — Replace this with API calls later
// e.g. const res = await fetch('/api/admin/analytics');
// ─────────────────────────────────────────────
const ANALYTICS_DATA = {
    overview: [
        { label: 'Total Users',     value: '1,240', change: '+12%', icon: '👥', trend: 'up' },
        { label: 'Total Blogs',     value: '3,850', change: '+8%',  icon: '📝', trend: 'up' },
        { label: 'Total Podcasts',  value: '458',   change: '+5%',  icon: '🎙️', trend: 'up' },
        { label: 'Total Resources', value: '1,284', change: '-2%',  icon: '📁', trend: 'down' },
        { label: 'Newsletter Subs', value: '6,740', change: '+18%', icon: '📬', trend: 'up' },
        { label: 'Total Downloads', value: '58.3k', change: '+22%', icon: '⬇️', trend: 'up' },
    ],
    trafficByCategory: [
        { label: 'Technology', value: 42 },
        { label: 'Design',     value: 28 },
        { label: 'Business',   value: 18 },
        { label: 'Lifestyle',  value: 8  },
        { label: 'Other',      value: 4  },
    ],
    monthlyActivity: [
        { month: 'Oct', blogs: 45, users: 120 },
        { month: 'Nov', blogs: 60, users: 180 },
        { month: 'Dec', blogs: 38, users: 150 },
        { month: 'Jan', blogs: 72, users: 210 },
        { month: 'Feb', blogs: 55, users: 190 },
        { month: 'Mar', blogs: 88, users: 260 },
    ],
    topBlogs: [
        { rank: 1, title: 'The Future of React 19',       author: 'Saurav Pandit', views: '12.4k', category: 'Technology' },
        { rank: 2, title: 'UI Design Patterns for 2024',  author: 'Rima Sah',      views: '9.8k',  category: 'Design'      },
        { rank: 3, title: 'Mastering Framer Motion',      author: 'Surja Bist',    views: '7.2k',  category: 'Design'      },
        { rank: 4, title: 'Healthy Lifestyle Tips',       author: 'Bob Wilson',    views: '6.5k',  category: 'Lifestyle'   },
        { rank: 5, title: 'Understanding Node Streams',   author: 'Alice Smith',   views: '5.1k',  category: 'Technology'  },
    ],
};
// ─────────────────────────────────────────────

const BAR_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
const CATEGORY_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function Analytics() {
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

    const maxBlogs = Math.max(...ANALYTICS_DATA.monthlyActivity.map(m => m.blogs));
    const maxUsers = Math.max(...ANALYTICS_DATA.monthlyActivity.map(m => m.users));

    return (
        <div className="analytics-container">
            <Slidebar />

            <main className="analytics-main">
                {/* HEADER */}
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Analytics Overview</h1>
                        <p>Platform performance and content metrics at a glance.</p>
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

                {/* OVERVIEW STAT CARDS */}
                <section className="analytics-overview-grid">
                    {ANALYTICS_DATA.overview.map((stat, i) => (
                        <div className="stat-overview-card" key={i}>
                            <div className="soc-icon">{stat.icon}</div>
                            <div className="soc-info">
                                <p className="soc-label">{stat.label}</p>
                                <h4 className="soc-value">{stat.value}</h4>
                            </div>
                            <span className={`soc-change ${stat.trend}`}>{stat.change}</span>
                        </div>
                    ))}
                </section>

                {/* CHARTS ROW */}
                <div className="charts-row">

                    {/* BAR CHART — Monthly New Blogs */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>📈 Monthly New Blogs</h3>
                            <p>Last 6 months</p>
                        </div>
                        <div className="bar-chart">
                            {ANALYTICS_DATA.monthlyActivity.map((m, i) => (
                                <div className="bar-group" key={i}>
                                    <div
                                        className="bar"
                                        style={{
                                            height: `${(m.blogs / maxBlogs) * 100}%`,
                                            background: BAR_COLORS[i],
                                        }}
                                        title={`${m.blogs} blogs`}
                                    >
                                        <span className="bar-tip">{m.blogs}</span>
                                    </div>
                                    <span className="bar-label">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BAR CHART — Monthly New Users */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>👥 Monthly New Users</h3>
                            <p>Last 6 months</p>
                        </div>
                        <div className="bar-chart">
                            {ANALYTICS_DATA.monthlyActivity.map((m, i) => (
                                <div className="bar-group" key={i}>
                                    <div
                                        className="bar"
                                        style={{
                                            height: `${(m.users / maxUsers) * 100}%`,
                                            background: BAR_COLORS[i],
                                        }}
                                        title={`${m.users} users`}
                                    >
                                        <span className="bar-tip">{m.users}</span>
                                    </div>
                                    <span className="bar-label">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CATEGORY BREAKDOWN */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>🗂️ Traffic by Category</h3>
                            <p>Percentage distribution</p>
                        </div>
                        <div className="category-bars">
                            {ANALYTICS_DATA.trafficByCategory.map((cat, i) => (
                                <div className="cat-row" key={i}>
                                    <span className="cat-name">{cat.label}</span>
                                    <div className="cat-bar-track">
                                        <div
                                            className="cat-bar-fill"
                                            style={{ width: `${cat.value}%`, background: CATEGORY_COLORS[i] }}
                                        ></div>
                                    </div>
                                    <span className="cat-pct">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TOP BLOGS TABLE */}
                <section className="top-blogs-card">
                    <div className="chart-header">
                        <h3>🏆 Top Performing Blogs</h3>
                        <p>Ranked by total views</p>
                    </div>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ANALYTICS_DATA.topBlogs.map(blog => (
                                <tr key={blog.rank}>
                                    <td>
                                        <span className={`rank-badge rank-${blog.rank}`}>#{blog.rank}</span>
                                    </td>
                                    <td className="blog-title-col">{blog.title}</td>
                                    <td className="blog-author-col">{blog.author}</td>
                                    <td><span className="cat-chip">{blog.category}</span></td>
                                    <td><span className="views-val">👁️ {blog.views}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Analytics;
