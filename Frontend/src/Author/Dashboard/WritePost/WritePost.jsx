import React, { useState } from 'react';
import Slidebar from '../Slidebar/Slidebar';
import './WritePost.css';

// Using some icons if needed
import writingIcon from '../../../assets/Images/Author/Dashboard/Slidebar/writing.png';

function WritePost() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [publishNow, setPublishNow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAI = () => {
        setIsGenerating(true);
        // Simulate AI generating content
        setTimeout(() => {
            setContent("AI Generated Content Preview: The future of artificial intelligence is rapidly evolving. We are seeing breakthroughs in natural language processing and creative automation that were unimaginable a decade ago...");
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="write-post-container">
            <Slidebar />

            <main className="write-content-main">
                <header className="write-header">
                    <div className="header-info">
                        <h1>Write New Blog</h1>
                        <p>Create and publish content using <span className="ai-color">AI assistance</span>.</p>
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

export default WritePost;
