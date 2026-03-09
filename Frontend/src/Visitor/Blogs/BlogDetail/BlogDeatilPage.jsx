import React from 'react';
import { Link } from 'react-router-dom';
import './BlogDeatilPage.css';

// Using placeholders similar to JSP
import profileImg from '../../../assets/Images/profile.jpg'; // Verify this exists
import blog1 from '../../../assets/Images/Visitor/HomePage/blog1.webp';
import blog2 from '../../../assets/Images/Visitor/HomePage/blog2.jpg';
import blog3 from '../../../assets/Images/Visitor/HomePage/blog3.jpg';

function BlogDetailPage() {
    return (
        <div className="blog-details-container">
            {/* Back Button */}
            <Link to="/blogs" className="back-link">
                ← Back to Articles
            </Link>

            {/* Title */}
            <h1 className="blog-details-title">
                The Future of AI in Web Development: A New Era
            </h1>

            {/* Meta */}
            <div className="blog-details-meta">
                <img src={profileImg} className="author-avatar" alt="Author" />
                <span>By Vikash Kapoor</span>
                <span>• October 26, 2025</span>
                <span className="badge">Technology</span>
            </div>

            {/* Featured Image */}
            <div className="featured-img">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995" alt="AI in Web Development" />
            </div>

            {/* Blog Content */}
            <div className="blog-details-content">
                <p>In an era where digital transformation is no longer an option but a necessity, the integration of Artificial Intelligence (AI) into web development frameworks is revolutionizing how applications are built, deployed, and experienced.</p>

                <p>One of the most significant impacts of AI is in code generation and optimization. Tools powered by machine learning algorithms can now suggest code snippets, identify bugs, and even write entire functions.</p>

                <p>AI plays a pivotal role in creating intelligent user interfaces and user experiences. AI-driven analytics provide deep insights into user behavior, enabling developers to create adaptive interfaces.</p>

                <p>The future promises even more sophisticated AI integrations. Imagine web applications that can proactively anticipate user needs and generate dynamic content in real time.</p>

                <p>Embracing AI in web development is not just about adopting new tools; it's about fostering a paradigm shift that redefines the capabilities of web applications.</p>
            </div>

            {/* Author Card */}
            <div className="author-card">
                <img src="https://i.pravatar.cc/50" className="author-avatar" alt="Author Info" />
                <div>
                    <h4>Michale Green</h4>
                    <p>Jane Doe is a senior AI developer and a passionate writer with over 10 years of experience in creating cutting-edge web technologies.</p>
                </div>
            </div>

            {/* Comment Section */}
            <div className="comment-section">
                <h2>2 Comments</h2>

                <div className="comment-form">
                    <input type="text" placeholder="Write a comment..." />
                    <button>Submit Comment</button>
                </div>

                <div className="comment">
                    <img src="https://i.pravatar.cc/41" className="comment-avatar" alt="Commenter" />
                    <div className="comment-body">
                        <div className="comment-name">Alice Wonderland</div>
                        <div className="comment-date">October 27, 2024</div>
                        <p>Fascinating insights! I particularly enjoyed the section on AI-driven UI/UX.</p>
                    </div>
                </div>

                <div className="comment">
                    <img src="https://i.pravatar.cc/42" className="comment-avatar" alt="Commenter" />
                    <div className="comment-body">
                        <div className="comment-name">Rakesh Gupta</div>
                        <div className="comment-date">January 27, 2026</div>
                        <p>Great read! The potential for AI in code optimization is truly exciting.</p>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            <div className="related-section">
                <h2 className="related-title">Related Posts</h2>
                <div className="related-grid">
                    <div className="card">
                        <img src={blog1} alt="Related Blog 1" />
                        <span className="tag">Lifestyle</span>
                        <h3>Building Healthy Morning Habits</h3>
                        <p>Discover simple morning routines that boost energy and improve daily productivity.</p>
                        <Link to="/blog/1">Read More →</Link>
                    </div>
                    <div className="card">
                        <img src={blog2} alt="Related Blog 2" />
                        <span className="tag">Technology</span>
                        <h3>Understanding Cloud Computing</h3>
                        <p>An easy guide to how cloud platforms are transforming modern businesses.</p>
                        <Link to="/blog/2">Read More →</Link>
                    </div>
                    <div className="card">
                        <img src={blog3} alt="Related Blog 3" />
                        <span className="tag">Startup</span>
                        <h3>How to Launch Your First Startup</h3>
                        <p>A beginner’s roadmap to turning your innovative idea into a successful venture.</p>
                        <Link to="/blog/3">Read More →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailPage;
