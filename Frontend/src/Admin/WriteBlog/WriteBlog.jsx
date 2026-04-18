import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './WriteBlog.css';
import { PenTool, Image as ImageIcon, Type, Sparkles, Send, Save, Calendar, ChevronLeft } from 'lucide-react';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function WriteBlog() {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [publishNow, setPublishNow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();

    const handleAI = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setContent("AI-Powered Insight: The digital landscape is shifting towards integrated artificial intelligence solutions that prioritize user privacy while maximizing creative output. This shift represents the most significant architectural change in web development since the advent of mobile-first design...");
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="write-blog-container">
            <Slidebar />

            <main className="write-content-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Content Management</span>
                        <h1>Create New Article</h1>
                        <p>Draft, refine, and publish your next masterpiece to the community.</p>
                    </div>
                    <div className="header-actions">
                        <div className="header-date">
                            <Calendar size={16} color="var(--admin-accent)" style={{marginRight: '10px'}} />
                            <span className="live-clock">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="admin-profile-container" onClick={() => navigate('/admin/profile')}>
                            <div className="admin-profile-icon">
                                <img src={user?.profilePic || adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="write-editor-card">
                    <div className="form-layout-grid">

                        {/* LEFT: Editor Area */}
                        <div className="editor-main-panel">
                            <div className="input-field-group">
                                <label><PenTool size={16} /> Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter a compelling title..."
                                    value={title}
                                    className="premium-input"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="input-field-group">
                                <label><Type size={16} /> Catchphrase / Subtitle</label>
                                <input
                                    type="text"
                                    placeholder="Briefly describe the theme..."
                                    value={subtitle}
                                    className="premium-input"
                                    onChange={(e) => setSubtitle(e.target.value)}
                                />
                            </div>

                            <div className="input-field-group">
                                <div className="label-with-action">
                                    <label><PenTool size={16} /> Article Content</label>
                                    <button
                                        className={`ai-smart-btn ${isGenerating ? 'is-syncing' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        <Sparkles size={14} className="spark-icon" />
                                        {isGenerating ? 'Drafting...' : 'AI Compose'}
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Unleash your creativity here..."
                                    rows="14"
                                    value={content}
                                    className="premium-textarea"
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        {/* RIGHT: Publishing Controls */}
                        <div className="editor-side-panel">
                            <div className="side-card-section">
                                <label><ImageIcon size={16} /> Feature Image</label>
                                <div className="premium-upload-zone">
                                    <div className="upload-content">
                                        <div className="upload-icon-box">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="upload-text">
                                            <span>Drop thumbnail here</span>
                                            <p>Optimized for 16:9 aspect ratio</p>
                                        </div>
                                    </div>
                                    <input type="file" className="hidden-file-input" />
                                </div>
                            </div>

                            <div className="side-card-section">
                                <label><Type size={16} /> Category tag</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Development"
                                    value={category}
                                    className="premium-input-side"
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div className="side-card-section toggle-wrapper">
                                <div className="toggle-info">
                                    <h4>Instant Publish</h4>
                                    <p>Live visibility upon submission</p>
                                </div>
                                <label className="premium-switch">
                                    <input
                                        type="checkbox"
                                        checked={publishNow}
                                        onChange={() => setPublishNow(!publishNow)}
                                    />
                                    <span className="premium-slider"></span>
                                </label>
                            </div>

                            <div className="publishing-actions">
                                <button className="btn-secondary">
                                    <Save size={18} /> Save Draft
                                </button>
                                <button className="btn-primary">
                                    <Send size={18} /> Publish Blog
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

export default WriteBlog;
