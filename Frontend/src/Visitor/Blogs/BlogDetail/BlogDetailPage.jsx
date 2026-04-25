import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, Tag, ArrowLeft, MessageSquare } from 'lucide-react';
import api from '../../../api';
import './BlogDetailPage.css';

function BlogDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    // --- Scroll progress tracker ---
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(Math.min(progress, 100));
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // --- Fetch blog data ---
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

                    const commentsRes = await api.get(`/blogs/${blogData._id}/comments`);
                    if (commentsRes.data.success) {
                        setComments(commentsRes.data.data);
                    }
                }

                const relatedRes = await api.get('/blogs');
                if (relatedRes.data.success) {
                    setRelatedBlogs(relatedRes.data.data.filter(b => b.slug !== slug).slice(0, 3));
                }
            } catch (err) {
                console.error('Error fetching blog detail:', err);
                navigate('/blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndRelated();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug, navigate]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) { navigate('/register'); return; }
        if (!newComment.trim()) return;

        try {
            const res = await api.post(`/blogs/${blog._id}/comment`, { content: newComment });
            if (res.data.success) {
                setComments([res.data.data, ...comments]);
                setNewComment('');
            }
        } catch (err) {
            console.error('Comment Error:', err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/register');
            } else {
                alert('Failed to add comment. Please try again.');
            }
        }
    };

    const handleLike = async () => {
        if (!isLoggedIn) { navigate('/register'); return; }
        try {
            const res = await api.put(`/blogs/${blog._id}/like`);
            if (res.data.success) {
                setLikesCount(res.data.count);
                setIsLiked(res.data.isLiked);
            }
        } catch (err) {
            console.error('Like Error:', err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/register');
            } else {
                alert('Failed to like the blog.');
            }
        }
    };

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString(undefined, {
            month: 'long', day: 'numeric', year: 'numeric',
        });

    const readingTime = (content) => {
        if (!content) return '1 min';
        const words = stripHtml(content).split(/\s+/).length;
        return `${Math.max(1, Math.ceil(words / 200))} min read`;
    };

    // ── Loading ──
    if (loading) {
        return (
            <div className="blog-details-wrapper">
                <div className="blog-loading-screen">
                    <div className="blog-loading-spinner" />
                    <p className="blog-loading-text">Curating the finest content for you...</p>
                </div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="blog-details-wrapper">

            {/* Reading Progress Bar */}
            <div
                className="reading-progress-bar"
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            {/* ── Cinematic Hero ── */}
            <section className="blog-hero">
                <img
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80'}
                    alt={blog.title}
                    className="blog-hero-image"
                />
                <div className="blog-hero-overlay" />

                {/* Back Link — absolute top-left */}
                <Link
                    to={user?.role === 'author' ? '/author/home' : '/blogs'}
                    className="hero-back-link"
                >
                    <ArrowLeft size={15} />
                    {user?.role === 'author' ? 'Back to Dashboard' : 'Back to Articles'}
                </Link>

                {/* Hero body: left content + right info card */}
                <div className="blog-hero-body">

                    {/* Left: Title + Meta */}
                    <div className="blog-hero-content">
                        {/* Title */}
                        <h1 className="blog-hero-title">{blog.title}</h1>

                        {/* Meta Row */}
                        <div className="blog-hero-meta">
                            <img
                                src={blog.author?.profilePic || 'https://i.pravatar.cc/150'}
                                className="hero-author-avatar"
                                alt={blog.author?.name}
                            />
                            <div className="hero-meta-text">
                                <span className="hero-author-name">
                                    {blog.author?.name || 'Hub Author'}
                                </span>
                                <span className="hero-date">
                                    {formatDate(blog.createdAt)}
                                </span>
                            </div>

                            {/* Like Button — inline with author, not pushed far right */}
                            <button
                                onClick={handleLike}
                                className={`hero-like-btn ${isLiked ? 'liked' : ''}`}
                                title={isLoggedIn ? (isLiked ? 'Unlike' : 'Like this article') : 'Log in to like'}
                            >
                                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                                {likesCount}
                            </button>
                        </div>
                    </div>

                    {/* Right: Article Info Card floating on hero */}
                    <div className="hero-info-card">
                        <h4 className="hero-info-card-title">Article Info</h4>
                        <div className="hero-info-row">
                            <Calendar size={15} />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="hero-info-row">
                            <Heart size={15} />
                            <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                        </div>
                        <div className="hero-info-row">
                            <MessageCircle size={15} />
                            <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
                        </div>
                        <div className="hero-info-row">
                            <Tag size={15} />
                            <span>{blog.category}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Body ── */}
            <div className="blog-details-container">
                <div className="blog-main-layout">

                    {/* Article Card */}
                    <div className="article-card">
                        {/* Card Top Label */}
                        <div className="article-card-header">
                            <div className="article-card-header-left">
                                <span className="article-card-category-chip">{blog.category}</span>
                                <span className="article-card-dot" />
                                <span className="article-card-label">Full Article</span>
                            </div>
                            <span className="article-card-date">{formatDate(blog.createdAt)}</span>
                        </div>

                        {/* Actual Content */}
                        <article
                            className="blog-details-content blog-html-content"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Sticky Sidebar — only cover image now */}
                    <aside className="blog-sidebar">
                        <div className="sidebar-cover-card">
                            <img
                                src={blog.coverImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600'}
                                alt={blog.title}
                            />
                            <div className="sidebar-cover-footer">
                                <span className="sidebar-badge">{blog.category} · Article</span>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* ── Author Card ── */}
                <div className="author-card">
                    <img
                        src={blog.author?.profilePic || 'https://i.pravatar.cc/80'}
                        className="author-avatar-lg"
                        alt={blog.author?.name}
                    />
                    <div className="author-card-info">
                        <span className="author-label">Written by</span>
                        <h4>{blog.author?.name || 'Hub Author'}</h4>
                        <p>
                            {blog.author?.bio ||
                                'A dedicated contributor to The Blog Hub community, sharing insights and stories to inspire readers worldwide.'}
                        </p>
                    </div>
                </div>

                {/* ── Comment Section ── */}
                <div className="comment-section">
                    <div className="comment-section-header">
                        <h2>Reader Community</h2>
                        <span className="comment-count-pill">{comments.length}</span>
                    </div>

                    {/* Comment Form */}
                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                        <div className="comment-input-wrapper">
                            <input
                                id="comment-input"
                                type="text"
                                className="comment-form-input"
                                placeholder={
                                    isLoggedIn
                                        ? 'Share your thoughts with the community...'
                                        : 'Sign up to join the discussion!'
                                }
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onClick={!isLoggedIn ? () => navigate('/register') : undefined}
                                readOnly={!isLoggedIn}
                            />
                            {!isLoggedIn && (
                                <div
                                    onClick={() => navigate('/register')}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        cursor: 'pointer', borderRadius: '12px',
                                    }}
                                    title="Click to Sign Up"
                                />
                            )}
                        </div>
                        <button type="submit" className="comment-submit-btn">
                            {isLoggedIn ? 'Post Comment' : 'Join to Comment'}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <div className="no-comments-msg">
                                <MessageSquare size={28} strokeWidth={1.5} style={{ color: '#cbd5e1', marginBottom: '10px' }} />
                                <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="comment-item">
                                    <img
                                        src={comment.user?.profilePic || 'https://i.pravatar.cc/42'}
                                        alt={comment.user?.name}
                                        className="comment-user-avatar"
                                    />
                                    <div className="comment-body">
                                        <div className="comment-name-row">
                                            <span className="comment-user-name">
                                                {comment.user?.name || 'Anonymous Reader'}
                                            </span>
                                            <span className="comment-date-text">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="comment-text">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ── Related Articles ── */}
                {relatedBlogs.length > 0 && (
                    <div className="related-section">
                        <div className="related-header">
                            <h2 className="related-title">Explore Related Insights</h2>
                        </div>
                        <div className="related-grid">
                            {relatedBlogs.map((rBlog) => (
                                <div className="related-card" key={rBlog._id}>
                                    <div className="related-card-img-wrap">
                                        <img
                                            src={rBlog.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600'}
                                            alt={rBlog.title}
                                        />
                                        <span className="related-card-tag">{rBlog.category}</span>
                                    </div>
                                    <div className="related-card-body">
                                        <h3>{rBlog.title}</h3>
                                        <p>
                                            {stripHtml(rBlog.summary || rBlog.content || '').substring(0, 90) + '…'}
                                        </p>
                                        <Link to={`/blog-detail/${rBlog.slug}`} className="related-read-link">
                                            Read Article →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogDetailPage;
