import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './WriteBlog.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function WriteBlog() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [publishNow, setPublishNow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

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

    const handleAI = () => {
        setIsGenerating(true);
        // Simulate AI generating content
        setTimeout(() => {
            setContent("AI Generated Content Preview: The future of artificial intelligence is rapidly evolving. We are seeing breakthroughs in natural language processing and creative automation that were unimaginable a decade ago...");
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="write-blog-container">
            <Slidebar />

            <main className="write-content-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Create New Blog</h1>
                        <p>Draft and publish premium content for the platform.</p>
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

                <section className="write-form-card">
                    <div className="form-grid">

                        {/* LEFT SECTION: Main Content */}
                        <div className="form-left">
                            <div className="form-group">
                                <label>Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Sub Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter catch-phrase or subtitle"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group relative">
                                <div className="label-flex">
                                    <label>Blog Content (Description)</label>
                                    <button
                                        className={`ai-btn ${isGenerating ? 'loading' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        <span className="sparkle">✨</span>
                                        {isGenerating ? 'Generating...' : 'Generate with AI'}
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Write your creative thoughts here..."
                                    rows="12"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        {/* RIGHT SECTION: Settings & Thumbnail */}
                        <div className="form-right">
                            <div className="form-group">
                                <label>Upload Thumbnail Image</label>
                                <div className="thumbnail-upload-box">
                                    <div className="upload-placeholder">
                                        <div className="upload-icon">📁</div>
                                        <span>Click to Upload</span>
                                        <small>High resolution recommended</small>
                                    </div>
                                    <input type="file" className="file-input" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Select Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option>Technology</option>
                                    <option>AI and Machine Learning</option>
                                    <option>Business & Finance</option>
                                    <option>Modern Design</option>
                                    <option>Health & Lifestyle</option>
                                </select>
                            </div>

                            <div className="form-group toggle-group">
                                <span className="toggle-label">Publish Now</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={publishNow}
                                        onChange={() => setPublishNow(!publishNow)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <div className="action-buttons-group">
                                <button className="draft-btn">Save as Draft</button>
                                <button className="submit-btn">Add Blog Post</button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

export default WriteBlog;
