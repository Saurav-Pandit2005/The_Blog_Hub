import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api';
import './BlogDetailPage.css';

function BlogDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    
    // Interaction States
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    useEffect(() => {
        const fetchBlogAndRelated = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/blogs/${slug}`);
                if (res.data.success) {
                    const blogData = res.data.data;
                    setBlog(blogData);
                    setLikesCount(blogData.likes?.length || 0);
                    setIsLiked(blogData.likes?.includes(user?.id) || false);

                    // Fetch comments
                    const commentsRes = await api.get(`/blogs/${blogData._id}/comments`);
                    if (commentsRes.data.success) {
                        setComments(commentsRes.data.data);
                    }
                }

                // Fetch a few related blogs (just latest 3 for now)
                const relatedRes = await api.get('/blogs');
                if (relatedRes.data.success) {
                    setRelatedBlogs(relatedRes.data.data.filter(b => b.slug !== slug).slice(0, 3));
                }
            } catch (err) {
                console.error("Error fetching blog detail:", err);
                navigate('/blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogAndRelated();
        window.scrollTo(0, 0); // Reset scroll on slug change
    }, [slug, navigate]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/register');
            return;
        }
        if (!newComment.trim()) return;

        try {
            const res = await api.post(`/blogs/${blog._id}/comment`, { content: newComment });
            if (res.data.success) {
                setComments([res.data.data, ...comments]);
                setNewComment("");
            }
        } catch (err) {
            console.error("Comment Error:", err);
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/register');
            } else {
                alert("Failed to add comment. Please try again.");
            }
        }
    };

    const handleLike = async () => {
        if (!isLoggedIn) {
            navigate('/register');
            return;
        }
        try {
            const res = await api.put(`/blogs/${blog._id}/like`);
            if (res.data.success) {
                setLikesCount(res.data.count);
                setIsLiked(res.data.isLiked);
            }
        } catch (err) {
            console.error("Like Error:", err);
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/register');
            } else {
                alert("Failed to like the blog.");
            }
        }
    };

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    if (loading) {
        return (
            <div className="blog-details-container">
                <div className="loading-state">Curating the finest content for you...</div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="blog-details-container">
            {/* Back Button */}
            <Link to={user?.role === 'author' ? "/author/home" : "/blogs"} className="back-link">
                ← {user?.role === 'author' ? "Back to Dashboard" : "Back to Articles"}
            </Link>

            {/* Title */}
            <h1 className="blog-details-title">{blog.title}</h1>

            {/* Meta */}
            <div className="blog-details-meta">
                <img 
                    src={blog.author?.profilePic || "https://i.pravatar.cc/150"} 
                    className="author-avatar" 
                    alt="Author" 
                />
                <span>By {blog.author?.name || 'Hub Author'}</span>
                <span>• {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="badge">{blog.category}</span>
                <button 
                    onClick={handleLike} 
                    className={`like-btn ${isLiked ? 'liked' : ''}`} 
                    title={isLoggedIn ? (isLiked ? "Unlike" : "Like") : "Log in to like"}
                    style={{ marginLeft: '1rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                    {isLiked ? '❤️' : '🤍'} {likesCount}
                </button>
            </div>

            <div className="blog-main-layout">
                {/* Blog Content (Left) */}
                <div 
                    className="blog-details-content blog-html-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Shrunken Image (Right) */}
                <div className="featured-img-sidebar">
                    <img src={blog.coverImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995"} alt={blog.title} />
                    <div className="img-info-pill">{blog.category} Resource</div>
                </div>
            </div>

            {/* Author Card */}
            <div className="author-card">
                <img src={blog.author?.profilePic || "https://i.pravatar.cc/50"} className="author-avatar" alt="Author Info" />
                <div>
                    <h4>Published by {blog.author?.name}</h4>
                    <p>{blog.author?.bio || "A dedicated contributor to The Blog Hub community, sharing insights and stories to inspire readers worldwide."}</p>
                </div>
            </div>

            {/* Comment Section */}
            <div className="comment-section">
                <h2>Reader Community ({comments.length})</h2>
                <form className="comment-form" onSubmit={handleCommentSubmit} style={{ marginBottom: '2rem' }}>
                    <div className="comment-input-wrapper" style={{ position: 'relative' }}>
                        <input 
                            type="text" 
                            placeholder={isLoggedIn ? "Share your thoughts..." : "Sign up to join the discussion!"} 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onClick={!isLoggedIn ? () => navigate('/register') : undefined}
                            readOnly={!isLoggedIn}
                            style={{ cursor: isLoggedIn ? 'text' : 'pointer' }}
                        />
                        {!isLoggedIn && (
                            <div 
                                onClick={() => navigate('/register')}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                title="Click to Sign Up"
                            ></div>
                        )}
                    </div>
                    <button type="submit">
                        {isLoggedIn ? "Post Comment" : "Join to Comment"}
                    </button>
                </form>

                <div className="comments-list" style={{ marginTop: '2rem' }}>
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment-item" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                            <img src={comment.user?.profilePic || "https://via.placeholder.com/40"} alt={comment.user?.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>{comment.user?.name || "Anonymous Reader"} <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'normal' }}>• {new Date(comment.createdAt).toLocaleDateString()}</span></h4>
                                <p style={{ margin: 0, color: '#444' }}>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && <p>No comments yet. Be the first to share your thoughts!</p>}
                </div>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <div className="related-section">
                    <h2 className="related-title">Explore Related Insights</h2>
                    <div className="related-grid">
                        {relatedBlogs.map((rBlog) => (
                            <div className="card" key={rBlog._id}>
                                <img src={rBlog.coverImage || 'https://via.placeholder.com/400x250'} alt={rBlog.title} />
                                <span className="tag">{rBlog.category}</span>
                                <h3>{rBlog.title}</h3>
                                <p>{stripHtml(rBlog.summary || rBlog.content || "").substring(0, 70) + '...'}</p>
                                <Link to={`/blog-detail/${rBlog.slug}`}>Read More →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogDetailPage;
