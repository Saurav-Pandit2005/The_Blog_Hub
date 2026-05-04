import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Sparkles, Image, Tag, Save, Send, Info, X, CheckCircle, Bold, Italic, Heading1, Heading2, Heading3, Type, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Quote, Link as LinkIcon, Eraser } from 'lucide-react';
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
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const editorRef = useRef(null);

    // Initial load and AI sync
    useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = content;
        }
    }, [content]);

    const formatText = (cmd, value = null) => {
        if (cmd === 'createLink') {
            const url = prompt("Enter the URL:");
            if (url) document.execCommand(cmd, false, url);
        } else {
            document.execCommand(cmd, false, value);
        }
        // Sync the hidden content state
        const editor = document.getElementById('main-editor');
        setContent(editor.innerHTML);
    };

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleAI = async () => {
        if (!title) {
            triggerToast("Please enter at least a title so AI knows what to write about!", "error");
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
            triggerToast("Failed to generate content. Check your backend configuration.", "error");
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
            triggerToast('Please fill in both Title and Content.', 'error');
            return;
        }

        if (status === 'Published' && !thumbnail) {
            triggerToast('Please upload a thumbnail image before publishing.', 'error');
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
                triggerToast(`Blog ${status === 'Draft' ? 'saved as draft' : 'published'} successfully!`);
                setTimeout(() => navigate('/author/my-blogs'), 1500);
            }
        } catch (err) {
            console.error('Submission Error:', err);
            triggerToast(err.response?.data?.error || 'Failed to create blog. Try again.', 'error');
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
                                    <label className="field-label">Main Body Content</label>
                                    <button
                                        className={`ai-generate-btn ${isGenerating ? 'is-spinning' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        <Sparkles size={16} />
                                        {isGenerating ? 'AI Crafting...' : 'Magic Write with AI'}
                                    </button>
                                </div>
                                <div className="premium-editor-container">
                                    <div className="editor-toolbar">
                                        <div className="toolbar-group">
                                            <button onClick={() => formatText('formatBlock', 'H1')} title="Heading 1"><Heading1 size={16} /></button>
                                            <button onClick={() => formatText('formatBlock', 'H2')} title="Heading 2"><Heading2 size={16} /></button>
                                            <button onClick={() => formatText('formatBlock', 'P')} title="Paragraph"><Type size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button onClick={() => formatText('bold')} title="Bold"><Bold size={16} /></button>
                                            <button onClick={() => formatText('italic')} title="Italic"><Italic size={16} /></button>
                                            <button onClick={() => formatText('underline')} title="Underline"><Underline size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button onClick={() => formatText('justifyLeft')} title="Align Left"><AlignLeft size={16} /></button>
                                            <button onClick={() => formatText('justifyCenter')} title="Align Center"><AlignCenter size={16} /></button>
                                            <button onClick={() => formatText('justifyRight')} title="Align Right"><AlignRight size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button onClick={() => formatText('insertUnorderedList')} title="Bullet List"><List size={16} /></button>
                                            <button onClick={() => formatText('insertOrderedList')} title="Numbered List"><ListOrdered size={16} /></button>
                                            <button onClick={() => formatText('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button onClick={() => formatText('createLink')} title="Insert Link"><LinkIcon size={16} /></button>
                                            <button onClick={() => formatText('removeFormat')} title="Clear Formatting"><Eraser size={16} /></button>
                                        </div>
                                    </div>
                                    <div
                                        id="main-editor"
                                        ref={editorRef}
                                        contentEditable="true"
                                        onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                        className="rich-editor"
                                    ></div>
                                </div>
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

            {/* Toast Notification */}
            {toast.show && (
                <div className={`premium-toast-container ${toast.type}`}>
                    <div className="toast-content">
                        {toast.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
                        <span>{toast.message}</span>
                    </div>
                    <div className="toast-progress-bar"></div>
                </div>
            )}
        </div>
    );
}

export default WritePost;
