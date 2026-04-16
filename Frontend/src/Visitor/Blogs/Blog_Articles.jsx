import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Heart, MessageSquare } from 'lucide-react';
import api from '../../api';
import './Blog_Articles.css';

function Blog_Articles({ searchTerm, selectedCategory, sortBy, currentPage, setTotalPages }) {
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
                console.error("Error fetching live blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveBlogs();
    }, []);

    const handleLikeClick = async (blogId, e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/register');
            return;
        }
        try {
            const res = await api.put(`/blogs/${blogId}/like`);
            if (res.data.success) {
                // Update specific article in the list
                setBlogs(prev => prev.map(b => 
                    b._id === blogId 
                    ? { ...b, likes: b.likes.includes(user.id) ? b.likes.filter(id => id !== user.id) : [...b.likes, user.id] } 
                    : b
                ));
            }
        } catch (err) {
            console.error("Like Error:", err);
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/register');
            }
        }
    };

    const handleCommentClick = (blogSlug, e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/register');
        } else {
            navigate(`/blog-detail/${blogSlug}`);
        }
    };

    const filteredArticles = blogs.filter(article => {
        const matchesSearch = 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All Categories" || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        setTotalPages(Math.ceil(filteredArticles.length / 9));
    }, [filteredArticles.length]);

    const sortedArticles = [...filteredArticles].sort((a, b) => {
        if (sortBy === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const blogsPerPage = 9;
    const startIndex = (currentPage - 1) * blogsPerPage;
    const paginatedArticles = sortedArticles.slice(startIndex, startIndex + blogsPerPage);

    if (loading) {
        return <div className="loading-grid">Synchronizing with The Blog Hub library...</div>;
    }

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <section className="blog-grid">
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

                                    <div className="social-actions">
                                        <div className="social-pill comment-trigger" onClick={(e) => handleCommentClick(article.slug, e)} style={{ cursor: 'pointer' }}>
                                            <MessageSquare size={18} />
                                            <span className="social-count">{article.commentsCount || 0}</span>
                                        </div>
                                        <div className="social-pill like-trigger" onClick={(e) => handleLikeClick(article._id, e)}>
                                            <Heart size={18} className={article.likes?.includes(user?.id) ? "liked" : ""} />
                                            <span className="social-count">{article.likes?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/blog-detail/${article.slug}`} className="read-more">Read More →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-articles">
                        <p>We couldn't find any articles matching your search. Try different keywords!</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Blog_Articles;