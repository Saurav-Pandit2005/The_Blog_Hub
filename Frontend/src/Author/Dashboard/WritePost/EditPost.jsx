import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './WritePost.css';

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
                alert('Could not load blog details.');
                navigate('/author/my-blogs');
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogDetails();
    }, [id, navigate]);

    const handleAI = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setContent(prev => prev + "\n\nAI Enhanced Content: Exploring " + category + " requires a deep understanding of current market trends and technological shifts. By integrating these systems, we can achieve greater efficiency and scalability in our production environments.");
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
            alert('Please fill in at least the title and content.');
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
                alert('Blog updated successfully!');
                navigate('/author/my-blogs');
            }
        } catch (err) {
            console.error('Update Error:', err);
            alert(err.response?.data?.error || 'Failed to update blog.');
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

                            <div className="form-group">
                                <div className="label-flex">
                                    <label>Blog Content</label>
                                    <button
                                        type="button"
                                        className={`ai-btn ${isGenerating ? 'loading' : ''}`}
                                        onClick={handleAI}
                                        disabled={isGenerating}
                                    >
                                        ✨ {isGenerating ? 'Refining...' : 'Enhance with AI'}
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Edit your article content..."
                                    rows="12"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
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
        </div>
    );
}

export default EditPost;
