import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './WriteBlog.css';
import '../Dashboard/Dashboard.css'; // Global Toast styles
import { 
    PenTool, Image as ImageIcon, Type, Sparkles, Send, Save, Calendar, ChevronLeft,
    Bold, Italic, Heading1, Heading2, Heading3, Underline, List, ListOrdered, 
    AlignLeft, AlignCenter, AlignRight, Quote, Link as LinkIcon, Eraser, CheckCircle, X, Info
} from 'lucide-react';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../context/UserContext';
import api from '../../api';

function WriteBlog() {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [publishNow, setPublishNow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const editorRef = useRef(null);
    const navigate = useNavigate();

    // Sync editor content
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
        if (editorRef.current) setContent(editorRef.current.innerHTML);
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
            const res = await api.post('/ai/generate', { prompt: title, type: 'blog' });
            if (res.data.success) {
                const cleanContent = res.data.data.replace(/```html|```/g, '');
                setContent(cleanContent);
            }
        } catch (err) {
            console.error("AI Error:", err);
            triggerToast("Failed to generate content.", "error");
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

    const handleSubmit = async (statusOverride) => {
        const finalStatus = statusOverride || (publishNow ? 'Published' : 'Draft');
        
        if (!title.trim() || !content.trim()) {
            triggerToast('Please fill in both Title and Content.', 'error');
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', subtitle);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('status', finalStatus);
            if (thumbnail) formData.append('coverImage', thumbnail);

            const res = await api.post('/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                triggerToast(`Blog ${finalStatus === 'Draft' ? 'saved as draft' : 'published'} successfully!`);
                setTimeout(() => navigate('/admin/manage-blogs'), 1500);
            }
        } catch (err) {
            console.error('Submission Error:', err);
            triggerToast(err.response?.data?.error || 'Failed to create blog.', 'error');
        } finally {
            setIsSubmitting(false);
        }
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

                            <div className="content-area-group-new">
                                <div className="content-header-flex">
                                    <label><PenTool size={16} /> Article Content</label>
                                    <button
                                        type="button"
                                        className={`ai-smart-btn ${isGenerating ? 'is-syncing' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        <Sparkles size={14} className="spark-icon" />
                                        {isGenerating ? 'Drafting...' : 'AI Compose'}
                                    </button>
                                </div>
                                <div className="premium-editor-container">
                                    <div className="editor-toolbar">
                                        <div className="toolbar-group">
                                            <button type="button" onClick={() => formatText('formatBlock', 'H1')} title="Heading 1"><Heading1 size={16} /></button>
                                            <button type="button" onClick={() => formatText('formatBlock', 'H2')} title="Heading 2"><Heading2 size={16} /></button>
                                            <button type="button" onClick={() => formatText('formatBlock', 'P')} title="Paragraph"><Type size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button type="button" onClick={() => formatText('bold')} title="Bold"><Bold size={16} /></button>
                                            <button type="button" onClick={() => formatText('italic')} title="Italic"><Italic size={16} /></button>
                                            <button type="button" onClick={() => formatText('underline')} title="Underline"><Underline size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button type="button" onClick={() => formatText('justifyLeft')} title="Align Left"><AlignLeft size={16} /></button>
                                            <button type="button" onClick={() => formatText('justifyCenter')} title="Align Center"><AlignCenter size={16} /></button>
                                            <button type="button" onClick={() => formatText('justifyRight')} title="Align Right"><AlignRight size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button type="button" onClick={() => formatText('insertUnorderedList')} title="Bullet List"><List size={16} /></button>
                                            <button type="button" onClick={() => formatText('insertOrderedList')} title="Numbered List"><ListOrdered size={16} /></button>
                                            <button type="button" onClick={() => formatText('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote size={16} /></button>
                                        </div>
                                        <div className="toolbar-divider"></div>
                                        <div className="toolbar-group">
                                            <button type="button" onClick={() => formatText('createLink')} title="Insert Link"><LinkIcon size={16} /></button>
                                            <button type="button" onClick={() => formatText('removeFormat')} title="Clear Formatting"><Eraser size={16} /></button>
                                        </div>
                                    </div>
                                    <div
                                        id="main-editor"
                                        ref={editorRef}
                                        contentEditable="true"
                                        onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                        className="rich-editor-admin"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Publishing Controls */}
                        <div className="editor-side-panel">
                            <div className="side-card-section">
                                <div 
                                    className={`premium-upload-zone ${previewUrl ? 'has-preview' : ''}`} 
                                    onClick={() => document.getElementById('admin-blog-thumb').click()}
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="admin-thumb-preview" />
                                    ) : (
                                        <div className="upload-content">
                                            <div className="upload-icon-box">
                                                <ImageIcon size={32} />
                                            </div>
                                            <div className="upload-text">
                                                <span>Drop thumbnail here</span>
                                                <p>Optimized for 16:9 aspect ratio</p>
                                            </div>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        id="admin-blog-thumb"
                                        className="hidden-file-input" 
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
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
                                <button className="btn-secondary" onClick={() => handleSubmit('Draft')} disabled={isSubmitting}>
                                    <Save size={18} /> {isSubmitting ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button className="btn-primary" onClick={() => handleSubmit('Published')} disabled={isSubmitting}>
                                    <Send size={18} /> {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
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

export default WriteBlog;
