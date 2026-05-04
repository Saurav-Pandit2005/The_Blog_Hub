import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Heart, MessageSquare, Edit } from 'lucide-react';
import api from '../../api';
import './Articles.css';

function Articles({ selectedCategory = "All" }) {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    useEffect(() => {
        const fetchRecentPublications = async () => {
            try {
                setLoading(true);
                const res = await api.get('/blogs');
                if (res.data.success) {
                    setBlogs(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching author home blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentPublications();
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

    const filteredBlogs = selectedCategory === "All" || !selectedCategory
        ? blogs.slice(0, 6)
        : blogs.filter(blog => 
            blog.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
          ).slice(0, 6);

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <section className="featured">
            <h2>{selectedCategory === "All" || !selectedCategory ? "Platform Recent Publications" : `${selectedCategory} Publications`}</h2>
            <div className="cards">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div className="card" key={blog._id}>
                            <div className="card-image">
                                <img src={blog.coverImage || 'https://via.placeholder.com/400x250'} alt={blog.title} />
                                <span className="tag">{blog.category}</span>
                            </div>
                            <div className="card-content">
                                <h3>{blog.title}</h3>
                                <p>{stripHtml(blog.summary || blog.content || "").substring(0, 85) + '...'}</p>

                                <div className="card-footer">
                                    <div className="left-stats">
                                        <div className="author-info">
                                            <User size={14} />
                                            <span>{blog.author?.name || 'Hub Author'}</span>
                                        </div>
                                        <div className="date-info">
                                            <Calendar size={14} />
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="social-actions" style={{ gap: '15px' }}>
                                        <div className="social-pill" onClick={(e) => handleCommentClick(blog.slug, e)} style={{ cursor: 'pointer' }}>
                                            <MessageSquare size={18} />
                                            <span className="social-count">{blog.commentsCount || 0}</span>
                                        </div>
                                        <div className="social-pill" onClick={(e) => handleLikeClick(blog._id, e)} style={{ cursor: 'pointer' }}>
                                            <Heart size={18} className={blog.likes?.includes(user?.id) ? "liked" : ""} />
                                            <span className="social-count">{blog.likes?.length || 0}</span>
                                        </div>
                                        {blog.author?._id === user?.id && (
                                            <Link to={`/author/edit-post/${blog._id}`} className="social-pill" title="Edit your post">
                                                <Edit size={18} />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <Link to={`/blog-detail/${blog.slug}`} className="read-more">Read Post →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-articles" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <p>No publications found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Articles;