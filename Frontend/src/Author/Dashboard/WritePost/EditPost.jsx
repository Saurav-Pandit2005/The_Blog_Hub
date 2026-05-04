import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Sparkles, Bold, Italic, Underline, List, ListOrdered, 
    AlignCenter, AlignLeft, AlignRight, Quote, Link as LinkIcon, 
    Type, Heading1, Heading2, Eraser, CheckCircle, X, Image as ImageIcon
} from 'lucide-react';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './WritePost.css';
import '../Dashboard.css';
import { useRef } from 'react';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [status, setStatus] = useState('Draft');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [thumbnail, setThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const editorRef = useRef(null);

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setIsLoading(true);
                const res = await api.get(`/blogs/id/${id}`);
                if (res.data.success) {
                    const blog = res.data.data;
                    setTitle(blog.title);
                    setSummary(blog.summary || '');
                    setContent(blog.content);
                    setCategory(blog.category);
                    setStatus(blog.status);
                    if (blog.coverImage) {
                        setPreviewUrl(blog.coverImage);
                    }
                }
            } catch (err) {
                console.error('Error fetching blog:', err);
                triggerToast('Could not load blog details.', 'error');
                setTimeout(() => navigate('/author/dashboard/my-blogs'), 1500);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogDetails();
    }, [id, navigate]);

    // Update editor content when it loads
    useEffect(() => {
        if (!isLoading && editorRef.current) {
            editorRef.current.innerHTML = content;
        }
    }, [isLoading, content]);

    const handleAI = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const aiText = `<p><strong>AI Enhanced Insight:</strong> Exploring the depths of ${category} reveals a landscape rich with opportunity. By leveraging modern frameworks and data-driven strategies, we can unlock new levels of performance and user engagement.</p>`;
            if (editorRef.current) {
                editorRef.current.innerHTML += aiText;
                setContent(editorRef.current.innerHTML);
            }
            setIsGenerating(false);
        }, 1500);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            triggerToast('Please fill in at least the title and content.', 'error');
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

            const res = await api.put(`/blogs/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                triggerToast('Blog updated successfully!');
                setTimeout(() => navigate('/author/dashboard/my-blogs'), 1500);
            }
        } catch (err) {
            console.error('Update Error:', err);
            triggerToast(err.response?.data?.error || 'Failed to update blog.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="write-post-container">
                <Slidebar />
                <main className="write-content-main">
                    <div className="loading-state">Loading blog details for editing...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="write-post-container">
            <Slidebar />

            <main className="write-content-main">
                <header className="write-header">
                    <div className="header-info">
                        <h1>Edit Blog Post</h1>
                        <p>Modify your content with <span className="ai-color">real-time updates</span>.</p>
                    </div>
                </header>

                <section className="write-form-card">
                    <form className="form-grid" onSubmit={handleSubmit}>

                        {/* LEFT SECTION */}
                        <div className="form-left">
                            <div className="form-group">
                                <label>Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Blog Summary</label>
                                <input
                                    type="text"
                                    placeholder="A short summary"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>

                            <div className="content-area-group">
                                <div className="content-header">
                                    <label className="field-label">Main Body Content</label>
                                    <button
                                        type="button"
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
                                        className="rich-editor"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="form-right">
                            <div className="form-group">
                                <label>Change Cover Image</label>
                                <div className="thumbnail-upload-box" onClick={() => document.getElementById('edit-thumbnail').click()}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="thumbnail-preview-img" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <span>📷 Select Image</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        id="edit-thumbnail"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option>Technology</option>
                                    <option>AI and Machine Learning</option>
                                    <option>Business & Finance</option>
                                    <option>Modern Design</option>
                                    <option>Health & Lifestyle</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </select>
                            </div>

                            <div className="action-buttons-group">
                                <button 
                                    type="button"
                                    className="draft-btn" 
                                    onClick={() => navigate('/author/my-blogs')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="submit-btn" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                    </form>
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

export default EditPost;
