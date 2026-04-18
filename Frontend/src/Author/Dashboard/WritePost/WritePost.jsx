import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Sparkles, Image, Tag, Save, Send, Info, X } from 'lucide-react';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './WritePost.css';

function WritePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleAI = async () => {
        if (!title) {
            alert("Please enter at least a title so AI knows what to write about!");
            return;
        }

        try {
            setIsGenerating(true);
            const res = await api.post('/ai/generate', {
                prompt: title,
                type: 'blog'
            });

            if (res.data.success) {
                const cleanContent = res.data.data.replace(/```html|```/g, '');
                setContent(cleanContent);
            }
        } catch (err) {
            console.error("AI Error:", err);
            alert("Failed to generate content. Check your backend configuration.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (status) => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both Title and Content.');
            return;
        }

        if (status === 'Published' && !thumbnail) {
            alert('Please upload a thumbnail image before publishing.');
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('status', status);
            if (thumbnail) {
                formData.append('coverImage', thumbnail);
            }

            const res = await api.post('/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                alert(`Blog ${status === 'Draft' ? 'saved as draft' : 'published'} successfully!`);
                navigate('/author/my-blogs');
            }
        } catch (err) {
            console.error('Submission Error:', err);
            alert(err.response?.data?.error || 'Failed to create blog. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="write-post-container">
            <Slidebar />

            <main className="write-content-main">
                <header className="write-header-top">
                    <div className="header-badge">
                        <PenTool size={14} />
                        <span>Content Creator</span>
                    </div>
                    <h1>Create Masterpiece</h1>
                    <p>Unleash your creativity with our <span className="ai-highlight">AI-powered</span> editor.</p>
                </header>

                <div className="write-editor-wrapper">
                    <div className="editor-main-card">
                        
                        {/* INPUTS SECTION */}
                        <div className="editor-body">
                            <div className="field-row">
                                <div className="input-field-group">
                                    <label>Article Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter a catchy title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="premium-input title-input"
                                    />
                                </div>
                            </div>

                            <div className="field-row">
                                <div className="input-field-group">
                                    <label>Quick Summary</label>
                                    <input
                                        type="text"
                                        placeholder="A brief teaser for your readers..."
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        className="premium-input"
                                    />
                                </div>
                                <div className="input-field-group">
                                    <label>Category</label>
                                    <div className="tag-input-wrapper">
                                        <Tag size={16} className="tag-icon" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Technology"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="premium-input with-icon"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="content-area-group">
                                <div className="content-header">
                                    <label>Main Body Content</label>
                                    <button
                                        className={`ai-generate-btn ${isGenerating ? 'is-spinning' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        <Sparkles size={16} />
                                        {isGenerating ? 'AI Crafting...' : 'Magic Write with AI'}
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Start your story here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="premium-textarea"
                                ></textarea>
                            </div>
                        </div>

                        {/* SIDEBAR SECTION (Merged internally for layout) */}
                        <div className="editor-sidebar">
                            <div className="sidebar-section">
                                <div className="section-title">
                                    <Image size={18} />
                                    <h3>Cover Image</h3>
                                </div>
                                <div 
                                    className={`upload-zone ${previewUrl ? 'has-preview' : ''}`}
                                    onClick={() => document.getElementById('blog-thumbnail').click()}
                                >
                                    {previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="Preview" className="img-preview" />
                                            <div className="upload-hover">Click to change</div>
                                        </>
                                    ) : (
                                        <div className="upload-hint">
                                            <div className="hint-icon"><Image size={32} /></div>
                                            <p>Drop image or click here</p>
                                            <span>PNG, JPG up to 5MB</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        id="blog-thumbnail"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            <div className="sidebar-info-box">
                                <div className="info-icon"><Info size={16} /></div>
                                <p>Pro Tip: High-quality thumbnails increase reader engagement by 40%.</p>
                            </div>

                            <div className="editor-actions">
                                <button 
                                    className="action-btn outline"
                                    onClick={() => handleSubmit('Draft')}
                                    disabled={isSubmitting}
                                >
                                    <Save size={18} />
                                    {isSubmitting ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button 
                                    className="action-btn filled"
                                    onClick={() => handleSubmit('Published')}
                                    disabled={isSubmitting}
                                >
                                    <Send size={18} />
                                    {isSubmitting ? 'Sending...' : 'Publish Blog'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default WritePost;
