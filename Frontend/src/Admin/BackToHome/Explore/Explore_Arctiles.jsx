import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Heart, MessageSquare } from 'lucide-react';
import api from '../../../api';
import './Explore_Arctiles.css';

function AdminExploreArticles({ searchTerm = "", selectedCategory = "All Categories", sortBy = "Latest", currentPage = 1, setTotalPages }) {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    useEffect(() => {
        const fetchLiveBlogs = async () => {
            try {
                setLoading(true);
                const res = await api.get('/blogs');
                if (res.data.success) {
                    setBlogs(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching live blogs for Explore:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveBlogs();
    }, []);

    const handleLikeClick = async (blogId, e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/blogs/${blogId}/like`);
            if (res.data.success) {
                setBlogs(prev => prev.map(b => 
                    b._id === blogId 
                    ? { ...b, likes: b.likes.includes(user.id) ? b.likes.filter(id => id !== user.id) : [...b.likes, user.id] } 
                    : b
                ));
            }
        } catch (err) {
            console.error("Like Error:", err);
        }
    };

    const handleCommentClick = (blogSlug, e) => {
        e.preventDefault();
        navigate(`/blog-detail/${blogSlug}`);
    };

    const filteredArticles = blogs.filter(article => {
        const searchInput = searchTerm || "";
        const matchesSearch = 
            article.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            (article.summary && article.summary.toLowerCase().includes(searchInput.toLowerCase())) ||
            article.content.toLowerCase().includes(searchInput.toLowerCase());
        const matchesCategory = selectedCategory === "All Categories" || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        if (setTotalPages) {
            setTotalPages(Math.ceil(filteredArticles.length / 9));
        }
    }, [filteredArticles.length, setTotalPages]);

    const sortedArticles = [...filteredArticles].sort((a, b) => {
        if (sortBy === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const blogsPerPage = 9;
    const startIndex = (currentPage - 1) * blogsPerPage;
    const paginatedArticles = sortedArticles.slice(startIndex, startIndex + blogsPerPage);

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <section className="explore-grid">
            <div className="cards">
                {paginatedArticles.length > 0 ? (
                    paginatedArticles.map((article) => (
                        <div className="card" key={article._id}>
                            <div className="card-image">
                                <img src={article.coverImage || 'https://via.placeholder.com/400x250'} alt={article.title} />
                                <span className="tag">{article.category}</span>
                            </div>
                            <div className="card-content">
                                <h3>{article.title}</h3>
                                <p>{stripHtml(article.summary || article.content || "").substring(0, 80) + '...'}</p>
                                
                                <div className="card-footer">
                                    <div className="left-stats">
                                        <div className="author-info">
                                            <User size={14} />
                                            <span>{article.author?.name || 'Hub Author'}</span>
                                        </div>
                                        <div className="date-info">
                                            <Calendar size={14} />
                                            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="social-actions" style={{ display: 'flex', gap: '15px' }}>
                                        <div className="social-pill" onClick={(e) => handleCommentClick(article.slug, e)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <MessageSquare size={18} />
                                            <span className="social-count">{article.commentsCount || 0}</span>
                                        </div>
                                        <div className="social-pill" onClick={(e) => handleLikeClick(article._id, e)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Heart size={18} className={article.likes?.includes(user?.id) ? "liked" : ""} style={article.likes?.includes(user?.id) ? { fill: '#ef4444', color: '#ef4444' } : {}} />
                                            <span className="social-count">{article.likes?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/blog-detail/${article.slug}`} className="read-more">Read More →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-articles" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <p>No publications found matching your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminExploreArticles;
